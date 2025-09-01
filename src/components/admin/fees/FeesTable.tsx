"use client";

import {
  HostelFeeMonthType,
  IStudentType,
  StudentDataType,
} from "@/types/StudentType";
import DisplayTable from "@/ui/DisplayTable";
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import EditFees from "./EditFees";
import { updateCourseFees, updateHostelFees } from "@/actions/studentAction";
import { useRouter } from "next/navigation";
import EditCourseFees from "./EditCourseFees";
import { IoIosEye } from "react-icons/io";

import useClickOutside from "@/hooks/useClickOutside";
import SidePopUpSlider from "@/ui/SidePopup";
import dynamic from "next/dynamic";
import ViewCourseFeesInvoice from "./ViewCourseFeesInvoice";

const ViewHostelInvoice = dynamic(() => import("./ViewHostelInvoice"), {
  ssr: false,
});

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

  const [viewingCourseFeesInvoice, setViewingCourseFeesInvoice] = useState<{
    student: IStudentType;
    studentData: StudentDataType;
    courseFee: any;
    emiData: any;
  } | null>(null);

  const [invoiceData, setInvoiceData] = useState<{
    student: IStudentType;
    studentData: StudentDataType;
    hostelFeeMonth: HostelFeeMonthType;
  } | null>(null);

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

  studentsData.map((student) => {
    let studentCourseFees = student.courseFees.filter(
      (fee) => fee.currentYear === String(year ?? new Date().getFullYear())
    );
    let studenetCourseFessTotal = student.courseFees
      .filter(
        (fee) => fee.currentYear === String(year ?? new Date().getFullYear())
      )
      .reduce((sum, fee) => sum + (fee.totalAmount ?? 0), 0);

    console.log("Student Course", studentCourseFees);

    console.log("Student Course Total", studenetCourseFessTotal);
  });

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
                      onClick={() => {
                        setInvoiceData({
                          student,
                          studentData: data,
                          hostelFeeMonth: paidMonth ?? {
                            month: currentMonth,
                            year: currentYear,
                            amount: hostelFees?.monthlyAmount ?? 0,
                            scholarship: "",
                            due: "",
                          },
                        });
                      }}
                      className="text-xs text-blue-600 size-4 flex justify-center items-center bg-white border border-[#eeeeee] rounded-full"
                    >
                      <IoIosEye />
                    </button>
                    {editingStudentId === student._id && (
                      <SidePopUpSlider
                        showPopUp={!!editingStudentId}
                        handleClose={() => setEditingStudentId(null)}
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
                          helper={async (hostelFeeMonth, receiptFile) => {
                            const result = await updateStudentHostelFees(
                              student._id as string,
                              data._id,
                              receiptFile,
                              hostelFeeMonth
                            );
                            if (result.success) {
                              // After successful update, show invoice
                              setInvoiceData({
                                student,
                                studentData: data,
                                hostelFeeMonth,
                              });
                            }
                            return result;
                          }}
                          handleClose={() => setEditingStudentId(null)}
                        />
                      </SidePopUpSlider>
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
                      {emi.totalPaid && emi.totalPaid > 0 ? (
                        <FaCheckCircle className="text-green-600 text-sm" />
                      ) : (
                        <FaClock className="text-red-600 text-sm" />
                      )}
                      {emi.payments?.reduce(
                        (sum: number, p: any) => sum + (p.amount || 0),
                        0
                      ) ?? "0"}
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
                        onClick={() => {
                          setViewingCourseFeesInvoice({
                            student,
                            studentData: student.studentData?.[0],
                            courseFee,
                            emiData: emi,
                          });
                        }}
                        className="text-xs text-blue-600 size-4 flex justify-center items-center bg-white border border-[#eeeeee] rounded-full"
                      >
                        <IoIosEye />
                      </button>

                      {editingEmi && editingEmi.emiId === emi._id && (
                        <SidePopUpSlider
                          showPopUp={!!editingEmi}
                          handleClose={() => setEditingEmi(null)}
                        >
                          <EditCourseFees
                            emiData={editingEmi.emiData}
                            baseAmount={editingEmi.emiData.amount ?? 0}
                            defaultPaid={
                              editingEmi.emiData.totalPaid?.toString() ?? "0"
                            }
                            defaultDue={
                              editingEmi.emiData.totalDue?.toString() ?? "0"
                            }
                            defaultRemarks={editingEmi.emiData.remarks ?? ""}
                            helper={async (updateData) => {
                              const result = await updateCourseFees(
                                editingEmi.studentId,
                                editingEmi.courseFeeId,
                                editingEmi.emiId,
                                updateData
                              );
                              if (result.success) {
                                router.refresh();
                                setEditingEmi(null); // Close the Edit popup

                                // Find the updated courseFee and studentData for showing invoice
                                const student = studentsData.find(
                                  (s) => s._id === editingEmi.studentId
                                );
                                if (!student) return result;

                                const studentData = student.studentData?.[0]; // adapt if you want the exact studentData
                                const courseFee = student.courseFees.find(
                                  (fee) => fee._id === editingEmi.courseFeeId
                                );
                                const updatedEmiDataWithDate = {
                                  ...updateData,
                                  updatedAt: new Date().toISOString(),
                                };
                                setViewingCourseFeesInvoice({
                                  student,
                                  studentData,
                                  courseFee,
                                  emiData: updatedEmiDataWithDate,
                                });
                              }
                              return result;
                            }}
                            handleClose={() => setEditingEmi(null)}
                          />
                        </SidePopUpSlider>
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

                if (!Array.isArray(student.courseFees)) return "0";

                // Filter courseFees by year and flatten emis arrays safely
                const emis = student.courseFees
                  .filter((fee) => fee.currentYear === String(targetYear))
                  .flatMap((fee) => (Array.isArray(fee.emis) ? fee.emis : []));

                // Sum due amounts, safely coercing to Number and default 0
                const totalDue = emis.reduce(
                  (sum, emi) => sum + (Number(emi.totalDue) || 0),
                  0
                );

                return totalDue;
              })()}
            </div>
          </div>
        );
      })}

      {invoiceData && (
        <div className="fixed z-50 inset-0  h-full w-full  overflow-scroll ">
          <div className=" w-full  p-8 shadow-xl bg-black/40 relative flex justify-center items-center ">
            <button
              className="absolute top-2 right-2 size-[2rem] bg-custom-pink rounded-full flex justify-center items-center text-xl text-white hover:text-red-500"
              onClick={() => setInvoiceData(null)}
            >
              &times;
            </button>
            <div className="w-fit">
              <ViewHostelInvoice
                student={invoiceData.student}
                studentData={invoiceData.studentData}
                hostelFeeMonth={invoiceData.hostelFeeMonth}
              />
            </div>
          </div>
        </div>
      )}

      {viewingCourseFeesInvoice && (
        <div className="fixed z-50 inset-0 h-full w-full overflow-scroll ">
          <div className=" bg-black/40 flex justify-center items-center p-8">
            <button
              className="absolute top-2 right-2 size-[2rem] bg-custom-pink rounded-full flex justify-center items-center text-xl text-white hover:text-red-500"
              onClick={() => setViewingCourseFeesInvoice(null)}
            >
              &times;
            </button>
            <div className=" w-fit">
              <ViewCourseFeesInvoice
                student={viewingCourseFeesInvoice.student}
                studentData={viewingCourseFeesInvoice.studentData}
                courseFee={viewingCourseFeesInvoice.courseFee}
                emiData={viewingCourseFeesInvoice.emiData}
              />
            </div>
          </div>
        </div>
      )}
    </DisplayTable>
  );
}
