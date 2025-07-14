"use client";

import { IStudentType } from "@/types/StudentType";
import DisplayTable from "@/ui/DisplayTable";
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import EditFees from "./EditFees";
import { updateCourseFees, updateHostelFees } from "@/actions/studentAction";
import { useRouter } from "next/navigation";
import EditCourseFees from "./EditCourseFees";
import { IoIosEye } from "react-icons/io";
import ViewCourseFees from "./ViewCourseFees";
import ViewHostelFees from "./ViewHostelFees";
import useClickOutside from "@/hooks/useClickOutside";

export default function FeesTable({
  studentsData,
  mon,
  year,
}: {
  studentsData: IStudentType[];
  mon?: string;
  year?: string;
}) {
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const router = useRouter();
  const [editingEmi, setEditingEmi] = useState<{
    studentId: string;
    studentDataId: string;
    courseFeeId: string;
    emiId: string;
    emiData: any;
  } | null>(null);

  const [viewingEmi, setViewingEmi] = useState<{
    emiData: any;
  } | null>(null);
  const [viewingHostel, setViewingHostel] = useState<{
    hostelData: any;
  } | null>(null);

  const popupRef = useClickOutside<HTMLDivElement>(() => {
    setEditingStudentId(null);
    setEditingEmi(null);
    setViewingEmi(null);
    setViewingHostel(null);
  });

  const tableHeader = [
    "student name",
    "Mobile Number",
    "Hostel fees",
    "Course Fees",
    ...Array.from({ length: 5 }, (_, index) => `EMI ${index + 1}`),
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
      if (updateResult.success) {
        router.refresh();
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
            className="flex gap-2 text-sm odd:bg-white even:bg-site-darkgreen/5 p-2.5"
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

                const now = new Date();
                const currentMonth =
                  mon ?? now.toLocaleString("default", { month: "long" });
                const currentYear = Number(year) || now.getFullYear();

                const paidMonth = hostelFees?.monthsDue?.find(
                  (m: any) => m.month === currentMonth && m.year === currentYear
                );

                const isPaid = hostelFees?.monthsDue.some(
                  (m: { month: string; year: number }) =>
                    m.month === currentMonth && m.year === currentYear
                );

                return (
                  <div
                    className={`inline-flex items-center gap-1 relative`}
                    key={index}
                  >
                    {isPaid ? (
                      <button type="button">
                        <FaCheckCircle className="text-green-600 text-sm" />
                      </button>
                    ) : (
                      <FaClock className="text-red-600 text-sm" />
                    )}

                    <span
                      className={paidMonth ? "text-green-700" : "text-red-500"}
                    >
                      ₹{paidMonth?.amount ?? hostelFees?.monthlyAmount ?? "-"}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingStudentId(student._id as string);
                      }}
                      className="text-xs text-site-darkgreen  size-4 flex justify-center items-center  bg-white border borde-[#eeeeee] rounded-full"
                    >
                      <RiEdit2Line />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setViewingHostel({ hostelData: paidMonth || null })
                      }
                      className="text-xs text-blue-600 size-4 flex justify-center items-center bg-white border border-[#eeeeee] rounded-full"
                    >
                      <IoIosEye />
                    </button>
                    {editingStudentId === student._id && (
                      <div
                        ref={popupRef}
                        className="absolute top-[calc(100%_+_0.75rem)] left-1/2 -translate-x-1/2 z-[100]"
                      >
                        <EditFees
                          amount={paidMonth?.amount}
                          baseAmount={hostelFees?.monthlyAmount}
                          month={currentMonth}
                          year={String(currentYear)}
                          scholarship={
                            hostelFees?.monthsDue?.find(
                              (m: any) =>
                                m.month === currentMonth &&
                                m.year === currentYear
                            )?.scholarship ?? ""
                          }
                          due={
                            hostelFees?.monthsDue?.find(
                              (m: any) =>
                                m.month === currentMonth &&
                                m.year === currentYear
                            )?.due ?? ""
                          }
                          remarks={
                            hostelFees?.monthsDue?.find(
                              (m: any) =>
                                m.month === currentMonth &&
                                m.year === currentYear
                            )?.remarks ?? ""
                          }
                          helper={(hostelFeeMonth: any, receiptFile?: File) =>
                            updateStudentHostelFees(
                              student._id as string,
                              data?._id ?? "",
                              receiptFile,
                              hostelFeeMonth
                            )
                          }
                          handleClose={() => setEditingStudentId(null)}
                        />
                      </div>
                    )}
                    {viewingHostel?.hostelData &&
                      paidMonth &&
                      viewingHostel.hostelData._id === paidMonth._id && (
                        <div
                          ref={popupRef}
                          className="absolute top-[calc(100%_+_0.75rem)] left-1/2 -translate-x-1/2 z-[100]"
                        >
                          <ViewHostelFees
                            hostelData={viewingHostel.hostelData}
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
              {student.courseFees
                .filter(
                  (fee) =>
                    fee.currentYear === String(year ?? new Date().getFullYear())
                )
                .reduce((sum, fee) => sum + (fee.totalAmount ?? 0), 0)}
            </div>
            {Array.from({ length: 5 }).map((_, index) => {
              const now = new Date();
              const currentYear = year ? year : now.getFullYear();

              const courseFee = student.courseFees.find(
                (fee) => fee.currentYear === String(currentYear)
              );

              const emi = courseFee?.emis[index];

              return (
                <div
                  key={index}
                  className="flex-1 flex items-center gap-1 relative"
                  style={{
                    flexBasis: `${Math.round(100 / tableHeader.length)}%`,
                  }}
                >
                  {emi ? (
                    <>
                      {emi.paid ? (
                        <FaCheckCircle className="text-green-600 text-sm" />
                      ) : (
                        <FaClock className="text-red-600 text-sm" />
                      )}
                      {emi.amount}
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEmi({
                            studentId: student._id as string,
                            studentDataId: student.studentData?.[0]?._id ?? "",
                            courseFeeId: courseFee?._id ?? "",
                            emiId: emi._id ?? "",
                            emiData: emi,
                          });
                        }}
                        className="text-xs text-site-darkgreen size-4 flex justify-center items-center  bg-white border border-[#eeeeee] rounded-full"
                      >
                        <RiEdit2Line />
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewingEmi({ emiData: emi })}
                        className="text-xs text-blue-600 size-4 flex justify-center items-center bg-white border border-[#eeeeee] rounded-full"
                      >
                        <IoIosEye />
                      </button>

                      {editingEmi && editingEmi.emiId === emi._id && (
                        <div
                          ref={popupRef}
                          className="absolute top-[calc(100%_+_0.75rem)] left-1/2 -translate-x-1/2 z-[100]"
                        >
                          <EditCourseFees
                            amount={editingEmi.emiData.paid}
                            baseAmount={editingEmi.emiData.amount}
                            scholarship={editingEmi.emiData.scholarship}
                            due={editingEmi.emiData.due}
                            remarks={editingEmi.emiData.remarks}
                            helper={async (updateData, receiptFile) => {
                              const result = await updateCourseFees(
                                editingEmi.studentId,
                                editingEmi.emiId,
                                updateData,
                                receiptFile
                              );
                              if (result.success) {
                                router.refresh();
                              }
                              return result;
                            }}
                            handleClose={() => setEditingEmi(null)}
                          />
                        </div>
                      )}
                      {viewingEmi && viewingEmi.emiData._id === emi._id && (
                        <div
                          ref={popupRef}
                          className="absolute top-[calc(100%_+_0.75rem)] left-1/2 -translate-x-1/2 z-[100]"
                        >
                          <ViewCourseFees
                            emiData={viewingEmi.emiData}
                            onClose={() => setViewingEmi(null)}
                          />
                        </div>
                      )}
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
              {(() => {
                const now = new Date();
                const targetYear = year ? year : now.getFullYear();

                return student.courseFees
                  .filter((fee) => fee.currentYear === String(targetYear))
                  .flatMap((fee) => fee.emis || [])
                  .reduce((sum, emi) => sum + (Number(emi.due) || 0), 0);
              })()}
            </div>
          </div>
        );
      })}
    </DisplayTable>
  );
}
