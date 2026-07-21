"use client";

import styles from "../donationPanel.module.css";

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  if (currentStep >= 4) return null;

  return (
    <div className={styles.stepper} aria-label="Donation progress">
      {/* Step 1 */}
      <div
        className={`${styles.stepItem} ${currentStep === 1 ? styles.stepActive : ""} ${currentStep > 1 ? styles.stepCompleted + " " + styles.stepItemClickable : ""}`}
        onClick={() => currentStep > 1 && onStepClick(1)}
        title="Step 1: Amount"
      >
        <div className={styles.stepCircle}>{currentStep > 1 ? "✓" : "1"}</div>
        <span className={styles.stepLabel}>Amount</span>
      </div>

      <div className={`${styles.stepDivider} ${currentStep > 1 ? styles.stepDividerActive : ""}`} />

      {/* Step 2 */}
      <div
        className={`${styles.stepItem} ${currentStep === 2 ? styles.stepActive : ""} ${currentStep > 2 ? styles.stepCompleted + " " + styles.stepItemClickable : ""}`}
        onClick={() => currentStep > 2 && onStepClick(2)}
        title="Step 2: Information"
      >
        <div className={styles.stepCircle}>{currentStep > 2 ? "✓" : "2"}</div>
        <span className={styles.stepLabel}>Information</span>
      </div>

      <div className={`${styles.stepDivider} ${currentStep > 2 ? styles.stepDividerActive : ""}`} />

      {/* Step 3 */}
      <div className={`${styles.stepItem} ${currentStep === 3 ? styles.stepActive : ""}`} title="Step 3: Payment">
        <div className={styles.stepCircle}>3</div>
        <span className={styles.stepLabel}>Payment</span>
      </div>
    </div>
  );
}
