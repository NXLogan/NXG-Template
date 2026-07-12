import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Footer } from "@/components/layout/Footer";
import { InkLine, InkLineLight } from "@/components/layout/NavInk";
import { useCart } from "@/lib/cart/cart";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — NAME®" },
      { name: "description", content: "Complete your NAME artifact acquisition." },
      { property: "og:title", content: "Checkout — NAME®" },
      { property: "og:description", content: "Complete your NAME artifact acquisition." },
    ],
  }),
  component: Checkout,
});

type CheckoutStatus = "idle" | "submitting" | "success";

function Checkout() {
  const { items, total, clear } = useCart();
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<CheckoutStatus>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || status === "submitting" || items.length === 0) return;

    setStatus("submitting");
    await new Promise((resolve) => window.setTimeout(resolve, 1400));
    setStatus("success");
    clear();
  }

  if (items.length === 0 && status !== "success") {
    return (
      <main className="page-offset-top min-h-screen">
        <section className="page-gutter-x pb-16 md:pb-24 flex flex-col items-center text-center min-h-[60vh] justify-center">
          <p className="display silver-text text-6xl md:text-8xl leading-none">{t.checkout.emptyTitle}</p>
          <p className="max-w-md text-foreground/55 mt-6 text-sm md:text-base">{t.checkout.emptyText}</p>
          <Link to="/products" className="mono-label chrome-btn px-6 py-3 mt-10 inline-block">
            {t.checkout.emptyLink}
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  if (status === "success") {
    return (
      <main className="page-offset-top min-h-screen">
        <section className="page-gutter-x pb-16 md:pb-24 flex flex-col items-center text-center min-h-[65vh] justify-center">
          <motion.span
            className="checkout-seal mb-8"
            initial={{ scale: 0.2, rotate: -24, opacity: 0 }}
            animate={{ scale: 1, rotate: -8, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            {t.checkout.seal}
          </motion.span>
          <motion.h1
            className="display silver-text text-4xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t.checkout.successTitle}
          </motion.h1>
          <motion.p
            className="max-w-lg text-foreground/60 mt-5 text-sm md:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            {t.checkout.successText}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 mt-10 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link to="/products" className="mono-label chrome-btn px-6 py-3 inline-block">
              {t.checkout.continueShopping}
            </Link>
            <Link to="/" className="mono-label border border-foreground/25 text-foreground/70 px-6 py-3 hover:border-foreground/50 transition inline-block">
              {t.notFound.return}
            </Link>
          </motion.div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="page-offset-top min-h-screen">
      <section className="page-gutter-x pb-10 md:pb-12">
        <p className="mono-label text-foreground/45 mb-4">{t.checkout.stepLabel}</p>
        <h1 className="page-display-title">
          <span className="silver-text">{t.checkout.title1}</span>
          <br />
          <span className="text-foreground/40">{t.checkout.title2}</span>
        </h1>
        <p className="max-w-lg text-foreground/60 mt-6 md:mt-8">{t.checkout.intro}</p>
      </section>

      <section className="page-gutter-x pb-16 md:pb-24">
        <div className="checkout-grid">
          <motion.aside
            className="checkout-summary"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mono-label text-foreground/45 mb-5">{t.checkout.summaryLabel}</p>
            <InkLine className="mb-6" />

            <ul className="space-y-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="checkout-summary-row">
                  <div
                    className="checkout-summary-thumb border border-border shrink-0"
                    style={{ background: product.gradient }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="mono-label text-foreground/40 text-[10px]">N° {product.number}</p>
                    <h3 className="display text-lg truncate">{product.title}</h3>
                    <p className="text-foreground/50 text-xs truncate mt-0.5">{product.subtitle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="mono-label text-foreground/40 text-[10px]">{t.checkout.qty} ×{quantity}</p>
                    <p className="display silver-text text-xl">€{product.price * quantity}</p>
                  </div>
                </li>
              ))}
            </ul>

            <InkLineLight className="my-6" />

            <div className="flex items-baseline justify-between">
              <span className="mono-label text-foreground/50">{t.checkout.total}</span>
              <span className="display silver-text text-4xl md:text-5xl">€{total}</span>
            </div>
          </motion.aside>

          <motion.article
            className="contact-sheet checkout-sheet"
            initial={{ opacity: 0, y: 32, rotate: 0.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            <svg className="contact-sheet-tear-top" viewBox="0 0 800 20" preserveAspectRatio="none" aria-hidden>
              <path
                d="M0,14 C90,4 180,18 270,8 S450,2 540,14 S680,20 800,6 L800,0 L0,0 Z"
                fill="oklch(0.11 0.028 58 / 0.95)"
              />
            </svg>

            <div className="contact-sheet-body">
              <div className="contact-sheet-header">
                <p className="mono-label text-foreground/40">{t.checkout.stepLabel}</p>
                <span className="contact-sheet-seal" aria-hidden>
                  {t.checkout.seal}
                </span>
              </div>

              <InkLine className="my-6" />

              <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                <div className="contact-sheet-field">
                  <label className="contact-sheet-field-label" htmlFor="checkout-name">
                    {t.checkout.nameLabel}
                  </label>
                  <div className="contact-sheet-field-line">
                    <input
                      id="checkout-name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.checkout.namePlaceholder}
                      className="contact-sheet-input"
                      required
                      maxLength={128}
                      disabled={status === "submitting"}
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className="contact-sheet-field">
                  <label className="contact-sheet-field-label" htmlFor="checkout-email">
                    {t.checkout.emailLabel}
                  </label>
                  <div className="contact-sheet-field-line">
                    <input
                      id="checkout-email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.checkout.emailPlaceholder}
                      className="contact-sheet-input"
                      required
                      maxLength={256}
                      disabled={status === "submitting"}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="contact-sheet-field">
                  <label className="contact-sheet-field-label" htmlFor="checkout-note">
                    {t.checkout.noteLabel}
                  </label>
                  <div className="contact-sheet-field-area">
                    <textarea
                      id="checkout-note"
                      name="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={t.checkout.notePlaceholder}
                      className="contact-sheet-textarea"
                      rows={4}
                      maxLength={512}
                      disabled={status === "submitting"}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 mono-label chrome-btn py-3 disabled:opacity-50"
                    disabled={status === "submitting"}
                    data-clickable
                  >
                    {status === "submitting" ? t.checkout.submitting : t.checkout.submit}
                  </button>
                  <Link
                    to="/products"
                    className="mono-label text-foreground/50 story-link text-center py-3 px-4"
                  >
                    {t.checkout.backToCart}
                  </Link>
                </div>
              </form>
            </div>

            <svg className="contact-sheet-tear-bottom" viewBox="0 0 800 20" preserveAspectRatio="none" aria-hidden>
              <path
                d="M0,6 C100,20 200,2 300,14 S500,22 600,8 S720,18 800,4 L800,24 L0,24 Z"
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
