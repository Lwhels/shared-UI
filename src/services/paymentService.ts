import { getApiConfig } from "./apiConfig";
import {
  executeStripePayment,
  StripeCardDetails,
  StripePaymentIntentParams,
  detectCardBrand,
} from "../integrations/stripe/stripeClient";

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
  cardBrand?: string;
  error?: string;
  isMock: boolean;
}

export async function processPayment(details: PaymentDetails): Promise<PaymentResult> {
  const config = getApiConfig();

  const cardDetails: StripeCardDetails = {
    cardNumber: details.cardNumber,
    cardHolder: details.cardHolder,
    expiry: details.expiry,
    cvv: details.cvv,
  };

  const intentParams: StripePaymentIntentParams = {
    amount: details.amount,
    currency: details.currency || "USD",
    customerEmail: details.customerEmail,
    description: details.description,
    metadata: {
      cardHolder: details.cardHolder,
    },
  };

  const stripeResult = await executeStripePayment(cardDetails, intentParams);

  return {
    success: stripeResult.success,
    transactionId: stripeResult.paymentIntentId,
    chargeId: stripeResult.chargeId,
    amount: stripeResult.amount,
    currency: stripeResult.currency,
    timestamp: stripeResult.timestamp,
    last4: stripeResult.last4,
    cardBrand: stripeResult.cardBrand,
    receiptUrl: stripeResult.receiptUrl,
    isMock: stripeResult.isMock,
  };
}
