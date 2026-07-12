import type { Metadata } from "next";
import { ContactPage } from "@/views/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Open a transmission to NAME.",
  openGraph: {
    title: "Contact — NAME®",
    description: "Open a transmission to NAME.",
  },
};

export default function Page() {
  return <ContactPage />;
}
