import Link from "next/link";
import React from "react";

const ViewHostelFees = ({ hostelData }: { hostelData: any }) => {
  return (
    <div className="relative bg-white rounded-2xl px-3 py-5 border border-[#eeeeee] z-[100] w-64">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-l border-t border-gray-300 rotate-45 z-0" />

      <div className="flex flex-col gap-2 text-site-gray">
        <div className="px-3 py-2 border border-[#eeeeee]  rounded">
          <strong>Amount Paid: </strong> ₹{hostelData.amount || "0"}
        </div>
        <div className="px-3 py-2 border border-[#eeeeee]  rounded">
          <strong>Scholarship: </strong> {hostelData.scholarship || "-"}
        </div>
        <div className="px-3 py-2 border border-[#eeeeee]  rounded">
          {hostelData.uploadReceipt?.secure_url ? (
            <Link
              href={hostelData.uploadReceipt.secure_url}
              target="_blank"
              rel="noopener noreferrer"
              className=" font-medium"
            >
              View Receipt
            </Link>
          ) : (
            "No receipt"
          )}
        </div>
        <div className="px-3 py-2 border border-[#eeeeee]  rounded">
          <strong>Due: </strong> ₹{hostelData.due || "0"}
        </div>
        <div className="px-3 py-2 border border-[#eeeeee]  rounded">
          <strong>Remarks: </strong> {hostelData.remarks || "-"}
        </div>
      </div>
    </div>
  );
};

export default ViewHostelFees;
