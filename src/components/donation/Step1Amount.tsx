"use client";

import styles from "../donationPanel.module.css";
import { DonationFrequency, PRESETS } from "./types";

interface Step1AmountProps {
  frequency: DonationFrequency;
  selectedPreset: number | null;
  customValue: string;
  stepError: string | null;
  onFrequencyChange: (freq: DonationFrequency) => void;
  onPresetSelect: (amount: number) => void;
  onCustomChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  getAmount: () => number;
  getImpactMessage: () => string;
}

export default function Step1Amount({
  frequency,
  selectedPreset,
  customValue,
  stepError,
  onFrequencyChange,
  onPresetSelect,
  onCustomChange,
  onNext,
  getAmount,
  getImpactMessage,
}: Step1AmountProps) {
  const amount = getAmount();

  return (
    <div>
      <h3 className={styles.title}>Protect a Girl&apos;s Future</h3>
      <p className={styles.subtitle}>Empower her with education, safety, and choice.</p>

      {/* Frequency Toggle */}
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${frequency === "monthly" ? styles.activeTab : ""}`}
          onClick={() => onFrequencyChange("monthly")}
        >
          Give Monthly
        </button>
        <button
          type="button"
          className={`${styles.tab} ${frequency === "once" ? styles.activeTab : ""}`}
          onClick={() => onFrequencyChange("once")}
        >
          One-Time
        </button>
      </div>

      {/* Preset Amount Grid */}
      <div className={styles.amountGrid}>
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`${styles.amountBtn} ${selectedPreset === preset ? styles.selectedAmount : ""}`}
            onClick={() => onPresetSelect(preset)}
          >
            ${preset}
          </button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div className={styles.customInputWrapper}>
        <span className={styles.customSign}>$</span>
        <input
          type="text"
          placeholder="Enter custom amount"
          className={`${styles.customInput} ${stepError && amount <= 0 ? styles.inputError : ""}`}
          value={customValue}
          onChange={onCustomChange}
          aria-label="Custom donation amount"
        />
      </div>

      {/* Dynamic Impact Callout */}
      <div className={styles.impactBox}>
        <div className={styles.impactHeading}>Your Impact</div>
        <p className={styles.impactText}>{getImpactMessage()}</p>
      </div>

      {/* Submit / Continue Button */}
      <button
        type="button"
        className={`btn btn-accent ${styles.nextBtn}`}
        style={{ width: "100%" }}
        onClick={onNext}
      >
        Continue to Information (${amount > 0 ? amount : 0} {frequency === "monthly" ? "/ mo" : ""}) →
      </button>
    </div>
  );
}
