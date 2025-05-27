"use client";

import { useActionState, useState } from "react";

export default function EditFees({
  helper,
  handleClose,
  amount: defaultAmount,
  month,
  year,
  readOnly = true,
}: {
  helper: (hostelFeeMonth: any, receiptFile?: File) => any;
  handleClose: () => void;
  month?: string;
  amount?: number;
  year?: string;
  readOnly?: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState<string>(defaultAmount?.toString() ?? "");

  async function handelUpdateFees(prevState: unknown, formData: FormData) {
    try {
      const amount = formData.get("amount") as string;
      const receiptFile = formData.get("receiptFile") as File;
      if (!month) {
        month = new Date().toLocaleString("default", { month: "long" });
      }
      if (!year) {
        year = new Date().getFullYear().toString();
      }
      const hostelFeeMonth = { month, year, amount };
      const updateResult = await helper(hostelFeeMonth, receiptFile);
      if (!updateResult.success) {
        throw new Error(updateResult.message);
      }
      handleClose();
      return updateResult;
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  }

  const [, formAction, isPending] = useActionState(handelUpdateFees, null);

  return (
    <div className="relative bg-white rounded-2xl px-3 py-5 border border-[#eeeeee] z-[100]">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-l border-t border-gray-300 rotate-45 z-0" />
      <form action={formAction} className="flex flex-col gap-1">
        <input
          type="text"
          name="amount"
          pattern="[0-9]*"
          readOnly={readOnly}
          value={amount}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              setAmount(val);
            }
          }}
          placeholder="Enter Amount"
          className="px-3 py-2 border border-[#eeeeee] placeholder:text-site-gray placeholder:capitalize rounded"
        />
        <div className="px-3 py-2 border border-[#eeeeee] rounded">
          <input
            type="file"
            accept="image/*"
            name="receiptFile"
            id="receiptFile"
            value={file?.name}
            onChange={(e) =>
              setFile(
                Array.isArray(e.target.files) ? e.target.files?.[0] : null
              )
            }
            placeholder="Upload receipt"
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
          name=""
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
