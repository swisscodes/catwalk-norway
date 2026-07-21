export type DonationFrequency = "once" | "monthly";
export type PaymentMethod = "card" | "paypal" | "applepay";

export interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

export interface PaymentInfo {
  paymentMethod: PaymentMethod;
  cardName: string;
  cardNumber: string;
  cardExp: string;
  cardCvc: string;
  billingZip: string;
}

export const PRESETS = [25, 50, 100, 250] as const;

export const IMPACTS: Record<number, string> = {
  25: "Provides school uniforms, textbooks, and supplies for a young girl for one full school term, keeping her in class and safe.",
  50: "Funds legal protection, registration fees, and paralegal support to protect a girl escaping a forced marriage.",
  100: "Provides safe emergency sanctuary, hot meals, trauma counseling, and medical checkups for a girl in our protection shelter for one full week.",
  250: "Sponsors a multi-day community seminar for elders and parents on protecting girls' rights and ending child marriage."
};
