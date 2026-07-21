"use client";

import { useState } from "react";
import styles from "../donationPanel.module.css";
import Step1Amount from "./Step1Amount";
import Step2Information from "./Step2Information";
import Step3Payment from "./Step3Payment";
import Step4Success from "./Step4Success";
import StepIndicator from "./StepIndicator";
import { DonationFrequency, DonorInfo, IMPACTS, PaymentInfo, PaymentMethod } from "./types";

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

  // Validation Error States
  const [stepError, setStepError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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

  // Step Navigation & Validation handlers
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
      setStep(3);
    }
  };

  const validateStep3 = () => {
    if (paymentInfo.paymentMethod !== "card") {
      setStepError(null);
      setFieldErrors({});
      return true;
    }

    const errors: Record<string, string> = {};

    if (!paymentInfo.cardName.trim()) {
      errors.cardName = "Cardholder name is required.";
    }

    const cleanCardNum = paymentInfo.cardNumber.replace(/\s+/g, "");
    if (!cleanCardNum) {
      errors.cardNumber = "Card number is required.";
    } else if (cleanCardNum.length < 12) {
      errors.cardNumber = "Please enter a valid card number (at least 12 digits).";
    }

    if (!paymentInfo.cardExp.trim()) {
      errors.cardExp = "Expiry date is required.";
    } else if (paymentInfo.cardExp.trim().length < 4) {
      errors.cardExp = "Expiry format must be MM/YY.";
    }

    if (!paymentInfo.cardCvc.trim()) {
      errors.cardCvc = "CVC code is required.";
    } else if (paymentInfo.cardCvc.trim().length < 3) {
      errors.cardCvc = "CVC must be 3 or 4 digits.";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStepError("Please correct the payment details highlighted below.");
      return false;
    }

    setStepError(null);
    return true;
  };

  const handleDonorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDonorInfo((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    if (stepError) setStepError(null);
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    if (stepError) setStepError(null);
  };

  const handleFinalSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep3()) return;
    setIsSubmitting(true);

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
        <Step3Payment
          paymentInfo={paymentInfo}
          fieldErrors={fieldErrors}
          amount={getAmount()}
          frequency={frequency}
          isSubmitting={isSubmitting}
          onPaymentChange={handlePaymentChange}
          onPaymentMethodSelect={(method: PaymentMethod) => {
            setPaymentInfo((prev) => ({ ...prev, paymentMethod: method }));
            setStepError(null);
            setFieldErrors({});
          }}
          onSubmit={handleFinalSubmit}
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
