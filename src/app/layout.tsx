import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});
export const metadata: Metadata = {
  title: "Best NEET, JEE coaching center in Siliguri | Wave Plus Academy",
  description:
    "WavePlus Academy is committed to providing high-quality education for aspiring medical and engineering students in Siliguri, Bagdogra",
  keywords: [
    "best coaching center in siliguri",
    "best coaching center in bagdogra",
    "WavePlus Academy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} antialiased`}>{children}</body>
    </html>
  );
}
