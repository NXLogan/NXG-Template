import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCart, type CartItem } from "@/lib/cart/cart";
import { useI18n } from "@/lib/i18n/context";

const POOF_EASE = [0.32, 0, 0.67, 0] as const;

function CartLineItem({
  item,
  onRemove,
  removeLabel,
}: {
  item: CartItem;
  onRemove: () => void;
  removeLabel: string;
}) {
  const { product, quantity } = item;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit="exit"
      variants={{
        exit: {
          opacity: 0,
          scale: 0.55,
          y: -28,
          rotate: -3,
          filter: "blur(14px)",
          transition: { duration: 0.48, ease: POOF_EASE },
        },
      }}
      className="cart-line-item relative flex gap-4 border-b border-border pb-6 overflow-visible"
    >
      <motion.span
        className="cart-poof-ring pointer-events-none absolute left-1/2 top-1/2 z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[oklch(0.58_0.21_28/0.55)]"
        aria-hidden
        initial={{ opacity: 0, scale: 0.4 }}
        exit={{
          opacity: [0, 0.75, 0],
          scale: [0.4, 1.8, 2.6],
          transition: { duration: 0.48, ease: POOF_EASE, times: [0, 0.35, 1] },
        }}
      />
      <motion.span
        className="cart-poof-ring pointer-events-none absolute left-1/2 top-1/2 z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.58_0.21_28/0.2)]"
        aria-hidden
        initial={{ opacity: 0, scale: 0.3 }}
        exit={{
          opacity: [0, 0.5, 0],
          scale: [0.3, 2.2, 3],
          transition: { duration: 0.42, ease: POOF_EASE, delay: 0.04, times: [0, 0.3, 1] },
        }}
      />

      <div
        className="w-20 shrink-0 aspect-[3/4] border border-border"
        style={{ background: product.gradient }}
      />
      <div className="flex-1 min-w-0">
        <p className="mono-label text-foreground/40 mb-1">N° {product.number}</p>
        <h3 className="display text-foreground text-xl truncate">{product.title}</h3>
        <p className="text-foreground/50 text-sm mt-0.5 truncate">{product.subtitle}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="display silver-text text-2xl">€{product.price}</span>
          <div className="flex items-center gap-3">
            <span className="mono-label text-foreground/40">×{quantity}</span>
            <button
              onClick={onRemove}
              className="mono-label touch-target text-foreground/50 story-link"
              data-clickable
            >
              {removeLabel}
            </button>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, count, total, remove, clear } = useCart();
  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-background/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md surface-glass flex flex-col border-l border-border"
            style={{ paddingTop: "var(--safe-top)", paddingBottom: "var(--safe-bottom)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div>
                <p className="mono-label text-foreground/50 mb-1">{t.cart.label}</p>
                <h2 className="display silver-text text-3xl">
                  {count.toString().padStart(2, "0")} {count !== 1 ? t.cart.artifacts : t.cart.artifact}
                </h2>
              </div>
              <button onClick={onClose} className="mono-label touch-target text-foreground/50 hover:text-foreground" data-clickable>
                {t.cart.close}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <p className="display text-foreground/30 text-5xl leading-none">{t.cart.empty}</p>
                  <p className="text-foreground/50 text-sm max-w-xs">{t.cart.emptyText}</p>
                </div>
              ) : (
                <motion.ul layout className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <CartLineItem
                        key={item.product.id}
                        item={item}
                        onRemove={() => remove(item.product.id)}
                        removeLabel={t.cart.remove}
                      />
                    ))}
                  </AnimatePresence>
                </motion.ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-border space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="mono-label text-foreground/50">{t.cart.total}</span>
                  <span className="display silver-text text-4xl">€{total}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full mono-label chrome-btn py-3 text-center"
                  data-clickable
                >
                  {t.cart.checkout}
                </Link>
                <button
                  onClick={clear}
                  className="w-full mono-label text-foreground/50 story-link text-center"
                  data-clickable
                >
                  {t.cart.clear}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
