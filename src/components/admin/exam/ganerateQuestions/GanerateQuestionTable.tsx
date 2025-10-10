"use client";
import { deleteExamSet } from "@/actions/examSetActions";
import Popup from "@/ui/Popup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

const GanerateQuestionTable = ({ QuestionData }: { QuestionData: any[] }) => {
  const [isPending, startTransition] = useTransition();

  const [showDetails, setShowDetails] = useState(false);

  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);

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
          {set.questions.length > 0 ? (
            <div className="w-full h-[300px] mb-6 border overflow-hidden overflow-y-scroll px-2">
              {set.questions.map((question: any, index: number) => (
                <div key={question._id} className="my-2 border-b">
                  <p className="font-semibold">
                    {index + 1}. {question.questionName}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap whitespace-nowrap text-sm">
                    <p>Option 1: {question.ansOption.optionA}</p>,
                    <p>Option 2: {question.ansOption.optionB}</p>,
                    <p>Option 3: {question.ansOption.optionC}</p>,
                    <p>Option 4: {question.ansOption.optionD}</p>
                  </div>
                </div>
              ))}
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
              <button
                type="button"
                onClick={() => {
                  setSelectedQuestion(set);
                  setShowDetails(true);
                }}
                className=" h-[2.5rem] rounded-md w-fit px-4 flex justify-center items-center bg-site-litegreen text-white"
              >
                View Details
              </button>
              {/* <button
                type="button"
                className=" h-[2.5rem] rounded-md w-fit px-4 flex justify-center items-center bg-site-yellow text-site-darkgreen"
              >
                Edit
              </button> */}
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
      <Popup isOpen={showDetails} onClose={() => setShowDetails(false)}>
        <div className="bg-white p-4 rounded-lg">
          {selectedQuestion &&
            selectedQuestion.questionPdf.map((item: any, index: number) => (
              <div key={item._id}>
                <Link
                  href={item.secure_url}
                  className="text-sm"
                  target="_blank"
                >
                  {index + 1}. {item.set_name}
                </Link>
              </div>
            ))}
        </div>
      </Popup>
    </div>
  );
};

export default GanerateQuestionTable;
