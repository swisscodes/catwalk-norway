"use client";

import { useState, useEffect, useCallback } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe-client";
import styles from "../donationPanel.module.css";
import Step1Amount from "./Step1Amount";
import Step2Information from "./Step2Information";
import Step3Payment from "./Step3Payment";
import Step4Success from "./Step4Success";
import StepIndicator from "./StepIndicator";
import { DonationFrequency, DonorInfo, IMPACTS, PaymentMethod } from "./types";

const stripePromise = getStripe();

export default function DonationPanelContainer() {
  const [step, setStep] = useState<number>(1);
  const [frequency, setFrequency] = useState<DonationFrequency>("monthly");
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

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isInitializingStripe, setIsInitializingStripe] = useState<boolean>(false);
  const [receiptId, setReceiptId] = useState<string>("");

  // Validation Error States
  const [stepError, setStepError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const resetForm = useCallback(() => {
    setStep(1);
    setSelectedPreset(50);
    setCustomValue("");
    setClientSecret("");
    setStepError(null);
    setFieldErrors({});
    setDonorInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zip: "",
    });
  }, []);

  // Reset form state on navigation or explicit reset event
  useEffect(() => {
    const handleResetEvent = () => {
      resetForm();
    };

    window.addEventListener("reset-donation-form", handleResetEvent);
    return () => window.removeEventListener("reset-donation-form", handleResetEvent);
  }, [resetForm]);

  const handlePresetSelect = (amount: number) => {
    setSelectedPreset(amount);
    setCustomValue("");
    setStepError(null);
    setFieldErrors({});
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^[0-9\b]+$/.test(val)) {
      setCustomValue(val);
      setSelectedPreset(null);
      setStepError(null);
      setFieldErrors({});
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

  // Create Stripe PaymentIntent when transitioning to Step 3
  const initStripePaymentIntent = async (donor: DonorInfo) => {
    setIsInitializingStripe(true);
    setStepError(null);

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: getAmount(),
          frequency,
          donorInfo: donor,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to initialize secure checkout");
      }

      setClientSecret(data.clientSecret);
      setStep(3);
    } catch (err: any) {
      setStepError(err.message || "Could not connect to payment gateway. Please try again.");
    } finally {
      setIsInitializingStripe(false);
    }
  };

  const handleStep1Next = () => {
    if (getAmount() <= 0) {
      setStepError("Please select or enter a valid donation amount.");
      return;
    }
    setStepError(null);
    setFieldErrors({});
    setStep(2);
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};

    if (!donorInfo.firstName.trim()) {
      errors.firstName = "First name is required.";
    }

    if (!donorInfo.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }

    if (!donorInfo.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorInfo.email.trim())) {
      errors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStepError("Please fill out all required donor information highlighted below.");
      return false;
    }

    setStepError(null);
    return true;
  };

  const handleStep2Next = () => {
    if (validateStep2()) {
      initStripePaymentIntent(donorInfo);
    }
  };

  const handleDonorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDonorInfo((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    if (stepError) setStepError(null);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    setReceiptId(transactionId);
    setStep(4);
  };



  return (
    <div className={`${styles.panel} glass-panel`}>
      {/* Step Indicator Header */}
      <StepIndicator
        currentStep={step}
        onStepClick={(targetStep) => {
          setStepError(null);
          setFieldErrors({});
          setStep(targetStep);
        }}
      />

      {/* Global Error Banner */}
      {stepError && (
        <div className={styles.errorBanner} role="alert">
          <span className={styles.errorBannerIcon}>⚠️</span>
          <div>{stepError}</div>
        </div>
      )}

      {/* Step 1 Component */}
      {step === 1 && (
        <Step1Amount
          frequency={frequency}
          selectedPreset={selectedPreset}
          customValue={customValue}
          stepError={stepError}
          onFrequencyChange={(freq) => setFrequency(freq)}
          onPresetSelect={handlePresetSelect}
          onCustomChange={handleCustomChange}
          onNext={handleStep1Next}
          getAmount={getAmount}
          getImpactMessage={getImpactMessage}
        />
      )}

      {/* Step 2 Component */}
      {step === 2 && (
        <Step2Information
          donorInfo={donorInfo}
          fieldErrors={fieldErrors}
          onDonorChange={handleDonorChange}
          onNext={handleStep2Next}
          onBack={() => {
            setStepError(null);
            setFieldErrors({});
            setStep(1);
          }}
        />
      )}

      {/* Step 3 Component */}
      {step === 3 && (
        <>
          {isInitializingStripe ? (
            <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--text-muted)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🔒</div>
              <p>Initializing secure checkout with Stripe...</p>
            </div>
          ) : clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                  variables: {
                    colorPrimary: "#db2777",
                    borderRadius: "8px",
                  },
                },
              }}
            >
              <Step3Payment
                amount={getAmount()}
                frequency={frequency}
                donorEmail={donorInfo.email}
                paymentMethod={paymentMethod}
                isSubmitting={isInitializingStripe}
                onPaymentMethodSelect={(method) => setPaymentMethod(method)}
                onSuccess={handlePaymentSuccess}
                onBack={() => {
                  setStepError(null);
                  setFieldErrors({});
                  setStep(2);
                }}
                onEditAmount={() => {
                  setStepError(null);
                  setFieldErrors({});
                  setStep(1);
                }}
              />
            </Elements>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p style={{ color: "#ef4444", marginBottom: "1rem" }}>
                Unable to load payment gateway. Please check your network or try again.
              </p>
              <button
                type="button"
                className="btn btn-accent"
                onClick={() => initStripePaymentIntent(donorInfo)}
              >
                Retry Loading Checkout
              </button>
            </div>
          )}
        </>
      )}

      {/* Step 4 Component */}
      {step === 4 && (
        <Step4Success
          donorInfo={donorInfo}
          amount={getAmount()}
          frequency={frequency}
          receiptId={receiptId}
          onReset={resetForm}
        />
      )}
    </div>
  );
}
