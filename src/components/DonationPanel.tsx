"use client";

import { useState } from "react";
import styles from "./donationPanel.module.css";

const PRESETS = [25, 50, 100, 250];

const IMPACTS: Record<number, string> = {
  25: "Provides school uniforms, textbooks, and supplies for a young girl for one full school term, keeping her in class and safe.",
  50: "Funds legal protection, registration fees, and paralegal support to protect a girl escaping a forced marriage.",
  100: "Provides safe emergency sanctuary, hot meals, trauma counseling, and medical checkups for a girl in our protection shelter for one full week.",
  250: "Sponsors a multi-day community seminar for elders and parents on protecting girls' rights and ending child marriage."
};

interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

interface PaymentInfo {
  paymentMethod: "card" | "paypal" | "applepay";
  cardName: string;
  cardNumber: string;
  cardExp: string;
  cardCvc: string;
  billingZip: string;
}

export default function DonationPanel() {
  const [step, setStep] = useState<number>(1);
  const [frequency, setFrequency] = useState<"once" | "monthly">("monthly");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(50);
  const [customValue, setCustomValue] = useState<string>("");

  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
    billingZip: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [receiptId, setReceiptId] = useState<string>("");

  const handlePresetSelect = (amount: number) => {
    setSelectedPreset(amount);
    setCustomValue("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^[0-9\b]+$/.test(val)) {
      setCustomValue(val);
      setSelectedPreset(null);
    }
  };

  const getAmount = () => {
    if (selectedPreset) return selectedPreset;
    const val = parseInt(customValue);
    return isNaN(val) ? 0 : val;
  };

  const getImpactMessage = () => {
    if (selectedPreset) {
      return IMPACTS[selectedPreset];
    }
    const val = parseInt(customValue);
    if (!isNaN(val) && val > 0) {
      if (val < 25) {
        return "Helps purchase essential hygiene kits, school supplies, and food staples for vulnerable girls.";
      } else if (val < 50) {
        return "Funds educational tutoring and counseling sessions for a rescued girl preparing for school.";
      } else if (val < 100) {
        return "Funds vital medical screenings, medications, and mental health therapy for girls in our safe house.";
      } else {
        return "Directly deploys local crisis counselors and legal aid workers to rescue girls facing child marriage.";
      }
    }
    return "Select or enter an amount to see the impact of your generosity.";
  };

  const isStep1Valid = getAmount() > 0;

  const isStep2Valid =
    donorInfo.firstName.trim().length > 0 &&
    donorInfo.lastName.trim().length > 0 &&
    donorInfo.email.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorInfo.email.trim());

  const isStep3Valid =
    paymentInfo.paymentMethod !== "card" ||
    (paymentInfo.cardName.trim().length > 0 &&
      paymentInfo.cardNumber.trim().length >= 12 &&
      paymentInfo.cardExp.trim().length >= 4 &&
      paymentInfo.cardCvc.trim().length >= 3);

  const handleDonorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonorInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep3Valid) return;
    setIsSubmitting(true);

    // Simulate secure payment processing latency
    setTimeout(() => {
      setIsSubmitting(false);
      setReceiptId(`RH-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep(4);
    }, 1200);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedPreset(50);
    setCustomValue("");
    setDonorInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zip: "",
    });
    setPaymentInfo({
      paymentMethod: "card",
      cardName: "",
      cardNumber: "",
      cardExp: "",
      cardCvc: "",
      billingZip: "",
    });
  };

  return (
    <div className={`${styles.panel} glass-panel`}>
      {/* Stepper Navigation (Only shown for active steps 1-3) */}
      {step < 4 && (
        <div className={styles.stepper} aria-label="Donation progress">
          <div
            className={`${styles.stepItem} ${step === 1 ? styles.stepActive : ""} ${step > 1 ? styles.stepCompleted + " " + styles.stepItemClickable : ""}`}
            onClick={() => step > 1 && setStep(1)}
            title="Step 1: Amount"
          >
            <div className={styles.stepCircle}>{step > 1 ? "✓" : "1"}</div>
            <span className={styles.stepLabel}>Amount</span>
          </div>

          <div className={`${styles.stepDivider} ${step > 1 ? styles.stepDividerActive : ""}`} />

          <div
            className={`${styles.stepItem} ${step === 2 ? styles.stepActive : ""} ${step > 2 ? styles.stepCompleted + " " + styles.stepItemClickable : ""}`}
            onClick={() => step > 2 && setStep(2)}
            title="Step 2: Information"
          >
            <div className={styles.stepCircle}>{step > 2 ? "✓" : "2"}</div>
            <span className={styles.stepLabel}>Information</span>
          </div>

          <div className={`${styles.stepDivider} ${step > 2 ? styles.stepDividerActive : ""}`} />

          <div className={`${styles.stepItem} ${step === 3 ? styles.stepActive : ""}`} title="Step 3: Payment">
            <div className={styles.stepCircle}>3</div>
            <span className={styles.stepLabel}>Payment</span>
          </div>
        </div>
      )}

      {/* STEP 1: AMOUNT SELECTION */}
      {step === 1 && (
        <div>
          <h3 className={styles.title}>Protect a Girl&apos;s Future</h3>
          <p className={styles.subtitle}>Empower her with education, safety, and choice.</p>

          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${frequency === "monthly" ? styles.activeTab : ""}`}
              onClick={() => setFrequency("monthly")}
            >
              Give Monthly
            </button>
            <button
              type="button"
              className={`${styles.tab} ${frequency === "once" ? styles.activeTab : ""}`}
              onClick={() => setFrequency("once")}
            >
              One-Time
            </button>
          </div>

          <div className={styles.amountGrid}>
            {PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                className={`${styles.amountBtn} ${selectedPreset === preset ? styles.selectedAmount : ""}`}
                onClick={() => handlePresetSelect(preset)}
              >
                ${preset}
              </button>
            ))}
          </div>

          <div className={styles.customInputWrapper}>
            <span className={styles.customSign}>$</span>
            <input
              type="text"
              placeholder="Enter custom amount"
              className={styles.customInput}
              value={customValue}
              onChange={handleCustomChange}
              aria-label="Custom donation amount"
            />
          </div>

          <div className={styles.impactBox}>
            <div className={styles.impactHeading}>Your Impact</div>
            <p className={styles.impactText}>{getImpactMessage()}</p>
          </div>

          <button
            type="button"
            className={`btn btn-accent ${styles.nextBtn}`}
            style={{ width: "100%" }}
            disabled={!isStep1Valid}
            onClick={() => setStep(2)}
          >
            Continue to Information (${getAmount() > 0 ? getAmount() : 0} {frequency === "monthly" ? "/ mo" : ""}) →
          </button>
        </div>
      )}

      {/* STEP 2: DONOR INFORMATION */}
      {step === 2 && (
        <div>
          <h3 className={styles.title}>Donor Information</h3>
          <p className={styles.subtitle}>Where should we send your donation tax receipt?</p>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Jane"
                className={styles.input}
                value={donorInfo.firstName}
                onChange={handleDonorChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Doe"
                className={styles.input}
                value={donorInfo.lastName}
                onChange={handleDonorChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="jane.doe@example.com"
              className={styles.input}
              value={donorInfo.email}
              onChange={handleDonorChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="phone">
              Phone Number <span className={styles.labelOptional}>(Optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+1 (555) 000-0000"
              className={styles.input}
              value={donorInfo.phone}
              onChange={handleDonorChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="address">
              Street Address <span className={styles.labelOptional}>(Optional)</span>
            </label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="123 Hope Street"
              className={styles.input}
              value={donorInfo.address}
              onChange={handleDonorChange}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="city">
                City <span className={styles.labelOptional}>(Optional)</span>
              </label>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="New York"
                className={styles.input}
                value={donorInfo.city}
                onChange={handleDonorChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="zip">
                Postal / Zip Code <span className={styles.labelOptional}>(Optional)</span>
              </label>
              <input
                id="zip"
                type="text"
                name="zip"
                placeholder="10001"
                className={styles.input}
                value={donorInfo.zip}
                onChange={handleDonorChange}
              />
            </div>
          </div>

          <div className={styles.btnGroup}>
            <button type="button" className={styles.backBtn} onClick={() => setStep(1)}>
              ← Back
            </button>
            <button
              type="button"
              className={`btn btn-accent ${styles.nextBtn}`}
              disabled={!isStep2Valid}
              onClick={() => setStep(3)}
            >
              Continue to Payment →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PAYMENT INFORMATION */}
      {step === 3 && (
        <form onSubmit={handleFinalSubmit}>
          <h3 className={styles.title}>Payment Details</h3>
          <p className={styles.subtitle}>Complete your secure tax-deductible contribution.</p>

          <div className={styles.summaryBox}>
            <div>
              <div className={styles.summaryLabel}>Selected Contribution</div>
              <div className={styles.summaryAmount}>
                ${getAmount()} {frequency === "monthly" ? "/ month" : "one-time"}
              </div>
            </div>
            <button type="button" className={styles.summaryEditBtn} onClick={() => setStep(1)}>
              Change
            </button>
          </div>

          <div className={styles.paymentMethods}>
            <button
              type="button"
              className={`${styles.paymentOption} ${paymentInfo.paymentMethod === "card" ? styles.paymentOptionActive : ""}`}
              onClick={() => setPaymentInfo((prev) => ({ ...prev, paymentMethod: "card" }))}
            >
              💳 Credit Card
            </button>
            <button
              type="button"
              className={`${styles.paymentOption} ${paymentInfo.paymentMethod === "paypal" ? styles.paymentOptionActive : ""}`}
              onClick={() => setPaymentInfo((prev) => ({ ...prev, paymentMethod: "paypal" }))}
            >
              🅿️ PayPal
            </button>
            <button
              type="button"
              className={`${styles.paymentOption} ${paymentInfo.paymentMethod === "applepay" ? styles.paymentOptionActive : ""}`}
              onClick={() => setPaymentInfo((prev) => ({ ...prev, paymentMethod: "applepay" }))}
            >
               Apple Pay
            </button>
          </div>

          {paymentInfo.paymentMethod === "card" ? (
            <div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="cardName">Cardholder Name *</label>
                <input
                  id="cardName"
                  type="text"
                  name="cardName"
                  placeholder="Jane Doe"
                  className={styles.input}
                  value={paymentInfo.cardName}
                  onChange={handlePaymentChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="cardNumber">Card Number *</label>
                <input
                  id="cardNumber"
                  type="text"
                  name="cardNumber"
                  placeholder="4532 •••• •••• 8901"
                  className={styles.input}
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  maxLength={19}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="cardExp">Expiry Date *</label>
                  <input
                    id="cardExp"
                    type="text"
                    name="cardExp"
                    placeholder="MM / YY"
                    className={styles.input}
                    value={paymentInfo.cardExp}
                    onChange={handlePaymentChange}
                    maxLength={7}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="cardCvc">Security Code (CVC) *</label>
                  <input
                    id="cardCvc"
                    type="text"
                    name="cardCvc"
                    placeholder="123"
                    className={styles.input}
                    value={paymentInfo.cardCvc}
                    onChange={handlePaymentChange}
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0", color: "var(--text-muted)" }}>
              <p>You will be redirected to complete your payment safely via {paymentInfo.paymentMethod === "paypal" ? "PayPal" : "Apple Pay"}.</p>
            </div>
          )}

          <div className={styles.securityBadge}>
            🔒 256-bit SSL Encryption • Tax-deductible 501(c)(3) contribution
          </div>

          <div className={styles.btnGroup}>
            <button type="button" className={styles.backBtn} onClick={() => setStep(2)}>
              ← Back
            </button>
            <button
              type="submit"
              className={`btn btn-accent ${styles.nextBtn}`}
              disabled={!isStep3Valid || isSubmitting}
            >
              {isSubmitting ? "Processing Securely..." : `Complete $${getAmount()} Donation`}
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: SUCCESS RECEIPT */}
      {step === 4 && (
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>✓</div>
          <h3 className={styles.title} style={{ color: "var(--primary)" }}>
            Thank You, {donorInfo.firstName}!
          </h3>
          <p className={styles.subtitle} style={{ marginBottom: "1rem" }}>
            Your transformative gift gives girls safety, dignity, and a future.
          </p>

          <div className={styles.receiptCard}>
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Transaction ID:</span>
              <span className={styles.receiptValue}>{receiptId}</span>
            </div>
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Donor Name:</span>
              <span className={styles.receiptValue}>{donorInfo.firstName} {donorInfo.lastName}</span>
            </div>
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Contribution:</span>
              <span className={styles.receiptValue}>${getAmount()} {frequency === "monthly" ? "Monthly" : "One-Time"}</span>
            </div>
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Receipt Sent To:</span>
              <span className={styles.receiptValue}>{donorInfo.email}</span>
            </div>
          </div>

          <button type="button" className="btn btn-accent" style={{ width: "100%" }} onClick={resetForm}>
            Make Another Contribution
          </button>
        </div>
      )}
    </div>
  );
}
