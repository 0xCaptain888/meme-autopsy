import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meme Autopsy — BSC Forensic Intelligence for Meme Narratives",
  description:
    "AI-powered forensic analysis for BSC meme projects. Ingests live data from DexScreener, BscScan, and four.meme. Delivers structured verdicts with explicit provenance.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Meme Autopsy — BSC Forensic Intelligence for Meme Narratives",
    description:
      "AI-powered forensic analysis for BSC meme projects. Ingests live data from DexScreener, BscScan, and four.meme. Delivers structured verdicts with explicit provenance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meme Autopsy — BSC Forensic Intelligence",
    description:
      "AI-powered forensic analysis for BSC meme projects. Ingests live data from DexScreener, BscScan, and four.meme. Delivers structured verdicts with explicit provenance.",
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
