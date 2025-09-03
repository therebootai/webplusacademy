"use client";
import CustomHeading from "@/ui/CustomHeading";
import StudentCard from "@/ui/StudentCard";
import React, { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const OurStudentSection = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [autoplay, setAutoplay] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 350) {
        setSlidesToShow(1);
        setAutoplay(true);
      } else if (window.innerWidth <= 460) {
        setSlidesToShow(1);
        setAutoplay(true);
      } else if (window.innerWidth <= 860) {
        setSlidesToShow(2);
        setAutoplay(true);
      } else if (window.innerWidth <= 1224) {
        setSlidesToShow(3);
        setAutoplay(true);
      } else if (window.innerWidth <= 1380) {
        setSlidesToShow(3);
        setAutoplay(true);
      } else if (window.innerWidth <= 1780) {
        setSlidesToShow(3);
        setAutoplay(true);
      } else if (window.innerWidth <= 1900) {
        setSlidesToShow(4);
        setAutoplay(true);
      } else {
        setSlidesToShow(3);
        setAutoplay(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const students = [
    {
      studenticon: "/extra/coursegirl.png",
      studentname: "Student Full Name",
      desc: "MBBS, SMIT, TOP",
    },
    {
      studenticon: "/extra/coursegirl.png",
      studentname: "Student Full Name",
      desc: "MBBS, SMIT, TOP",
    },
    {
      studenticon: "/extra/coursegirl.png",
      studentname: "Student Full Name",
      desc: "MBBS, SMIT, TOP",
    },
    {
      studenticon: "/extra/coursegirl.png",
      studentname: "Student Full Name",
      desc: "MBBS, SMIT, TOP",
    },
  ];
  return (
    <div className=" flex flex-col gap-7 items-center">
      <div className="flex flex-col gap-3.5 items-center">
        <CustomHeading
          normal="Our "
          highlight="Student"
          className="font-bold xl:text-3xl xxl:text-4xl xxxl:text-5xl"
        />
      </div>
      <div className=" w-full">
        <Swiper
          spaceBetween={10}
          slidesPerView={slidesToShow}
          autoplay={
            autoplay ? { delay: 3000, disableOnInteraction: false } : false
          }
          loop={true}
          modules={[Autoplay]}
        >
          {students.map((item, index) => (
            <SwiperSlide key={index}>
              <StudentCard
                studenticon={item.studenticon}
                studentname={item.studentname}
                desc={item.desc}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OurStudentSection;
