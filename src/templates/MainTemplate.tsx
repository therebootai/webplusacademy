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
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 mt-[4.5rem] md:mt-[5rem] xxl:mt-[6rem]">
        {children}
      </div>
      <Icongradient />
      <Footer />
    </div>
  );
}
