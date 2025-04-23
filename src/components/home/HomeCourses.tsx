import courses from "@/lib/coursedata";
import CourseCard from "@/ui/CourseCard";
import CustomHeading from "@/ui/CustomHeading";

export default function HomeCourses() {
  return (
    <div className="flex flex-col gap-7 items-center">
      <div className="flex flex-col gap-3.5 items-center">
        <h3 className="text-site-darkgreen xl:text-base md:text-sm text-xs text-center">
          Career-driven learning paths
        </h3>
        <CustomHeading
          normal="Master Your Future with "
          highlight="Waveplus Academy"
          className="font-bold xl:text-3xl"
        />
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:gap-6">
        {courses.map((course) => (
          <CourseCard {...course} key={course.servicename} />
        ))}
      </div>
    </div>
  );
}
