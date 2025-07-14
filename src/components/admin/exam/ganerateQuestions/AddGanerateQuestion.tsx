"use client";
import { getAllBatches } from "@/actions/batchesActions";
import {
  getUniqueChapter,
  getUniqueClass,
  getUniqueCourseNames,
  getUniqueQnstype,
  getUniqueSubject,
} from "@/actions/examQuestionActions";
import { createExamSet, generateQuestions } from "@/actions/examSetActions";
import GanerateIcon from "@/icon/GanerateIcon";
import { BatchesDocument } from "@/models/Batches";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { FaCirclePlus, FaSquarePlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import html2pdf from "html2pdf.js";

const AddGanerateQuestion = () => {
  const [classes, setClasses] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [courseNames, setCourseNames] = useState<string[]>([]);
  const [selectedCourseNames, setSelectedCourseNames] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [chapters, setChapters] = useState<string[]>([]);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);

  const [qnsTypes, setQnsTypes] = useState<string[]>([]);

  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedQnsType, setSelectedQnsType] = useState<string>("");
  const [questionNumber, setQuestionNumber] = useState<string>("");

  const [addedQuestions, setAddedQuestions] = useState<
    { type: string; number: string }[]
  >([]);

  const [addedTotalQuestions, setAddedTotalQuestions] = useState<
    {
      subject: string;
      questions: { type: string; number: string }[];
      chapters: string[];
    }[]
  >([]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

  const [examSetName, setExamSetName] = useState<string>("");
  const [batch, setBatch] = useState<string>("");
  const [showExamSetPopup, setShowExamSetPopup] = useState(false);

  const [batches, setBatches] = useState([]);
  const printRef = useRef<HTMLDivElement>(null);
  const [isPending] = useTransition();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classData = await getUniqueClass();
        if (classData?.data) {
          setClasses(classData.data);
        }

        const courseNameData = await getUniqueCourseNames();
        if (courseNameData?.data) {
          setCourseNames(courseNameData.data);
        }
        const subjectsData = await getUniqueSubject();
        if (subjectsData?.data) {
          setSubjects(subjectsData.data);
        }
        const chapterData = await getUniqueChapter(selectedSubject);
        if (chapterData?.data) {
          setChapters(chapterData.data);
        }
        const qnsTypesData = await getUniqueQnstype();
        if (qnsTypesData?.data) {
          setQnsTypes(qnsTypesData.data);
        }
        const batchRes = await getAllBatches({ limit: 100 });
        setBatches(batchRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedSubject]);

  const handleSelect = (
    type: "class" | "courseName" | "chapter",
    value: string
  ) => {
    if (!value) return;

    if (type === "class" && !selectedClasses.includes(value)) {
      setSelectedClasses([...selectedClasses, value]);
    }

    if (type === "courseName" && !selectedCourseNames.includes(value)) {
      setSelectedCourseNames([...selectedCourseNames, value]);
    }
    if (type === "chapter" && !selectedChapters.includes(value)) {
      setSelectedChapters([...selectedChapters, value]);
    }
  };

  const handleRemove = (
    type: "class" | "courseName" | "chapter",
    value: string
  ) => {
    if (type === "class") {
      setSelectedClasses(selectedClasses.filter((c) => c !== value));
    } else if (type === "courseName") {
      setSelectedCourseNames(selectedCourseNames.filter((c) => c !== value));
    } else if (type === "chapter") {
      setSelectedChapters(selectedChapters.filter((c) => c !== value));
    }
  };

  const handleAddQuestion = () => {
    if (!selectedSubject || !selectedQnsType || !questionNumber) return;

    const newQuestion = { type: selectedQnsType, number: questionNumber };

    setAddedQuestions([...addedQuestions, newQuestion]);

    setSelectedQnsType("");
    setQuestionNumber("");
  };

  const handleRemoveQuestion = (index: number) => {
    setAddedQuestions(addedQuestions.filter((_, i) => i !== index));
  };

  const handleAddMultipleQuestions = () => {
    if (!selectedSubject || addedQuestions.length === 0) return;

    const subjectQuestions = {
      subject: selectedSubject,
      questions: addedQuestions,
      chapters: selectedChapters,
    };

    setAddedTotalQuestions((prevQuestions) => [
      ...prevQuestions,
      subjectQuestions,
    ]);
    setAddedQuestions([]);
    setSelectedSubject("");
    setSelectedChapters([]);
    setSelectedQnsType("");
    setQuestionNumber("");
  };

  const handleRemoveTotalQuestion = (subject: string) => {
    setAddedTotalQuestions((prevQuestions) =>
      prevQuestions.filter((item) => item.subject !== subject)
    );
  };

  const handlePrint = () => {
    if (printRef.current) {
      const opt = {
        margin: 0.5,
        filename: `ExamQuestions_${new Date().toLocaleDateString()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1.5 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(opt).from(printRef.current).save();
    }
  };

  const generatePdfBlob = (element: HTMLElement): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const opt = {
        margin: 0.5,
        filename: `ExamQuestions.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1.5 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .outputPdf("blob")
        .then((pdfBlob: Blob) => {
          resolve(pdfBlob);
        })
        .catch((err: any) => reject(err));
    });
  };

  const generateQuestionsDirectly = async () => {
    const subjectQuestions = addedTotalQuestions.map((item) => ({
      subject: item.subject,
      chapters: item.chapters,
      questions: item.questions.map((q) => ({
        type: q.type,
        number: Number(q.number),
      })),
    }));

    const result = await generateQuestions(
      selectedClasses,
      selectedCourseNames,
      subjectQuestions.map((item) => item.subject),
      subjectQuestions,
      addedTotalQuestions.flatMap((item) => item.chapters || [])
    );

    if (result.success) {
      if (result.questions.length === 0) {
        alert("No questions added this Filters");
      } else {
        setSelectedQuestions(result.questions || []);
        setShowPopup(true);
      }
    } else {
      if (result.error === "No questions found matching the filters") {
        alert("No questions added this time");
      } else {
        alert("Error generating questions: " + result.error);
      }
    }
  };

  const handleSaveExamSet = async () => {
    if (!printRef.current) return;

    try {
      setLoading(true);
      const pdfBlob = await generatePdfBlob(printRef.current);
      const pdfFile = new File([pdfBlob], "exam_set.pdf", {
        type: "application/pdf",
      });

      const response = await createExamSet(
        examSetName,
        batch,
        selectedQuestions.map((question) => question._id),
        undefined,
        pdfFile
      );

      if (response.success) {
        alert("Exam set created successfully");
        setShowExamSetPopup(false);
      } else {
        alert("Error saving exam set: " + response.error);
      }
    } catch (error) {
      console.error("Error while saving exam set:", error);
      alert("Failed to generate or upload PDF");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col gap-4 px-6">
      <h3 className="text-site-darkgreen xl:text-lg md:text-base text-sm font-bold">
        Generate Question
      </h3>

      <form className="flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <select
            className="h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize"
            onChange={(e) => handleSelect("class", e.target.value)}
            value=""
          >
            <option value="">Select Class</option>
            {classes
              .filter((cls) => !selectedClasses.includes(cls))
              .map((cls, index) => (
                <option key={index} value={cls}>
                  {cls}
                </option>
              ))}
          </select>
          <div className="flex flex-wrap gap-2">
            {selectedClasses.map((cls, idx) => (
              <span
                key={idx}
                className="flex items-center gap-2 px-3 py-1 bg-site-darkgreen text-white rounded-full text-sm"
              >
                {cls}
                <button
                  type="button"
                  onClick={() => handleRemove("class", cls)}
                  className="hover:text-red-400"
                >
                  <IoMdClose size={16} />
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <select
            name=""
            id=""
            onChange={(e) => handleSelect("courseName", e.target.value)}
            className="h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize"
          >
            <option value="">select Course name</option>
            {courseNames
              .filter((course) => !selectedCourseNames.includes(course))
              .map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
          </select>
          <div className="flex flex-wrap gap-2">
            {selectedCourseNames.map((course, idx) => (
              <span
                key={idx}
                className="flex items-center gap-2 px-3 py-1 bg-site-darkgreen text-white rounded-full text-sm"
              >
                {course}
                <button
                  type="button"
                  onClick={() => handleRemove("courseName", course)}
                  className="hover:text-red-400"
                >
                  <IoMdClose size={16} />
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <div className=" flex flex-row gap-4  ">
            <div className="w-[20%] ">
              <select
                name=""
                id=""
                onChange={(e) => setSelectedSubject(e.target.value)}
                value={selectedSubject}
                className="h-[3.5rem] text-sm outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize"
              >
                <option value="">Choose Subject</option>
                {subjects
                  .filter(
                    (sub) =>
                      !addedTotalQuestions.some((item) => item.subject === sub)
                  )
                  .map((sub, index) => (
                    <option value={sub} key={index}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-[20%] flex flex-col ">
              <select
                name=""
                id=""
                onChange={(e) => handleSelect("chapter", e.target.value)}
                className="h-[3.5rem] text-sm outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize"
              >
                <option value="">Choose Chapters</option>
                {chapters
                  .filter((chp) => !selectedChapters.includes(chp))
                  .map((chp, index) => (
                    <option value={chp} key={index}>
                      {chp}
                    </option>
                  ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedChapters.map((chapter, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1 bg-site-darkgreen text-white rounded-full text-sm"
                  >
                    {chapter}
                    <button
                      type="button"
                      onClick={() => handleRemove("chapter", chapter)}
                      className="hover:text-red-400"
                    >
                      <IoMdClose size={16} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className=" flex flex-col gap-2 w-[60%] items-center border border-site-gray/30  px-2 rounded-md ">
              <div className=" w-full  flex flex-row items-center gap-2 h-[3.5rem]">
                <div className="w-[50%] ">
                  <select
                    name="qnsType"
                    onChange={(e) => setSelectedQnsType(e.target.value)}
                    value={selectedQnsType}
                    className="h-[3rem] text-sm outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize"
                  >
                    <option value="">Choose Question Type</option>
                    {qnsTypes.map((qns, index) => (
                      <option value={qns} key={index}>
                        {qns}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-[45%] ">
                  <input
                    type="number"
                    placeholder="Number of Questions"
                    className="h-[3rem] text-sm outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize"
                    value={questionNumber}
                    onChange={(e) => setQuestionNumber(String(e.target.value))}
                  />
                </div>
                <div className="w-[5%]">
                  <FaCirclePlus
                    className=" size-6 text-site-litegreen cursor-pointer"
                    onClick={handleAddQuestion}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {addedQuestions.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 bg-site-darkgreen text-white rounded-full text-sm"
                  >
                    <span className="text-sm">
                      {item.type} - {item.number}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(index)}
                      className="text-red-500"
                    >
                      <IoMdClose size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-[10%] flex justify-center items-center">
              <button
                type="button"
                onClick={() => {
                  handleAddMultipleQuestions();
                }}
              >
                <FaSquarePlus className="size-6 text-site-litegreen cursor-pointer" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {addedTotalQuestions.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-site-darkgreen text-white rounded-full text-sm"
              >
                <span className="text-sm">
                  {item.subject} -
                  {item.chapters?.length
                    ? ` [${item.chapters.join(", ")}]`
                    : ""}{" "}
                  -
                  {item.questions
                    .map((q) => `${q.type} - ${q.number}`)
                    .join(", ")}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveTotalQuestion(item.subject)}
                  className="text-red-500"
                >
                  <IoMdClose size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={generateQuestionsDirectly}
          className=" h-[3.5rem] w-fit rounded-md px-4 flex justify-center items-center bg-site-darkgreen text-white gap-2 text-lg"
        >
          <GanerateIcon className="size-6" /> Generate Questions
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-500/40 bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-[80%] h-full overflow-scroll overflow-x-hidden">
            <div ref={printRef} className="bg-white p-6 rounded-md w-full ">
              <h4 className="text-lg font-bold">Generated Questions</h4>
              <div className="flex flex-col gap-4 mt-4">
                {selectedQuestions.map((question, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <p className="font-semibold">
                      {index + 1}. {question.questionName}
                    </p>
                    <div className="mt-2 flex flex-col gap-2">
                      <div>1. {question.ansOption.optionA}</div>
                      <div>2. {question.ansOption.optionB}</div>{" "}
                      <div>3. {question.ansOption.optionC}</div>{" "}
                      <div>4. {question.ansOption.optionD}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4 gap-4 items-center print-hidden">
                <button
                  type="button"
                  onClick={closePopup}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="bg-site-litegreen text-white px-4 py-2 rounded-md"
                >
                  Print
                </button>
                <button
                  type="button"
                  onClick={() => setShowExamSetPopup(true)}
                  className="bg-site-darkgreen text-white px-4 py-2 rounded-md"
                >
                  Save Exam Set
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showExamSetPopup && (
        <div className="fixed inset-0 bg-gray-500/40 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[60%]">
            <h4 className="text-lg font-bold">Create Exam Set</h4>
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold">
                  Exam Set Name
                </label>
                <input
                  type="text"
                  value={examSetName}
                  onChange={(e) => setExamSetName(e.target.value)}
                  className="w-full h-[3rem] border rounded-md px-2"
                  placeholder="Enter Exam Set Name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">Batch</label>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full h-[3rem] border rounded-md px-2"
                >
                  <option value="">Select Batch</option>
                  {batches.map((batch: BatchesDocument) => (
                    <option
                      className=" bg-white text-site-black"
                      key={batch._id as string}
                      value={batch._id as string}
                    >
                      {batch.batch_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setShowExamSetPopup(false)} // Close Exam Set Popup
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveExamSet}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                {loading ? "Saving..." : "Save Exam Set"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGanerateQuestion;
