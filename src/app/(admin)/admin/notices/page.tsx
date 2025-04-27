import { getAllNotices } from "@/actions/noticeAction";
import AddNewNotice from "@/components/admin/notices/AddNewNotices";
import NoticeList from "@/components/admin/notices/NoticeList";
import { NoticeDocument } from "@/models/Notice";
import AdminTemplate from "@/templates/AdminTemplate";
import PaginationBox from "@/ui/PaginationBox";

type NoticeResponse = {
  success: boolean;
  data: NoticeDocument[];
  pagination: {
    totalCount: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
};

export default async function NoticesPage() {
  const pageData = await getNoticeData();
  return (
    <AdminTemplate>
      <AddNewNotice />
      <NoticeList Notices={pageData?.data} />
      <PaginationBox
        pagination={pageData?.pagination}
        prefix="/admin/notices"
      />
    </AdminTemplate>
  );
}

async function getNoticeData(): Promise<NoticeResponse> {
  try {
    const notices = await getAllNotices();
    return notices;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        limit: 10,
        totalPages: 0,
      },
    };
  }
}
