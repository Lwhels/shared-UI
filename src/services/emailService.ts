import { getApiConfig, recordDispatchedEmail, simulateNetworkDelay } from "./apiConfig";

export interface SendEmailPayload {
  to: string;
  subject: string;
  template: "order_confirmation" | "booking_confirmation" | "table_reservation" | "contact_proposal" | "newsletter_welcome" | "lead_demo";
  data: Record<string, any>;
}

export async function sendEmail(payload: SendEmailPayload): Promise<{ success: boolean; messageId: string }> {
  const config = getApiConfig();
  await simulateNetworkDelay(400, 800);

  // If Resend API Key is set and not mock mode, could dispatch via fetch("https://api.resend.com/emails")
  const record = recordDispatchedEmail({
    to: payload.to,
    subject: payload.subject,
    template: payload.template,
    data: payload.data,
  });

  return {
    success: true,
    messageId: record.id,
  };
}
