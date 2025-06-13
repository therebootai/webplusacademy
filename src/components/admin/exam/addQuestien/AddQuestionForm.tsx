"use client";
import { createExamQuestions } from "@/actions/examQuestionActions";
import { examQuestionTypes } from "@/types/ExamQuestionTypes";
import React, { useActionState, useEffect, useState } from "react";
import { CiCirclePlus, CiCircleRemove } from "react-icons/ci";

const AddQuestionForm = ({
  existingQuestion,
  onSuccess,
  onCancel,
}: {
  existingQuestion?: examQuestionTypes | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}) => {
  const [answerPoints, setAnswerPoints] = useState<string[]>([]);
  const [newAnswer, setNewAnswer] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Individual states for each form field
  const [questionName, setQuestionName] = useState<string>("");
  const [correctAns, setCorrectAns] = useState<string>("");
  const [classValue, setClassValue] = useState<string>("");
  const [courseName, setCourseName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [qnsType, setQnsType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (existingQuestion) {
      setQuestionName(existingQuestion.questionName || "");
      setAnswerPoints(Object.values(existingQuestion.ansOption || {}));
      setCorrectAns(existingQuestion.correctAns || "");
      setClassValue(existingQuestion.class || "");
      setCourseName(existingQuestion.courseName || "");
      setSubject(existingQuestion.subject || "");
      setQnsType(existingQuestion.qnsType || "Easy");
    }
  }, [existingQuestion]);

  const handleAddAnswer = (): void => {
    if (answerPoints.length >= 4) {
      setError("You can add a maximum of 4 answer points.");
      return;
    }

    if (newAnswer) {
      setAnswerPoints([...answerPoints, newAnswer]);
      setNewAnswer("");
      setError(null);
    }
  };

  const handleRemoveAnswer = (index: number) => {
    setAnswerPoints(answerPoints.filter((_, i) => i !== index));
  };

  async function addQuestion(formData: FormData) {
    const questionName = formData.get("questionName") as string;
    const answerPoints = formData.getAll("answerPoints[]");
    const correctAns = formData.get("correctAns") as string;
    const classValue = formData.get("class") as string;
    const courseName = formData.get("courseName") as string;
    const subject = formData.get("subject") as string;
    const qnsType = formData.get("qnsType") as string;

    // Create the question object
    const questionData = {
      questionName,
      ansOption: {
        optionA: answerPoints[0] || "",
        optionB: answerPoints[1] || "",
        optionC: answerPoints[2] || "",
        optionD: answerPoints[3] || "",
      },
      correctAns,
      class: classValue,
      courseName,
      subject,
      qnsType,
    };

    console.log("Question Data to Backend:", questionData);

    try {
      const result = await createExamQuestions(questionData);
      console.log("result", result);

      return result;
    } catch (error: any) {
      console.error("Error creating question:", error);
      return { success: false, error: error.message || "Unknown error" };
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // This will show form data key-value pairs
    }
    const result = await addQuestion(formData);

    if (result.success && onSuccess) {
      onSuccess();
      alert("Question created successfully!");
      setQuestionName("");
      setAnswerPoints([]);
      setCorrectAns("");
      setClassValue("");
      setCourseName("");
      setSubject("");
      setQnsType("Easy");
    } else {
      alert("Failed to create question.");
    }
  };

  return (
    <div className="flex flex-col gap-4 px-6">
      <h3 className="text-site-darkgreen xl:text-lg md:text-base text-sm font-bold">
        Create Question
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            required
            placeholder="Question"
            value={questionName}
            name="questionName"
            onChange={(e) => setQuestionName(e.target.value)}
            className=" h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 flex-wrap border border-[#cccccc] rounded-md flex gap-2 items-center px-2 col-span-2">
          <div className="flex flex-row items-center gap-1 flex-1">
            <input
              type="text"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder={`Ans Points (4 max & min)`}
              className=" h-[3.5rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
            />
            <button
              type="button"
              onClick={handleAddAnswer}
              className="text-site-darkgreen sticky inline-flex items-center justify-center "
            >
              <CiCirclePlus size={24} />
            </button>
          </div>
          {answerPoints.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {answerPoints.map((answer, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-200 p-2 rounded-md"
                >
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => {
                      const updatedAnswers = [...answerPoints];
                      updatedAnswers[index] = e.target.value;
                      setAnswerPoints(updatedAnswers);
                    }}
                    name="answerPoints[]"
                    className="h-[3.5rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveAnswer(index)}
                    className="text-red-500"
                  >
                    <CiCircleRemove size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <select
          value={correctAns}
          onChange={(e) => setCorrectAns(e.target.value)}
          name="correctAns"
          className=" h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize placeholder:capitalize"
        >
          <option value="">Choose Correct Ans</option>
          {answerPoints.map((answer, index) => (
            <option key={index} value={answer}>
              {answer}
            </option>
          ))}
        </select>
        <div className=" grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Class"
            value={classValue}
            name="class"
            onChange={(e) => setClassValue(e.target.value)}
            className=" h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize placeholder:capitalize"
          />
          <input
            type="text"
            placeholder="Coursename"
            value={courseName}
            name="courseName"
            onChange={(e) => setCourseName(e.target.value)}
            className=" h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize placeholder:capitalize"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            name="subject"
            onChange={(e) => setSubject(e.target.value)}
            className=" h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize placeholder:capitalize"
          />
          <select
            value={qnsType}
            name="qnsType"
            onChange={(e) => setQnsType(e.target.value)}
            className=" h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize placeholder:capitalize"
          >
            <option value="">Choose Type</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button
          type="submit"
          className=" h-[3.5rem] flex justify-center items-center bg-site-darkgreen text-white text-lg font-medium px-8 w-fit rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
