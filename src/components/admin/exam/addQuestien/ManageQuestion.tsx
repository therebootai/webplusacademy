"use client";
import DisplayTable from "@/ui/DisplayTable";
import SidePopUpSlider from "@/ui/SidePopup";
import React, { useState, useTransition } from "react";
import AddQuestionForm from "./AddQuestionForm";
import { deleteExamQuestion } from "@/actions/examQuestionActions";
import { useRouter } from "next/navigation";

const ManageQuestion = ({ QuestionData }: { QuestionData: any[] }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
  const [showViewPopUp, setShowViewPopUp] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const tableHeader = [
    "Question",
    "Options",
    "Correct Ans",
    "Class",
    "Course",
    "Subject",
    "Qns Type",
    "Action",
  ];

  const handleDelete = (studentId: string) => {
    const confirmed = confirm("Are you sure you want to delete this Question?");
    if (!confirmed) return;

    startTransition(async () => {
      const res = await deleteExamQuestion(studentId);
      if (res.success) {
        router.refresh();
      } else {
        alert("Error deleting Question: " + res.message);
      }
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <DisplayTable tableHeader={tableHeader}>
        {QuestionData.map((item) => {
          return (
            <div
              key={item._id}
              className="flex odd:bg-white text-sm even:bg-site-darkgreen/5 p-2.5"
              style={{
                flexBasis: `${Math.round(100 / QuestionData.length)}%`,
              }}
            >
              <div className="flex-1 line-clamp-1">{item.questionName}</div>
              <div className="flex-1 flex flex-wrap gap-1 break-all text-wrap whitespace-break-spaces">
                <span>{item.ansOption.optionA},</span>{" "}
                <span>{item.ansOption.optionB},</span>{" "}
                <span>{item.ansOption.optionC},</span>
                <span>{item.ansOption.optionD}</span>
              </div>
              <div className="flex-1 line-clamp-1">{item.correctAns}</div>
              <div className="flex-1 line-clamp-1">{item.class}</div>
              <div className="flex-1 line-clamp-1">{item.courseName}</div>
              <div className="flex-1 line-clamp-1">{item.subject}</div>
              <div className="flex-1 line-clamp-1">{item.qnsType}</div>
              <div className=" flex-1 flex flex-row gap-2 items-center">
                <button
                  onClick={() => {
                    setSelectedQuestion(item);
                    setShowViewPopUp("edit");
                    setShowPopUp(true);
                  }}
                  className=" text-site-litegreen font-medium"
                >
                  Edit
                </button>{" "}
                ||
                <button
                  type="button"
                  className="text-red-500 font-medium"
                  onClick={() => handleDelete(item.questionId as string)}
                  disabled={isPending}
                >
                  {isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          );
        })}
      </DisplayTable>
      {selectedQuestion && (
        <SidePopUpSlider
          showPopUp={showPopUp}
          handleClose={() => setShowPopUp(false)}
        >
          {showViewPopUp === "edit" && (
            <AddQuestionForm
              onCancel={() => setShowPopUp(false)}
              existingQuestion={selectedQuestion}
              // onSuccess={() => {
              //   router.refresh();
              //   setShowPopUp(false);
              // }}
            />
          )}
        </SidePopUpSlider>
      )}
    </div>
  );
};

export default ManageQuestion;
