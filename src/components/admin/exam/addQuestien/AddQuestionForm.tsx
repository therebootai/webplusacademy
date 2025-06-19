"use client";
import {
  createExamQuestions,
  updateExamQuestion,
} from "@/actions/examQuestionActions";
import { examQuestionTypes } from "@/types/ExamQuestionTypes";
import React, { useActionState, useEffect, useRef, useState } from "react";
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

    try {
      let result;
      if (existingQuestion && existingQuestion.questionId) {
        result = await updateExamQuestion(
          existingQuestion.questionId,
          questionData
        );
      } else {
        result = await createExamQuestions(questionData);
      }

      if (result && result.success === true) {
        return result;
      } else {
        return { success: false, error: "Unknown error" };
      }
    } catch (error: any) {
      console.error("Error creating question:", error);
      return { success: false, error: error.message || "Unknown error" };
    }
  }

  const isSubmitting = useRef(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting.current) {
      console.log("Form is already being submitted.");
      return; // Prevent multiple submissions
    }

    isSubmitting.current = true;

    const formData = new FormData(e.target as HTMLFormElement);
    try {
      // Check if we are creating a new question or updating an existing one
      if (existingQuestion && existingQuestion.questionId) {
        // We are updating an existing question
        const result = await addQuestion(formData);
        console.log("Form submission result:", result);

        if (result.success === true) {
          // Reset form after successful update
          setQuestionName("");
          setAnswerPoints([]);
          setCorrectAns("");
          setClassValue("");
          setCourseName("");
          setSubject("");
          setQnsType("");

          if (onSuccess) onSuccess();
        } else {
          console.log("Error during question creation:", result.error);
          alert("Failed to create question.");
        }
      } else {
        const result = await addQuestion(formData);
        console.log("Form submission result:", result);

        if (result.success === true) {
          setQuestionName("");
          setAnswerPoints([]);
          setCorrectAns("");
          setClassValue("");
          setCourseName("");
          setSubject("");
          setQnsType("");

          if (onSuccess) onSuccess();
        } else {
          console.log("Error during question creation:", result.error);
          alert("Failed to create question.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      isSubmitting.current = false; // Reset the submitting flag
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
