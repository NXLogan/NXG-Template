export function Marquee({
  text,
  size = "text-4xl sm:text-5xl md:text-7xl lg:text-9xl",
  variant = "silver",
}: {
  text: string;
  size?: string;
  variant?: "silver" | "outline";
}) {
  const items = Array.from({ length: 2 });
  const textClass = variant === "outline" ? "outline-text" : "silver-text";
  return (
    <div className="overflow-hidden border-y border-border py-4 relative">
      <div className="absolute inset-x-0 top-0 shimmer-line" />
      <div className="marquee-track">
        {items.map((_, i) => (
          <span key={i} className={`display ${textClass} whitespace-nowrap pr-8 ${size}`}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
