import { motion } from "framer-motion";
import { InkLineLight } from "@/components/layout/NavInk";
import { useI18n } from "@/lib/i18n/context";
import type { Locale } from "@/lib/i18n/translations";

const LANGS: { code: Locale; label: string; mark: string; name: string }[] = [
  { code: "fr", label: "FR", mark: "F", name: "français" },
  { code: "en", label: "EN", mark: "E", name: "english" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, switchLocale, transitioning } = useI18n();

  return (
    <div
      className={`lang-switch ${className}`}
      role="group"
      aria-label="Language selector"
      data-clickable
      data-lang-skip
    >
      <span className="lang-switch-tag" aria-hidden>
        LANG
      </span>

      <div className="lang-switch-stack">
        {LANGS.map((lang) => {
          const active = locale === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              disabled={transitioning}
              onClick={() => switchLocale(lang.code)}
              className={`lang-switch-btn group ${active ? "lang-switch-active" : ""}`}
              aria-pressed={active}
              aria-label={`Switch to ${lang.name}`}
              data-clickable
            >
              <span className="lang-switch-mark" aria-hidden>
                {lang.mark}
              </span>
              <span className="lang-switch-code">{lang.label}</span>
              <span className="lang-switch-name">{lang.name}</span>

              {active && (
                <motion.span
                  layoutId="lang-switch-stamp"
                  className="lang-switch-hanko"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  aria-hidden
                />
              )}

              <svg
                className="lang-switch-brush absolute -bottom-1 left-0 w-full opacity-0 transition-opacity duration-500 group-hover:opacity-60"
                viewBox="0 0 60 8"
                aria-hidden
              >
                <path
                  d="M2,5 C12,2 28,6 40,4 S52,3 58,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  className="text-foreground/40"
                />
              </svg>
            </button>
          );
        })}
      </div>

      <InkLineLight className="lang-switch-line mt-3 opacity-60" />
    </div>
  );
}
