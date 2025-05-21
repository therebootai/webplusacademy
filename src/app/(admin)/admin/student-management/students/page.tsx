import StudentHeader from "@/components/admin/student-management/students/StudentHeader";
import AdminTemplate from "@/templates/AdminTemplate";

export default async function StudentManagementPage() {
  return (
    <AdminTemplate>
      <StudentHeader />
    </AdminTemplate>
  );
}
