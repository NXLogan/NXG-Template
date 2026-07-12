import type { Metadata } from "next";
import { DocPage } from "@/views/doc-page";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Installation as an art form. The NAME catalogue essay.",
  openGraph: {
    title: "Documentation — NAME®",
    description: "The NAME catalogue essay.",
  },
};

export default function Page() {
  return <DocPage />;
}
