import "server-only";

// Sends a plain-text email through Resend's HTTP API when RESEND_API_KEY is
// set. Without it (local dev), the message is logged to the server console so
// forms can still be exercised end to end. Mail goes to the farm
// (ORDER_EMAIL_TO) unless `to` is given.

type Mail = { subject: string; text: string; replyTo?: string; to?: string };

export async function sendMail({ subject, text, replyTo, to }: Mail) {
  const apiKey = process.env.RESEND_API_KEY;
  const farm = process.env.ORDER_EMAIL_TO;
  const from = process.env.ORDER_EMAIL_FROM ?? "Brickhouse Farm Website <onboarding@resend.dev>";

  if (!apiKey || !farm) {
    console.info(`[mail:dev]${to ? ` to ${to}` : ""} ${subject}\n${text}`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: to ? [to] : farm.split(","), subject, text, reply_to: replyTo }),
  });
  if (!res.ok) {
    throw new Error(`Email send failed: ${res.status} ${await res.text()}`);
  }
}
