export function Marquee({ text, size = "text-6xl md:text-9xl" }: { text: string; size?: string }) {
  const items = Array.from({ length: 2 });
  return (
    <div className="overflow-hidden border-y border-white/10 py-4">
      <div className="marquee-track">
        {items.map((_, i) => (
          <span key={i} className={`display text-white whitespace-nowrap pr-8 ${size}`}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
