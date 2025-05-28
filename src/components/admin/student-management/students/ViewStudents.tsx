"use client";

import { IStudentType } from "@/types/StudentType";
import React from "react";

export default function ViewStudent({ student }: { student: IStudentType }) {
  const studentInfo = student.studentData[0];
  const course = studentInfo?.currentCourse;
  const batch = studentInfo?.currentBatch;

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

      <h2 className="text-lg font-bold pt-4">Installment Details</h2>
      <ul className="list-disc pl-6">
        {Array.isArray(student.courseFees) && student.courseFees.length > 0 ? (
          student.courseFees.map((course) =>
            Array.isArray(course.emis) ? (
              course.emis.map((emi) => (
                <li key={emi._id}>
                  Installment {emi.installmentNumber}: ₹{emi.amount} -{" "}
                  {emi.paid ? "Paid" : "Pending"}
                </li>
              ))
            ) : (
              <li key={course._id || "no-emis"}>
                No EMIs found for this course
              </li>
            )
          )
        ) : (
          <li>No installment data available.</li>
        )}
      </ul>
    </div>
  );
}
