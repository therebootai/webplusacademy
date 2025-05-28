import { getStudents } from "@/actions/studentAction";
import FeesHeader from "@/components/admin/fees/FeesHeader";
import FeesTable from "@/components/admin/fees/FeesTable";
import AdminTemplate from "@/templates/AdminTemplate";
import PaginationBox from "@/ui/PaginationBox";

export default async function FeesPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; q: string; mon: string; year: string }>;
}) {
  const { page, q, mon, year } = await searchParams;
  const { data, pagination } = await getPageData(parseInt(page) || 1, q);
  return (
    <AdminTemplate>
      <FeesHeader search={q} mon={mon} year={year} />
      <FeesTable studentsData={data} mon={mon} year={year} />
      <PaginationBox pagination={pagination} prefix="/admin/fees" />
    </AdminTemplate>
  );
}

async function getPageData(
  page: number = 1,
  q: string,
  mon?: string,
  year?: string
) {
  try {
    const { data, pagination } = await getStudents({
      page,
      mobileNumber: q,
      studentName: q,
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
