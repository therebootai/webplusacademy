"use client";
import { deleteExamSet } from "@/actions/examSetActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

const GanerateQuestionTable = ({ QuestionData }: { QuestionData: any[] }) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const handleDelete = (examsetId: string) => {
    const confirmed = confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;

    startTransition(async () => {
      const res = await deleteExamSet(examsetId);
      if (res.success) {
        router.refresh();
      } else {
        alert("Error deleting student: " + res.message);
      }
    });
  };
  return (
    <div className=" grid grid-cols-3 gap-4">
      {QuestionData.map((set) => (
        <div
          key={set._id}
          className="border border-gray-300 rounded-lg shadow-sm p-4"
        >
          {set.questionPdf ? (
            <div className="w-full h-[300px] mb-6">
              <iframe
                src={set.questionPdf.secure_url}
                title={`PDF for ${set.examSetName}`}
                className="w-full h-full border"
              />
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-site-darkgreen">
                Exam Set: {set.examSetName}
              </h2>
              <p className="text-sm text-gray-600">
                Batch: {set.batch?.batch_name || "N/A"}
              </p>
            </div>
            <div className=" flex flex-row justify-end gap-4 items-center">
              <Link
                href={set.questionPdf.secure_url || "#"}
                target="_blank"
                className=" h-[2.5rem] rounded-md w-fit px-4 flex justify-center items-center bg-site-litegreen text-white"
              >
                View
              </Link>
              <button
                type="button"
                className=" h-[2.5rem] rounded-md w-fit px-4 flex justify-center items-center bg-site-yellow text-site-darkgreen"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(set._id as string)}
                disabled={isPending}
                className=" h-[2.5rem] rounded-md w-fit px-4 flex justify-center items-center bg-red-600 text-white"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GanerateQuestionTable;
