import MainTemplate from "@/templates/MainTemplate";
import CustomHeading from "@/ui/CustomHeading";
import SubBanner from "@/ui/SubBanner";
import Image from "next/image";
import { HiMiniCheckBadge } from "react-icons/hi2";

export default function FacilitiesPage() {
  return (
    <MainTemplate>
      <SubBanner heading="Our Facilities" />
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 xl:px-16 lg:px-8 px-4">
        <div className="flex flex-col lg:flex-row gap-5">
          <Image
            src="/extra/HostelFacility.jpg"
            alt="Hostel Facility"
            width={636}
            height={464}
            className="object-cover rounded lg:basis-1/2 basis-full"
          />
          <Image
            src="/extra/TeachingMethodologies.jpg"
            alt="Teaching Methodologies"
            width={636}
            height={464}
            className="object-cover rounded lg:basis-1/2 basis-full"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          {[
            {
              title: "Hostel Facility",
              desc: "WavePlus Academy offers a comfortable and secure hostel facility for outstation students, ensuring a conducive environment for academic focus. The hostels are well-equipped with essential amenities such as clean and spacious rooms, 24/7 water supply, and Wi-Fi connectivity to facilitate uninterrupted study sessions. The accommodation is designed to offer a homely atmosphere with proper meals, ensuring students' overall well-being. Safety and security are a top priority, with round-the-clock supervision and access to medical care when needed. With dedicated study areas and recreational spaces, students can balance academics and relaxation. This facility enables students to concentrate fully on their studies without distractions, helping them achieve their academic goals with ease and comfort.",
            },
            {
              title: "Teaching Methodologies",
              desc: "WavePlus Academy follows an innovative and student-centered teaching approach. The experienced faculty combines conceptual clarity with practical applications, ensuring that students grasp complex topics effortlessly. Classes are interactive, with regular discussions, doubt-clearing sessions, and personalized attention to cater to each student’s unique learning pace. The academy integrates modern teaching tools, multimedia resources, and real-time problem-solving techniques to engage students. The focus is on building strong fundamentals and exam strategies, helping students develop critical thinking and problem-solving skills. Regular assessments, quizzes, and feedback ensure continuous progress tracking. With a blend of traditional and modern methods, WavePlus Academy ensures students are fully prepared for competitive exams and their future academic pursuits.",
            },
          ].map((item, index) => (
            <div className="flex flex-col gap-5" key={index}>
              <h1 className="xl:text-3xl md:text-2xl text-xl text-site-darkgreen font-bold">
                {item.title}
              </h1>
              <p className="text-site-gray xl:text-base sm:text-sm text-xs text-justify">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          {[
            {
              title: {
                normal: "Why Choose Our ",
                highlighted: "Hostel Facilities",
              },
              points: [
                "Safe, Secured Living Spaces",
                "Nutritious, Homely Daily Meals",
                "24/7 Power Backup Facility",
                "Hygienic Rooms and Bathrooms",
                "Study-Friendly Environment",
                "On-Campus Warden Supervision",
              ],
            },
            {
              title: {
                normal: "Why Choose Our ",
                highlighted: "Teaching Methodologies",
              },
              points: [
                "Daily Practice With Feedback",
                "Topic-Wise Mock Tests",
                "Result-Oriented Study Plans",
                "Real-World Application Focus",
                "Concepts Made Crystal Clear",
                "Personalized Doubt Solving",
              ],
            },
          ].map((item, index) => (
            <div
              className="flex flex-col gap-5 lg:basis-1/2 basis-full"
              key={index}
            >
              <CustomHeading
                normal={item.title.normal}
                highlight={item.title.highlighted}
                className="font-bold"
              />
              <div className="grid grid-cols-2 gap-3.5">
                {item.points.map((point, ind) => (
                  <p
                    className="text-site-darkgreen xl:text-xl md:text-lg text-base inline-flex items-center gap-2"
                    key={ind}
                  >
                    <HiMiniCheckBadge className="shrink-0" /> {point}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainTemplate>
  );
}
