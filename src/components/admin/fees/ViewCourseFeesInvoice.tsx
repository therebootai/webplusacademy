"use client";

import React, { useRef } from "react";
import { IoIosPrint } from "react-icons/io";
import { IStudentType, StudentDataType } from "@/types/StudentType";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { BatchesDocument } from "@/models/Batches";

type InvoiceProps = {
  student: IStudentType;
  studentData: StudentDataType;
  courseFee?: any;
  emiData?: any;
};

const ViewCourseFeesInvoice = ({
  student,
  studentData,
  courseFee,
  emiData,
}: InvoiceProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    if (!printRef.current) {
      console.error("printRef is null");
      return;
    }

    try {
      const canvas = await html2canvas(printRef.current, { scale: 1.5 });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      pdf.addImage(imgData, "JPG", 0, 0, imgWidth, imgHeight);

      pdf.save(
        `HostelFeesReceipt_${student.studentName}_${new Date()
          .toLocaleDateString()
          .replace(/\//g, "-")}.pdf`
      );
    } catch (error) {
      console.error("❌ Error generating PDF: ", error);
    }
  };

  const payments = emiData?.payments ?? [];
  const totalAmount = payments.reduce(
    (sum: number, p: any) => sum + (Number(p.amount) || 0),
    0
  );
  // Handles both after submit (emiData.emiFields) or data from backend (emiData.totalPaid/totalDue)
  const totalPaid =
    emiData?.emiFields?.totalPaid ??
    emiData?.totalPaid ??
    payments.reduce((sum: number, p: any) => sum + (Number(p.paid) || 0), 0);

  const totalDue =
    emiData?.emiFields?.totalDue ??
    emiData?.totalDue ??
    Math.max(0, totalAmount - totalPaid);

  function isBatchDocument(batchOrId: any): batchOrId is BatchesDocument {
    return (
      batchOrId && typeof batchOrId === "object" && "batch_name" in batchOrId
    );
  }

  return (
    <div className=" flex flex-col gap-4 bg-white justify-center items-center p-4 ">
      <div className=" justify-end items-end flex w-full ">
        <button
          type="button"
          onClick={handlePrint}
          className=" cursor-pointer px-6 text-lg font-medium bg-site-litegreen/80 text-white hover:bg-site-yellow hover:text-site-darkgreen transition-colors duration-700 h-[3rem] flex gap-2 justify-center items-center rounded-md"
        >
          <IoIosPrint />
          Print
        </button>
      </div>
      <div ref={printRef} className=" a4-container p-4 ">
        <div className="  border-2 border-site-darkgreen rounded-md flex flex-col h-full  ">
          <div className=" w-full flex flex-row justify-between p-6 py-8 ">
            <div className=" w-[40%] flex flex-col gap-2 ">
              <img src="/logo.svg" alt="logo" className=" h-[4rem] w-fit" />
              <h1 className=" text-base font-medium text-site-gray">
                www.waveplusacademy.com
              </h1>
            </div>
            <div className=" w-[60%] flex flex-col gap-1 justify-end items-end">
              <div className=" text-site-gray text-sm">
                <span className=" text-site-darkgreen"> </span> +91 96140 16184/
                +91 96793 15590
              </div>
              <div className=" text-site-gray text-sm text-end">
                <span className=" text-site-darkgreen"></span>Gadadhar Pally,
                Behind Hebron School, Upper Bagdogra,
                <br /> Darjeeling WB 734003
              </div>
              <div className=" text-site-gray text-sm">
                <span className=" text-site-darkgreen">&#x2709;</span>
                info@waveplusacademy.com
              </div>
            </div>
          </div>
          <div className=" w-full h-[4rem] border-t-3 text-center py-4 border-site-darkgreen bg-site-darkgreen/10  text-site-darkgreen text-2xl font-semibold">
            Reciept for Montly Tution Fees
          </div>
          <div className="text-sm text-site-gray grid grid-cols-2 gap-4 p-4">
            <div>
              {" "}
              <strong>Student Name:</strong> {student.studentName}
            </div>
            <div>
              {" "}
              <strong>Mob No:</strong> {student.mobileNumber}
            </div>
            <div>
              {" "}
              <strong>Batch:</strong>{" "}
              {isBatchDocument(studentData.currentBatch)
                ? studentData.currentBatch.batch_name
                : "-"}
            </div>
            <div>
              {" "}
              <strong>Class:</strong> {studentData.currentCourse?.course_class}
            </div>
            <div>
              {" "}
              <strong>Guardian Name:</strong> {student.gurdianName}
            </div>
            <div>
              {" "}
              <strong>date: </strong>{" "}
              {emiData?.updatedAt
                ? new Date(emiData.updatedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "-"}
            </div>
          </div>
          <div className="flex flex-col border-t-3 border-site-darkgreen ">
            <div className=" flex flex-row items-center font-semibold text-site-gray  w-full bg-site-darkgreen/10">
              <div className="w-[15%] p-4 border-r border-site-darkgreen">
                Sl. No
              </div>
              <div className=" w-[65%] p-4 border-r border-site-darkgreen">
                Description
              </div>
              <div className=" w-[20%] p-4">Paid</div>
            </div>
            {payments.map((payment: any, index: number) => (
              <div
                key={index}
                className="flex flex-row items-center text-site-darkgreen border-t border-site-darkgreen"
              >
                <div className="w-[15%] p-4 border-r border-site-darkgreen">
                  {index + 1}
                </div>
                <div className="w-[65%] p-4 border-r border-site-darkgreen">
                  {payment.paymentName}
                </div>
                <div className="w-[20%] p-4">₹{payment.paid ?? 0}</div>
              </div>
            ))}
            <div className="w-full flex flex-col  ">
              <div className="flex justify-end p-4 flex-col gap-2 items-end font-semibold text-lg w-full bg-site-darkgreen/10 border-t-3 border-site-darkgreen text-site-darkgreen">
                <div>Total Amount: ₹ {totalAmount}</div>
                {totalDue > 0 && <div>Due: ₹{totalDue}</div>}
                <div className="pt-2 border-t border-[#cccccc]">
                  Paid: ₹{totalPaid}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourseFeesInvoice;
