import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meme Autopsy — Forensic Intelligence Engine",
  description:
    "An AI forensic engine that diagnoses why meme projects go viral, decay, or die.",
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
