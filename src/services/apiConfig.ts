export interface ApiConfigState {
  isMockMode: boolean;
  stripeKey: string;
  openaiKey: string;
  geminiKey: string;
  resendKey: string;
  supabaseUrl: string;
  supabaseKey: string;
  mapboxKey: string;
}

export interface DispatchedEmail {
  id: string;
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
  timestamp: string;
  status: "delivered" | "simulated";
}

const STORAGE_KEY = "shared_ui_api_config";
const EMAIL_OUTBOX_KEY = "shared_ui_email_outbox";

const DEFAULT_CONFIG: ApiConfigState = {
  isMockMode: true,
  stripeKey: (import.meta as any).env?.VITE_STRIPE_PUBLISHABLE_KEY || "",
  openaiKey: (import.meta as any).env?.VITE_OPENAI_API_KEY || "",
  geminiKey: (import.meta as any).env?.VITE_GEMINI_API_KEY || "",
  resendKey: (import.meta as any).env?.VITE_RESEND_API_KEY || "",
  supabaseUrl: (import.meta as any).env?.VITE_SUPABASE_URL || "",
  supabaseKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "",
  mapboxKey: (import.meta as any).env?.VITE_MAPBOX_TOKEN || "",
};

export function getApiConfig(): ApiConfigState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveApiConfig(config: Partial<ApiConfigState>): ApiConfigState {
  const current = getApiConfig();
  const updated = { ...current, ...config };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent("api-config-changed", { detail: updated }));
  return updated;
}

export function getEmailOutbox(): DispatchedEmail[] {
  try {
    const saved = localStorage.getItem(EMAIL_OUTBOX_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function recordDispatchedEmail(email: Omit<DispatchedEmail, "id" | "timestamp" | "status">): DispatchedEmail {
  const outbox = getEmailOutbox();
  const config = getApiConfig();
  const entry: DispatchedEmail = {
    ...email,
    id: `email_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    status: config.resendKey ? "delivered" : "simulated",
  };
  const updated = [entry, ...outbox].slice(0, 50);
  localStorage.setItem(EMAIL_OUTBOX_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent("email-outbox-updated", { detail: updated }));
  return entry;
}

export function clearEmailOutbox(): void {
  localStorage.setItem(EMAIL_OUTBOX_KEY, JSON.stringify([]));
  window.dispatchEvent(new CustomEvent("email-outbox-updated", { detail: [] }));
}

/**
 * Universal async delay simulator mimicking real API round-trips
 */
export async function simulateNetworkDelay(minMs = 350, maxMs = 800): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, delay));
}
