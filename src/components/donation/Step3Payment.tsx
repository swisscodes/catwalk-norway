"use client";

import styles from "../donationPanel.module.css";
import { DonationFrequency, PaymentInfo, PaymentMethod } from "./types";

interface Step3PaymentProps {
  paymentInfo: PaymentInfo;
  fieldErrors: Record<string, string>;
  amount: number;
  frequency: DonationFrequency;
  isSubmitting: boolean;
  onPaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaymentMethodSelect: (method: PaymentMethod) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onBack: () => void;
  onEditAmount: () => void;
}

export default function Step3Payment({
  paymentInfo,
  fieldErrors,
  amount,
  frequency,
  isSubmitting,
  onPaymentChange,
  onPaymentMethodSelect,
  onSubmit,
  onBack,
  onEditAmount,
}: Step3PaymentProps) {
  return (
    <form onSubmit={onSubmit}>
      <h3 className={styles.title}>Payment Details</h3>
      <p className={styles.subtitle}>Complete your secure tax-deductible contribution.</p>

      {/* Selected Amount Summary Badge */}
      <div className={styles.summaryBox}>
        <div>
          <div className={styles.summaryLabel}>Selected Contribution</div>
          <div className={styles.summaryAmount}>
            ${amount} {frequency === "monthly" ? "/ month" : "one-time"}
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
          className={`${styles.paymentOption} ${paymentInfo.paymentMethod === "card" ? styles.paymentOptionActive : ""}`}
          onClick={() => onPaymentMethodSelect("card")}
        >
          💳 Credit Card
        </button>
        <button
          type="button"
          className={`${styles.paymentOption} ${paymentInfo.paymentMethod === "paypal" ? styles.paymentOptionActive : ""}`}
          onClick={() => onPaymentMethodSelect("paypal")}
        >
          🅿️ PayPal
        </button>
        <button
          type="button"
          className={`${styles.paymentOption} ${paymentInfo.paymentMethod === "applepay" ? styles.paymentOptionActive : ""}`}
          onClick={() => onPaymentMethodSelect("applepay")}
        >
           Apple Pay
        </button>
      </div>

      {/* Card Form */}
      {paymentInfo.paymentMethod === "card" ? (
        <div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="cardName">
              Cardholder Name *
            </label>
            <input
              id="cardName"
              type="text"
              name="cardName"
              placeholder="Jane Doe"
              className={`${styles.input} ${fieldErrors.cardName ? styles.inputError : ""}`}
              value={paymentInfo.cardName}
              onChange={onPaymentChange}
              required
            />
            {fieldErrors.cardName && (
              <span className={styles.fieldErrorText}>{fieldErrors.cardName}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="cardNumber">
              Card Number *
            </label>
            <input
              id="cardNumber"
              type="text"
              name="cardNumber"
              placeholder="4532 •••• •••• 8901"
              className={`${styles.input} ${fieldErrors.cardNumber ? styles.inputError : ""}`}
              value={paymentInfo.cardNumber}
              onChange={onPaymentChange}
              maxLength={19}
              required
            />
            {fieldErrors.cardNumber && (
              <span className={styles.fieldErrorText}>{fieldErrors.cardNumber}</span>
            )}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="cardExp">
                Expiry Date *
              </label>
              <input
                id="cardExp"
                type="text"
                name="cardExp"
                placeholder="MM / YY"
                className={`${styles.input} ${fieldErrors.cardExp ? styles.inputError : ""}`}
                value={paymentInfo.cardExp}
                onChange={onPaymentChange}
                maxLength={7}
                required
              />
              {fieldErrors.cardExp && (
                <span className={styles.fieldErrorText}>{fieldErrors.cardExp}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="cardCvc">
                Security Code (CVC) *
              </label>
              <input
                id="cardCvc"
                type="text"
                name="cardCvc"
                placeholder="123"
                className={`${styles.input} ${fieldErrors.cardCvc ? styles.inputError : ""}`}
                value={paymentInfo.cardCvc}
                onChange={onPaymentChange}
                maxLength={4}
                required
              />
              {fieldErrors.cardCvc && (
                <span className={styles.fieldErrorText}>{fieldErrors.cardCvc}</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "1.5rem 0", color: "var(--text-muted)" }}>
          <p>
            You will be redirected to complete your payment safely via{" "}
            {paymentInfo.paymentMethod === "paypal" ? "PayPal" : "Apple Pay"}.
          </p>
        </div>
      )}

      {/* SSL Badge */}
      <div className={styles.securityBadge}>
        🔒 256-bit SSL Encryption • Tax-deductible 501(c)(3) contribution
      </div>

      {/* Submit Buttons */}
      <div className={styles.btnGroup}>
        <button type="button" className={styles.backBtn} onClick={onBack}>
          ← Back
        </button>
        <button type="submit" className={`btn btn-accent ${styles.nextBtn}`} disabled={isSubmitting}>
          {isSubmitting ? "Processing Securely..." : `Complete $${amount} Donation`}
        </button>
      </div>
    </form>
  );
}
