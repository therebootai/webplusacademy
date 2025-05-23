"use client";

import { IStudentType } from "@/types/StudentType";
import DisplayTable from "@/ui/DisplayTable";
import { useState } from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import EditFees from "./EditFees";
import { updateCourseFees, updateHostelFees } from "@/actions/studentAction";

export default function FeesTable({
  studentsData,
  mon,
  year,
}: {
  studentsData: IStudentType[];
  mon?: string;
  year?: string;
}) {
  const [showHostelEdit, setShowHostelEdit] = useState(false);

  const tableHeader = [
    "student name",
    "Mobile Number",
    "Hostel fees",
    "Course Fees",
    ...Array.from({ length: 4 }, (_, index) => `EMI ${index + 1}`),
    "total due",
  ];

  async function updateStudentHostelFees(
    studentId: string,
    studentDataId: string,
    receiptFile?: File,
    hostelFeeMonth?: {
      month: string;
      year: string;
      amount: number;
    }
  ) {
    try {
      const updateResult = await updateHostelFees(
        studentId,
        studentDataId,
        hostelFeeMonth,
        receiptFile,
        "add"
      );
      if (!updateResult.success) {
        throw new Error(updateResult.message);
      }
      return updateResult;
    } catch (error: any) {
      console.log(error);
      alert(error.message);
      return { success: false, message: error.message };
    }
  }

  async function removeHostelFees(
    studentId: string,
    studentDataId: string,
    hostelFeeMonth?: {
      month: string;
      year: string;
      amount: number;
    }
  ) {
    const confirmed = confirm(
      "Are you sure you want to change hostel fees status?"
    );
    if (!confirmed) return;

    try {
      const updateResult = await updateHostelFees(
        studentId,
        studentDataId,
        hostelFeeMonth,
        undefined,
        "remove"
      );
      if (!updateResult.success) {
        throw new Error(updateResult.message);
      }
      return updateResult;
    } catch (error: any) {
      console.log(error);
      alert(error.message);
      return { success: false, message: error.message };
    }
  }

  async function updateEMIFees(
    studentId: string,
    emiId: string,
    paid: boolean,
    extra: string | undefined = ""
  ) {
    const confirmed = confirm(`Are you sure you want to change ${extra} ?`);
    if (!confirmed) return;

    try {
      const updateResult = await updateCourseFees(studentId, emiId, paid);
      if (!updateResult.success) {
        throw new Error(updateResult.message);
      }
      return updateResult;
    } catch (error: any) {
      console.log(error);
      alert(error.message);
      return { success: false, message: error.message };
    }
  }

  return (
    <DisplayTable tableHeader={tableHeader}>
      {studentsData.map((student) => {
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
              className="flex-1 relative"
              style={{ flexBasis: `${Math.round(100 / tableHeader.length)}%` }}
            >
              {student.studentData.map((data: any, index) => {
                const { hostelFees } = data;

                // Get current month and year
                const now = new Date();
                const currentMonth = mon
                  ? mon
                  : now.toLocaleString("default", {
                      month: "long",
                    }); // e.g., "May"
                const currentYear = year ? year : now.getFullYear();

                const isPaid = hostelFees?.monthsDue.some(
                  (m: { month: string; year: number }) =>
                    m.month === currentMonth && m.year === currentYear
                );

                return (
                  <div
                    className={`inline-flex items-center gap-2 relative`}
                    key={index}
                  >
                    {isPaid ? (
                      <button
                        type="button"
                        onClick={() =>
                          removeHostelFees(
                            student._id as string,
                            data?._id ?? "",
                            hostelFees?.monthsDue.find(
                              (m: { month: string; year: number }) =>
                                m.month === currentMonth &&
                                m.year === currentYear
                            )
                          )
                        }
                      >
                        <FaCheckCircle className="text-green-600 text-base" />
                      </button>
                    ) : (
                      <FaClock className="text-red-600 text-base" />
                    )}
                    {hostelFees?.monthlyAmount}
                    <button
                      type="button"
                      onClick={() => {
                        setShowHostelEdit(!showHostelEdit);
                      }}
                      className="text-xs text-site-darkgreen p-1 bg-white border borde-[#eeeeee] rounded-full"
                    >
                      <RiEdit2Line />
                    </button>
                    {showHostelEdit && student._id && (
                      <div className="absolute top-[calc(100%_+_0.75rem)] left-1/2 -translate-x-1/2">
                        <EditFees
                          helper={(hostelFeeMonth: any, receiptFile?: File) =>
                            updateStudentHostelFees(
                              student._id as string,
                              data?._id ?? "",
                              receiptFile,
                              hostelFeeMonth
                            )
                          }
                          handleClose={() => setShowHostelEdit(false)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
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
                  className="flex-1 inline-flex items-center gap-2"
                  style={{
                    flexBasis: `${Math.round(100 / tableHeader.length)}%`,
                  }}
                >
                  {emi ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          updateEMIFees(
                            student._id as string,
                            emi._id ?? "",
                            !emi.paid,
                            `EMI ${index + 1}`
                          )
                        }
                      >
                        {emi.paid ? (
                          <FaCheckCircle className="text-green-600 text-base" />
                        ) : (
                          <FaClock className="text-red-600 text-base" />
                        )}
                      </button>
                      {emi.amount}
                    </>
                  ) : (
                    <p className="text-center">-</p>
                  )}
                </div>
              );
            })}
            <div
              className="flex-1"
              style={{ flexBasis: `${Math.round(100 / tableHeader.length)}%` }}
            >
              {student.courseFees.emis
                .filter((emi) => !emi.paid)
                .reduce((sum, emi) => sum + (emi.amount ?? 0), 0)}
            </div>
          </div>
        );
      })}
    </DisplayTable>
  );
}
