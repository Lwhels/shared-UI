import { getApiConfig, simulateNetworkDelay } from "./apiConfig";

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  amount: number;
  currency?: string;
  description: string;
  customerEmail: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  chargeId: string;
  amount: number;
  currency: string;
  timestamp: string;
  last4: string;
  receiptUrl: string;
  error?: string;
  isMock: boolean;
}

export async function processPayment(details: PaymentDetails): Promise<PaymentResult> {
  const config = getApiConfig();
  await simulateNetworkDelay(500, 1000);

  // Basic validation
  const cleanCard = details.cardNumber.replace(/\s+/g, "");
  if (cleanCard.length < 13) {
    throw new Error("Invalid card number. Please provide at least 13 digits.");
  }

  // If live Stripe Key is provided, could dispatch to backend or Stripe API
  const isMock = !config.stripeKey || config.isMockMode;
  const last4 = cleanCard.slice(-4) || "4242";
  const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const chargeId = `ch_${Math.random().toString(36).substring(2, 14)}`;

  return {
    success: true,
    transactionId,
    chargeId,
    amount: details.amount,
    currency: details.currency || "USD",
    timestamp: new Date().toISOString(),
    last4,
    receiptUrl: `https://receipts.shared-ui.dev/${chargeId}`,
    isMock,
  };
}
