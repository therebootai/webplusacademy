"use client";

import { createNewCourse, updateaCourse } from "@/actions/coursesActions";
import { CourseDocument } from "@/models/Courses";
import { useActionState } from "react";
import { LiaObjectGroupSolid } from "react-icons/lia";
import { LuBookA } from "react-icons/lu";

export default function EditCourses({
  updatedCourse,
  handleClose,
}: {
  updatedCourse: CourseDocument;
  handleClose: () => void;
}) {
  async function addNewBatch(prevState: unknown, formData: FormData) {
    try {
      const course_name = formData.get("course_name") as string;
      const course_class = formData.get("course_class") as string;

      const course = await updateaCourse(updatedCourse._id as string, {
        course_name,
        course_class,
      });
      if (!course.success) {
        throw new Error(course.message);
      }
      handleClose();
      return course;
    } catch (error: Error | any) {
      console.log(error);
      alert(error.message);
    }
  }

  const [, formAction, isPending] = useActionState(addNewBatch, null);
  return (
    <form action={formAction} className="flex gap-2 flex-col p-4">
      <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
        <LiaObjectGroupSolid className="text-site-gray text-2xl" />
        <input
          type="text"
          required
          defaultValue={updatedCourse.course_name}
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
          defaultValue={updatedCourse.course_class}
          name="course_class"
          className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
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
