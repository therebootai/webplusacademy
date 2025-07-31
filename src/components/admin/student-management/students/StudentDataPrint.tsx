import { IStudentType } from "@/types/StudentType";
import html2canvas from "html2canvas-pro";
import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import { IoIosPrint } from "react-icons/io";

const StudentDataPrint = ({
  student,
  onClose,
}: {
  student: IStudentType;
  onClose: () => void;
}) => {
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
        `${student.studentName}_data_${new Date().toLocaleDateString()}.pdf`
      );
    } catch (error) {
      console.error("❌ Error generating PDF: ", error);
    }
  };

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
          <div className=" w-full h-[4rem] border-t-3 text-center py-4 border-site-darkgreen bg-site-darkgreen  text-white text-2xl font-semibold">
            Student Information
          </div>
          <div className=" flex flex-col gap-4 p-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDataPrint;
