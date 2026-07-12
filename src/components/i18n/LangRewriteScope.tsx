import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n/context";
import { applyRewriteStagger, clearRewriteStagger } from "@/lib/i18n/rewrite-stagger";

const STAGGER_MS = 22;
const ERASE_BASE_MS = 480;
const WRITE_BASE_MS = 420;

function computePhaseDuration(nodeCount: number, baseMs: number) {
  return baseMs + nodeCount * STAGGER_MS;
}

function BrushOverlay({ mode }: { mode: "erase" | "write" }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[240]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      aria-hidden
    >
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
      >
        <motion.path
          d={
            mode === "erase"
              ? "M820,280 C640,320 520,240 360,300 S140,360 -40,260"
              : "M-40,340 C160,300 320,380 500,320 S680,260 860,340"
          }
          fill="none"
          stroke="oklch(0.94 0.028 88 / 0.35)"
          strokeWidth={mode === "erase" ? 36 : 44}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.85, 0.2] }}
          transition={{ duration: mode === "erase" ? 0.55 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M-20,420 C200,380 340,460 520,400 S700,340 840,420"
          fill="none"
          stroke="oklch(0.58 0.21 28 / 0.28)"
          strokeWidth="14"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>

      {mode === "erase" && (
        <svg
          className="absolute inset-0 h-full w-full text-foreground/10"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 20 }, (_, i) => {
            const angle = (i / 20) * 360;
            const rad = (angle * Math.PI) / 180;
            return (
              <motion.line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 52 * Math.cos(rad)}
                y2={50 + 52 * Math.sin(rad)}
                stroke="currentColor"
                strokeWidth="0.1"
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: [0, 0.7, 0.15], pathLength: 1 }}
                transition={{ duration: 0.3, delay: i * 0.01 }}
              />
            );
          })}
        </svg>
      )}
    </motion.div>
  );
}

export function LangRewriteScope({ children }: { children: ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const nodeCountRef = useRef(0);
  const {
    localeTransition,
    rewritePhase,
    finishLocaleTransition,
    endLocaleTransition,
    setRewritePhase,
  } = useI18n();

  useLayoutEffect(() => {
    if (rewritePhase === "idle") {
      clearRewriteStagger(scopeRef.current);
      return;
    }
    requestAnimationFrame(() => {
      nodeCountRef.current = applyRewriteStagger(scopeRef.current);
    });
  }, [rewritePhase, localeTransition]);

  useEffect(() => {
    if (!localeTransition || rewritePhase !== "erase") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      finishLocaleTransition(localeTransition);
      endLocaleTransition();
      return;
    }

    document.body.style.overflow = "hidden";
    nodeCountRef.current = applyRewriteStagger(scopeRef.current);
    const eraseDuration = computePhaseDuration(nodeCountRef.current, ERASE_BASE_MS);

    const swapTimer = window.setTimeout(() => {
      finishLocaleTransition(localeTransition);
      setRewritePhase("write");
    }, eraseDuration);

    return () => {
      window.clearTimeout(swapTimer);
    };
  }, [
    localeTransition,
    rewritePhase,
    finishLocaleTransition,
    setRewritePhase,
    endLocaleTransition,
  ]);

  useEffect(() => {
    if (rewritePhase !== "write" || !localeTransition) return;

    nodeCountRef.current = applyRewriteStagger(scopeRef.current);
    const writeDuration = computePhaseDuration(nodeCountRef.current, WRITE_BASE_MS);

    const endTimer = window.setTimeout(() => {
      endLocaleTransition();
      document.body.style.overflow = "";
    }, writeDuration);

    return () => {
      window.clearTimeout(endTimer);
    };
  }, [rewritePhase, localeTransition, endLocaleTransition]);

  const phaseClass = rewritePhase === "idle" ? "" : `lang-rewrite-${rewritePhase}`;

  return (
    <>
      <div
        ref={scopeRef}
        className={`lang-rewrite-scope ${phaseClass}`.trim()}
        data-lang-rewriting={rewritePhase !== "idle" ? "true" : undefined}
      >
        {children}
      </div>

      <AnimatePresence>
        {rewritePhase === "erase" && <BrushOverlay key="erase" mode="erase" />}
        {rewritePhase === "write" && <BrushOverlay key="write" mode="write" />}
      </AnimatePresence>
    </>
  );
}
