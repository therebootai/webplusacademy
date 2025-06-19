export const dynamic = "force-dynamic";

import { getStudents } from "@/actions/studentAction";
import StudentHeader from "@/components/admin/student-management/students/StudentHeader";
import StudentTable from "@/components/admin/student-management/students/StudentTable";
import AdminTemplate from "@/templates/AdminTemplate";
import PaginationBox from "@/ui/PaginationBox";

export default async function StudentManagementPage({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    q: string;
    course: string;
    batch: string;
    startDate?: string;
    endDate?: string;
  }>;
}) {
  const { page, q, course, batch, startDate, endDate } = await searchParams;
  const { data, pagination } = await getPageData(
    parseInt(page) || 1,
    q,
    course,
    batch,
    startDate,
    endDate
  );
  return (
    <AdminTemplate>
      <StudentHeader
        search={q}
        course={course}
        batch={batch}
        startDate={startDate}
        endDate={endDate}
      />
      <StudentTable studentsData={data} />
      <PaginationBox
        pagination={pagination}
        prefix="/admin/student-management/students"
      />
    </AdminTemplate>
  );
}

async function getPageData(
  page: number = 1,
  q: string,
  course: string,
  batch: string,
  startDate?: string,
  endDate?: string
) {
  try {
    const { data, pagination } = await getStudents({
      page,
      mobileNumber: q,
      studentName: q,
      currentCourse: course,
      currentBatch: batch,
      startDate,
      endDate,
    });
    return { data, pagination };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      pagination: { totalCount: 0, currentPage: 1, limit: 10, totalPages: 0 },
    };
  }
}
