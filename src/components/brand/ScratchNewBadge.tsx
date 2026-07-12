export function ScratchNewBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`scratch-new pointer-events-none select-none ${className}`}
      aria-label="New release"
    >
      <svg viewBox="0 0 88 52" className="scratch-new-svg" aria-hidden>
        <path
          d="M4,38 C18,8 32,44 48,18 S72,6 84,28"
          fill="none"
          stroke="oklch(0.58 0.21 28 / 0.55)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M8,12 L22,8 M62,42 L78,38"
          fill="none"
          stroke="oklch(0.94 0.028 88 / 0.35)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <text x="44" y="34" textAnchor="middle" className="scratch-new-text">
          NEW
        </text>
      </svg>
    </div>
  );
}
