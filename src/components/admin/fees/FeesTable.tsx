"use client";

import { IStudentType } from "@/types/StudentType";
import DisplayTable from "@/ui/DisplayTable";
import { FaCheckCircle, FaClock } from "react-icons/fa";

export default function FeesTable({
  studentsData,
}: {
  studentsData: IStudentType[];
}) {
  const tableHeader = [
    "student name",
    "Mobile Number",
    "Hostel fees",
    "Course Fees",
    ...Array.from({ length: 4 }, (_, index) => `EMI ${index + 1}`),
    "total due",
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
          >
            <div
              className="flex-1"
              style={{ flexBasis: `${Math.round(100 / tableHeader.length)}%` }}
            >
              {student.studentName}
            </div>
            <div
              className="flex-1"
              style={{ flexBasis: `${Math.round(100 / tableHeader.length)}%` }}
            >
              {student.mobileNumber}
            </div>
            <div
              className="flex-1"
              style={{ flexBasis: `${Math.round(100 / tableHeader.length)}%` }}
            >
              {student.courseFees.totalAmount}
            </div>
            {Array.from({ length: 4 }).map((_, index) => {
              const emi = student.courseFees.emis[index];

              return (
                <div
                  key={index}
                  className="flex-1 inline-flex items-center justify-center gap-2"
                  style={{
                    flexBasis: `${Math.round(100 / tableHeader.length)}%`,
                  }}
                >
                  {emi ? (
                    <>
                      {emi.paid ? (
                        <FaCheckCircle className="text-green-600 text-base" />
                      ) : (
                        <FaClock className="text-red-600 text-base" />
                      )}
                      {emi.amount}
                    </>
                  ) : (
                    <>-</>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </DisplayTable>
  );
}
