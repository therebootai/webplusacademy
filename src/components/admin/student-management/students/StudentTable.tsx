"use client";
import { deleteStudent } from "@/actions/studentAction";
import { IStudentType } from "@/types/StudentType";
import DisplayTable from "@/ui/DisplayTable";
import SidePopUpSlider from "@/ui/SidePopup";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import AddNewStudent from "./AddNewStudent";
import ViewStudent from "./ViewStudents";
import StudentDataPrint from "./StudentDataPrint";

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
    "Admission Date",
    "Location",
    "Guardian Number",
    "Action",
  ];
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [showPopUp, setShowPopUp] = useState(false);
  const [showViewPopUp, setShowViewPopUp] = useState("");

  const [selectedStudent, setSelectedStudent] = useState<IStudentType | null>(
    null
  );

  const [printStudent, setPrintStudent] = useState<IStudentType | null>(null);

  const handleDelete = (studentId: string) => {
    const confirmed = confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;

    startTransition(async () => {
      const res = await deleteStudent(studentId);
      if (res.success) {
        router.refresh();
      } else {
        alert("Error deleting student: " + res.message);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
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
              className="flex odd:bg-white text-sm even:bg-site-darkgreen/5 p-2.5"
              style={{
                flexBasis: `${Math.round(100 / studentsData.length)}%`,
              }}
            >
              <div className="flex-1 line-clamp-1">{student.studentName}</div>
              <div className="flex-1 line-clamp-1">{student.mobileNumber}</div>
              <div className="flex-1 line-clamp-1">
                {isCoursePopulated ? (course as any).course_name : "N/A"}
              </div>
              <div className="flex-1 line-clamp-1">
                {isBatchPopulated ? (batch as any).batch_name : "N/A"}
              </div>
              <div className="flex-1 line-clamp-1">
                {student.dateOfAdmission}
              </div>

              <div className="flex-1 line-clamp-1">
                {student.address}, {student.city}, {student.pinCode}
              </div>
              <div className="flex-1 line-clamp-1">
                {student.gurdianMobileNumber}
              </div>
              <div className="flex-1 flex gap-1 items-center">
                <button
                  onClick={() => {
                    setSelectedStudent(student);
                    setShowViewPopUp("view");
                    setShowPopUp(true);
                  }}
                  className="text-shadow-site-black"
                >
                  View
                </button>{" "}
                |
                <button
                  type="button"
                  className="text-shadow-site-black"
                  onClick={() => {
                    setSelectedStudent(student);
                    setShowViewPopUp("edit");
                    setShowPopUp(true);
                  }}
                >
                  Edit
                </button>
                |
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleDelete(student.student_id as string)}
                  disabled={isPending}
                >
                  {isPending ? "Deleting..." : "Delete"}
                </button>{" "}
                |
                <button
                  type="button"
                  onClick={() => setPrintStudent(student)}
                  className=" text-base font-medium text-blue-600"
                >
                  Print
                </button>
              </div>
            </div>
          );
        })}
      </DisplayTable>
      {selectedStudent && (
        <SidePopUpSlider
          showPopUp={showPopUp}
          handleClose={() => setShowPopUp(false)}
        >
          {showViewPopUp === "edit" && (
            <AddNewStudent
              onCancel={() => setShowPopUp(false)}
              existingStudent={selectedStudent}
              onSuccess={() => {
                router.refresh();
                setShowPopUp(false);
              }}
            />
          )}
          {showViewPopUp === "view" && (
            <ViewStudent student={selectedStudent} />
          )}
        </SidePopUpSlider>
      )}

      {printStudent && (
        <div className="fixed z-50 inset-0  h-full w-full  overflow-scroll ">
          <div className=" w-full  p-8 shadow-xl bg-black/40 relative flex justify-center items-center ">
            <button
              className="absolute top-2 right-2 size-[2rem] bg-custom-pink rounded-full flex justify-center items-center text-xl text-white hover:text-red-500"
              onClick={() => setPrintStudent(null)}
            >
              &times;
            </button>
            <div className=" w-fit">
              <StudentDataPrint
                student={printStudent}
                onClose={() => setPrintStudent(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
