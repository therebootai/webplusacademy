import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});
export const metadata: Metadata = {
  title:
    "NEET Coaching in Siliguri | WavePlus Academy - Expert Guidance & Results",
  description:
    "Looking for top NEET coaching in Siliguri? WavePlus Academy offers expert-led coaching for NEET aspirants, combining personalized mentorship, comprehensive study materials, and a proven track record of success. Join us today to kickstart your journey to medical excellence!",
  keywords: [
    "best coaching center in siliguri",
    "best coaching center in bagdogra",
    "NEET Coaching in siliguri",
    "best neet coaching in siliguri",
    "top neet coaching institutes in siliguri",
    "neet preparation in siliguri",
    "affordable neet coaching siliguri",
    "medical entrance coaching in siliguri",
    "waveplus academy siliguri",
    "neet crash course siliguri",
    "neet foundation course siliguri",
    "class 11 neet coaching siliguri",
    "class 12 neet coaching siliguri",
    "jee and neet coaching siliguri",
    "top coaching for neet in siliguri",
    "neet exam preparation bagdogra",
    "physics chemistry biology coaching siliguri",
    "neet offline coaching siliguri",
    "neet online coaching siliguri",
    "best neet results siliguri",
    "siliguri neet success stories",
    "experienced neet faculty siliguri",
    "personalized neet guidance siliguri",
    "neet coaching with hostel facility siliguri",
    "neet coaching with test series siliguri",
    "best neet coaching darjeeling district",
    "top medical coaching institute siliguri",
    "Waveplus Academy",
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
