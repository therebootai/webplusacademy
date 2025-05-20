"use client";

import { deleteaBatch } from "@/actions/batchesActions";
import { BatchesDocument } from "@/models/Batches";
import { CourseDocument } from "@/models/Courses";
import DisplayTable from "@/ui/DisplayTable";
import ToggleInput from "@/ui/ToggleInput";

export default function CourseTable({
  tableHeader,
  courseData,
}: {
  tableHeader: string[];
  courseData: CourseDocument[];
}) {
  async function handleDelete(id: string) {
    try {
      const deleted = await deleteaBatch(id);
      if (!deleted.success) {
        throw new Error(deleted.message);
      }
      alert(deleted.message);
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  }

  return (
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
            <ToggleInput status={item.status} changeStatus={() => {}} />
          </div>
          <div className="flex-1 flex gap-1">
            <button type="button" className="text-shadow-site-black">
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
  );
}
