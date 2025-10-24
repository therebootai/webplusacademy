import AboutUsSection from "@/components/about-us/AboutUsSection";
import EmpoweringMinds from "@/components/about-us/EmpoweringMinds";
import MainTemplate from "@/templates/MainTemplate";
import SubBanner from "@/ui/SubBanner";

export default function AboutUsPage() {
  return (
    <MainTemplate>
      <SubBanner heading="About Us" />
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 xl:px-16 lg:px-8 px-4 my-6">
        <AboutUsSection />
        <EmpoweringMinds />
      </div>
    </MainTemplate>
  );
}
