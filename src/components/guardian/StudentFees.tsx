"use client";

import {
  HostelFeeMonthType,
  IStudentType,
  StudentDataType,
} from "@/types/StudentType";
import DisplayTable from "@/ui/DisplayTable";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { IoIosEye } from "react-icons/io";
import ViewCourseFeesInvoice from "../admin/fees/ViewCourseFeesInvoice";
import ViewHostelInvoice from "../admin/fees/ViewHostelInvoice";

const getDateFromMonthYear = (
  mon: string | undefined,
  year: string | undefined
) => {
  if (!mon || !year) return null;
  const date = new Date(`${mon} 1, ${year}`);
  return isNaN(date.getTime()) ? null : date;
};

export default function StudentFees({
  student,
  studentData,
  courseFees,
  mon,
  year,
}: {
  student: IStudentType;
  studentData: any;
  courseFees: any;
  mon: any;
  year: any;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  const now = new Date();
  const currentMonth = mon ?? now.toLocaleString("default", { month: "long" });
  const currentYear = Number(year) || now.getFullYear();

  const paidMonth = useMemo(() => {
    return studentData.hostelFees?.monthsDue?.find(
      (m: any) => m.month === currentMonth && m.year === currentYear
    );
  }, [studentData, mon, year]);

  const isPaid = useMemo(() => {
    return studentData.hostelFees?.monthsDue.some(
      (m: { month: string; year: number }) =>
        m.month === currentMonth && m.year === currentYear
    );
  }, [paidMonth, mon, year]);

  const courseFee = useMemo(() => {
    return courseFees.find(
      (fee: any) => fee.currentYear === String(currentYear) || !fee.currentYear
    );
  }, [courseFees, mon, year]);

  const emi = useMemo(() => {
    return courseFee?.emis.find((emi: any) => emi.installmentNumber === 1);
  }, [courseFee]);

  const handleMonthYear = useCallback(
    (date: Date | null | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (date) {
        params.set(
          "mon",
          new Date(date).toLocaleString("default", { month: "long" })
        ); // otherwise set it
        params.set("year", new Date(date).getFullYear().toString());
      } else {
        params.delete("mon"); // remove "q" if query is empty, null, or undefined
        params.delete("year"); // remove "q" if query is empty, null, or undefined
      }
      router.push(`?${params.toString()}`);
    },
    [searchParams]
  );

  const tableHeader = [
    ...Array.from({ length: 5 }, (_, index) => `EMI ${index + 1}`),
  ];

  return (
    <div className="relative h-max overflow-auto flex flex-col gap-4">
      <table className="w-full table-auto text-base text-left border border-site-gray">
        <tbody className="text-gray-600 divide-y">
          <tr className="divide-x">
            <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
              Fees month and year
            </td>
            <td className="pl-6 py-4 whitespace-nowrap text-site-black">
              <DatePicker
                placeholderText="Select Month & Year"
                className="w-full px-5 h-[3.5rem]"
                onChange={(date) => handleMonthYear(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                selected={getDateFromMonthYear(mon, year)}
              />
            </td>
          </tr>
          <tr className="divide-x">
            <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
              Hostel Fees
            </td>
            <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
              <span className={paidMonth ? "text-green-700" : "text-red-500"}>
                ₹
                {paidMonth?.amount ??
                  studentData.hostelFees?.monthlyAmount ??
                  "-"}
              </span>
              <span
                className={`${
                  isPaid ? "bg-green-700" : "bg-red-500"
                } text-xs ml-2 px-2 py-1 rounded-lg text-white font-semibold`}
              >
                {isPaid ? "Paid" : "Due"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setInvoiceData({
                    student,
                    studentData: studentData,
                    hostelFeeMonth: paidMonth ?? {
                      month: currentMonth,
                      year: currentYear,
                      amount: studentData?.hostelFees?.monthlyAmount ?? 0,
                      scholarship: "",
                      due: "",
                    },
                  });
                }}
                className="text-sm ms-1 text-blue-600 justify-center items-center bg-white border border-[#eeeeee] rounded-full inline-flex"
              >
                <IoIosEye />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <h1 className="font-bold lg:text-2xl text-xl text-site-darkgreen">
        Course Fees EMI Details
      </h1>
      <DisplayTable tableHeader={tableHeader}>
        <div className="flex gap-2 text-sm odd:bg-white even:bg-site-darkgreen/5 p-2.5">
          {Array.from({ length: 5 }).map((_, index) => {
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
                    {emi.payments?.reduce(
                      (sum: number, p: any) => sum + (p.amount || 0),
                      0
                    ) ?? "0"}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setViewingCourseFeesInvoice({
                          student,
                          studentData: studentData,
                          courseFee,
                          emiData: emi,
                        });
                      }}
                      className="text-sm text-blue-600 ms-1.5 justify-center items-center bg-white border border-[#eeeeee] rounded-full inline p-1"
                    >
                      <IoIosEye />
                    </button>
                  </>
                ) : (
                  <p className="text-center">-</p>
                )}
              </div>
            );
          })}
        </div>
      </DisplayTable>
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
    </div>
  );
}
