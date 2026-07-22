import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-server";

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

    const paymentIntentParams: any = {
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      description: isMonthly
        ? `Monthly Contribution ($${amount}/month) - Catwalk to Freedom`
        : `One-Time Contribution ($${amount}) - Catwalk to Freedom`,
      metadata: {
        frequency: isMonthly ? "monthly" : "once",
        isRecurring: isMonthly ? "true" : "false",
        recurringInterval: isMonthly ? "month" : "none",
        donorName: `${donorInfo?.firstName || ""} ${donorInfo?.lastName || ""}`.trim(),
        donorEmail: donorInfo?.email || "",
      },
    };

    // For monthly recurring payments, save payment method for off-session billing
    if (isMonthly) {
      paymentIntentParams.setup_future_usage = "off_session";
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      frequency: isMonthly ? "monthly" : "once",
    });
  } catch (error: any) {
    console.error("Error creating PaymentIntent:", error);
    return NextResponse.json(
      { error: error.message || "Failed to initialize payment session" },
      { status: 500 }
    );
  }
}
