import { createServerFn } from "@tanstack/react-start";

type ContactPayload = {
  subject: string;
  message: string;
};

type ContactResult =
  | { ok: true }
  | { ok: false; error: "validation" | "not_configured" | "discord_failed" };

async function postToDiscordWebhook(payload: ContactPayload): Promise<ContactResult> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
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

export const submitContact = createServerFn({ method: "POST" })
  .validator((data: ContactPayload) => {
    const subject = data.subject?.trim() ?? "";
    const message = data.message?.trim() ?? "";
    if (!subject || !message) {
      throw new Error("validation");
    }
    return { subject, message };
  })
  .handler(async ({ data }): Promise<ContactResult> => {
    try {
      return await postToDiscordWebhook(data);
    } catch {
      return { ok: false, error: "discord_failed" };
    }
  });
