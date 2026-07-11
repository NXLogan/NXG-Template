import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";

const LINKS = [
  { to: "/", label: "HOME" },
  { to: "/products", label: "PRODUCTS" },
  { to: "/faq", label: "FAQ" },
  { to: "/doc", label: "DOC" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const prevCount = useRef(count);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (count > prevCount.current) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 600);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          <Link to="/" className="flex items-center gap-3">
            <Logo size={32} />
            <span className="display text-white text-lg tracking-tight hidden sm:inline">
              NØRMA<span className="align-super text-[9px] ml-0.5">®</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="mono-label text-white slash-link"
                activeProps={{ className: "mono-label text-white slash-link opacity-60" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="mono-label text-white flex items-center gap-1">
              CART <span className={`tabular-nums inline-block ${pulse ? "cart-pulse" : ""}`}>[{count.toString().padStart(2, "0")}]</span>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden mono-label text-white"
              aria-label="Menu"
            >
              MENU
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black flex flex-col"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Logo size={32} />
              <button onClick={() => setOpen(false)} className="mono-label text-white">
                CLOSE
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-6 gap-6">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="display text-white text-6xl block slash-link"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="px-6 py-6 mono-label text-white/40 flex justify-between">
              <span>NØRMA® MMXXVI</span>
              <span>NOT FOR EVERYONE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
