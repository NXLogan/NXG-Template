import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, interpolate, type Locale, type TranslationTree } from "./translations";

export type RewritePhase = "idle" | "erase" | "write";

interface I18nCtx {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  switchLocale: (locale: Locale) => void;
  transitioning: boolean;
  rewritePhase: RewritePhase;
  localeTransition: Locale | null;
  finishLocaleTransition: (locale: Locale) => void;
  endLocaleTransition: () => void;
  setRewritePhase: (phase: RewritePhase) => void;
  t: TranslationTree;
  brand: string;
  ti: (text: string, vars?: Record<string, string | number>) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

const STORAGE_KEY = "locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [localeTransition, setLocaleTransition] = useState<Locale | null>(null);
  const [rewritePhase, setRewritePhase] = useState<RewritePhase>("idle");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "en" || stored === "fr") setLocaleState(stored);
  }, []);

  const applyLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const setLocale = useCallback(
    (next: Locale) => {
      applyLocale(next);
    },
    [applyLocale],
  );

  const switchLocale = useCallback(
    (next: Locale) => {
      if (next === locale || localeTransition !== null) return;
      setLocaleTransition(next);
      setRewritePhase("erase");
    },
    [locale, localeTransition],
  );

  const finishLocaleTransition = useCallback(
    (next: Locale) => {
      applyLocale(next);
    },
    [applyLocale],
  );

  const endLocaleTransition = useCallback(() => {
    setLocaleTransition(null);
    setRewritePhase("idle");
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = translations[locale];
  const brand = t.brand.name;

  const ti = (text: string, vars: Record<string, string | number> = {}) =>
    interpolate(text, { brand, ...vars });

  return (
    <Ctx.Provider
      value={{
        locale,
        setLocale,
        switchLocale,
        transitioning: localeTransition !== null,
        rewritePhase,
        localeTransition,
        finishLocaleTransition,
        endLocaleTransition,
        setRewritePhase,
        t,
        brand,
        ti,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
