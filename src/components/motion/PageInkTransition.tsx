import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n/context";
import {
  PAGE_COVER_MS,
  PAGE_REVEAL_MS,
  normalizeAppPath,
  shouldPageTransition,
} from "@/lib/ui/page-transition";

type Phase = "idle" | "covering" | "revealing";

const HAND_STROKES = [
  { d: "M-60,90 C140,40 280,160 460,80 S720,20 880,110", w: 38, delay: 0 },
  { d: "M820,200 C620,280 420,140 240,240 S40,340 -80,220", w: 32, delay: 0.06 },
  { d: "M900,380 C680,320 500,460 300,380 S80,300 -40,420", w: 36, delay: 0.1 },
  { d: "M-30,480 C200,420 380,520 560,440 S780,360 860,500", w: 30, delay: 0.14 },
  { d: "M100,300 C280,260 400,340 580,280 S760,220 820,320", w: 22, delay: 0.2 },
  { d: "M60,140 C240,180 360,100 520,160 S700,220 780,130", w: 18, delay: 0.24 },
  { d: "M680,480 C520,520 380,440 220,500 S80,560 -20,460", w: 26, delay: 0.28 },
] as const;

const HATCH_LINES = [
  "M0,120 L820,80",
  "M0,180 L820,140",
  "M0,240 L820,200",
  "M0,300 L820,260",
  "M0,360 L820,320",
  "M0,420 L820,380",
  "M0,480 L820,440",
] as const;

const CORNERS = [
  "M20,20 L20,90 Q20,20 90,20",
  "M780,20 L710,20 Q780,20 780,90",
  "M20,580 L20,510 Q20,580 90,580",
  "M780,580 L780,510 Q780,580 710,580",
] as const;

const RED_SCRATCHES = [
  "M140,60 C220,120 300,40 420,100",
  "M600,500 C520,440 440,520 320,460",
  "M680,180 C740,240 620,280 580,200",
] as const;

const SPLATTERS = [
  [120, 140], [640, 90], [380, 420], [720, 380], [200, 520], [560, 260],
] as const;

const REVEAL_EASE = [0.65, 0, 0.15, 1] as const;
const REVEAL_SEC = PAGE_REVEAL_MS / 1000;

/** Overlay fully visible */
const CLIP_FULL = "inset(0% 0% 0% 0%)";
/** Overlay gone — page underneath shows through */
const CLIP_GONE = "inset(100% 0% 0% 0%)";

function InkOverlay({
  phase,
  onWipeDone,
}: {
  phase: "covering" | "revealing";
  onWipeDone: () => void;
}) {
  return (
    <motion.div
      className="page-ink-draw absolute inset-0"
      initial={{ clipPath: CLIP_FULL }}
      animate={{ clipPath: phase === "covering" ? CLIP_FULL : CLIP_GONE }}
      transition={{
        duration: phase === "revealing" ? REVEAL_SEC : 0,
        ease: REVEAL_EASE,
      }}
      onAnimationComplete={() => {
        if (phase === "revealing") onWipeDone();
      }}
    >
      <div className="page-ink-passage-void absolute inset-0" />

      <svg
        className="page-ink-draw-canvas absolute inset-0 h-full w-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <filter id="ink-bleed" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {CORNERS.map((d, i) => (
          <motion.path
            key={`corner-${i}`}
            d={d}
            fill="none"
            stroke="oklch(0.94 0.028 88 / 0.5)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {HAND_STROKES.map(({ d, w, delay }, i) => (
          <motion.path
            key={`hand-${i}`}
            d={d}
            fill="none"
            stroke="oklch(0.12 0.025 55 / 0.94)"
            strokeWidth={w}
            strokeLinecap="round"
            style={{ filter: "url(#ink-bleed)" }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay, ease: [0.32, 0.72, 0.22, 1] }}
          />
        ))}

        {HATCH_LINES.map((d, i) => (
          <motion.path
            key={`hatch-${i}`}
            d={d}
            fill="none"
            stroke="oklch(0.94 0.028 88 / 0.08)"
            strokeWidth="0.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.3, delay: 0.18 + i * 0.02, ease: "linear" }}
          />
        ))}

        {RED_SCRATCHES.map((d, i) => (
          <motion.path
            key={`red-${i}`}
            d={d}
            fill="none"
            stroke="oklch(0.58 0.21 28 / 0.65)"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.35, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {SPLATTERS.map(([cx, cy], i) => (
          <motion.circle
            key={`splatter-${i}`}
            cx={cx}
            cy={cy}
            r={3 + (i % 3) * 2}
            fill="oklch(0.09 0.022 52 / 0.9)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.85 }}
            transition={{ duration: 0.2, delay: 0.38 + i * 0.03 }}
          />
        ))}
      </svg>

      <motion.div
        className="page-ink-passage-slit absolute left-[-12%] right-[-12%] top-[46%] h-px shimmer-line"
        style={{ transform: "rotate(-11deg)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.7 }}
        transition={{ duration: 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.span
        className="page-ink-passage-seal absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.2, opacity: 0, rotate: -28 }}
        animate={{ scale: 1, opacity: 0.8, rotate: -14 }}
        transition={{ duration: 0.4, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />

      <svg
        className="page-ink-draw-tear absolute bottom-0 left-0 w-full h-12"
        viewBox="0 0 800 48"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,22 C90,6 180,34 270,14 S450,4 540,26 S680,38 800,10 L800,48 L0,48 Z"
          fill="oklch(0.11 0.028 58)"
        />
      </svg>
    </motion.div>
  );
}

export function PageTransitionShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { rewritePhase } = useI18n();
  const prevPath = useRef(pathname);
  const pathnameRef = useRef(pathname);
  const revealTimer = useRef<number | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const [phase, setPhase] = useState<Phase>("idle");
  const [transitionKey, setTransitionKey] = useState(0);

  pathnameRef.current = pathname;
  phaseRef.current = phase;

  const beginCover = () => {
    setTransitionKey((k) => k + 1);
    setPhase("covering");
  };

  /* Start overlay on link click — before the router swaps the page */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (rewritePhase !== "idle") return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const anchor = (e.target as Element | null)?.closest("a[href]");
      if (!anchor || anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;

      const to = normalizeAppPath(href);
      const from = normalizeAppPath(pathnameRef.current);

      if (!shouldPageTransition(from, to)) return;

      beginCover();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [rewritePhase]);

  useLayoutEffect(() => {
    if (rewritePhase !== "idle") {
      prevPath.current = pathname;
      return;
    }

    const from = normalizeAppPath(prevPath.current);
    const to = normalizeAppPath(pathname);

    if (from === to) return;

    if (!shouldPageTransition(from, to)) {
      prevPath.current = pathname;
      setPhase("idle");
      return;
    }

    prevPath.current = pathname;

    if (phaseRef.current !== "idle") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      window.scrollTo(0, 0);
      setPhase("idle");
      return;
    }

    window.scrollTo(0, 0);
    beginCover();
  }, [pathname, rewritePhase]);

  /* Cover → reveal (must not share an effect that re-runs when phase flips to covering) */
  useEffect(() => {
    if (phase !== "covering") return;

    const timer = window.setTimeout(() => {
      setPhase("revealing");
    }, PAGE_COVER_MS);

    return () => window.clearTimeout(timer);
  }, [phase, transitionKey]);

  useEffect(() => {
    if (phase !== "revealing") return;

    revealTimer.current = window.setTimeout(() => {
      setPhase("idle");
      revealTimer.current = null;
    }, PAGE_REVEAL_MS + 80);

    return () => {
      if (revealTimer.current !== null) {
        window.clearTimeout(revealTimer.current);
        revealTimer.current = null;
      }
    };
  }, [phase, transitionKey]);

  /* Failsafe — never leave the ink overlay stuck */
  useEffect(() => {
    if (phase === "idle") return;

    const failsafe = window.setTimeout(() => {
      setPhase("idle");
    }, PAGE_COVER_MS + PAGE_REVEAL_MS + 1500);

    return () => window.clearTimeout(failsafe);
  }, [phase, transitionKey]);

  useEffect(() => {
    if (phase === "idle") {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-page-transition");
      return;
    }

    document.body.style.overflow = "hidden";
    document.body.setAttribute("data-page-transition", phase);
  }, [phase]);

  const transitioning = phase !== "idle";
  const pageVisible = phase !== "covering";

  return (
    <>
      <div
        className="page-transition-outlet"
        data-page-route={pathname}
        aria-hidden={!pageVisible}
        style={{
          visibility: pageVisible ? "visible" : "hidden",
          pointerEvents: phase === "covering" ? "none" : "auto",
        }}
      >
        {children}
      </div>

      {transitioning && (
        <div
          className="page-ink-passage fixed inset-0 z-[125] overflow-hidden touch-none"
          aria-hidden
        >
          <InkOverlay
            key={transitionKey}
            phase={phase === "covering" ? "covering" : "revealing"}
            onWipeDone={() => setPhase("idle")}
          />
        </div>
      )}
    </>
  );
}

/** @deprecated Use PageTransitionShell */
export function PageInkTransition() {
  return null;
}

/** @deprecated Use PageTransitionShell */
export function PageTransitionOutlet({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
