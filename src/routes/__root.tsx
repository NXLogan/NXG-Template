import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { CursorDot } from "@/components/CursorDot";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black text-white overflow-hidden px-6">
      <div className="mono-label text-white/40 absolute top-24 left-6 md:left-10">ERROR / 404 / NULL</div>
      <div className="mono-label text-white/40 absolute top-24 right-6 md:right-10">TRANSMISSION LOST</div>

      <div className="relative">
        <h1 className="display text-white text-[28vw] md:text-[22vw] leading-[0.8] tracking-tighter text-center select-none">
          NULL
        </h1>
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-[-10%] right-[-10%] top-1/2 h-px bg-white origin-left"
            style={{ transform: "rotate(-18deg)" }}
          />
        </div>
      </div>

      <p className="display text-3xl md:text-5xl mt-8 text-center text-white/70">
        Artifact not found.
      </p>
      <p className="max-w-md text-center text-white/50 mt-4 text-sm">
        The object you sought has either never been released, has been withdrawn
        from circulation, or exists at coordinates you do not yet possess.
      </p>

      <div className="mt-10 flex gap-3">
        <Link to="/" className="mono-label bg-white text-black px-4 py-2 hover:bg-white/80 transition">
          ← RETURN TO INDEX
        </Link>
        <Link to="/products" className="mono-label border border-white/40 text-white px-4 py-2 hover:border-white transition">
          BROWSE ARTIFACTS
        </Link>
      </div>

      <div className="mono-label text-white/40 absolute bottom-8 left-6 md:left-10">NØRMA® MMXXVI</div>
      <div className="mono-label text-white/40 absolute bottom-8 right-6 md:right-10">NOT FOR EVERYONE</div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NØRMA® — Not Commerce. Culture." },
      { name: "description", content: "NØRMA distributes artifacts, not products. An avant-garde digital shop for cultural objects." },
      { name: "author", content: "NØRMA" },
      { property: "og:title", content: "NØRMA® — Not Commerce. Culture." },
      { property: "og:description", content: "We don't sell products. We distribute artifacts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
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

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="grain min-h-screen bg-black text-white">
          <Preloader />
          <CursorDot />
          <Nav />
          <Outlet />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
