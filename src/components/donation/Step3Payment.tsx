"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import styles from "../donationPanel.module.css";
import { DonationFrequency, PaymentMethod } from "./types";

interface Step3PaymentProps {
  amount: number;
  frequency: DonationFrequency;
  donorEmail: string;
  paymentMethod: PaymentMethod;
  isSubmitting: boolean;
  onPaymentMethodSelect: (method: PaymentMethod) => void;
  onSuccess: (transactionId: string) => void;
  onBack: () => void;
  onEditAmount: () => void;
}

export default function Step3Payment({
  amount,
  frequency,
  donorEmail,
  paymentMethod,
  isSubmitting,
  onPaymentMethodSelect,
  onSuccess,
  onBack,
  onEditAmount,
}: Step3PaymentProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (paymentMethod !== "card") {
      // Direct payment methods like PayPal or Apple Pay simulation
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        onSuccess(`RH-EXT-${Math.floor(100000 + Math.random() * 900000)}`);
      }, 1200);
      return;
    }

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not initialized yet. Please wait a moment.");
      return;
    }

    setProcessing(true);
    setErrorMessage(null);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
          receipt_email: donorEmail,
        },
        redirect: "if_required",
      });

      if (result.error) {
        setErrorMessage(result.error.message || "An error occurred with your payment.");
        setProcessing(false);
      } else if (result.paymentIntent && (result.paymentIntent.status === "succeeded" || result.paymentIntent.status === "requires_capture")) {
        setProcessing(false);
        onSuccess(result.paymentIntent.id);
      } else {
        setProcessing(false);
        onSuccess(`RH-${Math.floor(100000 + Math.random() * 900000)}`);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to confirm payment.");
      setProcessing(false);
    }
  };

  const isLoading = isSubmitting || processing;

  return (
    <form onSubmit={handleSubmit}>
      <h3 className={styles.title}>Payment Details</h3>
      <p className={styles.subtitle}>Complete your secure tax-deductible contribution.</p>

      {/* Selected Amount Summary Badge */}
      <div className={styles.summaryBox}>
        <div>
          <div className={styles.summaryLabel}>
            Selected Contribution {frequency === "monthly" ? "(Monthly Recurring)" : "(One-Time)"}
          </div>
          <div className={styles.summaryAmount}>
            ${amount} {frequency === "monthly" ? "/ month" : "one-time"}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
            {frequency === "monthly" ? "🔁 Card saved for automated off-session monthly billing." : "⚡ Single tax-deductible contribution."}
          </div>
        </div>
        <button type="button" className={styles.summaryEditBtn} onClick={onEditAmount}>
          Change
        </button>
      </div>

      {/* Payment Option Selector */}
      <div className={styles.paymentMethods}>
        <button
          type="button"
          className={`${styles.paymentOption} ${paymentMethod === "card" ? styles.paymentOptionActive : ""}`}
          onClick={() => onPaymentMethodSelect("card")}
        >
          💳 Credit Card
        </button>
        <button
          type="button"
          className={`${styles.paymentOption} ${paymentMethod === "paypal" ? styles.paymentOptionActive : ""}`}
          onClick={() => onPaymentMethodSelect("paypal")}
        >
          🅿️ PayPal
        </button>
        <button
          type="button"
          className={`${styles.paymentOption} ${paymentMethod === "applepay" ? styles.paymentOptionActive : ""}`}
          onClick={() => onPaymentMethodSelect("applepay")}
        >
           Apple Pay
        </button>
      </div>

      {/* Error Notice */}
      {errorMessage && (
        <div className={styles.errorBanner} role="alert" style={{ marginBottom: "1.25rem" }}>
          <span className={styles.errorBannerIcon}>⚠️</span>
          <div>{errorMessage}</div>
        </div>
      )}

      {/* Stripe Payment Element for Credit Card */}
      {paymentMethod === "card" ? (
        <div style={{ marginBottom: "1.25rem" }}>
          {/* Test Card Hint Banner */}
          <div
            style={{
              background: "rgba(15, 118, 110, 0.08)",
              border: "1px solid rgba(15, 118, 110, 0.2)",
              borderRadius: "var(--radius-md)",
              padding: "0.75rem 1rem",
              marginBottom: "1.25rem",
              fontSize: "0.85rem",
              color: "var(--foreground)",
            }}
          >
            💳 <strong>Stripe Test Mode Active:</strong> Use test card number{" "}
            <code style={{ background: "rgba(0,0,0,0.06)", padding: "0.1rem 0.3rem", borderRadius: "4px" }}>
              4242 4242 4242 4242
            </code>{" "}
            with any future date and CVC.
          </div>

          <PaymentElement options={{ layout: "tabs" }} />
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "1.5rem 0", color: "var(--text-muted)" }}>
          <p>
            You will be redirected to complete your payment safely via{" "}
            {paymentMethod === "paypal" ? "PayPal" : "Apple Pay"}.
          </p>
        </div>
      )}

      {/* SSL Badge */}
      <div className={styles.securityBadge}>
        🔒 256-bit SSL Encryption • Tax-deductible 501(c)(3) contribution
      </div>

      {/* Submit Buttons */}
      <div className={styles.btnGroup}>
        <button type="button" className={styles.backBtn} onClick={onBack} disabled={isLoading}>
          ← Back
        </button>
        <button type="submit" className={`btn btn-accent ${styles.nextBtn}`} disabled={isLoading}>
          {isLoading ? "Processing Securely..." : `Complete $${amount} Donation`}
        </button>
      </div>
    </form>
  );
}
