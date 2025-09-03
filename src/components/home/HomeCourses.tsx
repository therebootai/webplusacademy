"use client";
import CourseNewCard from "@/ui/CourseNewCard";
import CustomHeading from "@/ui/CustomHeading";
import EnquiryForm from "@/ui/EnquiryForm";
import Popup from "@/ui/Popup";
import { useState } from "react";

export default function HomeCourses() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const toggleAppointmentModal = () =>
    setIsAppointmentModalOpen(!isAppointmentModalOpen);
  const courses = [
    {
      heading: "NEET 2 Year",
      classes: "For Class 11th",
      year: "2027",
      objectimg: "/extra/neet2yr.png",
    },
    {
      heading: "NEET Dropout",
      classes: "For Class 11th",
      year: "2027",
      objectimg: "/extra/neetdropout.png",
    },
    {
      heading: "NEET Crash Course",
      classes: "For Class 11th",
      year: "2027",
      objectimg: "/extra/neetcrash.png",
    },
    {
      heading: "XI",
      classes: "For Class 11th",
      year: "2027",
      objectimg: "/extra/xi.png",
    },
    {
      heading: "XII",
      classes: "For Class 12th",
      year: "2027",
      objectimg: "/extra/coursegirl.png",
    },
    {
      heading: "JEE",
      classes: "For Class 11th",
      year: "2027",
      objectimg: "/extra/coursegirl.png",
    },
  ];
  return (
    <div className="flex flex-col gap-7 items-center">
      <div className="flex flex-col gap-3.5 items-center">
        <h3 className="text-site-darkgreen xl:text-base xxl:text-lg xxxl:text-xl md:text-sm text-xs text-center">
          Career-driven learning paths
        </h3>
        <CustomHeading
          normal="Master Your Future with "
          highlight="Waveplus Academy"
          className="font-bold xl:text-3xl xxl:text-4xl xxxl:text-5xl"
        />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:gap-6 w-full">
        {courses.map((item, index) => (
          <div key={index}>
            <CourseNewCard
              imgsrc={
                index % 2 === 0 ? "/extra/cardbg.png" : "/extra/cardbg2.png"
              }
              heading={item.heading}
              classes={item.classes}
              year={item.classes}
              objectimg={item.objectimg}
              toggleAppointmentModal={toggleAppointmentModal}
            />
          </div>
        ))}
      </div>
      <Popup isOpen={isAppointmentModalOpen} onClose={toggleAppointmentModal}>
        <EnquiryForm />
      </Popup>
    </div>
  );
}
