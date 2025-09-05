"use client";
import useElementHeight from "@/hooks/useElementHeight";
import CustomHeading from "@/ui/CustomHeading";
import Image from "next/image";

export default function EmpoweringMinds() {
  const [imageHeight, contentRef] = useElementHeight<HTMLDivElement>();

  const facilities = [
    {
      title: "Smarter NEET Preparation at Siliguri.",
      desc: "We make complicated things easy and entertaining through the use of digital boards and audio-visual aids to bring ideas into life.",
    },
    {
      title: "Guidance from the Best Teachers in Siliguri",
      desc: "With confidence, our students understand all their subjects taught by our highly qualified mentors who guide them one-on-one.",
    },
    {
      title: "24/7 Doubt Help – Anytime, Anywhere",
      desc: "Students who are 24/7 doubt-clearing do not feel trapped. Real-time assistance increases confidence and makes the learning process easy.",
    },
    {
      title: "Individualized Study Programs to each Aspirant.",
      desc: "Each student is unique. That is why we create individual learning programs to suit their learning style, strengths, and career objectives.",
    },
    {
      title: "Test Your Exam Skills with Mock Tests.",
      desc: "We offer full-length NEET mock tests with real-time feedback to enable students to enhance accuracy, speed and test temperament.",
    },
    {
      title: "Better NEET Study Material.",
      desc: "We update our notes, practice papers and test papers with the new NEET exam patterns to ensure full preparation.",
    },
    {
      title: "Better Focus with Limited Students",
      desc: "Our batch sizes are kept as small as possible and each student receives personal attention and more participation in the classroom.",
    },
    {
      title: "Motivation Workshops to Have You Motivated.",
      desc: "The weekly growth and mindset therapy sessions ensure the students remain positive, disciplined and focused on their NEET process.",
    },
    {
      title: "WavePlus Academy- The Best NEET Coaching Academy in Siliguri.",
      desc: "Though the number of NEET coaching academies in Siliguri is quite high, WavePlus Academy will remain unique due to its holistic development, personal mentoring, and academic excellence.",
    },
  ];
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-3.5">
        <h3 className="text-site-darkgreen xl:text-base md:text-sm text-xs">
          Empowering Minds, Shaping Futures
        </h3>
        <CustomHeading
          normal="Waveplus Academy: Elevating Excellence "
          highlight="Through Premier Facilities"
          className="font-bold xl:text-3xl"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div
          className="relative flex bg-site-darkgreen lg:basis-1/2 basis-full rounded-md"
          style={{ height: `${imageHeight}px` }}
        >
          <Image
            src="/custom-bg/facility-bg.png"
            alt="Facility"
            fill
            className="object-cover opacity-20 rounded-md"
          />
          <div className="absolute inset-0 flex justify-center">
            <svg
              width="2"
              height="1em"
              viewBox="0 0 2 548"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-1/2 -translate-x-1/2 h-full"
            >
              <line
                x1="1"
                y1="-4.37114e-08"
                x2="1.00002"
                y2="548"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
            </svg>
            <svg
              width="1em"
              height="2"
              viewBox="0 0 628 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[33%] -translate-y-[33%] left-0 w-full"
            >
              <line
                y1="1"
                x2="628"
                y2="1"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
            </svg>
            <svg
              width="1em"
              height="2"
              viewBox="0 0 628 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[66%] -translate-y-[66%] left-0 w-full"
            >
              <line
                y1="1"
                x2="628"
                y2="1"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
            </svg>

            <div className="grid grid-cols-2 justify-items-center basis-full">
              {[
                {
                  title: "1800+",
                  description:
                    "Happy Students Trusted by thousands of learners across all levels..",
                },
                {
                  title: "170+",
                  description:
                    "Expert-Led Courses Diverse programs designed to suit every interest and career path.",
                },
                {
                  title: "700+",
                  description:
                    "Certified Teachers Qualified mentors dedicated to quality education and personal growth.",
                },
                {
                  title: "1200+",
                  description:
                    "Awards & Achievements Recognized for excellence in education and innovation.",
                },
                {
                  title: "95%",
                  description:
                    "Placement Success Strong industry connections with high placement rates.",
                },
                {
                  title: "24x7",
                  description:
                    "Student Support Round-the-clock assistance for academic and career guidance.",
                },
              ].map((item, index) => (
                <div
                  className="flex flex-col items-center justify-center w-56 h-36 my-auto"
                  key={index}
                >
                  <h1 className="text-center text-site-yellow font-bold xl:text-4xl md:text-3xl text-lg">
                    {item.title}
                  </h1>
                  <p className="text-center text-white lg:text-base text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          ref={contentRef}
          className="flex flex-col gap-5 lg:basis-1/2 basis-full"
        >
          {facilities.map((facility, index) => (
            <FacilityCard
              key={index}
              title={facility.title}
              desc={facility.desc}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FacilityCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3 group">
      <div className="w-2 group-odd:bg-site-darkgreen group-even:bg-site-yellow rounded-md" />
      <div className="flex flex-col gap-3.5">
        <h1 className="text-site-darkgreen font-bold xl:text-xl md:text-lg text-base">
          {title}
        </h1>
        <p className="text-site-gray xl:text-base sm:text-sm text-xs">{desc}</p>
      </div>
    </div>
  );
}
