"use client";

import { useActionState, useEffect, useState } from "react";

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
    <div className="relative bg-white rounded-2xl px-3 py-5 border border-[#eeeeee] z-[100]">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-l border-t border-gray-300 rotate-45 z-0" />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handelUpdateFees(null, formData);
        }}
        className="flex flex-col gap-1"
      >
        <input
          type="text"
          name="amount"
          pattern="[0-9]*"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder="Enter Amount"
          className="px-3 py-2 border border-[#eeeeee] placeholder:text-site-gray placeholder:capitalize rounded"
        />
        <input
          type="text"
          name="scholarship"
          pattern="[0-9]*"
          value={scholarship}
          onChange={(e) => handleScholarshipChange(e.target.value)}
          placeholder="Scholarship %"
          className="px-3 py-2 border border-[#eeeeee] placeholder:text-site-gray placeholder:capitalize rounded"
        />
        <input
          type="text"
          name="due"
          value={due}
          onChange={(e) => handleDueChange(e.target.value)}
          placeholder="Due"
          className="px-3 py-2 border border-[#eeeeee] placeholder:text-site-gray placeholder:capitalize rounded"
        />
        <div className="px-3 py-2 border border-[#eeeeee] rounded">
          <input
            type="file"
            accept="image/*"
            name="receiptFile"
            id="receiptFile"
            onChange={(e) =>
              setFile(
                e.target.files && e.target.files.length > 0
                  ? e.target.files[0]
                  : null
              )
            }
            className="sr-only"
          />
          <label
            htmlFor="receiptFile"
            className="text-site-gray cursor-pointer capitalize"
          >
            {file?.name ?? "Upload receipt"}
          </label>
        </div>
        <input
          type="text"
          name="remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Remarks"
          className="px-3 py-2 border border-[#eeeeee] placeholder:text-site-gray placeholder:capitalize rounded"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-site-darkgreen text-white text-center text-xs rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
