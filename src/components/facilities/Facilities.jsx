"use client";
import Image from "next/image";

// AboutSection1 (second section)
export const Facilities = () => {
  return (
    <section className="w-full flex justify-center bg-white  pt-5 pb-1">
      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row gap-18">
        {/* Left content - same total width as first section’s two cards */}
        <div className="w-full lg:flex-[2]   flex flex-col justify-center ">
          <h4 className="text-sm text-[#0095FF] mb-2">Teaching Methodologies</h4>
          <h2 className="text-2xl font-bold mb-2">
           Teaching Methodologies of WavePlus Academy
          </h2>
          <p className="text-gray-600">
            WavePlus Academy follows an innovative and student-centered teaching
            approach. The experienced faculty combines conceptual clarity with
            practical applications, ensuring that students grasp complex topics
            effortlessly. Classes are interactive, with regular discussions,
            doubt-clearing sessions, and personalized attention to cater to each
            student’s unique learning pace. The academy integrates modern
            teaching tools, multimedia resources, and real-time problem-solving
            techniques to engage students. The focus is on building strong
            fundamentals and exam strategies, helping students develop critical
            thinking and problem-solving skills. Regular assessments, quizzes,
            and feedback ensure continuous progress tracking. With a blend of
            traditional and modern methods, WavePlus Academy ensures students
            are fully prepared for competitive exams and their future academic
            pursuits.
          </p>
        </div>

        {/* Right image — same width ratio as AboutSection */}
        <div className="w-full lg:flex-[2] relative rounded-lg overflow-hidden h-64 md:h-96">
          <Image
            src="/assets/facilities/TeachingMethodologies.png"
            alt="About2 Image"
            fill
            className="object-cover"
          />
        </div>
      </div>


      
    </section>

    
  );
};
