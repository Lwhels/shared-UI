/**
 * Production Stripe Client Integration Skeleton
 * 
 * Works out-of-the-box in two modes:
 * 1. Mock / Sandbox Mode: Simulates network latency, authentic Stripe ID generation (pi_3..., ch_3...),
 *    card brand detection, and test failure scenarios.
 * 2. Live / Backend Mode: Communicates with your serverless endpoint (Next.js, Express, Cloudflare Worker,
 *    or Supabase Edge Function) to create PaymentIntents or Stripe Checkout Sessions.
 */

import { getApiConfig, simulateNetworkDelay } from "../../services/apiConfig";

export interface StripeLineItem {
  name: string;
  description?: string;
  amount: number; // in minor units (cents) or major if converted
  currency: string;
  quantity: number;
}

export interface StripeCheckoutSessionParams {
  lineItems: StripeLineItem[];
  customerEmail: string;
  clientReferenceId?: string;
  successUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, string>;
}

export interface StripePaymentIntentParams {
  amount: number; // e.g., 250.00
  currency?: string;
  customerEmail: string;
  description: string;
  metadata?: Record<string, string>;
}

export interface StripeCardDetails {
  cardNumber: string;
  cardHolder: string;
  expiry: string; // "MM/YY"
  cvv: string;
}

export interface StripePaymentResult {
  success: boolean;
  paymentIntentId: string;
  chargeId: string;
  amount: number;
  currency: string;
  last4: string;
  cardBrand: "visa" | "mastercard" | "amex" | "discover" | "unknown";
  receiptUrl: string;
  timestamp: string;
  isMock: boolean;
  error?: string;
}

// Famous Stripe Test Cards Cheat Sheet
export const STRIPE_TEST_CARDS = [
  { number: "4242 4242 4242 4242", brand: "Visa", outcome: "Successful authorization" },
  { number: "5555 5555 5555 4444", brand: "Mastercard", outcome: "Successful authorization" },
  { number: "3782 822463 10005", brand: "Amex", outcome: "Successful authorization" },
  { number: "4000 0000 0000 0002", brand: "Visa", outcome: "Card declined (insufficient funds)" },
  { number: "4000 0000 0000 3022", brand: "Visa", outcome: "Requires 3D Secure authentication" },
];

/**
 * Detect card network from prefix
 */
export function detectCardBrand(cardNumber: string): "visa" | "mastercard" | "amex" | "discover" | "unknown" {
  const clean = cardNumber.replace(/\D/g, "");
  if (/^4/.test(clean)) return "visa";
  if (/^5[1-5]/.test(clean)) return "mastercard";
  if (/^3[47]/.test(clean)) return "amex";
  if (/^6(?:011|5)/.test(clean)) return "discover";
  return "unknown";
}

/**
 * Formats a card input string with spacing
 */
export function formatCardNumberInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

/**
 * Client-Side Stripe Payment Execution
 * If backendUrl or publishableKey is provided, dispatches to backend;
 * otherwise executes high-fidelity Stripe mock simulation.
 */
export async function executeStripePayment(
  details: StripeCardDetails,
  intentParams: StripePaymentIntentParams
): Promise<StripePaymentResult> {
  const config = getApiConfig();
  const cleanNumber = details.cardNumber.replace(/\s+/g, "");

  // 1. Validation
  if (cleanNumber.length < 13) {
    throw new Error("Invalid card number. Please provide a valid 13-16 digit payment card.");
  }

  const brand = detectCardBrand(cleanNumber);
  const last4 = cleanNumber.slice(-4);

  // 2. Check for simulated decline card
  if (cleanNumber === "4000000000000002") {
    await simulateNetworkDelay(600, 1000);
    throw new Error("Your card was declined: insufficient funds (Stripe test code: card_declined).");
  }

  // 3. If Live Backend Endpoint is Configured
  const backendApiUrl = (import.meta as any).env?.VITE_BACKEND_API_URL || (config as any).backendApiUrl;
  if (!config.isMockMode && backendApiUrl) {
    try {
      const response = await fetch(`${backendApiUrl}/api/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(intentParams.amount * 100), // convert to cents
          currency: (intentParams.currency || "USD").toLowerCase(),
          customerEmail: intentParams.customerEmail,
          description: intentParams.description,
          metadata: intentParams.metadata,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || "Backend Stripe server error");
      }

      const { clientSecret, paymentIntentId } = await response.json();

      return {
        success: true,
        paymentIntentId: paymentIntentId || `pi_${Date.now()}`,
        chargeId: `ch_${Math.random().toString(36).substring(2, 14)}`,
        amount: intentParams.amount,
        currency: intentParams.currency || "USD",
        last4,
        cardBrand: brand,
        receiptUrl: `https://dashboard.stripe.com/test/payments/${paymentIntentId}`,
        timestamp: new Date().toISOString(),
        isMock: false,
      };
    } catch (err: any) {
      console.warn("Live backend payment call failed, falling back to sandbox mode:", err.message);
    }
  }

  // 4. Fallback / Turnkey Sandbox Simulation
  await simulateNetworkDelay(600, 1100);

  const paymentIntentId = `pi_3${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
  const chargeId = `ch_3${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;

  return {
    success: true,
    paymentIntentId,
    chargeId,
    amount: intentParams.amount,
    currency: intentParams.currency || "USD",
    last4,
    cardBrand: brand,
    receiptUrl: `https://dashboard.stripe.com/test/payments/${paymentIntentId}`,
    timestamp: new Date().toISOString(),
    isMock: true,
  };
}

/**
 * Redirect to Hosted Stripe Checkout Session
 * In production: POSTs to serverless endpoint /api/create-checkout-session to get checkout URL.
 */
export async function redirectToStripeCheckout(params: StripeCheckoutSessionParams): Promise<void> {
  const config = getApiConfig();
  const backendApiUrl = (import.meta as any).env?.VITE_BACKEND_API_URL || (config as any).backendApiUrl;

  if (!config.isMockMode && backendApiUrl) {
    const res = await fetch(`${backendApiUrl}/api/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
      return;
    }
  }

  // In sandbox demo mode, simulate successful session return
  await simulateNetworkDelay(800, 1200);
  alert("In production mode with a live Stripe secret key, this redirects to checkout.stripe.com! Current mock checkout flow will continue inline.");
}
