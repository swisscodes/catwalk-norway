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
        },
        expand: ["latest_invoice.payment_intent"],
        metadata: {
          donorName,
          donorEmail,
          frequency: "monthly",
          isRecurring: "true",
        },
      });

      const invoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = (invoice as any)?.payment_intent as Stripe.PaymentIntent;

      // Extract clientSecret across all Stripe API versions (payment_intent or confirmation_secret)
      const clientSecret =
        paymentIntent?.client_secret ||
        (invoice as any)?.confirmation_secret ||
        (invoice as any)?.payment_intent_client_secret;

      if (!clientSecret) {
        throw new Error("Failed to extract payment client secret from subscription invoice.");
      }

      return NextResponse.json({
        clientSecret,
        subscriptionId: subscription.id,
        paymentIntentId: paymentIntent?.id || subscription.id,
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
