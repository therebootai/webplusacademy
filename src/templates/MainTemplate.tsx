import Footer from "@/ui/Footer";
import Icongradient from "@/ui/IconGradient";
import Navbar from "@/ui/Navbar";
import OnlyMobile from "./OnlyMobile";

export default function MainTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full flex-col overflow-x-hidden">
      <div className="z-[1000] w-full">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="lg:mt-[5rem] md:mt-[5rem] mt-[2rem]">{children}</div>
      <OnlyMobile />

      <Icongradient />
      <Footer />
    </div>
  );
}
