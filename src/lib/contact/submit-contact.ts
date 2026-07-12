import { DISCORD_URL } from "@/lib/config/social";

type ContactPayload = {
  subject: string;
  message: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; error: "validation" | "not_configured" | "discord_failed" };

function formatTransmission(payload: ContactPayload): string {
  return `NAME — Transmission\nSubject: ${payload.subject}\n\n${payload.message}`;
}

async function copyTransmission(payload: ContactPayload): Promise<void> {
  try {
    await navigator.clipboard.writeText(formatTransmission(payload));
  } catch {
    // Clipboard may be blocked; Discord fallback still works.
  }
}

async function postToDiscordWebhook(payload: ContactPayload): Promise<ContactResult> {
  const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: false, error: "not_configured" };
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: payload.subject.slice(0, 256),
          description: payload.message.slice(0, 4000),
          color: 0x8b2635,
          footer: { text: "NAME — Contact form" },
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!res.ok) {
    return { ok: false, error: "discord_failed" };
  }

  return { ok: true };
}

/** Client-side contact submission (GitHub Pages / static hosting). */
export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  const subject = payload.subject?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  if (!subject || !message) {
    return { ok: false, error: "validation" };
  }

  const data = { subject, message };

  try {
    const webhookResult = await postToDiscordWebhook(data);
    if (webhookResult.ok) {
      return webhookResult;
    }
  } catch {
    // Webhook blocked (CORS) or unreachable — fall back to Discord channel.
  }

  await copyTransmission(data);
  window.open(DISCORD_URL, "_blank", "noopener,noreferrer");
  return { ok: true };
}
