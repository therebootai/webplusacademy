import AuthContextProvider from "@/context/AuthContext";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/reboots");
  }
  return (
    <main
      className={`${plusJakartaSans.variable} font-plus-jakarta-sans antialiased`}
    >
      <AuthContextProvider>{children}</AuthContextProvider>
    </main>
  );
}
