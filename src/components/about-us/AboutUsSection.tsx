import AboutCard from "@/ui/AboutCard";
import CustomHeading from "@/ui/CustomHeading";
import EnquiryForm from "@/ui/EnquiryForm";

export default function AboutUsSection() {
  const cardData = [
    {
      heading: "Top-Notch Faculty – Learn from the Best",
      para: "Tough concepts are made simple, and personal guidance is provided by our highly experienced teachers so that each student can perform well with confidence.",
    },
    {
      heading: "Grow Beyond Academics - Personality Development.",
      para: "We do not simply train you to pass tests - we train you to live. Having the main orientation on communication and general development, we assist you to be sure and balanced.",
    },
    {
      heading: "Reading & Feedback- Frequent Assessment.",
      para: "Constant exams, periodic progress reports, and doubt-busters will keep you informed on all the concepts and ready to take the exam.",
    },
    {
      heading: "Everything You Need - Complete Course Plans.",
      para: "NEET and JEE, Class XI and XII boards are all within our range. You will be well prepared with the ideal mix of theory and practical learning.",
    },
    {
      heading: "Smarter Learning - Revised Learning Content.",
      para: "Professionally created notes, practice papers, and exam mock tests provide an advantage over the other applicants and help you score higher on your actual exam.",
    },
    {
      heading: "Smart Classrooms – Study in Comfort",
      para: "Learning is interesting, productive, and enjoyable in our classrooms, which are equipped with the best facilities and tools and web-based care.",
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex flex-col gap-5 lg:basis-3/5 basis-full">
        <div className="flex flex-col gap-3.5">
          <h3 className="text-site-darkgreen xl:text-base md:text-sm text-xs">
            About Waveplus Academy
          </h3>
          <CustomHeading
            normal="Looking for the Best   "
            highlight="NEET Coaching in Siliguri?"
            className="font-bold xl:text-3xl"
          />
        </div>
        <p className="text-site-gray lg:text-sm xxl:text-base text-sm">
          When you are a student aspiring to become a doctor, then the first
          thing you will come across is that you have to decide on the best NEET
          coaching in Siliguri. <br />
          And, frankly speaking, we know it is not easy. It is so confusing with
          so many institutes out there promising success.
          <br /> However, here is the thing, success in NEET does not come by
          promises, it comes by the right guidance, setting and preparation.
          That is what we are addressing. <br />
          We do not teach at WavePlus Academy, we mentor. We have not only the
          experienced but also the enthusiastic members of the faculty because
          they are keen on ensuring that the experiences of the students are
          smooth and goal-oriented.
          <br />
          As one of the most reputable coaching centers in the area, we are
          situated in Bagdogra, Darjeeling, and are well-known for offering the
          best NEET coaching in Siliguri. We have assisted students over the
          years in realizing their full potential, gaining self-assurance, and
          achieving the outcomes they have strived for. <br />
          Coaching in this case is never of the one-size-fits-all type. Students
          are unique in their strengths and weaknesses and thus we ensure that
          learning is personal, clear, and productive. Therefore, when you are
          serious about cracking NEET, then it is not advisable to choose an
          institute randomly. Select the one with the focus upon you. Select one
          that is a mix of professional guidance, good course content, frequent
          feedback and general development. That is why students refer to
          WavePlus Academy as the best NEET coaching in Siliguri - we do not
          simply teach success, we create it one step at a time.
        </p>
        <div className="flex flex-col gap-4">
          <h1 className=" text-xl font-semibold text-site-darkgreen">
            What We Offer
          </h1>
          <div className=" flex flex-col gap-2 text-sm xxl:text-base ">
            <div>
              <strong>NEET UG Preparation Programs -</strong> Preparation
              programs are offered to those who wish to enter the medical field.
            </div>
            <div>
              <strong>Integrated Coaching of Class XI & XII -</strong> The ideal
              combination of board exam preparation and competitive exam
              coaching.
            </div>
            <div>
              <strong>Special Classes in Class IX and X -</strong>Building a
              solid foundation at an early age so that students can perform
              better in future studies.
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {cardData.map((card, index) => (
            <AboutCard key={index} heading={card.heading} para={card.para} />
          ))}
        </div>
      </div>
      <div className="lg:basis-2/5 basis-full">
        <EnquiryForm />
      </div>
    </div>
  );
}
