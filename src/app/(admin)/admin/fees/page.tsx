import { getStudents } from "@/actions/studentAction";
import AdminTemplate from "@/templates/AdminTemplate";
import PaginationBox from "@/ui/PaginationBox";

export default async function FeesPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const { data, pagination } = await getPageData(parseInt(page) || 1);
  return (
    <AdminTemplate>
      <PaginationBox pagination={pagination} prefix="/admin/fees" />
    </AdminTemplate>
  );
}

async function getPageData(page: number = 1) {
  try {
    const { data, pagination } = await getStudents({ page });
    return { data, pagination };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      pagination: { totalCount: 0, currentPage: 1, limit: 10, totalPages: 0 },
    };
  }
}
