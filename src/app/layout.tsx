import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meme Autopsy — AI Forensic Intelligence for Meme Narratives",
  description:
    "An AI-powered forensic engine that dissects meme project narratives across six structural dimensions to diagnose virality, cultural survivability, and collapse risk.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Meme Autopsy — AI Forensic Intelligence for Meme Narratives",
    description:
      "Dissect any meme project across symbolic density, lore depth, ritual repeatability, community cohesion, belief elasticity, and narrative survivability.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meme Autopsy — Forensic Intelligence Engine",
    description:
      "AI-powered narrative forensics for meme projects. From hype to collapse, every meme leaves evidence.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scanline-overlay noise-bg">{children}</body>
    </html>
  );
}
