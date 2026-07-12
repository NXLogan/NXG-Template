/** Hand-drawn ink strokes — Japanese sumi-e feel */
export function InkLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 6"
      preserveAspectRatio="none"
      className={`w-full h-[3px] text-foreground/25 ${className}`}
      aria-hidden
    >
      <path
        d="M0,3 C80,1.2 140,4.5 220,2.8 S380,0.8 480,3.2 S620,4.8 700,2.5 760,1.8 800,3"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function InkLineLight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 4"
      preserveAspectRatio="none"
      className={`w-full h-[2px] text-foreground/12 ${className}`}
      aria-hidden
    >
      <path
        d="M0,2 Q120,3.2 240,1.6 T480,2.4 T720,1.2 800,2"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function BrushUnderline({ active, wide }: { active?: boolean; wide?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 8"
      className={`absolute -bottom-1 h-2 transition-opacity duration-500 ${
        wide ? "left-0 w-full max-w-[12rem]" : "left-1/2 -translate-x-1/2 w-[110%]"
      } ${active ? "opacity-100" : "opacity-0 group-hover:opacity-70"}`}
      aria-hidden
    >
      <path
        d="M2,5 C12,2 28,6 40,4 S52,3 58,5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="text-foreground/50"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function HankoDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${className}`}
      style={{ background: "oklch(0.58 0.21 28 / 0.75)" }}
      aria-hidden
    />
  );
}
