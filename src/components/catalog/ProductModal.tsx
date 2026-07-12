import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Product } from "@/lib/catalog/products";
import { useCart } from "@/lib/cart/cart";
import { useI18n } from "@/lib/i18n/context";
import { lockOverlay } from "@/lib/ui/overlay-lock";

export function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { add } = useCart();
  const { t } = useI18n();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (product) setImageIndex(0);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    return lockOverlay();
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setImageIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setImageIndex((i) => Math.min(product.images.length - 1, i + 1));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="fixed inset-0 z-[130] bg-background/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="product-modal fixed z-[135] inset-x-3 sm:inset-x-4 top-[calc(5rem+var(--safe-top))] bottom-[max(3vh,var(--safe-bottom))] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[min(92vw,72rem)] md:max-h-[calc(100vh-6.5rem-var(--safe-top))] flex flex-col md:flex-row overflow-hidden border border-border surface-glass"
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-lang-skip
          >
            <button
              type="button"
              onClick={onClose}
              className="product-modal-close"
              aria-label={t.productModal.close}
              data-clickable
            >
              <span aria-hidden>×</span>
            </button>

            <div className="relative md:w-[55%] shrink-0 border-b md:border-b-0 md:border-r border-border">
              <div className="relative aspect-[3/4] max-h-[42vh] sm:max-h-[48vh] sm:aspect-[4/5] md:aspect-auto md:max-h-none md:min-h-[28rem] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${product.id}-${imageIndex}`}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: product.images[imageIndex] }}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="display outline-text text-[28vw] md:text-[12rem] leading-none opacity-20 select-none pointer-events-none">
                      {product.title.split(" ")[0]}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {product.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setImageIndex((i) => Math.max(0, i - 1))}
                      disabled={imageIndex === 0}
                      className="product-modal-nav product-modal-nav-prev"
                      aria-label="Previous image"
                      data-clickable
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageIndex((i) => Math.min(product.images.length - 1, i + 1))}
                      disabled={imageIndex === product.images.length - 1}
                      className="product-modal-nav product-modal-nav-next"
                      aria-label="Next image"
                      data-clickable
                    >
                      →
                    </button>

                    <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2 px-4">
                      {product.images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setImageIndex(i)}
                          className={`product-modal-dot ${i === imageIndex ? "product-modal-dot-active" : ""}`}
                          aria-label={`${t.productModal.image} ${i + 1}`}
                          aria-current={i === imageIndex}
                          data-clickable
                        />
                      ))}
                    </div>
                  </>
                )}

                <p className="absolute top-4 left-4 z-10 mono-label text-foreground/50">
                  {imageIndex + 1} / {product.images.length}
                </p>
              </div>
            </div>

            <div className="flex flex-col flex-1 min-h-0 md:min-w-0">
              <div className="px-6 md:px-8 pt-6 pb-4 border-b border-border pr-16">
                <p className="mono-label text-foreground/40 mb-2">
                  N° {product.number} · {product.category}
                </p>
                <h2 id="product-modal-title" className="display silver-text text-3xl sm:text-4xl md:text-5xl leading-none">
                  {product.title}
                </h2>
                <p className="text-foreground/60 mt-2">{product.subtitle}</p>
              </div>

              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <p className="mono-label text-foreground/40 mb-3">{t.productModal.description}</p>
                <p className="text-foreground/75 text-lg leading-relaxed">{product.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageIndex(i)}
                      className={`product-modal-thumb aspect-[4/3] border transition ${
                        i === imageIndex ? "border-foreground/50" : "border-border opacity-70 hover:opacity-100"
                      }`}
                      style={{ background: img }}
                      aria-label={`${t.productModal.image} ${i + 1}`}
                      data-clickable
                    />
                  ))}
                </div>
              </div>

              <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="shrink-0">
                  <p className="mono-label text-foreground/40 mb-1">{t.productModal.price}</p>
                  <p className="display silver-text text-3xl sm:text-4xl">€{product.price}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    add(product);
                    onClose();
                  }}
                  className="mono-label chrome-btn px-6 py-3 w-full sm:w-auto min-h-[var(--touch-min)]"
                  data-clickable
                >
                  {t.productModal.addToCart}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
