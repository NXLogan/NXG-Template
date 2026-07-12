import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { BrushUnderline, HankoDot, InkLine, InkLineLight } from "./NavInk";
import { useCart } from "@/lib/cart/cart";
import { useI18n } from "@/lib/i18n/context";
import { getOverlayLocked, subscribeOverlayLock } from "@/lib/ui/overlay-lock";

const SCROLL_DOWN_THRESHOLD = 6;
const SCROLL_IDLE_MS = 160;
const SCROLL_TOP_MIN = 72;
const NAV_EXIT_MS = 450;
const CART_EXIT_MS = 520;

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartNavExit, setCartNavExit] = useState(false);
  const cartTimer = useRef<number | null>(null);
  const { count } = useCart();
  const { t, brand } = useI18n();
  const prevCount = useRef(count);
  const [pulse, setPulse] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overlayLocked = useSyncExternalStore(subscribeOverlayLock, getOverlayLocked, () => false);
  const lastScrollY = useRef(0);
  const idleTimer = useRef<number | null>(null);
  const LINKS = [
    { to: "/", label: t.nav.home },
    { to: "/products", label: t.nav.products },
    { to: "/faq", label: t.nav.faq },
    { to: "/doc", label: t.nav.doc },
  ] as const;

  useEffect(() => {
    if (count > prevCount.current) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 600);
      prevCount.current = count;
      return () => clearTimeout(timer);
    }
    prevCount.current = count;
  }, [count]);

  useEffect(() => {
    return () => {
      if (cartTimer.current !== null) window.clearTimeout(cartTimer.current);
    };
  }, []);

  const openCart = () => {
    if (cartNavExit || cartDrawerOpen) return;
    if (cartTimer.current !== null) window.clearTimeout(cartTimer.current);
    setCartNavExit(true);
    setNavHidden(true);
    cartTimer.current = window.setTimeout(() => {
      setCartDrawerOpen(true);
      setCartNavExit(false);
      cartTimer.current = null;
    }, NAV_EXIT_MS);
  };

  const closeCart = () => {
    if (!cartDrawerOpen) return;
    if (cartTimer.current !== null) window.clearTimeout(cartTimer.current);
    setCartDrawerOpen(false);
    cartTimer.current = window.setTimeout(() => {
      setNavHidden(false);
      cartTimer.current = null;
    }, CART_EXIT_MS);
  };

  const cartActive = cartNavExit || cartDrawerOpen;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen || overlayLocked) {
      setNavHidden(false);
    }
  }, [menuOpen, overlayLocked]);

  useEffect(() => {
    const onScroll = () => {
      if (menuOpen || overlayLocked || cartActive) return;

      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      if (delta > SCROLL_DOWN_THRESHOLD && y > SCROLL_TOP_MIN) {
        setNavHidden(true);
      } else if (delta < -SCROLL_DOWN_THRESHOLD) {
        setNavHidden(false);
      }

      lastScrollY.current = y;

      if (idleTimer.current !== null) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        setNavHidden(false);
      }, SCROLL_IDLE_MS);
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current !== null) window.clearTimeout(idleTimer.current);
    };
  }, [menuOpen, overlayLocked, cartActive]);

  const showNav = (!navHidden || menuOpen || overlayLocked) && !cartActive;
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[110] pointer-events-none"
        style={{ paddingTop: "var(--safe-top)" }}
        initial={false}
        animate={{ y: showNav ? 0 : "-100%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >        <div className="nav-zen pointer-events-auto">
          <div className="mx-[var(--page-gutter)] pt-4 md:pt-5 pb-3 md:pb-4">
            <div className="flex items-center justify-between gap-6">
              {/* brand — airy, minimal */}
              <Link to="/" className="flex items-center gap-3 group shrink-0">
                <div className="relative">
                  <Logo size={28} />
                  <HankoDot className="absolute -top-0.5 -right-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <span className="nav-brand-text inline transition-opacity duration-500 group-hover:opacity-60 max-w-[5rem] sm:max-w-none truncate sm:overflow-visible">
                  {brand}
                </span>
              </Link>

              {/* desktop links — floating ink strokes */}
              <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                {LINKS.map((l) => {
                  const active = isActive(l.to);
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`group ink-link ${active ? "ink-link-active" : ""}`}
                    >
                      {l.label}
                      <BrushUnderline active={active} />
                    </Link>
                  );
                })}
              </nav>

              {/* cart + mobile */}
              <div className="flex items-center gap-5 shrink-0">
                <button
                  onClick={openCart}
                  className="nav-cart-zen touch-target"
                  aria-label="Open cart"
                >
                  <span className="hidden sm:inline">{t.nav.cart}</span>
                  <span
                    className={`nav-cart-stamp tabular-nums ${pulse ? "cart-pulse" : ""}`}
                    style={count > 0 ? { borderColor: "oklch(0.58 0.21 28 / 0.7)", background: "oklch(0.58 0.21 28 / 0.08)" } : undefined}
                  >
                    {count.toString().padStart(2, "0")}
                  </span>
                </button>

                <button
                  onClick={() => setMenuOpen(true)}
                  className="nav-menu-ink md:hidden"
                  aria-label="Menu"
                >
                  <svg width="22" height="12" viewBox="0 0 22 12" className="text-foreground/60" aria-hidden>
                    <path d="M0,1 Q7,0 11,1.5 T22,1" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M1,6 Q9,7 14,5.5 T21,6" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M0,11 Q8,10 12,11 T22,10.5" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* hand-drawn ink lines */}
            <div className="mt-5 md:mt-6 space-y-2">
              <InkLine />
              <InkLineLight />
            </div>
          </div>
        </div>
      </motion.header>
      <CartDrawer open={cartDrawerOpen} onClose={closeCart} />

      {/* mobile menu — zen paper, ma space */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[120] bg-background/98 backdrop-blur-sm flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="nav-vertical-ma hidden sm:block absolute right-8 top-1/2 -translate-y-1/2">
              navigation
            </span>

            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between page-gutter-x pt-6 md:pt-8 pb-5 md:pb-6">
                <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
                  <Logo size={28} />
                  <span className="nav-brand-text">{brand}</span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="ink-link touch-target opacity-50 hover:opacity-100"
                >
                  {t.nav.close}
                </button>
              </div>

              <InkLine className="page-gutter-x" />

              <nav className="flex-1 flex flex-col justify-center page-gutter-x py-8 md:py-12 gap-1 md:gap-2">
                {LINKS.map((l, i) => {
                  const active = isActive(l.to);
                  return (
                    <motion.div
                      key={l.to}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={l.to}
                        onClick={() => setMenuOpen(false)}
                        className={`group relative block py-5 md:py-6 ${active ? "ink-link-active" : ""}`}
                      >
                        <span className="font-sans font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.08em] text-foreground/90 transition-all duration-500 group-hover:tracking-[0.14em] group-hover:text-foreground">
                          {l.label}
                        </span>
                        <BrushUnderline active={active} wide />
                      </Link>
                      {i < LINKS.length - 1 && (
                        <div className="opacity-40">
                          <InkLineLight />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              <div className="page-gutter-x pb-[max(2.5rem,var(--safe-bottom))]">
                <InkLine />
                <p className="mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/30">
                  {brand} — {t.nav.notForEveryone}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
