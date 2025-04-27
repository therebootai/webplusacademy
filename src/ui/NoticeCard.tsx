"use client";
import Link from "next/link";

export default function NoticeCard({
  title,
  status,
  notice_file,
  deleteCard,
  changeStatus,
}: {
  title: string;
  status: boolean;
  notice_file?: { secure_url: string; public_id: string };
  deleteCard: () => Promise<{ success: boolean; message: string }>;
  changeStatus: () => Promise<{ success: boolean; data: any }>;
}) {
  return (
    <div className="flex flex-col gap-4 px-6 py-4 bg-[#F7F7F7] text-[#333333] rounded-md">
      <div className="flex items-center gap-5 text-lg">
        Title <span className="font-bold capitalize">{title}</span>
      </div>
      <div className="flex items-center gap-5">
        Status{" "}
        <label className="switch">
          <input type="checkbox" checked={status} onChange={changeStatus} />
          <span className="slider"></span>
        </label>
      </div>
      <div className="flex items-center gap-5">
        Actions{" "}
        {notice_file && (
          <>
            <Link
              className="text-site-darkgreen font-medium text-lg"
              href={notice_file?.secure_url}
              target="_blank"
            >
              View
            </Link>
            /
          </>
        )}{" "}
        <button
          type="button"
          className="text-red-500 font-medium text-lg"
          onClick={deleteCard}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
