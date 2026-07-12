import { useEffect, useRef } from "react";

const CLICKABLE =
  'a, button, [role="button"], input, select, textarea, label, summary, [data-clickable], [tabindex]:not([tabindex="-1"])';

function isClickable(el: Element | null): boolean {
  if (!el || el === document.documentElement) return false;
  return el.closest(CLICKABLE) !== null;
}

export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const targetScaleRef = useRef(1);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    document.documentElement.classList.add("custom-cursor");

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      targetScaleRef.current = isClickable(document.elementFromPoint(x, y)) ? 2.2 : 1;
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.15;

      if (ref.current) {
        const size = 12 * scaleRef.current;
        const offset = size / 2;
        const hovering = scaleRef.current > 1.15;
        ref.current.style.transform = `translate3d(${cx - offset}px,${cy - offset}px,0)`;
        ref.current.style.width = `${size}px`;
        ref.current.style.height = `${size}px`;
        ref.current.style.boxShadow = hovering
          ? "0 0 20px oklch(0.58 0.21 28 / 0.55), 0 0 40px oklch(0.58 0.21 28 / 0.2)"
          : "0 0 12px oklch(0.58 0.21 28 / 0.35)";
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[200] rounded-full hidden md:block"
      data-lang-skip
      style={{
        width: 12,
        height: 12,
        background: "linear-gradient(135deg, oklch(0.94 0.028 88), oklch(0.58 0.21 28 / 0.85))",
        boxShadow: "0 0 12px oklch(0.58 0.21 28 / 0.35)",
        transition: "box-shadow 0.25s ease",
      }}
    />
  );
}
