import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — NØRMA®" },
      { name: "description", content: "Questions frequently asked of the artifact." },
      { property: "og:title", content: "FAQ — NØRMA®" },
      { property: "og:description", content: "Questions frequently asked of the artifact." },
    ],
  }),
  component: FAQ,
});

const ITEMS = [
  {
    q: "What exactly is an artifact?",
    a: "A digital object issued by NØRMA. Every artifact is a completed intention — a pack, a skin, or a tool released as a numbered edition. It is not a product because a product implies replacement. An artifact does not want to be replaced.",
  },
  {
    q: "How is my artifact delivered?",
    a: "Instantaneously. Upon confirmation of your order, your artifact is transmitted through your account and remains accessible for the duration of the current epoch. There is no packaging, no waiting, no ceremony beyond the one you invent for yourself.",
  },
  {
    q: "Do you accept returns?",
    a: "No. An artifact, once received, cannot be un-received. If it does not resonate with you, you have not made a mistake — you have participated in the culture. Consider the transaction a form of donation to your future understanding.",
  },
  {
    q: "Is there a warranty?",
    a: "Artifacts are supported for the lifetime of the platform they were released for. Beyond that, they remain in your possession as historical documents. We do not guarantee compatibility with a world that has moved on.",
  },
  {
    q: "How do I contact support?",
    a: "Support is available through the channels documented in /doc. We respond within 48 hours in language rather than macros.",
  },
  {
    q: "Why the strange language?",
    a: "Because ordinary language sold you the ordinary internet. If you would like a normal shop, there are many.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="pt-28">
      <section className="px-6 md:px-10 pb-16">
        <div className="mono-label text-white/50 mb-6">DOCUMENT / FAQ</div>
        <h1 className="display text-white text-7xl md:text-[10rem] leading-none">
          Questions,<br/><span className="text-white/40">and their limits.</span>
        </h1>
      </section>

      <section className="border-t border-white/10">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-white/10">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full px-6 md:px-10 py-8 md:py-10 flex items-start justify-between gap-6 text-left group"
              >
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="mono-label text-white/40 pt-3">{(i + 1).toString().padStart(2, "0")}</span>
                  <span className="display text-white text-3xl md:text-5xl leading-[1.05] group-hover:text-white/70 transition">
                    {item.q}
                  </span>
                </div>
                <span className="mono-label text-white/60 pt-4 shrink-0">
                  {isOpen ? "— CLOSE" : "+ OPEN"}
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
                    <div className="px-6 md:px-10 pb-10 md:pl-32 max-w-3xl text-white/70 text-lg leading-relaxed">
                      {item.a}
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
