"use client";

import { deleteaBatch, updateaBatch } from "@/actions/batchesActions";
import { BatchesDocument } from "@/models/Batches";
import { CourseDocument } from "@/models/Courses";
import DisplayTable from "@/ui/DisplayTable";
import SidePopUpSlider from "@/ui/SidePopup";
import ToggleInput from "@/ui/ToggleInput";
import mongoose from "mongoose";
import { useState } from "react";
import EditBatch from "./EditBatch";
import AddManageAttendance from "./AddManageAttendance";

export default function BatchTable({
  tableHeader,
  batchData,
}: {
  tableHeader: string[];
  batchData: BatchesDocument[];
}) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<BatchesDocument | null>(
    null
  );
  const [modalOpenFor, setModalOpenFor] = useState("");

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

  async function handleStatus(id: string, status: boolean) {
    try {
      const updated = await updateaBatch(id, { status: !status });
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
        {batchData.map((item: BatchesDocument) => (
          <div
            key={item._id as string}
            className="flex odd:bg-white even:bg-site-darkgreen/5 p-2.5"
            style={{ flexBasis: `${Math.round(100 / batchData.length)}%` }}
          >
            <div className="flex-1">{item.batch_name}</div>
            <div className="flex-1 uppercase">
              {item.course instanceof mongoose.Types.ObjectId
                ? "-"
                : (item.course as CourseDocument).course_name ?? "-"}
            </div>
            <div className="flex-1">
              {item.start_date ? new Date(item.start_date).toDateString() : "-"}
            </div>
            <div className="flex-1">
              {item.end_date ? new Date(item.end_date).toDateString() : "-"}
            </div>
            <div className="flex-1">{item.year}</div>
            <div className="flex-1">
              <ToggleInput
                status={item.status}
                changeStatus={() =>
                  handleStatus(item._id as string, item.status)
                }
              />
            </div>
            <div className="flex-1 flex gap-1 items-center">
              <button
                type="button"
                className="text-site-black"
                onClick={() => {
                  setSelectedBatch(item);
                  setModalOpenFor("view");
                  setShowPopUp(true);
                }}
              >
                Manage Attendence
              </button>
              |
              <button
                type="button"
                className="text-site-black"
                onClick={() => {
                  setSelectedBatch(item);
                  setModalOpenFor("edit");
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
          {modalOpenFor === "edit" ? "Update Batch" : "Manage Attendence"}
        </h3>
        {selectedBatch && modalOpenFor === "edit" && (
          <EditBatch
            updatedBatch={selectedBatch as BatchesDocument}
            handleClose={() => setShowPopUp(false)}
          />
        )}
        {selectedBatch && modalOpenFor === "view" && (
          <AddManageAttendance
            batch_id={selectedBatch._id as string}
            onCancel={() => {
              setModalOpenFor("");
              setShowPopUp(false);
            }}
          />
        )}
      </SidePopUpSlider>
    </>
  );
}
