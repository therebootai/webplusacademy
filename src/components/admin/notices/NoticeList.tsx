"use client";
import { deleteNotice, updateNotice } from "@/actions/noticeAction";
import { NoticeDocument } from "@/models/Notice";
import NoticeCard from "@/ui/NoticeCard";

export default function NoticeList({ Notices }: { Notices: NoticeDocument[] }) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {Notices.map((slider: NoticeDocument) => (
        <NoticeCard
          title={slider.title}
          key={slider.noticeId}
          status={slider.status}
          notice_file={slider.notice_file}
          deleteCard={() => deleteNotice(slider._id as string)}
          changeStatus={() =>
            updateNotice(slider._id as string, !slider.status)
          }
        />
      ))}
    </div>
  );
}
