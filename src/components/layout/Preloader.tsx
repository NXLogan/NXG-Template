import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { useI18n } from "@/lib/i18n/context";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const { t, ti } = useI18n();

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 2200;
    const tick = (time: number) => {
      const p = Math.min(1, (time - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-foreground/5 blur-[100px]" />
          </div>

          <div className="mono-label absolute top-8 left-8 text-foreground/40">{ti(t.preloader.brand)}</div>
          <div className="mono-label absolute top-8 right-8 text-foreground/40">{t.preloader.initializing}</div>

          <Logo size={72} />

          <div className="mt-14 flex items-baseline gap-2">
            <span className="display silver-text text-[120px] md:text-[200px] tabular-nums">
              {pct.toString().padStart(3, "0")}
            </span>
            <span className="mono-label text-foreground/50">%</span>
          </div>

          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between mono-label text-foreground/40">
            <span>{t.preloader.loading}</span>
            <div className="flex-1 mx-8 h-px bg-foreground/10 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, oklch(0.58 0.21 28), oklch(0.94 0.028 88))",
                }}
              />
            </div>
            <span>{t.preloader.standBy}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
