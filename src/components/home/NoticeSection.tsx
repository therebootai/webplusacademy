"use client";
import { getAllNotices } from "@/actions/noticeAction";
import useElementHeight from "@/hooks/useElementHeight";
import { NoticeDocument } from "@/models/Notice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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

const NoticeSection = () => {
  const [notices, setNotices] = useState<NoticeDocument[]>([]);
  const [imageHeight, contentRef] = useElementHeight<HTMLDivElement>();

  useEffect(() => {
    const fetchNotices = async () => {
      const response: NoticeResponse = await getAllNotices({
        status: true,
      });
      if (response.success) {
        setNotices(response.data);
      }
    };
    fetchNotices();
  }, []);
  return (
    <div className=" relative  bg-[#F3CB1E1A] xl:py-16 lg:py-8 py-4 xxxl:px-40 xxl:py-20 xxl:px-32 xl:px-24 xlg:px-16 lg:px-8 px-4">
      <div className=" flex flex-row gap-6 w-full">
        <div className=" w-[60%] grid grid-cols-2 gap-4" ref={contentRef}>
          <Image
            src={"/extra/noticeimg.png"}
            alt=""
            width={527}
            height={387}
            className="w-full rounded-2xl "
          />
          <Image
            src={"/extra/noticeimg.png"}
            alt=""
            width={527}
            height={387}
            className="w-full rounded-2xl "
          />
        </div>
        <div
          className=" w-[40%] flex flex-col"
          style={{ height: `${imageHeight}px` }}
        >
          <div className=" w-full h-[25%] bg-site-yellow flex justify-center items-center py-4 px-4 text-xl font-semibold text-site-darkgreen rounded-t-2xl">
            New Courses and Announcement
          </div>
          <div className=" w-full h-[75%] bg-white rounded-b-2xl p-4 flex flex-col gap-4 no-scrollbar overflow-y-scroll ">
            {notices.map((notice) =>
              notice.notice_file ? (
                <div className="flex flex-row gap-2 group">
                  <div className="w-1 h-full group-odd:bg-site-darkgreen group-even:bg-site-yellow rounded-md" />
                  <Link
                    key={notice._id as string}
                    href={notice.notice_file.secure_url}
                    target="_blank"
                    className="mr-4 relative text-lg font-medium group-odd:text-site-darkgreen group-even:text-site-yellow"
                  >
                    {notice.title}
                  </Link>
                </div>
              ) : (
                <div className="flex flex-row gap-2 group">
                  <div className="w-1 h-full group-odd:bg-site-darkgreen group-even:bg-site-yellow rounded-md" />

                  <span
                    key={notice._id as string}
                    className="mr-4 relative text-lg font-medium group-odd:text-site-darkgreen group-even:text-site-yellow"
                  >
                    {notice.title}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeSection;
