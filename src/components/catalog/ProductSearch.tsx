import { useId, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";

export function ProductSearch({
  value,
  onChange,
  resultCount,
  totalCount,
}: {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}) {
  const [focused, setFocused] = useState(false);
  const id = useId();
  const { t, ti } = useI18n();
  const active = focused || value.length > 0;

  return (
    <div className={`ink-search ${active ? "ink-search-active" : ""}`}>
      <svg
        className="ink-search-tear ink-search-tear-top"
        viewBox="0 0 800 24"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,18 C80,4 160,22 240,10 S400,2 480,16 S640,24 720,8 800,14 L800,0 L0,0 Z"
          fill="oklch(0.14 0.025 55 / 0.92)"
        />
        <path
          d="M0,20 C90,6 180,20 270,12 S450,4 540,18 S680,22 800,10"
          fill="none"
          stroke="oklch(0.74 0.038 84 / 0.2)"
          strokeWidth="0.75"
        />
      </svg>

      <div className="ink-search-rift">
        <label htmlFor={id} className="ink-search-label mono-label">
          {t.products.searchLabel}
        </label>

        <div className="ink-search-field">
          <motion.span
            className="ink-search-glyph"
            animate={{ rotate: value ? 0 : [0, -8, 0], scale: focused ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
            aria-hidden
          >
            {value ? "→" : "?"}
          </motion.span>

          <input
            id={id}
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={t.products.searchPlaceholder}
            className="ink-search-input"
            autoComplete="off"
            spellCheck={false}
            data-clickable
          />

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="ink-search-clear mono-label"
              aria-label={t.products.searchClear}
              data-clickable
            >
              ×
            </button>
          )}
        </div>

        <motion.div
          className="ink-search-scan"
          animate={{ opacity: active ? 1 : 0.35, scaleX: active ? 1 : 0.6 }}
          transition={{ duration: 0.45 }}
          aria-hidden
        />
      </div>

      <svg
        className="ink-search-tear ink-search-tear-bottom"
        viewBox="0 0 800 24"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,6 C100,20 200,2 300,14 S500,22 600,8 S720,18 800,4 L800,24 L0,24 Z"
          fill="oklch(0.14 0.025 55 / 0.92)"
        />
      </svg>

      <div className="ink-search-meta">
        <span className="mono-label text-foreground/35">
          {value
            ? ti(t.products.searchResults, { count: resultCount.toString().padStart(2, "0") })
            : `${totalCount.toString().padStart(2, "0")} artifacts`}
        </span>
        {value && (
          <motion.span
            className="ink-search-echo display"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 0.25, x: 0 }}
            aria-hidden
          >
            {value}
          </motion.span>
        )}
      </div>
    </div>
  );
}
