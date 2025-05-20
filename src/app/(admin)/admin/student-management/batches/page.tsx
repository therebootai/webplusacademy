import { getAllBatches } from "@/actions/batchesActions";
import AddNewBatch from "@/components/admin/student-management/batches/AddNewBatch";
import { BatchesDocument } from "@/models/Batches";
import AdminTemplate from "@/templates/AdminTemplate";
import DisplayTable from "@/ui/DisplayTable";
import PaginationBox from "@/ui/PaginationBox";
import React from "react";

export default async function BatchPage() {
  const { data, pagination } = await getPageData(1);
  const tableHeader = [
    "batch name",
    "class for",
    "start date",
    "end date",
    "year",
    "status",
    "actions",
  ];
  return (
    <AdminTemplate>
      <AddNewBatch />
      <DisplayTable tableHeader={tableHeader}>
        {data.map((item: BatchesDocument) => (
          <div
            key={item._id as string}
            className="flex odd:bg-white even:bg-site-darkgreen/5 p-2.5"
            style={{ flexBasis: `${Math.round(100 / data.length)}%` }}
          >
            <div className="flex-1">{item.batch_name}</div>
            <div className="flex-1">{item.course}</div>
            <div className="flex-1">
              {item.start_date ? new Date(item.start_date).toDateString() : "-"}
            </div>
            <div className="flex-1">
              {item.end_date ? new Date(item.end_date).toDateString() : "-"}
            </div>
            <div className="flex-1">{item.year}</div>
            <div className="flex-1">{item.status ? "active" : "inactive"}</div>
            <div className="flex-1 flex gap-1">
              <button type="button" className="text-shadow-site-black">
                Edit
              </button>
              |
              <button type="button" className="text-red-500">
                Delete
              </button>
            </div>
          </div>
        ))}
      </DisplayTable>
      <PaginationBox prefix="/admin/batches" pagination={pagination} />
    </AdminTemplate>
  );
}

export async function getPageData(page: number | string) {
  try {
    const { data, pagination } = await getAllBatches({ page });
    return { data, pagination };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      pagination: { totalCount: 0, currentPage: 1, limit: 10, totalPages: 0 },
    };
  }
}
