import { getAllBatches } from "@/actions/batchesActions";
import AddNewBatch from "@/components/admin/student-management/batches/AddNewBatch";
import BatchTable from "@/components/admin/student-management/batches/BatchTable";
import AdminTemplate from "@/templates/AdminTemplate";
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
      <BatchTable tableHeader={tableHeader} batchData={data} />
      <PaginationBox
        prefix="/admin/student-management/batches"
        pagination={pagination}
      />
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
