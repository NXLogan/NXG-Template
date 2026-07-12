export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className="object-contain select-none shrink-0"
      aria-label="NAME"
      role="img"
    >
      <path
        d="M32 6 C48 5 58 18 57 32 C56 48 42 58 28 56 C12 54 4 40 7 24 C10 10 22 7 32 6"
        fill="oklch(0.11 0.028 58)"
        stroke="oklch(0.58 0.21 28 / 0.85)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 44 L20 18 M20 18 L36 36 M36 36 L36 18"
        fill="none"
        stroke="oklch(0.94 0.028 88)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 18 C50 18 52 28 48 36 C44 44 38 44 38 44"
        fill="none"
        stroke="oklch(0.58 0.21 28)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <circle cx="48" cy="14" r="2.5" fill="oklch(0.58 0.21 28 / 0.75)" />
    </svg>
  );
}
