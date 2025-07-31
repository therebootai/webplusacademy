"use client";

import {
  HostelFeeMonthType,
  IStudentType,
  StudentDataType,
} from "@/types/StudentType";
import { useEffect, useState } from "react";

export default function EditFees({
  helper,
  handleClose,
  amount: defaultAmount,
  baseAmount = 0,
  month,
  year,
  scholarship: defaultScholarship = "",
  due: defaultDue = "",
  remarks: defaultRemarks = "",
}: {
  helper: (hostelFeeMonth: any, receiptFile?: File) => any;
  handleClose: () => void;
  baseAmount?: number;
  month?: string;
  amount?: number;
  year?: string;
  scholarship?: string;
  due?: string;
  remarks?: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [scholarship, setScholarship] = useState<string>(defaultScholarship);

  const [finalAmount, setFinalAmount] = useState<number>(baseAmount);
  const [amount, setAmount] = useState<string>(
    (defaultAmount ?? baseAmount).toString()
  );
  const [due, setDue] = useState<string>(defaultDue);

  const [remarks, setRemarks] = useState<string>(defaultRemarks);

  const [invoiceData, setInvoiceData] = useState<{
    student: IStudentType;
    studentData: StudentDataType;
    hostelFeeMonth: HostelFeeMonthType;
  } | null>(null);

  async function handelUpdateFees(prevState: unknown, formData: FormData) {
    try {
      const amount = formData.get("amount") as string;
      const due = formData.get("due") as string;
      const scholarship = formData.get("scholarship") as string;
      const remarks = formData.get("remarks") as string;
      const receiptFile = formData.get("receiptFile") as File;

      const hostelFeeMonth = {
        month: month ?? new Date().toLocaleString("default", { month: "long" }),
        year: year ?? new Date().getFullYear().toString(),
        amount: +amount,
        due,
        scholarship,
        remarks,
      };

      const updateResult = await helper(hostelFeeMonth, receiptFile);
      if (!updateResult.success) {
        throw new Error(updateResult.message);
      }

      handleClose();
      return updateResult;
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  }

  useEffect(() => {
    const perc = +scholarship || 0;
    const discountedAmount = Math.round(baseAmount - (baseAmount * perc) / 100);
    setFinalAmount(discountedAmount);
    if (amount === "" || +amount > discountedAmount) {
      setAmount(discountedAmount.toString());
      setDue("");
    }
  }, [baseAmount, scholarship]);

  const handleScholarshipChange = (val: string) => {
    if (/^\d*$/.test(val) && +val <= 100) {
      setScholarship(val);
      const perc = +val;
      const newFinal = Math.round(baseAmount - (baseAmount * perc) / 100);
      setFinalAmount(newFinal);
      setAmount(newFinal.toString());
      setDue("");
    }
  };

  const handleAmountChange = (val: string) => {
    if (/^\d*$/.test(val)) {
      setAmount(val);
      if (val === "") {
        setDue("");
      } else {
        const entered = +val;
        const dueAmt = Math.max(0, finalAmount - entered);
        setDue(dueAmt.toString());
      }
    }
  };

  const handleDueChange = (val: string) => {
    if (/^\d*$/.test(val)) {
      if (val === "") {
        setDue("");
        setAmount(finalAmount.toString()); // finalAmount is based on initial scholarship calc
      } else {
        const dueVal = +val;
        const newAmount = Math.max(0, finalAmount - dueVal);
        setDue(val);
        setAmount(newAmount.toString());
      }
    }
  };

  return (
    <div className="relative  rounded-2xl px-3 py-5  z-[100]">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handelUpdateFees(null, formData);
        }}
        className="flex flex-col gap-6"
      >
        <div className=" grid grid-cols-2 gap-4">
          <input
            type="text"
            name="amount"
            pattern="[0-9]*"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="Enter Amount"
            className=" h-[3.5rem] px-3 py-2 border border-[#eeeeee] placeholder:text-site-gray placeholder:capitalize rounded bg-white"
          />
          <input
            type="text"
            name="scholarship"
            pattern="[0-9]*"
            value={scholarship}
            onChange={(e) => handleScholarshipChange(e.target.value)}
            placeholder="Scholarship %"
            className=" h-[3.5rem] px-3 py-2 border border-[#eeeeee] placeholder:text-site-gray placeholder:capitalize rounded bg-white"
          />
          <input
            type="text"
            name="due"
            value={due}
            onChange={(e) => handleDueChange(e.target.value)}
            placeholder="Due"
            className=" h-[3.5rem] px-3 py-2 border border-[#eeeeee] placeholder:text-site-gray placeholder:capitalize rounded bg-white"
          />

          <input
            type="text"
            name="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Remarks"
            className=" h-[3.5rem] px-3 py-2 border border-[#eeeeee] placeholder:text-site-gray placeholder:capitalize rounded bg-white"
          />
        </div>
        <button
          type="submit"
          className="px-8 h-[3.5rem] w-fit bg-site-darkgreen text-white text-center text-base font-medium rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
