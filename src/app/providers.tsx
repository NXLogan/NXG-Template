"use client";

import { CartProvider } from "@/lib/cart/cart";
import { I18nProvider } from "@/lib/i18n/context";
import { SiteAudioProvider } from "@/lib/audio/site-audio";
import { Nav } from "@/components/layout/Nav";
import { Preloader } from "@/components/layout/Preloader";
import { CursorDot } from "@/components/motion/CursorDot";
import { LangRewriteScope } from "@/components/i18n/LangRewriteScope";
import { PageTransitionShell } from "@/components/motion/PageInkTransition";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <SiteAudioProvider>
        <CartProvider>
          <div className="grain ambient min-h-screen bg-background text-foreground">
            <Preloader />
            <LangRewriteScope>
              <CursorDot />
              <Nav />
              <PageTransitionShell>
                <div className="relative z-[1]">{children}</div>
              </PageTransitionShell>
            </LangRewriteScope>
          </div>
        </CartProvider>
      </SiteAudioProvider>
    </I18nProvider>
  );
}
