/**
 * Production Transactional Email Templates (Resend / SendGrid)
 * 
 * Beautiful responsive HTML email templates with inline styles
 * tested across Gmail, Apple Mail, Outlook, and mobile mail clients.
 */

export const RESEND_EMAIL_TEMPLATES = {
  orderConfirmation: (data: { customerName: string; chargeId: string; amountPaid: string; shippingAddress: string; items: string[] }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1C1917;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #EAE5DB; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 36px 40px; background-color: #1C1917; text-align: center;">
              <h1 style="margin: 0; font-family: Georgia, serif; font-style: italic; color: #FBF9F5; font-size: 26px; font-weight: 400; letter-spacing: -0.5px;">Atelier Kronos</h1>
              <p style="margin: 8px 0 0; color: #C5A880; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Order Dispatch Receipt</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600;">Thank you for your order, ${data.customerName}.</h2>
              <p style="margin: 0 0 24px; color: #57534E; font-size: 14px; line-height: 1.6;">
                Your items have entered preparation at our Paris studio. Your delivery is being handled via insured express courier.
              </p>
              
              <!-- Order Summary Box -->
              <table role="presentation" width="100%" style="background-color: #FBF9F5; border: 1px solid #EAE5DB; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <tr>
                  <td style="font-size: 12px; color: #78716C; padding-bottom: 8px;">Order Reference:</td>
                  <td align="right" style="font-size: 13px; font-weight: 600; font-family: monospace; color: #1C1917;">#${data.chargeId}</td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: #78716C; padding-bottom: 8px;">Destination:</td>
                  <td align="right" style="font-size: 12px; color: #1C1917;">${data.shippingAddress}</td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: #78716C; padding-top: 8px; border-top: 1px dashed #D6D3D1;">Total Authorized:</td>
                  <td align="right" style="font-size: 16px; font-weight: 700; color: #1C1917; padding-top: 8px; border-top: 1px dashed #D6D3D1;">${data.amountPaid}</td>
                </tr>
              </table>

              <!-- Line Items -->
              <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #78716C; margin: 0 0 12px;">Enclosed Items:</h3>
              <ul style="margin: 0 0 32px; padding-left: 20px; color: #292524; font-size: 13px; line-height: 1.8;">
                ${data.items.map((i) => `<li>${i}</li>`).join("")}
              </ul>

              <p style="margin: 0; font-size: 12px; color: #A8A29E; line-height: 1.5; text-align: center;">
                Questions regarding your dispatch? Reply directly to this email or visit our client portal.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,

  serverSnippet: `import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderReceipt(to: string, orderData: any) {
  const { data, error } = await resend.emails.send({
    from: 'Atelier Kronos <concierge@atelierkronos.com>',
    to: [to],
    subject: \`Order Dispatch Confirmed: #\${orderData.chargeId.slice(-6).toUpperCase()}\`,
    html: orderConfirmationHtml(orderData),
  });

  if (error) {
    console.error('Resend delivery failed:', error);
    throw error;
  }
  return data;
}`,
};
