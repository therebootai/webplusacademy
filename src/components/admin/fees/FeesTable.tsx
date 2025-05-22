"use client";

import { IStudentType } from "@/types/StudentType";

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
    "total due",
  ];

  return <div>FeesTable</div>;
}
