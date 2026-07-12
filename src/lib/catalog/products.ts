export type Category = "PACKS" | "SKINS" | "TOOLS";

export interface Product {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: Category;
  price: number;
  gradient: string;
  images: string[];
  description: string;
  isNew?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "void-pack",
    number: "001",
    title: "VOID PACK",
    subtitle: "Absence, weaponized.",
    category: "PACKS",
    price: 42,
    gradient:
      "radial-gradient(ellipse at 25% 20%, oklch(0.34 0.045 65) 0%, oklch(0.18 0.028 58) 45%, oklch(0.12 0.025 55) 100%)",
    images: [
      "radial-gradient(ellipse at 25% 20%, oklch(0.34 0.045 65) 0%, oklch(0.18 0.028 58) 45%, oklch(0.12 0.025 55) 100%)",
      "radial-gradient(ellipse at 75% 60%, oklch(0.48 0.10 268) 0%, oklch(0.16 0.028 58) 55%, oklch(0.09 0.022 52) 100%)",
      "linear-gradient(160deg, oklch(0.22 0.028 58) 0%, oklch(0.12 0.025 55) 100%)",
    ],
    description:
      "A collection of nothing, rendered in monochrome silence. Five files that refuse ornament. Each module subtracts until only intention remains.",
    isNew: true,
  },
  {
    id: "spectrum-skin",
    number: "002",
    title: "SPECTRUM SKIN",
    subtitle: "Chromatic dissonance.",
    category: "SKINS",
    price: 28,
    gradient:
      "linear-gradient(145deg, oklch(0.92 0.028 86) 0%, oklch(0.72 0.04 85) 30%, oklch(0.48 0.10 268) 65%, oklch(0.14 0.025 55) 100%)",
    images: [
      "linear-gradient(145deg, oklch(0.92 0.028 86) 0%, oklch(0.72 0.04 85) 30%, oklch(0.48 0.10 268) 65%, oklch(0.14 0.025 55) 100%)",
      "linear-gradient(220deg, oklch(0.88 0.035 85) 0%, oklch(0.48 0.10 268) 50%, oklch(0.16 0.028 58) 100%)",
      "radial-gradient(circle at 40% 30%, oklch(0.95 0.032 88) 0%, oklch(0.48 0.10 268) 70%, oklch(0.09 0.022 52) 100%)",
    ],
    description:
      "A visual protocol of pure white light collapsing into darkness. Applied once, it rewrites every surface it touches.",
  },
  {
    id: "neon-protocol",
    number: "003",
    title: "NEON PROTOCOL",
    subtitle: "Signal over noise.",
    category: "TOOLS",
    price: 64,
    gradient:
      "linear-gradient(200deg, oklch(0.22 0.028 58) 0%, oklch(0.48 0.10 268) 40%, oklch(0.18 0.032 268) 100%)",
    images: [
      "linear-gradient(200deg, oklch(0.22 0.028 58) 0%, oklch(0.48 0.10 268) 40%, oklch(0.18 0.032 268) 100%)",
      "linear-gradient(15deg, oklch(0.20 0.028 58) 0%, oklch(0.62 0.035 82) 45%, oklch(0.14 0.025 55) 100%)",
      "radial-gradient(ellipse at 50% 80%, oklch(0.48 0.10 268) 0%, oklch(0.14 0.025 55) 60%, oklch(0.09 0.022 52) 100%)",
      "linear-gradient(270deg, oklch(0.26 0.03 58) 0%, oklch(0.12 0.025 55) 100%)",
    ],
    description:
      "A brutalist utility kit for those who refuse decoration. Twelve instruments calibrated for signal clarity above comfort.",
    isNew: true,
  },
  {
    id: "ghost-mod",
    number: "004",
    title: "GHOST MOD",
    subtitle: "Presence, denied.",
    category: "SKINS",
    price: 36,
    gradient:
      "radial-gradient(circle at 70% 35%, oklch(0.36 0.04 65) 0%, oklch(0.24 0.028 58) 40%, oklch(0.09 0.022 52) 100%)",
    images: [
      "radial-gradient(circle at 70% 35%, oklch(0.36 0.04 65) 0%, oklch(0.24 0.028 58) 40%, oklch(0.09 0.022 52) 100%)",
      "radial-gradient(circle at 20% 70%, oklch(0.30 0.035 62) 0%, oklch(0.18 0.028 58) 50%, oklch(0.09 0.022 52) 100%)",
      "linear-gradient(180deg, oklch(0.30 0.032 58) 0%, oklch(0.13 0.028 58) 100%)",
    ],
    description:
      "Disappear in full view. A study in negative form — the interface you notice only when it vanishes.",
  },
  {
    id: "monolith-set",
    number: "005",
    title: "MONOLITH SET",
    subtitle: "Weight without matter.",
    category: "PACKS",
    price: 88,
    gradient:
      "linear-gradient(180deg, oklch(0.16 0.028 58) 0%, oklch(0.48 0.10 268) 50%, oklch(0.12 0.025 55) 100%)",
    images: [
      "linear-gradient(180deg, oklch(0.16 0.028 58) 0%, oklch(0.48 0.10 268) 50%, oklch(0.12 0.025 55) 100%)",
      "linear-gradient(45deg, oklch(0.22 0.028 58) 0%, oklch(0.48 0.10 268) 100%)",
      "radial-gradient(ellipse at 50% 0%, oklch(0.48 0.10 268) 0%, oklch(0.14 0.025 55) 70%)",
    ],
    description:
      "Five artifacts carved from digital granite. Released as a single block — separation would betray the set.",
  },
  {
    id: "erasure-tool",
    number: "006",
    title: "ERASURE TOOL",
    subtitle: "Subtraction as design.",
    category: "TOOLS",
    price: 19,
    gradient:
      "linear-gradient(45deg, oklch(0.95 0.032 88), oklch(0.78 0.035 84), oklch(0.48 0.10 268), oklch(0.14 0.025 55))",
    images: [
      "linear-gradient(45deg, oklch(0.95 0.032 88), oklch(0.78 0.035 84), oklch(0.48 0.10 268), oklch(0.14 0.025 55))",
      "linear-gradient(135deg, oklch(0.91 0.032 86) 0%, oklch(0.48 0.10 268) 50%, oklch(0.12 0.025 55) 100%)",
      "linear-gradient(90deg, oklch(0.86 0.035 84) 0%, oklch(0.34 0.045 65) 100%)",
    ],
    description:
      "Remove until only meaning remains. One tool, one function, zero tolerance for excess.",
    isNew: true,
  },
];

export function filterProducts(products: Product[], query: string, category: string): Product[] {
  const q = query.trim().toLowerCase();
  return products.filter((p) => {
    const matchesCategory = category === "ALL" || p.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = [p.title, p.subtitle, p.description, p.category, p.number, p.id]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
