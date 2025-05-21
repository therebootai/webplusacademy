import AuthContextProvider from "@/context/AuthContext";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`${plusJakartaSans.className} font-plus-jakarta-sans antialiased`}
    >
      <AuthContextProvider>{children}</AuthContextProvider>
    </main>
  );
}
