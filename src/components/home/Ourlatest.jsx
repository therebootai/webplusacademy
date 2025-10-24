
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaBook, FaChalkboardTeacher, FaRocket, FaCertificate } from "react-icons/fa";

const courses = [
  { title: "NEET", icon: <FaBook className="text-[#F41A32]" />, link: "/neet" },
  { title: "NEET - Crash Course", icon: <FaRocket className="text-[#F41A32]" />, link: "/crashcource" },
  { title: "Class-11th", icon: <FaChalkboardTeacher className="text-[#F41A32]" />, link: "/xi" },
  { title: "Class-12th", icon: <FaCertificate className="text-[#F41A32]" />, link: "/xii" },
];

export default function Ourlatest() {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const itemHeight = 80; 
  const speed = 1.5; 

  useEffect(() => {
    const totalHeight = courses.length * itemHeight;
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
            Discover our latest courses and announcements. Stay updated with new learning opportunities to boost your skills.
          </p>
        </div>

        <div className="flex-1 bg-white shadow-md rounded-lg max-h-[300px] overflow-hidden">
         
          <h3 className="text-xl font-semibold bg-[#333069] p-6 text-center text-white">
            New Courses and Announcement
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
        
              {[...courses, ...courses].map((course, idx) => (
                <Link
                  key={idx}
                  href={course.link}
                  className="p-3 last:border-b-0 h-20 flex items-center gap-4 border-b border-gray-200 hover:bg-gray-100 transition"
                >
                  <span className="text-2xl">{course.icon}</span>
                  <span className="text-gray-800 font-medium">{course.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
