import { CourseDocument } from "@/models/Courses";
import { IStudentType } from "@/types/StudentType";
import DisplayTable from "@/ui/DisplayTable";

export default function StudentTable({
  studentsData,
}: {
  studentsData: IStudentType[];
}) {
  const tableHeader = [
    "name",
    "Mobile Number",
    "Course",
    "Batch",
    "Location",
    "Guardian Number",
    "Action",
  ];
  return (
    <DisplayTable tableHeader={tableHeader}>
      {studentsData.map((student) => {
        const studentInfo = student.studentData[0];

        const course = studentInfo?.currentCourse;
        const batch = studentInfo?.currentBatch;

        const isCoursePopulated =
          course && typeof course === "object" && "_id" in course;
        const isBatchPopulated =
          batch && typeof batch === "object" && "_id" in batch;

        return (
          <div
            key={student._id as string}
            className="flex odd:bg-white even:bg-site-darkgreen/5 p-2.5"
            style={{ flexBasis: `${Math.round(100 / studentsData.length)}%` }}
          >
            <div className="flex-1">{student.studentName}</div>
            <div className="flex-1">{student.mobileNumber}</div>
            <div className="flex-1">
              {isCoursePopulated ? (course as any).course_name : "N/A"}
            </div>
            <div className="flex-1">
              {isBatchPopulated ? (batch as any).batch_name : "N/A"}
            </div>
            <div className="flex-1">
              {student.address}, {student.city}, {student.pinCode}
            </div>
            <div className="flex-1">{student.gurdianMobileNumber}</div>
            <div className="flex-1 flex gap-1 items-center">
              <button type="button" className="text-shadow-site-black">
                Edit
              </button>
              |
              <button type="button" className="text-red-500">
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </DisplayTable>
  );
}
