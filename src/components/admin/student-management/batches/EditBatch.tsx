"use client";
import { createNewBatch, updateaBatch } from "@/actions/batchesActions";
import { searchCourses } from "@/actions/coursesActions";
import { BatchesDocument } from "@/models/Batches";
import { useActionState, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { LiaObjectGroupSolid } from "react-icons/lia";
import { LuBookA, LuCalendarDays } from "react-icons/lu";

export default function EditBatch({
  updatedBatch,
  handleClose,
}: {
  updatedBatch: BatchesDocument;
  handleClose: () => void;
}) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [batchYear, setBatchYear] = useState<Date | null>(null);
  const [courseName, setCourseName] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const [courses, setCourses] = useState([]);

  async function updateExistingBatch(prevState: unknown, formData: FormData) {
    try {
      const batch_name = formData.get("batch_name") as string;
      const year = formData.get("year") as string;

      const batch = await updateaBatch(updatedBatch._id as string, {
        batch_name,
        course: courseId,
        year,
        start_date: startDate ? new Date(startDate) : undefined,
        end_date: endDate ? new Date(endDate) : undefined,
      });
      if (!batch.data) {
        throw new Error(batch.message);
      }

      setStartDate(null);
      setEndDate(null);
      setBatchYear(null);
      setCourseName("");
      handleClose();
      return batch.data;
    } catch (error: Error | any) {
      console.log(error);
      alert(error.message);
    }
  }

  async function searchCourse(search: string) {
    try {
      const data = await searchCourses(search);
      setCourses(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (updatedBatch) {
      const course = updatedBatch.course;

      if (
        typeof course === "object" &&
        course !== null &&
        "course_name" in course
      ) {
        setCourseName(course.course_name);
        setCourseId(course._id?.toString() ?? "");
      } else {
        // If it's just ObjectId (string), use as fallback
        setCourseName("");
        setCourseId(course?.toString?.() ?? "");
      }

      setStartDate(
        updatedBatch.start_date ? new Date(updatedBatch.start_date) : null
      );
      setEndDate(
        updatedBatch.end_date ? new Date(updatedBatch.end_date) : null
      );
      setBatchYear(updatedBatch.year ? new Date(updatedBatch.year) : null);
    }
  }, [updatedBatch]);

  const [, formAction, isPending] = useActionState(updateExistingBatch, null);

  return (
    <form action={formAction} className="flex flex-col gap-2 p-4">
      <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
        <LiaObjectGroupSolid className="text-site-gray text-2xl" />
        <input
          type="text"
          required
          placeholder={`Batch Name`}
          defaultValue={updatedBatch.batch_name}
          name="batch_name"
          className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
        />
      </div>
      <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2 relative">
        <LuBookA className="text-site-gray text-2xl" />
        <div className="flex flex-1 relative">
          <input
            type="text"
            value={courseName}
            onChange={(e) => {
              setCourseName(e.target.value);
              searchCourse(e.target.value);
            }}
            placeholder={`Search Course Name`}
            className="h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        {courses.length > 0 && (
          <div className="absolute top-full left-0 w-full rounded-md p-2 bg-white flex flex-col">
            {courses.map((course: any) => (
              <button
                key={course._id}
                onClick={() => {
                  setCourseName(course.course_name);
                  setCourseId(course._id);
                  setCourses([]);
                }}
                className="text-left text-site-black capitalize p-1.5 border-b border-site-gray last:border-b-0"
              >
                {course.course_name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
        <LuCalendarDays className="text-site-gray text-2xl" />
        <DatePicker
          selected={batchYear}
          name="year"
          onChange={(date) => setBatchYear(date)}
          showYearPicker
          placeholderText="Choose Batch year"
          dateFormat="yyyy"
          className="h-[3rem]  outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
        />
      </div>
      <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
        <LuCalendarDays className="text-site-gray text-2xl" />
        <DatePicker
          selected={startDate}
          name="start_date"
          onChange={(date) => setStartDate(date)}
          placeholderText="Choose Batch Start Date"
          dateFormat="dd/MM/yyyy"
          className="h-[3rem]  outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
        />
      </div>
      <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
        <LuCalendarDays className="text-site-gray text-2xl" />
        <DatePicker
          selected={endDate}
          name="end_date"
          onChange={(date) => setEndDate(date)}
          placeholderText="Choose Batch End Date"
          dateFormat="dd/MM/yyyy"
          className="h-[3rem]  outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
        />
      </div>
      <button
        className="h-[3rem] flex justify-center items-center bg-site-yellow text-base font-medium text-white rounded-md"
        type="submit"
      >
        {isPending ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
