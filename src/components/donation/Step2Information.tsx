"use client";

import styles from "../donationPanel.module.css";
import { DonorInfo } from "./types";

interface Step2InformationProps {
  donorInfo: DonorInfo;
  fieldErrors: Record<string, string>;
  onDonorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Information({
  donorInfo,
  fieldErrors,
  onDonorChange,
  onNext,
  onBack,
}: Step2InformationProps) {
  return (
    <div>
      <h3 className={styles.title}>Donor Information</h3>
      <p className={styles.subtitle}>Where should we send your donation tax receipt?</p>

      {/* Name Row */}
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="firstName">
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="Jane"
            className={`${styles.input} ${fieldErrors.firstName ? styles.inputError : ""}`}
            value={donorInfo.firstName}
            onChange={onDonorChange}
            required
          />
          {fieldErrors.firstName && (
            <span className={styles.fieldErrorText}>{fieldErrors.firstName}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="lastName">
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Doe"
            className={`${styles.input} ${fieldErrors.lastName ? styles.inputError : ""}`}
            value={donorInfo.lastName}
            onChange={onDonorChange}
            required
          />
          {fieldErrors.lastName && (
            <span className={styles.fieldErrorText}>{fieldErrors.lastName}</span>
          )}
        </div>
      </div>

      {/* Email */}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="email">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="jane.doe@example.com"
          className={`${styles.input} ${fieldErrors.email ? styles.inputError : ""}`}
          value={donorInfo.email}
          onChange={onDonorChange}
          required
        />
        {fieldErrors.email && (
          <span className={styles.fieldErrorText}>{fieldErrors.email}</span>
        )}
      </div>

      {/* Phone */}
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
          onChange={onDonorChange}
        />
      </div>

      {/* Address */}
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
          onChange={onDonorChange}
        />
      </div>

      {/* City & Zip */}
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
            onChange={onDonorChange}
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
            onChange={onDonorChange}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className={styles.btnGroup}>
        <button type="button" className={styles.backBtn} onClick={onBack}>
          ← Back
        </button>
        <button type="button" className={`btn btn-accent ${styles.nextBtn}`} onClick={onNext}>
          Continue to Payment →
        </button>
      </div>
    </div>
  );
}
