"use client";

import { deleteaCourse, updateaCourse } from "@/actions/coursesActions";
import { BatchesDocument } from "@/models/Batches";
import { CourseDocument } from "@/models/Courses";
import DisplayTable from "@/ui/DisplayTable";
import SidePopUpSlider from "@/ui/SidePopup";
import ToggleInput from "@/ui/ToggleInput";
import EditCourses from "./EditCourses";
import { useState } from "react";

export default function CourseTable({
  tableHeader,
  courseData,
}: {
  tableHeader: string[];
  courseData: CourseDocument[];
}) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseDocument | null>(
    null
  );
  async function handleDelete(id: string) {
    try {
      const deleted = await deleteaCourse(id);
      if (!deleted.success) {
        throw new Error(deleted.message);
      }
      alert(deleted.message);
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  }

  async function handleStatus(id: string, status: boolean) {
    try {
      const updated = await updateaCourse(id, { status: !status });
      if (!updated.success) {
        throw new Error(updated.message);
      }
      alert(updated.message);
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  }

  return (
    <>
      <DisplayTable tableHeader={tableHeader}>
        {courseData.map((item: CourseDocument) => (
          <div
            key={item._id as string}
            className="flex odd:bg-white even:bg-site-darkgreen/5 p-2.5"
            style={{ flexBasis: `${Math.round(100 / courseData.length)}%` }}
          >
            <div className="flex-1">{item.course_name}</div>
            <div className="flex-1">{item.course_class}</div>
            <div className="flex-1">
              {(item.batches as BatchesDocument[]).map(
                (batch) => batch.batch_id + " , "
              )}
            </div>
            <div className="flex-1">
              <ToggleInput
                status={item.status}
                changeStatus={() =>
                  handleStatus(item._id as string, item.status)
                }
              />
            </div>
            <div className="flex-1 flex gap-1">
              <button
                type="button"
                className="text-shadow-site-black"
                onClick={() => {
                  setSelectedCourse(item);
                  setShowPopUp(true);
                }}
              >
                Edit
              </button>
              |
              <button
                type="button"
                className="text-red-500"
                onClick={() => handleDelete(item._id as string)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </DisplayTable>
      <SidePopUpSlider
        showPopUp={showPopUp}
        handleClose={() => setShowPopUp(false)}
      >
        <h3 className="px-4 text-2xl text-site-darkgreen font-bold">
          Update Course
        </h3>
        {selectedCourse && (
          <EditCourses
            updatedCourse={selectedCourse}
            handleClose={() => setShowPopUp(false)}
          />
        )}
      </SidePopUpSlider>
    </>
  );
}
