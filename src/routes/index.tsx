import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { PRODUCTS, type Product } from "@/lib/catalog/products";
import { Marquee } from "@/components/motion/Marquee";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductModal } from "@/components/catalog/ProductModal";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { t, ti } = useI18n();
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <main className="relative overflow-x-clip">
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-end">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-foreground/4 blur-[80px] float" />
          <div className="absolute bottom-[20%] right-[5%] w-[35vw] h-[35vw] max-w-[420px] max-h-[420px] rounded-full bg-foreground/3 blur-[100px]" style={{ animationDelay: "2s" }} />
        </div>

        <div className="absolute top-[calc(6rem+var(--safe-top))] right-[var(--page-gutter)] hidden md:block">
          <LanguageSwitcher />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none w-full px-[var(--page-gutter)]">
          <motion.div style={{ y, opacity }} className="text-center relative w-full max-w-full">
            <div className="relative inline-flex justify-center w-full max-w-[calc(100vw-var(--page-gutter)*2)]">
              <motion.h1
                initial={{ opacity: 0, letterSpacing: "0.02em" }}
                animate={{ opacity: 1, letterSpacing: "-0.04em" }}
                transition={{ delay: 2.4, duration: 1.6, ease: [0.7, 0, 0.2, 1] }}
                className="hero-silver hero-title max-w-full text-balance"
              >
                {t.brand.hero}
              </motion.h1>
              <div className="absolute inset-0 pointer-events-none flex items-center overflow-visible">
                <div className="slit-sweep w-full h-px shimmer-line origin-center" style={{ animationDelay: "2.8s" }} />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 0.8 }}
              className="mono-label text-foreground/50 mt-6 max-w-lg mx-auto"
            >
              {t.hero.subtitle}
            </motion.p>
          </motion.div>
        </div>

        <div className="relative z-10 page-gutter-x pb-[max(2.5rem,var(--safe-bottom))] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.8 }}
            className="max-w-xs"
          >
            <p className="mono-label text-foreground/50 mb-2">{t.hero.scroll}</p>
            <p className="text-foreground/70 text-sm">{t.hero.scrollText}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.7, duration: 0.8 }}
            className="md:hidden shrink-0"
          >
            <LanguageSwitcher />
          </motion.div>
        </div>
      </section>

      <Marquee text={ti(t.marquee.line1)} />

      <section className="page-gutter-x py-20 md:py-32 border-b border-border relative">
        <div className="absolute left-[var(--page-gutter)] top-20 md:top-32 bottom-20 md:bottom-32 w-px shimmer-line hidden md:block" />
        <div className="md:pl-8">
          <SplitReveal>
            {t.home.manifesto1}<br/>{t.home.manifesto2}<br/>
            <span className="text-foreground/40">{t.home.manifesto3}</span><br/>
            {t.home.manifesto4}
          </SplitReveal>
        </div>
      </section>

      <section className="page-gutter-x py-20 md:py-32 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
          <h2 className="display text-foreground text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-balance">
            {t.home.artifactsTitle1}<br/>
            <em className="not-italic text-foreground/40">{t.home.artifactsTitle2}</em>
          </h2>
          <Link to="/products" className="mono-label text-foreground/60 story-link">{t.home.viewAll}</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PRODUCTS.slice(0, 3).map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} onOpen={setSelected} />
          ))}
        </div>
      </section>

      <Marquee text={t.marquee.line2} size="text-4xl sm:text-5xl md:text-6xl lg:text-7xl" variant="outline" />

      <section className="page-gutter-x py-20 md:py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vw] max-h-[300px] rounded-full bg-foreground/3 blur-[120px]" />
        </div>
        <div className="grid md:grid-cols-12 gap-8 relative">
          <div className="md:col-span-2">
            <div className="surface-glass inline-block p-4 rounded-sm">
              <Logo size={56} />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="display text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1] text-balance">
              {t.home.philosophy1}<br/>
              <span className="text-foreground/50">{t.home.philosophy2}</span>
            </p>
          </div>
          <div className="md:col-span-3 md:mt-8 space-y-6 text-foreground/70">
            <p className="text-sm">{ti(t.home.philosophy3)}</p>
            <p className="text-sm">{t.home.philosophy4}</p>
          </div>
        </div>
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
      <Footer />
    </main>
  );
}

function SplitReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
      className="display text-foreground text-4xl sm:text-5xl md:text-7xl lg:text-9xl leading-[0.95] text-balance"
    >
      {children}
    </motion.h2>
  );
}
