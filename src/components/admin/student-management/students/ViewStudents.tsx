"use client";

import { AttendanceDocument } from "@/models/Attendance";
import { IStudentType } from "@/types/StudentType";
import { getDaysCountInMonth } from "@/util/ListOfDays";
import React, { useMemo, useState } from "react";
import DatePicker from "react-datepicker";

export default function ViewStudent({ student }: { student: IStudentType }) {
  const [monthYear, setMonthYear] = useState<Date | null>(new Date());

  const studentInfo = student.studentData[0];
  const course = studentInfo?.currentCourse;
  const batch = studentInfo?.currentBatch;
  const attendance = studentInfo?.attendance_id;

  const daysCount = useMemo(() => {
    if (monthYear) {
      return getDaysCountInMonth(monthYear.toISOString());
    }
    return 0;
  }, [monthYear]);

  return (
    <div className="p-4 flex flex-col gap-4 text-sm relative">
      <h2 className="text-lg font-bold">Student Information</h2>
      <div>
        <strong>ID:</strong> {student.student_id}
      </div>
      <div>
        <strong>Name:</strong> {student.studentName}
      </div>
      <div>
        <strong>Mobile Number:</strong> {student.mobileNumber}
      </div>
      <div>
        <strong>Date of Birth:</strong> {student.dateOfBirth}
      </div>
      <div>
        <strong>Guardian Name:</strong> {student.gurdianName}
      </div>
      <div>
        <strong>Guardian Mobile:</strong> {student.gurdianMobileNumber}
      </div>
      <div>
        <strong>Gender:</strong> {student.gender}
      </div>
      <div>
        <strong>Address:</strong> {student.address}, {student.city},{" "}
        {student.pinCode}
      </div>
      <div>
        <strong>Caste:</strong> {student.caste}
      </div>

      <h2 className="text-lg font-bold pt-4">Education</h2>
      <div>
        <strong>Class 10 School:</strong> {student.class10SchoolName} (
        {student.class10PassYear})
      </div>
      <div>
        <strong>Class 12 School:</strong> {student.class12SchoolName} (
        {student.class12PassYear})
      </div>

      <h2 className="text-lg font-bold pt-4">Course Details</h2>
      <div>
        <strong>Course:</strong> {(course as any)?.course_name || "N/A"}
      </div>
      <div>
        <strong>Batch:</strong> {(batch as any)?.batch_name || "N/A"}
      </div>
      <div>
        <strong>Book Fees:</strong> {studentInfo?.bookFees}
      </div>
      <div>
        <strong>Hostel Fees:</strong> ₹{studentInfo?.hostelFees?.monthlyAmount}
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold pt-4">Attendance Details</h2>
        <div className="bg-site-litegreen/5 rounded-md flex gap-2 items-center px-2 relative">
          <DatePicker
            selected={monthYear}
            name="attendance_month"
            onChange={(date) => setMonthYear(date)}
            placeholderText="Choose attendence month and year"
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            className="h-[2rem] !w-full outline-none placeholder:text-site-gray !flex-1 placeholder:capitalize"
          />
        </div>
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {Array.from({ length: daysCount }).map((_, dayIndex) => {
          const currentDayAttendance = attendance.find(
            (att: any) =>
              typeof att === "object" &&
              "attendance_date" in att &&
              att.attendance_date === dayIndex + 1 &&
              att.attendance_month ===
                monthYear?.toLocaleString("default", {
                  month: "long",
                }) &&
              att.attendance_year === monthYear?.getFullYear().toString()
          );
          const status = (currentDayAttendance as AttendanceDocument)
            ?.attendance_status; // Get status for this specific day

          return (
            <div key={dayIndex} className="relative flex">
              <button
                className={`size-7 rounded-xl relative ${
                  status === "present" && "bg-[#00D59D]"
                } ${status === "absent" && "bg-[#E10000]"} ${
                  status === "leave" && "bg-yellow-400" // Added a color for leave
                } ${!status && "bg-[#F0F0F0]"}`}
              >
                {status === "present" && "P"}
                {status === "absent" && "A"}
                {status === "leave" && "L"}
                {!status && dayIndex + 1}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
