"use client";

import React, { useState, useEffect } from "react";
import { HiPlusCircle } from "react-icons/hi2";

type PaymentEntry = {
  paymentName: string;
  amount: number;
  scholarship: number;
  paid?: number;
};

type EmiDataType = {
  payments: PaymentEntry[];
  totalPaid?: number;
  totalDue?: number;
  remarks?: string;
};

export default function EditCourseFees({
  helper,
  handleClose,
  baseAmount = 0,
  defaultPaid = "",
  defaultDue = 0,
  defaultRemarks = "",
  emiData,
}: {
  helper: (courseFee: any) => Promise<any>;
  handleClose: () => void;
  baseAmount?: number;
  defaultPaid?: string;
  defaultDue?: number;
  defaultRemarks?: string;
  emiData?: EmiDataType;
}) {
  // Initialize payments state
  const [payments, setPayments] = useState<PaymentEntry[]>([
    { paymentName: "", amount: baseAmount, scholarship: 0, paid: 0 },
  ]);

  const [totalPaid, setTotalPaid] = useState<number>(Number(defaultPaid) || 0);
  const [totalDue, setTotalDue] = useState<number>(defaultDue);
  const [remarks, setRemarks] = useState<string>(defaultRemarks);
  const [initialized, setInitialized] = useState(false);
  const [userEdited, setUserEdited] = useState(false);

  // Calculate total amount after discount (scholarship)
  const totalAmount = payments.reduce((sum, p) => {
    const discounted = Math.round(p.amount - (p.amount * p.scholarship) / 100);
    return sum + discounted;
  }, 0);

  // Load existing emiData on mount or when emiData changes
  useEffect(() => {
    if (emiData) {
      setPayments(
        emiData.payments?.map((p) => {
          const discounted = Math.round(
            p.amount - (p.amount * p.scholarship) / 100
          );
          return {
            paymentName: p.paymentName,
            amount: p.amount,
            scholarship: p.scholarship ?? 0,
            paid: p.paid !== undefined && p.paid !== 0 ? p.paid : discounted,
          };
        }) ?? [
          {
            paymentName: "",
            amount: baseAmount,
            scholarship: 0,
            paid: baseAmount,
          },
        ]
      );

      if (
        typeof emiData.totalPaid === "number" &&
        typeof emiData.totalDue === "number"
      ) {
        setTotalPaid(emiData.totalPaid);
        setTotalDue(emiData.totalDue);
      } else {
        const paidSum = emiData.payments?.reduce(
          (sum, p) => sum + (p.paid || 0),
          0
        );
        const amountSum = emiData.payments?.reduce(
          (sum, p) =>
            sum +
            Math.round(p.amount - (p.amount * (p.scholarship ?? 0)) / 100),
          0
        );
        setTotalPaid(paidSum || 0);
        setTotalDue(Math.max(0, (amountSum || 0) - (paidSum || 0)));
      }

      setRemarks(emiData.remarks ?? "");
      setInitialized(true);
      setUserEdited(false);
    }
  }, [emiData, baseAmount]);

  // Recalculate due whenever total paid or total amount changes
  useEffect(() => {
    if (!initialized) return;
    if (!userEdited) return; // only recalc if user changed
    const sumPaid = payments.reduce((sum, p) => sum + (p.paid ?? 0), 0);
    setTotalPaid(sumPaid);
    setTotalDue(Math.max(0, totalAmount - sumPaid));
  }, [payments, totalAmount, initialized, userEdited]);
  // Add new empty payment row
  const addPaymentRow = () => {
    setPayments((prev) => [
      ...prev,
      { paymentName: "", amount: 0, scholarship: 0, paid: 0 },
    ]);
  };

  // Update the specific field of a payment row, including 'paid'

  // Handle change on total paid input (numeric string)
  const handlePaidChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      const numPaid = Number(value);
      if (numPaid > totalAmount) {
        setTotalPaid(totalAmount);
      } else {
        setTotalPaid(numPaid);
      }
      // Also update totalDue synchronously here or rely on the effect:
      setTotalDue(Math.max(0, totalAmount - numPaid));
    }
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare payments payload with trimmed names
    const paymentsPayload = payments.map((p) => ({
      paymentName: p.paymentName.trim(),
      amount: p.amount,
      scholarship: p.scholarship,
      paid: p.paid ?? 0,
    }));

    // Convert totalPaid to number safely
    const totalPaidNum = Number(totalPaid) || 0;

    // Compose full payload
    const courseFeePayload = {
      payments: paymentsPayload,
      emiFields: {
        totalPaid: totalPaidNum,
        totalDue: totalDue,
        remarks,
        updatedAt: new Date().toISOString(),
      },
    };

    try {
      const result = await helper(courseFeePayload);
      if (!result.success) {
        throw new Error(result.message);
      }
      handleClose();
    } catch (error: any) {
      alert(error.message || "Failed to update course fees");
    }
  };

  const updatePayment = (
    index: number,
    field: keyof PaymentEntry,
    value: string | number
  ) => {
    setPayments((prev) => {
      const newPayments = [...prev];
      const num = Number(value);
      setUserEdited(true);

      if (field === "amount" || field === "scholarship") {
        newPayments[index][field] = isNaN(num) ? 0 : num;

        const amount = field === "amount" ? num : newPayments[index].amount;
        const scholarship =
          field === "scholarship" ? num : newPayments[index].scholarship;

        newPayments[index].paid = Math.round(
          amount - (amount * scholarship) / 100
        );
      } else if (field === "paid") {
        newPayments[index][field] = isNaN(num) ? 0 : num;
      } else if (field === "paymentName") {
        newPayments[index][field] = value as string;
      }

      return newPayments;
    });
  };
  return (
    <div className="relative px-3 py-5 z-[100]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {payments.map((payment, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 mb-2">
            <input
              type="text"
              placeholder="Payment name"
              value={payment.paymentName}
              required
              onChange={(e) => updatePayment(i, "paymentName", e.target.value)}
              className="h-[3.5rem] px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              min={0}
              placeholder="Amount"
              value={payment.amount || ""}
              onChange={(e) => updatePayment(i, "amount", e.target.value)}
              className="h-[3.5rem] px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              min={0}
              max={100}
              placeholder="Scholarship %"
              value={payment.scholarship || ""}
              onChange={(e) => updatePayment(i, "scholarship", e.target.value)}
              className="h-[3.5rem] px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              min={0}
              max={Math.round(
                payment.amount - (payment.amount * payment.scholarship) / 100
              )}
              placeholder="Paid"
              value={payment.paid ?? ""}
              onChange={(e) =>
                updatePayment(
                  i,
                  "paid",
                  e.target.value === "" ? 0 : Number(e.target.value)
                )
              }
              className="h-[3.5rem] px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addPaymentRow}
          className="flex items-center gap-2 text-site-darkgreen hover:text-green-600"
        >
          <HiPlusCircle size={24} />
          Add Payment
        </button>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <label>
            total Paid
            <input
              type="number"
              max={totalAmount}
              value={totalPaid}
              onChange={(e) => handlePaidChange(e.target.value)}
              className="h-[3.5rem] px-3 py-2 border border-gray-300 rounded w-full mt-1"
            />
          </label>
          <label>
            total Due
            <input
              type="number"
              readOnly
              value={totalDue}
              className="h-[3.5rem] px-3 py-2 border border-gray-300 rounded w-full mt-1 bg-gray-100 cursor-not-allowed"
            />
          </label>
        </div>

        <label className="mt-4">
          Remarks
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            rows={3}
            placeholder="Remarks"
          />
        </label>

        <button
          type="submit"
          className="mt-6 px-8 h-[3.5rem] bg-site-darkgreen text-white rounded hover:bg-green-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
