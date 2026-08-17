import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Dean's Quality Transmissions | Concept Redesign";
const description =
  "A cinematic one-page concept for Dean's Quality Transmissions in Spanish Fork, Utah.";

export const metadata: Metadata = {
  metadataBase: new URL("https://deans-quality-transmissions-concept.pages.dev"),
  title,
  description,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    title,
    description,
    images: [
      {
        url: "/og.png",
        width: 1676,
        height: 943,
        alt: "Dean's Quality Transmissions concept preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
