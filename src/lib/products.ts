export type Category = "PACKS" | "SKINS" | "TOOLS";

export interface Product {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: Category;
  price: number;
  gradient: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "void-pack",
    number: "001",
    title: "VOID PACK",
    subtitle: "Absence, weaponized.",
    category: "PACKS",
    price: 42,
    gradient: "radial-gradient(ellipse at 30% 30%, #1a1a1a 0%, #000 60%), linear-gradient(135deg,#000,#111)",
    description: "A collection of nothing, rendered in monochrome silence.",
  },
  {
    id: "spectrum-skin",
    number: "002",
    title: "SPECTRUM SKIN",
    subtitle: "Chromatic dissonance.",
    category: "SKINS",
    price: 28,
    gradient: "linear-gradient(135deg,#fff 0%,#e5e5e5 50%,#000 100%)",
    description: "A visual protocol of pure white light collapsing into darkness.",
  },
  {
    id: "neon-protocol",
    number: "003",
    title: "NEON PROTOCOL",
    subtitle: "Signal over noise.",
    category: "TOOLS",
    price: 64,
    gradient: "linear-gradient(200deg,#111 0%,#333 45%,#000 100%)",
    description: "A brutalist utility kit for those who refuse decoration.",
  },
  {
    id: "ghost-mod",
    number: "004",
    title: "GHOST MOD",
    subtitle: "Presence, denied.",
    category: "SKINS",
    price: 36,
    gradient: "radial-gradient(circle at 70% 40%, #2a2a2a 0%, #000 70%)",
    description: "Disappear in full view. A study in negative form.",
  },
  {
    id: "monolith-set",
    number: "005",
    title: "MONOLITH SET",
    subtitle: "Weight without matter.",
    category: "PACKS",
    price: 88,
    gradient: "linear-gradient(180deg,#0a0a0a 0%,#1a1a1a 50%,#0a0a0a 100%)",
    description: "Five artifacts carved from digital granite.",
  },
  {
    id: "erasure-tool",
    number: "006",
    title: "ERASURE TOOL",
    subtitle: "Subtraction as design.",
    category: "TOOLS",
    price: 19,
    gradient: "linear-gradient(45deg,#fff,#ccc,#666,#000)",
    description: "Remove until only meaning remains.",
  },
];
