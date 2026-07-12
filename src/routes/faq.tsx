import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — NAME®" },
      { name: "description", content: "Questions frequently asked of the artifact." },
      { property: "og:title", content: "FAQ — NAME®" },
      { property: "og:description", content: "Questions frequently asked of the artifact." },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { t, ti } = useI18n();

  return (
    <main className="page-offset-top">
      <section className="page-gutter-x pb-12 md:pb-16">
        <h1 className="page-display-title">
          <span className="silver-text">{t.faq.title1}</span><br/>
          <span className="text-foreground/40">{t.faq.title2}</span>
        </h1>
      </section>

      <section className="border-t border-border">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full page-gutter-x py-6 sm:py-8 md:py-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6 text-left group"
              >
                <div className="flex items-start gap-4 sm:gap-6 md:gap-10 min-w-0 flex-1">
                  <span className="mono-label text-foreground/30 pt-1 sm:pt-3 tabular-nums shrink-0">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="display text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.05] group-hover:text-foreground/70 transition text-balance">
                    {item.q}
                  </span>
                </div>
                <span className="mono-label text-foreground/40 sm:pt-4 shrink-0 self-start sm:self-auto">
                  {isOpen ? t.faq.close : t.faq.open}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="page-gutter-x pb-8 md:pb-10 md:pl-[clamp(3rem,12vw,8rem)] max-w-3xl text-foreground/70 text-base sm:text-lg leading-relaxed">
                      {ti(item.a)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>

      <Footer />
    </main>
  );
}
