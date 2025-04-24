import AboutCard from "@/ui/AboutCard";
import CustomHeading from "@/ui/CustomHeading";
import EnquiryForm from "@/ui/EnquiryForm";

export default function AboutUsSection() {
  const cardData = [
    {
      heading: "Expert Faculty Guidance",
      para: "Dedicated, experienced teachers help students excel with personalized coaching, tailored to meet individual learning needs.",
    },
    {
      heading: "Comprehensive Course Structure",
      para: "Programs designed for NEET, JEE, and board exams, integrating theory and practical to ensure thorough preparation.",
    },
    {
      heading: "Holistic Personality Development",
      para: "Beyond academics, we build confident, well-rounded individuals with strong personality and communication skills.",
    },
    {
      heading: "Top-notch Study Material",
      para: "Updated, exam-focused resources and mock tests designed by experts to ensure in-depth understanding and top scores.",
    },
    {
      heading: "Regular Assessments & Feedback",
      para: "Continuous evaluations, personalized feedback, and doubt-clearing sessions to track progress and ensure concept mastery.",
    },
    {
      heading: "State-of-the-art Facilities",
      para: "Equipped classrooms, advanced teaching tools, and online resources that support an immersive and engaging learning experience.",
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
            normal="Career You're Passionate "
            highlight="About Is There For You!"
            className="font-bold xl:text-3xl"
          />
        </div>
        <p className="text-site-gray lg:text-base text-sm">
          WavePlus Academy is a premier coaching institute dedicated to
          providing high-quality education for students aspiring to pursue
          careers in the medical and engineering fields. Located in Bagdogra,
          Darjeeling, the academy offers a range of programs that cater to
          students at various educational levels. Their courses include
          preparatory programs for NEET UG, integrated coaching for Class XI &
          XII, and specialized classes for Class IX & X, ensuring a
          comprehensive approach to both board exams and competitive entrance
          exams. <br />
          With a focus on holistic development, WavePlus Academy emphasizes
          personality development, regular assessments, and personalized
          attention. The academy&apos;s team of highly qualified faculty members
          provides expert guidance, using the latest study materials and
          techniques to help students excel. WavePlus Academy is committed to
          shaping students into successful professionals by fostering both
          academic excellence and character development. Visit their website for
          more details and to apply for their programs today.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-6">
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
