import { motion } from "framer-motion";
import { InkLine, InkLineLight } from "@/components/layout/NavInk";
import { useI18n } from "@/lib/i18n/context";

const FILTERS = ["ALL", "PACKS", "SKINS", "TOOLS"] as const;
export type FilterKey = (typeof FILTERS)[number];

function CategoryMark({ category, active }: { category: FilterKey; active: boolean }) {
  const stroke = active ? "oklch(0.58 0.21 28 / 0.9)" : "oklch(0.72 0.04 85 / 0.45)";

  if (category === "ALL") {
    return (
      <svg viewBox="0 0 24 24" className="category-ink-mark-svg" aria-hidden>
        <path
          d="M12,4 C16,4.5 19,8 18.5,12 S14,19.5 10,19 C6,18.5 4.5,14 5.5,10 S8.5,3.5 12,4"
          fill="none"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (category === "PACKS") {
    return (
      <svg viewBox="0 0 24 24" className="category-ink-mark-svg" aria-hidden>
        <path d="M5,8 L19,6 L18,18 L4,16 Z" fill="none" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M5,8 L4,16 M19,6 L18,18" fill="none" stroke={stroke} strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (category === "SKINS") {
    return (
      <svg viewBox="0 0 24 24" className="category-ink-mark-svg" aria-hidden>
        <path
          d="M4,14 C8,8 12,18 16,10 S20,6 20,6"
          fill="none"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path d="M6,18 C10,16 14,20 18,14" fill="none" stroke={stroke} strokeWidth="0.7" strokeLinecap="round" opacity="0.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="category-ink-mark-svg" aria-hidden>
      <path d="M7,18 L17,6" fill="none" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M9,6 L15,6 M12,6 L12,10" fill="none" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}

export function ProductCategoryFilter({
  value,
  onChange,
  filteredCount,
  totalCount,
}: {
  value: FilterKey;
  onChange: (key: FilterKey) => void;
  filteredCount: number;
  totalCount: number;
}) {
  const { t } = useI18n();

  const label = (key: FilterKey) => (key === "ALL" ? t.products.all : key);

  return (
    <div className="category-ink-bar page-gutter-x py-4 md:py-5">
      <div className="category-ink-bar-inner">
        <p className="category-ink-heading mono-label">{t.products.filter}</p>

        <div className="category-ink-track">
          <InkLine className="category-ink-line-top" />

          <div className="category-ink-row" role="tablist" aria-label={t.products.filter}>
            {FILTERS.map((key, i) => {
              const active = value === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onChange(key)}
                  className={`category-ink-tab group ${active ? "category-ink-tab-active" : ""}`}
                  style={{ ["--tab-tilt" as string]: `${(i - 1.5) * 1.2}deg` }}
                  data-clickable
                >
                  {active && (
                    <motion.span
                      layoutId="category-ink-stroke"
                      className="category-ink-active-stroke"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden
                    />
                  )}

                  <span className="category-ink-tab-mark">
                    <CategoryMark category={key} active={active} />
                  </span>

                  <span className="category-ink-tab-label">{label(key)}</span>

                  <svg className="category-ink-tab-scratch" viewBox="0 0 80 12" aria-hidden>
                    <path
                      d="M2,8 C18,3 34,10 52,5 S68,2 78,7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      className={active ? "opacity-80" : "opacity-0 group-hover:opacity-40 transition-opacity duration-500"}
                    />
                  </svg>
                </button>
              );
            })}
          </div>

          <InkLineLight className="category-ink-line-bottom" />
        </div>

        <div className="category-ink-count" aria-live="polite">
          <svg viewBox="0 0 48 48" className="category-ink-count-ring" aria-hidden>
            <path
              d="M24,4 C34,4.5 42,13 41,24 S33,42 23,41 C12,40 5,31 6,20 S14,3.5 24,4"
              fill="none"
              stroke="oklch(0.58 0.21 28 / 0.35)"
              strokeWidth="0.8"
            />
          </svg>
          <span className="category-ink-count-num tabular-nums">
            {filteredCount.toString().padStart(2, "0")}
            <span className="category-ink-count-sep">/</span>
            {totalCount.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

export { FILTERS };
