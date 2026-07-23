import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-server";
import Stripe from "stripe";

// Helper function to get or create a default recurring donation product in Stripe
async function getOrCreateDonationProduct(): Promise<string> {
  const envProductId = process.env.STRIPE_PRODUCT_ID;
  if (envProductId) {
    return envProductId;
  }

  // Look up existing product by name
  const existingProducts = await stripe.products.list({ limit: 10 });
  const matched = existingProducts.data.find(
    (p) => p.name === "Monthly Donation - Catwalk to Freedom" && p.active
  );

  if (matched) {
    return matched.id;
  }

  // Create new product if none exists
  const newProduct = await stripe.products.create({
    name: "Monthly Donation - Catwalk to Freedom",
    description: "Monthly recurring contribution to Catwalk to Freedom Foundation",
  });

  return newProduct.id;
}

export async function POST(request: Request) {
  try {
    const { amount, frequency, donorInfo } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid donation amount" },
        { status: 400 }
      );
    }

    const isMonthly = frequency === "monthly";
    const amountInCents = Math.round(amount * 100);
    const donorEmail = donorInfo?.email?.trim() || "";
    const donorName = `${donorInfo?.firstName || ""} ${donorInfo?.lastName || ""}`.trim();

    // 1. Find or create Stripe Customer by email to avoid duplicate customer records
    let customerId: string;
    if (donorEmail) {
      const existingCustomers = await stripe.customers.list({
        email: donorEmail,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customerId = existingCustomers.data[0].id;
      } else {
        const customer = await stripe.customers.create({
          email: donorEmail,
          name: donorName,
          metadata: {
            isDonor: "true",
          },
        });
        customerId = customer.id;
      }
    } else {
      const customer = await stripe.customers.create({
        name: donorName,
        metadata: {
          isDonor: "true",
        },
      });
      customerId = customer.id;
    }

    if (isMonthly) {
      // 2. Get or create Stripe Product ID for the subscription
      const productId = await getOrCreateDonationProduct();

      // 3. --- HANDLE MONTHLY RECURRING SUBSCRIPTION ---
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price_data: {
              currency: "usd",
              product: productId,
              unit_amount: amountInCents,
              recurring: {
                interval: "month",
              },
            },
          },
        ],
        payment_behavior: "default_incomplete",
        payment_settings: {
          save_default_payment_method: "on_subscription",
          payment_method_types: ["card"],
        },
        expand: ["latest_invoice.payment_intent", "pending_setup_intent"],
        metadata: {
          donorName,
          donorEmail,
          frequency: "monthly",
          isRecurring: "true",
        },
      });

      let clientSecret: string | null = null;
      let paymentIntentId: string | null = null;

      // Check pending_setup_intent
      if (subscription.pending_setup_intent) {
        const setupIntent =
          typeof subscription.pending_setup_intent === "string"
            ? await stripe.setupIntents.retrieve(subscription.pending_setup_intent)
            : (subscription.pending_setup_intent as Stripe.SetupIntent);

        clientSecret = setupIntent.client_secret;
        paymentIntentId = setupIntent.id;
      }

      // Check latest_invoice payment_intent
      if (!clientSecret && subscription.latest_invoice) {
        let invoice: Stripe.Invoice;

        if (typeof subscription.latest_invoice === "string") {
          invoice = await stripe.invoices.retrieve(subscription.latest_invoice, {
            expand: ["payment_intent"],
          });
        } else {
          invoice = subscription.latest_invoice as Stripe.Invoice;
        }

        const pi = (invoice as any)?.payment_intent;

        if (typeof pi === "string") {
          const fetchedPI = await stripe.paymentIntents.retrieve(pi);
          clientSecret = fetchedPI.client_secret;
          paymentIntentId = fetchedPI.id;
        } else if (pi && typeof pi === "object") {
          clientSecret = pi.client_secret || null;
          paymentIntentId = pi.id || null;
        }

        if (!clientSecret) {
          clientSecret =
            (invoice as any)?.confirmation_secret ||
            (invoice as any)?.payment_intent_client_secret ||
            (invoice as any)?.client_secret ||
            null;
        }
      }

      // Fallback for regions/accounts (e.g. Norway / Flexible Billing) where initial invoice does not attach an automatic PaymentIntent:
      // Create a PaymentIntent with setup_future_usage: "off_session" to charge the initial contribution and vault the card for recurring billing.
      if (!clientSecret) {
        const fallbackPI = await stripe.paymentIntents.create({
          amount: amountInCents,
          currency: "usd",
          customer: customerId,
          setup_future_usage: "off_session",
          description: `Monthly Contribution ($${amount}/month) - Catwalk to Freedom`,
          automatic_payment_methods: { enabled: true },
          metadata: {
            subscriptionId: subscription.id,
            donorName,
            donorEmail,
            frequency: "monthly",
            isRecurring: "true",
          },
        });

        clientSecret = fallbackPI.client_secret;
        paymentIntentId = fallbackPI.id;
      }

      return NextResponse.json({
        clientSecret,
        subscriptionId: subscription.id,
        paymentIntentId: paymentIntentId || subscription.id,
        customerId,
        frequency: "monthly",
      });
    } else {
      // 4. --- HANDLE ONE-TIME PAYMENT ---
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        customer: customerId,
        description: `One-Time Contribution ($${amount}) - Catwalk to Freedom`,
        automatic_payment_methods: { enabled: true },
        metadata: {
          donorName,
          donorEmail,
          frequency: "once",
          isRecurring: "false",
        },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId,
        frequency: "once",
      });
    }
  } catch (error: any) {
    console.error("Stripe API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to initialize payment session" },
      { status: 500 }
    );
  }
}
