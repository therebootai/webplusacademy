import AboutUsSection from "@/components/about-us/AboutUsSection";
import EmpoweringMinds from "@/components/about-us/EmpoweringMinds";
import HomeBadges from "@/components/home/HomeBadges";
import HomeCourses from "@/components/home/HomeCourses";
import HomeHero from "@/components/home/HomeHero";
import MainTemplate from "@/templates/MainTemplate";

export default function Home() {
  return (
    <MainTemplate>
      <HomeHero />
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 xl:px-16 lg:px-8 px-4">
        <HomeBadges />
        <AboutUsSection />
        <HomeCourses />
        <EmpoweringMinds />
      </div>
    </MainTemplate>
  );
}
