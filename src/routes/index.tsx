import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PRODUCTS } from "@/lib/products";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="relative">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-full flex items-center justify-center pointer-events-none">
          <motion.div style={{ y, opacity }} className="text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
              className="mono-label text-white/50 mb-6"
            >
              EDITION MMXXVI — VOL. 001
            </motion.div>

            <div className="relative inline-block">
              <motion.h1
                initial={{ scale: 1.3, opacity: 0, letterSpacing: "0.05em" }}
                animate={{ scale: 1, opacity: 1, letterSpacing: "-0.04em" }}
                transition={{ delay: 2.4, duration: 1.6, ease: [0.7, 0, 0.2, 1] }}
                className="display text-white text-[26vw] leading-[0.8] tracking-tighter"
              >
                NØRMA
              </motion.h1>
              {/* diagonal slit sweep */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="slit-sweep absolute top-1/2 left-0 right-0 h-[2px] bg-white origin-center" style={{ animationDelay: "2.8s" }} />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 0.8 }}
              className="mono-label text-white/50 mt-6"
            >
              WE DON'T SELL PRODUCTS · WE DISTRIBUTE ARTIFACTS
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-10 px-6 md:px-10 pb-10 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.8 }}
            className="max-w-xs"
          >
            <div className="mono-label text-white/60 mb-2">↓ SCROLL</div>
            <p className="text-white/70 text-sm">
              A digital shop reconceived as cultural artifact. Enter at your own risk of taste.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.8 }}
            className="mono-label text-white/60 text-right hidden md:block"
          >
            <div>N 52°31′ · E 13°24′</div>
            <div>SIGNAL / 00</div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee text="ARTIFACTS · CULTURE · NOT FOR EVERYONE · NØRMA® · ARTIFACTS · CULTURE · NOT FOR EVERYONE · NØRMA® · " />

      {/* 01 MANIFESTO */}
      <section className="px-6 md:px-10 py-32 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-16">
          <div className="mono-label text-white/50">01 — MANIFESTO</div>
          <div className="mono-label text-white/50 md:ml-auto">A DOCUMENT</div>
        </div>
        <SplitReveal>
          Not commerce.<br/>Culture.<br/>
          <span className="text-white/40">We do not participate in the economy of noise.</span><br/>
          Every artifact is a refusal.
        </SplitReveal>
      </section>

      {/* 02 ARTIFACTS */}
      <section className="px-6 md:px-10 py-32 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="mono-label text-white/50 mb-4">02 — ARTIFACTS</div>
            <h2 className="display text-white text-6xl md:text-8xl">Choose your<br/><em className="not-italic text-white/40">weapon.</em></h2>
          </div>
          <a href="/products" className="mono-label text-white story-link">VIEW ALL →</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </section>

      {/* MARQUEE 2 */}
      <Marquee text="NOT COMMERCE — CULTURE — NOT COMMERCE — CULTURE — " size="text-5xl md:text-7xl" />

      {/* 03 PHILOSOPHY */}
      <section className="px-6 md:px-10 py-32">
        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-16">
          <div className="mono-label text-white/50">03 — PHILOSOPHY</div>
          <div className="mono-label text-white/50 md:ml-auto">READ SLOWLY</div>
        </div>
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <Logo size={56} />
          </div>
          <div className="md:col-span-7">
            <p className="display text-white text-4xl md:text-6xl leading-[1]">
              An artifact is a decision.<br/>
              <span className="text-white/50">To make it. To own it. To refuse everything it is not.</span>
            </p>
          </div>
          <div className="md:col-span-3 md:mt-8 space-y-6 text-white/70">
            <p className="text-sm">
              NØRMA operates outside the coordinates of retail. What we release
              is intended for those who understand that scarcity is meaning.
            </p>
            <p className="text-sm">
              Every artifact is documented, numbered, and released to a
              deliberately incomplete audience.
            </p>
            <div className="mono-label text-white/50 pt-4 border-t border-white/10">
              EST. MMXXVI
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SplitReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
      className="display text-white text-6xl md:text-9xl leading-[0.95]"
    >
      {children}
    </motion.h2>
  );
}
