import Footer from "@/ui/Footer";
import Icongradient from "@/ui/IconGradient";
import Navbar from "@/ui/Navbar";

export default function MainTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full flex-col overflow-x-hidden">
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 mb-8 md:mb-12 xl:mb-24">
        {children}
      </div>
      <Icongradient />
      <Footer />
    </div>
  );
}
