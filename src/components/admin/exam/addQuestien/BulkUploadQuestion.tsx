"use client";
import { createExamQuestionsFromCSV } from "@/actions/examQuestionActions";
import React, { useState } from "react";
const BulkUploadQuestion = ({
  onSuccess,
  onCancel,
}: {
  onSuccess?: () => void;
  onCancel?: () => void;
}) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [classValue, setClassValue] = useState<string>("");
  const [courseName, setCourseName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [qnsType, setQnsType] = useState<string>("Easy");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type === "text/csv") {
      setCsvFile(file);
      setError(null); // Clear any previous errors
    } else {
      setError("Please upload a valid CSV file.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!csvFile) {
      setError("Please upload a CSV file.");
      return;
    }

    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("class", classValue);
    formData.append("courseName", courseName);
    formData.append("subject", subject);
    formData.append("qnsType", qnsType);

    try {
      const result = await createExamQuestionsFromCSV(formData);

      if (result.success) {
        if (onSuccess) onSuccess();
      } else {
        setError(result.error || "Failed to upload questions.");
      }
    } catch (error: any) {
      console.error("Error during bulk upload:", error);
      setError(error.message || "Unknown error during upload.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-6">
      <h3 className="text-site-darkgreen xl:text-lg md:text-base text-sm font-bold">
        Bulk Upload Questions
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* CSV File Upload */}
        <div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2"
          />
        </div>

        {/* Other form fields */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Class"
            value={classValue}
            onChange={(e) => setClassValue(e.target.value)}
            className="h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize"
          />
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize"
          />
          <select
            value={qnsType}
            onChange={(e) => setQnsType(e.target.value)}
            className="h-[3.5rem] outline-none placeholder:text-site-gray border border-[#cccccc] w-full rounded-md px-2 capitalize"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="h-[3.5rem] flex justify-center items-center bg-site-darkgreen text-white text-lg font-medium px-8 w-fit rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload CSV"}
        </button>
      </form>
    </div>
  );
};

export default BulkUploadQuestion;
