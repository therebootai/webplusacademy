"use client";
import { getAllNotices } from "@/actions/noticeAction";
import { NoticeDocument } from "@/models/Notice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";

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

export default function TopHeader({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const [notices, setNotices] = useState<NoticeDocument[]>([]);

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
    <div ref={ref}>
      <div className="h-1 w-full bg-site-litegreen" />
      <header className="flex bg-site-yellow relative">
        <div className="[clip-path:_polygon(0%_0%,_100%_0%,_95%_100%,_0%_100%)] bg-green-dark-to-light py-6 pl-16 pr-9 hidden md:flex gap-4 z-10">
          <div className="flex md:gap-2 sm:gap-1 items-center text-[10px] lg:text-sm xl:text-base text-white">
            <BiSolidPhoneCall size={20} className="text-site-yellow" />
            <Link href="tel:+919614016184">+91 96140 16184</Link>{" "}
          </div>
          <Link
            href="https://api.whatsapp.com/send?phone=+919614016184"
            className="flex md:gap-2 sm:gap-1 items-center font-semibold md:flex text-white text-[10px] lg:text-sm xl:text-base"
          >
            <IoLogoWhatsapp size={20} className="text-site-yellow" />
            <span>+91 96140 16184</span>
          </Link>
          <Link
            href="mailto:info@waveplusacademy.com"
            className="flex md:gap-2 sm:gap-1 items-center font-semibold md:flex text-white text-[10px] lg:text-sm xl:text-base"
          >
            <MdEmail size={20} className="text-site-yellow" />
            <span>info@waveplusacademy.com</span>
          </Link>
        </div>
        <div className="py-3.5 md:py-6 pl-3.5 md:pl-9 md:pr-16 text-base text-site-darkgreen">
          <div className="inline-block animate-marquee hover:[animation-play-state:paused]">
            {notices.map((notice) =>
              notice.notice_file ? (
                <Link
                  key={notice._id as string}
                  href={notice.notice_file.secure_url}
                  target="_blank"
                  className="mr-4 relative  after:absolute after:content-['|'] last:after:content-none after:mx-1"
                >
                  {notice.title}
                </Link>
              ) : (
                <span
                  key={notice._id as string}
                  className="mr-4 relative after:absolute after:content-['|'] last:after:content-none after:mx-1 cursor-context-menu"
                >
                  {notice.title}
                </span>
              )
            )}
          </div>
        </div>
        <Link
          href="/guardian-login"
          className="absolute right-0 top-1/2 -translate-y-1/2 xl:text-2xl md:text-xl inline-flex bg-site-yellow text-site-darkgreen px-4"
        >
          Student Login
        </Link>
      </header>
    </div>
  );
}
