"use client";

import styles from "../donationPanel.module.css";
import { DonationFrequency, DonorInfo } from "./types";

interface Step4SuccessProps {
  donorInfo: DonorInfo;
  amount: number;
  frequency: DonationFrequency;
  receiptId: string;
  onReset: () => void;
}

export default function Step4Success({
  donorInfo,
  amount,
  frequency,
  receiptId,
  onReset,
}: Step4SuccessProps) {
  return (
    <div className={styles.successContainer}>
      <div className={styles.successIcon}>✓</div>
      <h3 className={styles.title} style={{ color: "var(--primary)" }}>
        Thank You, {donorInfo.firstName}!
      </h3>
      <p className={styles.subtitle} style={{ marginBottom: "1rem" }}>
        Your transformative gift gives girls safety, dignity, and a future.
      </p>

      {/* Digital Receipt Card */}
      <div className={styles.receiptCard}>
        <div className={styles.receiptRow}>
          <span className={styles.receiptLabel}>Transaction ID:</span>
          <span className={styles.receiptValue}>{receiptId}</span>
        </div>
        <div className={styles.receiptRow}>
          <span className={styles.receiptLabel}>Donor Name:</span>
          <span className={styles.receiptValue}>
            {donorInfo.firstName} {donorInfo.lastName}
          </span>
        </div>
        <div className={styles.receiptRow}>
          <span className={styles.receiptLabel}>Contribution:</span>
          <span className={styles.receiptValue}>
            ${amount} {frequency === "monthly" ? "Monthly" : "One-Time"}
          </span>
        </div>
        <div className={styles.receiptRow}>
          <span className={styles.receiptLabel}>Receipt Sent To:</span>
          <span className={styles.receiptValue}>{donorInfo.email}</span>
        </div>
      </div>

      <button type="button" className="btn btn-accent" style={{ width: "100%" }} onClick={onReset}>
        Make Another Contribution
      </button>
    </div>
  );
}
