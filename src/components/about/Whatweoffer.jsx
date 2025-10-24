"use client";
import { FaUserGraduate, FaBookOpen, FaChalkboardTeacher, FaClipboardCheck, FaBrain, FaFileAlt, FaLaptop } from "react-icons/fa";

export const Whatweoffer = () => {
  const offers = [
    {
      icon: <FaUserGraduate className="text-defined-red text-3xl" />,
      title: "NEET UG Preparation Programs",
      desc: "Preparation programs are offered to those who wish to enter the medical field.",
    },
    {
      icon: <FaBookOpen className="text-defined-red text-3xl" />,
      title: "Integrated Coaching of Class XI & XII",
      desc: "The ideal combination of board exam preparation and competitive exam coaching.",
    },
    {
      icon: <FaClipboardCheck className="text-defined-red text-3xl" />,
      title: "Special Classes in Class IX and X",
      desc: "Building a solid foundation at an early age so that students can perform better in future studies.",
    },
    {
      icon: <FaChalkboardTeacher className="text-defined-red text-3xl" />,
      title: "Top-Notch Faculty – Learn from the Best",
      desc: "Tough concepts are made simple, and personal guidance is provided by our highly experienced teachers so that each student can perform well with confidence.",
    },
    {
      icon: <FaBrain className="text-defined-red text-3xl" />,
      title: "Grow Beyond Academics - Personality Development",
      desc: "We do not simply train you to pass tests - we train you to live. We help students build confidence and communication skills for success beyond academics.",
    },
    {
      icon: <FaFileAlt className="text-defined-red text-3xl" />,
      title: "Reading & Feedback - Frequent Assessment",
      desc: "Constant exams, progress reports, and doubt-busters keep students updated and exam-ready.",
    },
    {
      icon: <FaBookOpen className="text-defined-red text-3xl" />,
      title: "Everything You Need - Complete Course Plans",
      desc: "NEET and JEE, Class XI and XII boards are all covered with the perfect mix of theory and practical learning.",
    },
    {
      icon: <FaLaptop className="text-defined-red text-3xl" />,
      title: "Smart Classrooms – Study in Comfort",
      desc: "Learning is engaging, productive, and fun in our modern classrooms equipped with the latest digital tools.",
    },
    
    {
      icon: <FaBookOpen className="text-defined-red text-3xl" />,
      title: "NEET Crash Cource",
      desc: "The ideal combination of board exam preparation and competitive exam coaching.",
    },
  ];

  return (
    <section className="w-full flex justify-center  py-14">
      <div className="w-full max-w-[1440px] text-center">
   
        <h4 className="text-defined-red text-sm font-semibold mb-2 uppercase tracking-wide">
          What We Offer
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Excellence in Learning, Mentorship, and Growth
        </h2>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-6 text-left border border-gray-100 flex flex-col gap-3"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#E6F4FF] rounded-full">{offer.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {offer.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pl-[3.2rem]">
                {offer.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
