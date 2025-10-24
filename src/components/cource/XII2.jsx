"use client";

import Link from "next/link";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaUserGraduate,
  FaClipboardList,
  FaFileAlt,
  FaBuilding,
} from "react-icons/fa";

export default function XII2() {
  const features = [
    {
      title: "Expert Faculty Guidance",
      desc: "Dedicated, experienced teachers help students excel with personalized coaching, tailored to meet individual learning needs.",
      icon: <FaChalkboardTeacher className="text-defined-red text-2xl mt-1" />,
    },
    {
      title: "Comprehensive Course Structure",
      desc: "Programs designed for NEET, JEE, and board exams, integrating theory and practical to ensure thorough preparation.",
      icon: <FaBookOpen className="text-defined-red text-2xl mt-1" />,
    },
    {
      title: "Holistic Personality Development",
      desc: "Beyond academics, we build confident, well-rounded individuals with strong personality and communication skills.",
      icon: <FaUserGraduate className="text-defined-red text-2xl mt-1" />,
    },
    {
      title: "Top-notch Study Material",
      desc: "Updated, exam-focused resources and mock tests designed by experts to ensure in-depth understanding and top scores.",
      icon: <FaClipboardList className="text-defined-red text-2xl mt-1" />,
    },
    {
      title: "Regular Assessments & Feedback",
      desc: "Continuous evaluations, personalized feedback, and doubt-clearing sessions to track progress and ensure concept mastery.",
      icon: <FaFileAlt className="text-defined-red text-2xl mt-1" />,
    },
    {
      title: "State-of-the-art Facilities",
      desc: "Equipped classrooms, advanced teaching tools, and online resources that support an immersive and engaging learning experience.",
      icon: <FaBuilding className="text-defined-red text-2xl mt-1" />,
    },
  ];

  const relatedCourses = [
    {
      title: "11th + 12th Integrated Program",
      desc: "Comprehensive year-long NEET + Board preparation program for Class XI & XII students.",
      href: "/xi",
      img: "/assets/students/Karma Tshering Uden 2022.jpg",
    },
    {
      title: "Crash Course — NEET Revision",
      desc: "Short intense revision program with full test series for NEET.",
      href: "/courses/neet-crash",
      img: "/assets/students/Rinchen Bhutia 2023.jpg",
    },
  ];

  return (
    <section className="container mx-auto py-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <div className="md:col-span-2 flex flex-col gap-6">
         
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 ">
              Career You’re Passionate About Is There For You!
            </h2>
            <p className="text-gray-700 text-sm md:text-base mb-4">
              Our Class XII NEET program is an advanced, result-driven course
              that combines board exam preparation with full-scale NEET
              coaching. We complete the syllabus with timely revisions, focus on
              high-yield NEET topics, and conduct frequent mock tests based on
              NTA patterns. The program includes concept reinforcement,
              one-on-one doubt-solving, and time-management training. Special
              crash courses and full-length test series simulate the real NEET
              exam environment. Students are guided every step—from strategy
              planning to stress handling—ensuring they’re confident and
              exam-ready.
            </p>
            <p className="text-gray-700 text-sm md:text-base mb-4">
              The JEE Class XII course at WavePlus Academy targets both board
              and competitive success. We complete the Class XII PCM syllabus
              with a dual focus: conceptual understanding for boards and
              problem-solving techniques for JEE Main and Advanced. The program
              includes daily problem sets, weekly tests, mock exams, and
              personalized feedback. Our faculty trains students on exam
              temperament, quick-solving techniques, and strategic planning.
              Crash courses and test series help students fine-tune their
              performance before the actual exam. This focused year helps
              engineering aspirants maximize their potential and secure top
              ranks.
            </p>
            <p className="text-gray-700 text-sm md:text-base font-medium">
              <strong>Eligibility:</strong> The minimum age of 17 years as of
              December 31 of the year of admission is mandatory for NEET
              aspirants. Candidates must have passed 10+2 with Physics,
              Chemistry, Biology/Biotechnology, and English as core subjects.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 bg-[#FFFBF2] rounded-2xl border border-[0.3px] border-gray-300 shadow-sm hover:shadow-md transition"
              >
                <div>{feature.icon}</div>
                <div>
                  <h4 className="font-semibold">{feature.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

       
        <div className="flex flex-col gap-4">
          {relatedCourses.map((course, i) => (
            <aside
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-[0.3px] border-gray-300 overflow-hidden flex flex-col flex-1"
            >
    
              <div className="relative w-full h-48 md:h-64">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Related Course
                </div>
              </div>

             
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h4 className="text-lg font-bold">{course.title}</h4>
                <p className="text-sm text-gray-600 flex-1">{course.desc}</p>
                <Link
                  href={course.href}
                  className="mt-2 inline-block px-4 py-2 bg-defined-red text-white rounded-md font-medium  text-center"
                >
                  View Course
                </Link>
              </div>
            </aside>
          ))}
        </div>
      </div>
    </section>
  );
}
