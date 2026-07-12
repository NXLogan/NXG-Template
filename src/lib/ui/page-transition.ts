export const APP_ROUTES = ["/", "/products", "/faq", "/doc", "/contact"] as const;

export type AppRoute = (typeof APP_ROUTES)[number];

export const PAGE_COVER_MS = 620;
export const PAGE_REVEAL_MS = 980;

export function isAppRoute(path: string): path is AppRoute {
  return (APP_ROUTES as readonly string[]).includes(path);
}

/** Transition on every in-app route change (both directions). */
export function shouldPageTransition(from: string, to: string) {
  return from !== to && isAppRoute(from) && isAppRoute(to);
}
