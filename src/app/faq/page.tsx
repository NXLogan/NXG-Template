import type { Metadata } from "next";
import { FaqPage } from "@/views/faq-page";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions frequently asked of the artifact.",
  openGraph: {
    title: "FAQ — NAME®",
    description: "Questions frequently asked of the artifact.",
  },
};

export default function Page() {
  return <FaqPage />;
}
