import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Artifacts — NØRMA®" },
      { name: "description", content: "The complete index of NØRMA artifacts. Digital objects released to a deliberately incomplete audience." },
      { property: "og:title", content: "Artifacts — NØRMA®" },
      { property: "og:description", content: "The complete index of NØRMA artifacts." },
    ],
  }),
  component: Products,
});

const FILTERS = ["ALL", "PACKS", "SKINS", "TOOLS"] as const;
type Filter = (typeof FILTERS)[number];

function Products() {
  const [f, setF] = useState<Filter>("ALL");
  const [hovered, setHovered] = useState<string | null>(null);
  const list = f === "ALL" ? PRODUCTS : PRODUCTS.filter((p) => p.category === (f as Category));

  return (
    <main className="pt-28">
      <section className="px-6 md:px-10 pb-12">
        <div className="mono-label text-white/50 mb-6">INDEX / ARTIFACTS</div>
        <h1 className="display text-white text-7xl md:text-[12rem] leading-none">
          Museum<br/><span className="text-white/40">of objects.</span>
        </h1>
        <p className="max-w-md text-white/60 mt-8">
          {PRODUCTS.length.toString().padStart(3, "0")} artifacts currently in circulation.
          Each is numbered, catalogued, and released without apology.
        </p>
      </section>

      <div className="px-6 md:px-10 border-y border-white/10 py-4 flex flex-wrap items-center gap-2 sticky top-0 z-30 bg-black/80 backdrop-blur">
        <div className="mono-label text-white/50 mr-4">FILTER</div>
        {FILTERS.map((t) => (
          <button
            key={t}
            onClick={() => setF(t)}
            className={`mono-label px-3 py-1.5 border transition ${
              f === t
                ? "bg-white text-black border-white"
                : "border-white/20 text-white hover:border-white"
            }`}
          >
            {t}
          </button>
        ))}
        <div className="mono-label text-white/50 ml-auto">
          {list.length.toString().padStart(2, "0")} / {PRODUCTS.length.toString().padStart(2, "0")}
        </div>
      </div>

      <section className="relative px-6 md:px-10 py-16">
        {/* Dramatic full-width hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered}
              className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" />
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 0.15 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
                className="display text-white text-[18vw] leading-none tracking-tighter select-none whitespace-nowrap"
              >
                {hovered}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={f}
            className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {list.map((p, i) => (
              <div
                key={p.id}
                onMouseEnter={() => setHovered(p.title)}
                onMouseLeave={() => setHovered((h) => (h === p.title ? null : h))}
              >
                <ProductCard p={p} index={i} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}
