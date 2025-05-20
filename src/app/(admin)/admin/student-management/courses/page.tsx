import { getAllCourses } from "@/actions/coursesActions";
import AddNewCourses from "@/components/admin/student-management/courses/AddNewCourses";
import CourseTable from "@/components/admin/student-management/courses/CourseTable";
import AdminTemplate from "@/templates/AdminTemplate";
import PaginationBox from "@/ui/PaginationBox";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const { data, pagination } = await getPageData(parseInt(page) || 1);
  const tableHeader = [
    "course name",
    "class for",
    "batches",
    "status",
    "actions",
  ];
  return (
    <AdminTemplate>
      <AddNewCourses />
      <CourseTable tableHeader={tableHeader} courseData={data} />
      <PaginationBox
        prefix="/admin/student-management/courses"
        pagination={pagination}
      />
    </AdminTemplate>
  );
}

async function getPageData(page: number) {
  try {
    const { data, pagination } = await getAllCourses({ page });
    return { data, pagination };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      pagination: { totalCount: 0, currentPage: 1, limit: 10, totalPages: 0 },
    };
  }
}
