"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FaBook,
  FaChalkboardTeacher,
  FaRocket,
  FaCertificate,
} from "react-icons/fa";
import { getAllNotices } from "@/actions/noticeAction";



export default function Ourlatest() {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const itemHeight = 80;
  const speed = 1.5;

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const response = await getAllNotices({
        status: true,
      });
      if (response.success) {
        setNotices(response.data);
      }
    };
    fetchNotices();
  }, []);

  useEffect(() => {
    const totalHeight = notices.length * itemHeight;
    const interval = setInterval(() => {
      setOffset((prev) => {
        const next = prev + speed;
        return next >= totalHeight ? 0 : next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#FFF9EF] py-15 w-full px-4 md:px-40">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="md:text-5xl font-bold mb-4 text-center">
            <span className="text-[#F41A32]">Our Latest</span> Announcements
          </h2>
          <p className="text-gray-700 md:text-[22px] text-center">
            Discover our latest courses and announcements. Stay updated with new
            learning opportunities to boost your skills.
          </p>
        </div>

        <div className="flex-1 bg-white shadow-md rounded-lg max-h-[300px] overflow-hidden">
          <h3 className="text-xl font-semibold bg-[#333069] p-6 text-center text-white">
            Latest Notice and Announcement
          </h3>

          <div className="h-[300px] overflow-hidden relative">
            <div
              ref={containerRef}
              className="flex flex-col"
              style={{
                transform: `translateY(-${offset}px)`,
                transition: "transform 0.02s linear",
              }}
            >
              {notices.map((notice) =>
                notice.notice_file ? (
                  <div
                    className="p-3 last:border-b-0 h-20 flex items-center gap-4 border-b border-gray-200 hover:bg-gray-100 transition"
                    key={notice._id}
                  >
                    <div className="w-1 h-full group-odd:bg-site-darkgreen group-even:bg-site-yellow rounded-md" />
                    <Link
                      href={notice.notice_file.secure_url}
                      target="_blank"
                      className="mr-4 relative text-lg font-medium group-odd:text-site-darkgreen group-even:text-site-yellow"
                    >
                      {notice.title}
                    </Link>
                  </div>
                ) : (
                  <div
                    className="p-3 last:border-b-0 h-20 flex items-center gap-4 border-b border-gray-200 hover:bg-gray-100 transition"
                    key={notice._id}
                  >
                    <div className="w-1 h-full group-odd:bg-site-darkgreen group-even:bg-site-yellow rounded-md" />

                    <span className="mr-4 relative text-lg font-medium group-odd:text-site-darkgreen group-even:text-site-yellow">
                      {notice.title}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
