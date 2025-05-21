"use client";

import { createNewCourse } from "@/actions/coursesActions";
import { useActionState } from "react";
import DatePicker from "react-datepicker";
import { LiaObjectGroupSolid } from "react-icons/lia";
import { LuBookA, LuCalendarDays } from "react-icons/lu";

export default function AddNewCourses() {
  async function addNewBatch(prevState: unknown, formData: FormData) {
    try {
      const course_name = formData.get("course_name") as string;
      const course_class = formData.get("course_class") as string;

      const course = await createNewCourse({
        course_name,
        course_class,
      });
      if (!course.data) {
        throw new Error(course.message);
      }

      return course.data;
    } catch (error: Error | any) {
      console.log(error);
      alert(error.message);
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
          placeholder={`Course Name`}
          name="course_name"
          className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
        />
      </div>
      <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
        <LuBookA className="text-site-gray text-2xl" />
        <input
          type="text"
          required
          placeholder={`Class Name`}
          name="course_class"
          className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
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
