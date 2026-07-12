import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles/global.css?url";
import { SiteAudioProvider } from "@/lib/audio/site-audio";
import { CartProvider } from "@/lib/cart/cart";
import { I18nProvider } from "@/lib/i18n/context";
import { Nav } from "@/components/layout/Nav";
import { Preloader } from "@/components/layout/Preloader";
import { CursorDot } from "@/components/motion/CursorDot";
import { LangRewriteScope } from "@/components/i18n/LangRewriteScope";
import { PageTransitionShell } from "@/components/motion/PageInkTransition";

import { useI18n } from "@/lib/i18n/context";

function NotFoundComponent() {
  const { t } = useI18n();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background text-foreground overflow-hidden px-6">
      <div className="relative">
        <h1 className="display silver-text text-[28vw] md:text-[22vw] leading-[0.8] tracking-tighter text-center select-none">
          NULL
        </h1>
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-[-10%] right-[-10%] top-1/2 h-px shimmer-line origin-left"
            style={{ transform: "rotate(-18deg)" }}
          />
        </div>
      </div>

      <p className="display text-3xl md:text-5xl mt-8 text-center text-foreground/70">
        {t.notFound.title}
      </p>
      <p className="max-w-md text-center text-foreground/50 mt-4 text-sm">
        {t.notFound.text}
      </p>

      <div className="mt-10 flex gap-3">
        <Link to="/" className="mono-label chrome-btn px-4 py-2">
          {t.notFound.return}
        </Link>
        <Link to="/products" className="mono-label border border-foreground/30 text-foreground px-4 py-2 hover:border-foreground/60 transition">
          {t.notFound.browse}
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "NAME® — Not Commerce. Culture." },
      { name: "description", content: "NAME distributes artifacts, not products. An avant-garde digital shop for cultural objects." },
      { name: "author", content: "NAME" },
      { property: "og:title", content: "NAME® — Not Commerce. Culture." },
      { property: "og:description", content: "We don't sell products. We distribute artifacts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Shippori+Antique:wght@400;700;800&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=Yuji+Boku&family=IBM+Plex+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [shellReady, setShellReady] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
      <SiteAudioProvider>
      <CartProvider>
        <div className="grain ambient min-h-screen bg-background text-foreground">
          <Preloader onComplete={() => setShellReady(true)} />
          <LangRewriteScope>
            <CursorDot />
            {shellReady && <Nav />}
            <PageTransitionShell>
              <div className="relative z-[1]">
                <Outlet />
              </div>
            </PageTransitionShell>
          </LangRewriteScope>
        </div>
      </CartProvider>
      </SiteAudioProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
