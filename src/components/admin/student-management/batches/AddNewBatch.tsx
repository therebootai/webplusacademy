"use client";

import { createNewBatch } from "@/actions/batchesActions";
import { searchCourses } from "@/actions/coursesActions";
import { useActionState, useState } from "react";
import DatePicker from "react-datepicker";
import { LiaObjectGroupSolid } from "react-icons/lia";
import { LuBookA, LuCalendarDays } from "react-icons/lu";

export default function AddNewBatch() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [batchYear, setBatchYear] = useState<Date | null>(null);
  const [courseName, setCourseName] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const [courses, setCourses] = useState([]);

  async function addNewBatch(prevState: unknown, formData: FormData) {
    try {
      const batch_name = formData.get("batch_name") as string;
      const year = formData.get("year") as string;

      const batch = await createNewBatch({
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

  const [, formAction, isPending] = useActionState(addNewBatch, null);
  return (
    <form action={formAction} className="flex gap-2 items-center">
      <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
        <LiaObjectGroupSolid className="text-site-gray text-2xl" />
        <input
          type="text"
          required
          placeholder={`Batch Name`}
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
        className="h-[3rem] flex justify-center items-center flex-1 bg-site-yellow text-base font-medium text-white rounded-md"
        type="submit"
      >
        {isPending ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
