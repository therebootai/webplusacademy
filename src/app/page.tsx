import AboutUsSection from "@/components/about-us/AboutUsSection";
import EmpoweringMinds from "@/components/about-us/EmpoweringMinds";
import HomeBadges from "@/components/home/HomeBadges";
import HomeCourses from "@/components/home/HomeCourses";
import HomeHero from "@/components/home/HomeHero";
import HomeTestimonial from "@/components/home/HomeTestimonial";
import NoticeSection from "@/components/home/NoticeSection";
import OurStudentSection from "@/components/home/OurStudentSection";
import MainTemplate from "@/templates/MainTemplate";

export default function Home() {
  return (
    <MainTemplate>
      <HomeHero />
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 xl:gap-20 xxl:gap-28 xl:py-16 lg:py-8 py-4 xxxl:px-40 xxl:py-20 xxl:px-32 xl:px-24 xlg:px-16 lg:px-8 px-4">
        <HomeBadges />
        <HomeCourses />
      </div>
      <NoticeSection />
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 xl:gap-20 xxl:gap-28 xl:py-16 lg:py-8 py-4 xxxl:px-40 xxl:py-20 xxl:px-32 xl:px-24 xlg:px-16 lg:px-8 px-4">
        <AboutUsSection />

        <OurStudentSection />

        <EmpoweringMinds />
        <HomeTestimonial />
      </div>
    </MainTemplate>
  );
}
