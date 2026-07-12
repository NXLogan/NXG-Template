import { motion } from "framer-motion";
import type { Product } from "@/lib/catalog/products";
import { useCart } from "@/lib/cart/cart";
import { useI18n } from "@/lib/i18n/context";
import { ScratchNewBadge } from "@/components/brand/ScratchNewBadge";

export function ProductCard({
  p,
  index,
  onOpen,
}: {
  p: Product;
  index: number;
  onOpen?: (product: Product) => void;
}) {
  const { add } = useCart();
  const { t } = useI18n();

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.7, 0, 0.2, 1] }}
      className="group relative"
    >
      <button
        type="button"
        onClick={() => onOpen?.(p)}
        className="block w-full text-left"
        data-clickable
        aria-label={`${p.title} — ${t.productCard.viewDetails}`}
      >
        <div
          className="relative aspect-[3/4] w-full overflow-hidden border border-border transition-colors duration-500 group-hover:border-foreground/25 cursor-pointer"
          style={{ background: p.gradient }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: "linear-gradient(135deg, oklch(0.58 0.21 28 / 0.08), transparent 60%)" }}
          />

          {p.isNew && <ScratchNewBadge className="absolute top-11 right-2 z-10 rotate-6" />}

          <div className="absolute top-4 left-4 mono-label text-foreground/50">N° {p.number}</div>
          <div className="absolute top-4 right-4 mono-label text-foreground/50">{p.category}</div>

          <div className="absolute inset-0 flex items-center justify-center opacity-15 group-hover:opacity-30 transition duration-700 pointer-events-none product-card-bg-word">
            <span className="display outline-text text-[clamp(4rem,28vw,160px)] leading-none">
              {p.title.split(" ")[0]}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-end justify-between translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500 surface-glass pointer-events-none product-card-overlay">
            <div>
              <div className="mono-label text-foreground/50 mb-1">{t.productCard.price}</div>
              <div className="display silver-text text-3xl">€{p.price}</div>
            </div>
            <span className="mono-label text-foreground/70">{t.productCard.viewDetails}</span>
          </div>
        </div>
      </button>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <button
          type="button"
          onClick={() => onOpen?.(p)}
          className="text-left min-w-0 flex-1"
          data-clickable
        >
          <h3 className="display text-foreground text-xl sm:text-2xl group-hover:text-foreground/80 transition">{p.title}</h3>
          <p className="text-foreground/50 text-sm mt-1">{p.subtitle}</p>
        </button>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="mono-label text-foreground/50">€{p.price}</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              add(p);
            }}
            className="mono-label chrome-btn px-4 py-2.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-[10px] min-h-[var(--touch-min)]"
            data-clickable
          >
            {t.productCard.addToCart}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
