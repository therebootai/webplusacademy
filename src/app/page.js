import Cardsection1 from "@/components/home/Cardsection1";
import Cardsection2 from "@/components/home/Cardsection2";
import Happyasist from "@/components/home/Happyasist";
import Herobanner from "@/components/home/Herobanner";
import Ourlatest from "@/components/home/Ourlatest";
import ResultCard from "@/components/home/Resultcard";
import Resultcard from "@/components/home/Resultcard";
import StudentTestimonial from "@/components/home/Studenttestimonial";
import TabsSection from "@/components/home/Tabsection";
import Titlesection1 from "@/components/home/Titlesection1";
import Titlesection2 from "@/components/home/Titlesection2";
import Titlesection3 from "@/components/home/Titlesection3";
import Titlesection4 from "@/components/home/Titlesection4";
import Maintemplates from "@/templates/Maintemplates";

export default function Home() {
  return (
    <>
      <Maintemplates>
        <section className="px-4  md:px-40 pt-15 md:pt-0">
          <Herobanner />
          <Titlesection1 />
          <Cardsection1 />
          <TabsSection />
        </section>
        <Ourlatest />
        <section className="px-4  md:px-40">
          <Titlesection2 />

          <Cardsection2 />
          <Titlesection3 />
        </section>
        <StudentTestimonial />
        <section className="px-4  md:px-40">
          <Titlesection4 />
          <ResultCard />
         
        </section>
         <Happyasist />
      </Maintemplates>
    </>
  );
}
