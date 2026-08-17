import type { Metadata } from "next";
import "./shade.css";

const title = "Dean's Quality Transmissions | Shade Tree Direction";
const description =
  "An independent, friendly-service design direction for Dean's Quality Transmissions in Spanish Fork, Utah.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/shade" },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/shade",
    images: [],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [],
  },
};

export default function ShadeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
