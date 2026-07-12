import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Footer } from "@/components/layout/Footer";
import { InkLine, InkLineLight } from "@/components/layout/NavInk";
import { useI18n } from "@/lib/i18n/context";
import { submitContact } from "@/lib/contact/submit-contact";
import { DISCORD_URL } from "@/lib/config/social";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NAME®" },
      { name: "description", content: "Open a transmission to NAME." },
      { property: "og:title", content: "Contact — NAME®" },
      { property: "og:description", content: "Open a transmission to NAME." },
    ],
  }),
  component: Contact,
});

type FormStatus = "idle" | "sending" | "success" | "error" | "not_configured";

function ContactSuccess({ onReset }: { onReset: () => void }) {
  const { t } = useI18n();

  return (
    <motion.div
      key="success"
      className="contact-sent"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
    >
      <motion.span
        className="contact-sent-seal"
        initial={{ scale: 0.15, rotate: -28, opacity: 0 }}
        animate={{ scale: 1, rotate: -10, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        aria-hidden
      >
        {t.contact.sentSeal}
      </motion.span>

      <motion.h2
        className="contact-sent-title silver-text"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.5 }}
      >
        {t.contact.sentSuccessTitle}
      </motion.h2>

      <motion.p
        className="contact-sent-detail"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.5 }}
      >
        {t.contact.sentSuccessDetail}
      </motion.p>

      <motion.div
        className="contact-sent-line shimmer-line"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.42, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />

      <motion.div
        className="contact-sent-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.45 }}
      >
        <button type="button" onClick={onReset} className="mono-label chrome-btn px-6 py-3" data-clickable>
          {t.contact.sentAnother}
        </button>
        <Link to="/faq" className="mono-label story-link px-4 py-3">
          {t.contact.faqLink}
        </Link>
      </motion.div>
    </motion.div>
  );
}

function Contact() {
  const { t, ti } = useI18n();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !message.trim() || status === "sending") return;

    setStatus("sending");

    try {
      const result = await submitContact({ data: { subject, message } });
      if (result.ok) {
        setStatus("success");
        setSubject("");
        setMessage("");
        return;
      }
      setStatus(result.error === "not_configured" ? "not_configured" : "error");
    } catch {
      setStatus("error");
    }
  }

  const errorMessage =
    status === "not_configured" ? t.contact.sentNotConfigured : status === "error" ? t.contact.sentError : null;

  return (
    <main className="page-offset-top min-h-screen">
      <section className="page-gutter-x pb-10 md:pb-12 lg:pb-20">
        <h1 className="page-display-title">
          <span className="silver-text">{t.contact.title1}</span>
          <br />
          <span className="text-foreground/40">{t.contact.title2}</span>
        </h1>
        <p className="max-w-lg text-foreground/60 mt-6 md:mt-8 text-base sm:text-lg">{t.contact.intro}</p>
      </section>

      <section className="page-gutter-x pb-16 md:pb-24">
        <div className="contact-sheet-grid">
          <div className="contact-sheet-aside hidden md:flex">
            <p className="contact-sheet-vertical">{t.contact.vertical}</p>
            <InkLine className="contact-sheet-vertical-line" />
          </div>

          <motion.article
            className="contact-sheet"
            initial={{ opacity: 0, y: 40, rotate: -0.6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg className="contact-sheet-tear-top" viewBox="0 0 800 20" preserveAspectRatio="none" aria-hidden>
              <path
                d="M0,14 C90,4 180,18 270,8 S450,2 540,14 S680,20 800,6 L800,0 L0,0 Z"
                fill="oklch(0.11 0.028 58 / 0.95)"
              />
            </svg>

            <div className="contact-sheet-body">
              <div className="contact-sheet-header">
                <p className="mono-label text-foreground/40">{t.contact.letterLabel}</p>
                <span className="contact-sheet-seal" aria-hidden>
                  {status === "success" ? t.contact.sentSeal : t.contact.seal}
                </span>
              </div>

              <InkLine className="my-6" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <ContactSuccess
                    key="contact-success"
                    onReset={() => setStatus("idle")}
                  />
                ) : (
                  <motion.form
                    key="contact-form"
                    className="space-y-10"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="contact-sheet-field">
                      <label className="contact-sheet-field-label" htmlFor="contact-subject">
                        {t.contact.subjectLabel}
                      </label>
                      <div className="contact-sheet-field-line">
                        <input
                          id="contact-subject"
                          type="text"
                          name="subject"
                          value={subject}
                          onChange={(e) => {
                            setSubject(e.target.value);
                            if (status !== "idle" && status !== "sending") setStatus("idle");
                          }}
                          placeholder={t.contact.subjectPlaceholder}
                          className="contact-sheet-input"
                          required
                          maxLength={256}
                          disabled={status === "sending"}
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    <div className="contact-sheet-field">
                      <label className="contact-sheet-field-label" htmlFor="contact-message">
                        {t.contact.messageLabel}
                      </label>
                      <div className="contact-sheet-field-area">
                        <textarea
                          id="contact-message"
                          name="message"
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                            if (status !== "idle" && status !== "sending") setStatus("idle");
                          }}
                          placeholder={t.contact.messagePlaceholder}
                          className="contact-sheet-textarea"
                          required
                          maxLength={4000}
                          disabled={status === "sending"}
                          rows={5}
                        />
                      </div>
                    </div>

                    {errorMessage && (
                      <motion.div
                        className="contact-sent-error"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        role="alert"
                      >
                        <p className="contact-sent-error-text">{errorMessage}</p>
                      </motion.div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <button
                        type="submit"
                        className="mono-label chrome-btn px-6 py-3 disabled:opacity-40 disabled:pointer-events-none"
                        disabled={status === "sending" || !subject.trim() || !message.trim()}
                        data-clickable
                      >
                        {status === "sending" ? t.contact.sending : t.contact.sendCta}
                      </button>
                    </div>

                    <div>
                      <p className="mono-label text-foreground/40 mb-3">{t.contact.channelLabel}</p>
                      <p className="text-foreground/75 text-lg leading-relaxed max-w-md">{t.contact.channelText}</p>
                      <a
                        href={DISCORD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-6 mono-label story-link"
                        data-clickable
                      >
                        {t.contact.channelCta}
                      </a>
                    </div>

                    <div className="contact-sheet-response">
                      <p className="mono-label text-foreground/40 mb-2">{t.contact.responseLabel}</p>
                      <p className="display text-foreground text-3xl md:text-4xl leading-tight">{t.contact.responseText}</p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              <InkLineLight className="mt-10 mb-6" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="mono-label text-foreground/35">{ti(t.contact.footerNote)}</p>
                {status !== "success" && (
                  <Link to="/faq" className="mono-label story-link w-fit">
                    {t.contact.faqLink}
                  </Link>
                )}
              </div>
            </div>

            <svg className="contact-sheet-tear-bottom" viewBox="0 0 800 20" preserveAspectRatio="none" aria-hidden>
              <path
                d="M0,6 C100,18 200,2 300,12 S500,18 620,8 S720,4 800,14 L800,20 L0,20 Z"
                fill="oklch(0.09 0.022 52 / 0.95)"
              />
            </svg>
          </motion.article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
