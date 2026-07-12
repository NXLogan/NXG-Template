import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, filterProducts, type Product } from "@/lib/catalog/products";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductModal } from "@/components/catalog/ProductModal";
import { ProductCategoryFilter, type FilterKey } from "@/components/catalog/ProductCategoryFilter";
import { ProductSearch } from "@/components/catalog/ProductSearch";
import { Footer } from "@/components/layout/Footer";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Artifacts — NAME®" },
      { name: "description", content: "The complete index of NAME artifacts." },
      { property: "og:title", content: "Artifacts — NAME®" },
      { property: "og:description", content: "The complete index of NAME artifacts." },
    ],
  }),
  component: Products,
});

function Products() {
  const [f, setF] = useState<FilterKey>("ALL");
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const scrollHoverLocked = useRef(false);
  const scrollHoverTimer = useRef<number | null>(null);
  const { t, ti } = useI18n();

  useEffect(() => {
    const lockHover = () => {
      scrollHoverLocked.current = true;
      setHovered(null);
      if (scrollHoverTimer.current !== null) window.clearTimeout(scrollHoverTimer.current);
      scrollHoverTimer.current = window.setTimeout(() => {
        scrollHoverLocked.current = false;
        scrollHoverTimer.current = null;
      }, 180);
    };

    window.addEventListener("scroll", lockHover, { passive: true });
    window.addEventListener("wheel", lockHover, { passive: true });
    return () => {
      window.removeEventListener("scroll", lockHover);
      window.removeEventListener("wheel", lockHover);
      if (scrollHoverTimer.current !== null) window.clearTimeout(scrollHoverTimer.current);
    };
  }, []);

  const list = useMemo(
    () => filterProducts(PRODUCTS, query, f),
    [query, f],
  );

  return (
    <main className="page-offset-top">
      <section className="page-gutter-x pb-10 md:pb-12">
        <h1 className="page-display-title">
          <span className="silver-text">{t.products.title1}</span><br/>
          <span className="text-foreground/40">{t.products.title2}</span>
        </h1>
        <p className="max-w-md text-foreground/60 mt-8">
          {ti(t.products.intro, { count: PRODUCTS.length.toString().padStart(3, "0") })}
        </p>
      </section>

      <section className="page-gutter-x pb-8 md:pb-10">
        <ProductSearch
          value={query}
          onChange={setQuery}
          resultCount={list.length}
          totalCount={PRODUCTS.length}
        />
      </section>

      <ProductCategoryFilter
        value={f}
        onChange={setF}
        filteredCount={list.length}
        totalCount={PRODUCTS.length}
      />

      <section className="relative page-gutter-x py-12 md:py-16">
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
              <div className="absolute inset-0 bg-background/75 backdrop-blur-2xl" />
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 0.12 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
                className="display outline-text text-[18vw] leading-none tracking-tighter select-none whitespace-nowrap"
              >
                {hovered}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {list.length === 0 ? (
          <p className="mono-label text-foreground/40 text-center py-24">{t.products.searchEmpty}</p>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${f}-${query}`}
              className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {list.map((p, i) => (
                <div
                  key={p.id}
                  onMouseEnter={() => {
                    if (!scrollHoverLocked.current) setHovered(p.title);
                  }}
                  onMouseLeave={() => setHovered((h) => (h === p.title ? null : h))}
                >
                  <ProductCard p={p} index={i} onOpen={setSelected} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
      <Footer />
    </main>
  );
}
