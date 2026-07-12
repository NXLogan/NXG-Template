export const APP_ROUTES = ["/", "/products", "/faq", "/doc", "/contact", "/checkout"] as const;

export type AppRoute = (typeof APP_ROUTES)[number];

export const PAGE_COVER_MS = 620;
export const PAGE_REVEAL_MS = 980;

/** Strip GitHub Pages base (e.g. /NXG-Template) so route checks stay consistent. */
export function normalizeAppPath(path: string): string {
  const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
  let normalized = (path.split("?")[0]?.split("#")[0] || "/").trim();

  if (base && normalized.startsWith(base)) {
    normalized = normalized.slice(base.length) || "/";
  }

  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }

  return normalized;
}

export function isAppRoute(path: string): path is AppRoute {
  return (APP_ROUTES as readonly string[]).includes(normalizeAppPath(path));
}

/** Transition on every in-app route change (both directions). */
export function shouldPageTransition(from: string, to: string) {
  const a = normalizeAppPath(from);
  const b = normalizeAppPath(to);
  return a !== b && isAppRoute(a) && isAppRoute(b);
}
