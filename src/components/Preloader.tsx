import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 2200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
        >
          <div className="absolute top-8 left-8 mono-label text-white/60">NØRMA®</div>
          <div className="absolute top-8 right-8 mono-label text-white/60">INITIALIZING</div>

          <Logo size={72} />

          <div className="mt-14 flex items-baseline gap-2">
            <span className="display text-white text-[120px] md:text-[200px] tabular-nums">
              {pct.toString().padStart(3, "0")}
            </span>
            <span className="mono-label text-white/50">%</span>
          </div>

          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between mono-label text-white/40">
            <span>LOADING ARTIFACTS</span>
            <div className="flex-1 mx-8 h-px bg-white/10 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${pct}%` }} />
            </div>
            <span>PLEASE STAND BY</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
