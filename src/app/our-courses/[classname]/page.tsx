import courses from "@/lib/coursedata";
import MainTemplate from "@/templates/MainTemplate";
import CourseType from "@/types/CouseTypes";
import AboutCard from "@/ui/AboutCard";
import CourseCard from "@/ui/CourseCard";
import CustomHeading from "@/ui/CustomHeading";
import EnquiryForm from "@/ui/EnquiryForm";
import SubBanner from "@/ui/SubBanner";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function OurCoursesPage({
  params,
}: {
  params: Promise<{ classname: string }>;
}) {
  const { classname } = await params;

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

  const {
    course,
    relatedCourse,
  }: {
    course?: CourseType;
    relatedCourse?: CourseType;
  } = await getClassData(classname);

  if (!course) {
    notFound();
  }

  return (
    <MainTemplate>
      <SubBanner heading={classname.toUpperCase()} />
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-9 xl:px-16 lg:px-8 px-4">
        <div className="flex flex-col gap-7 lg:basis-[70%] basis-full">
          <Image
            src={course.imgsrc}
            alt={course.servicename}
            width={844}
            height={464}
            className="w-full rounded-md"
          />
          <div className="flex flex-col gap-5">
            <CustomHeading
              normal="Career You’re Passionate "
              highlight="About Is There For You!"
              className="text-xl md:text-2xl xl:text-3xl font-bold"
            />
            <p
              dangerouslySetInnerHTML={{ __html: course.pageDescription }}
              className="text-site-gray lg:text-base text-sm"
            />
            <p className="text-site-gray lg:text-base text-sm">
              <span className="text-site-darkgreen font-semibold inline">
                Eligibility:
              </span>{" "}
              {course.eligibility}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-6">
              {cardData.map((card, index) => (
                <AboutCard
                  key={index}
                  heading={card.heading}
                  para={card.para}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-7 lg:basis-[30%] basis-full">
          <EnquiryForm />
          {relatedCourse && (
            <div className="flex flex-col gap-5">
              <h1 className="text-site-darkgreen text-xl md:text-2xl xl:text-3xl font-bold">
                Related Courses
              </h1>
              <CourseCard {...relatedCourse} />
            </div>
          )}
        </div>
      </div>
    </MainTemplate>
  );
}

async function getClassData(courseName: string) {
  try {
    const course = courses.find((course) => course.href.includes(courseName));
    const relatedCourse = courses.find(
      (course) => !course.href.includes(courseName)
    );
    return { course, relatedCourse };
  } catch (error) {
    return {};
  }
}
