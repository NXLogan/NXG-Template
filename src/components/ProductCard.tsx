import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ p, index }: { p: Product; index: number }) {
  const { add } = useCart();
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.7, 0, 0.2, 1] }}
      className="group relative"
    >
      <div
        className="relative aspect-[3/4] w-full overflow-hidden border border-white/10"
        style={{ background: p.gradient }}
      >
        <div className="absolute top-4 left-4 mono-label text-white/70">N° {p.number}</div>
        <div className="absolute top-4 right-4 mono-label text-white/70">{p.category}</div>

        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition duration-700">
          <span className="display text-white text-[120px] md:text-[160px] leading-none">
            {p.title.split(" ")[0]}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500 backdrop-blur-md bg-black/40">
          <div>
            <div className="mono-label text-white/60">PRICE</div>
            <div className="display text-white text-3xl">€{p.price}</div>
          </div>
          <button
            onClick={() => add()}
            className="mono-label text-black bg-white px-4 py-2 hover:bg-white/80 transition"
          >
            ADD TO CART →
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <h3 className="display text-white text-2xl">{p.title}</h3>
          <p className="text-white/50 text-sm mt-1">{p.subtitle}</p>
        </div>
        <div className="mono-label text-white">€{p.price}</div>
      </div>
    </motion.article>
  );
}
