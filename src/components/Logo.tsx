export function Logo({ size = 36 }: { size?: number }) {
  return (
    <div
      className="relative inline-flex items-center justify-center bg-black"
      style={{ width: size, height: size, borderRadius: size * 0.28 }}
    >
      <div
        className="absolute inset-[3px] flex items-center justify-center overflow-hidden"
        style={{
          border: `${Math.max(2, size * 0.09)}px solid #fff`,
          borderRadius: size * 0.22,
        }}
      >
        <svg viewBox="0 0 100 100" width="70%" height="70%">
          <defs>
            <clipPath id="slit-top">
              <polygon points="0,0 100,0 100,20 0,80" />
            </clipPath>
            <clipPath id="slit-bot">
              <polygon points="0,88 100,28 100,100 0,100" />
            </clipPath>
          </defs>
          <g fill="#fff" fontFamily="Syne, sans-serif" fontWeight="800" fontSize="96" textAnchor="middle">
            <text x="50" y="82" clipPath="url(#slit-top)">N</text>
            <text x="50" y="82" clipPath="url(#slit-bot)">N</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
