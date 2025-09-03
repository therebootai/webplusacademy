import Image from "next/image";
import React from "react";

const CourseNewCard = ({
  imgsrc,
  heading,
  classes,
  year,
  objectimg,
  toggleAppointmentModal,
}: {
  imgsrc: string;
  heading: string;
  classes: string;
  year: string;
  objectimg: string;
  toggleAppointmentModal?: () => void;
}) => {
  return (
    <div className=" relative w-full h-[20rem] xxl:h-[25rem] xxxl:h-[30rem]">
      <Image src={imgsrc} alt="" fill className="w-full h-full rounded-2xl" />
      <div className=" absolute top-4 left-4">
        <div className=" flex flex-col gap-2 ">
          <h1 className=" text-xl xxl:text-2xl xxxl:text-3xl font-semibold text-site-darkgreen ">
            {heading}
          </h1>
          <div className=" flex flex-col">
            <h2 className=" text-base xxl:text-lg xxxl:text-xl font-medium text-site-darkgreen">
              {classes}
            </h2>
            <h3 className=" text-sm xxl:text-base xxxl:text-lg font-medium text-site-darkgreen">
              Year - {year}
            </h3>
          </div>
          <button
            type="button"
            onClick={toggleAppointmentModal}
            className=" w-fit px-4 xxl:px-6 xxxl:px-8 bg-gradient-to-r from-site-litegreen to-site-darkgreen text-white text-sm xxl:text-base xxxl:text-lg h-[2rem] xxl:h-[2.5rem] xxxl:h-[3rem] transition-all duration-700 hover:brightness-125 rounded-md cursor-pointer"
          >
            Admission Today
          </button>
        </div>
      </div>
      <div className=" absolute bottom-0 right-0">
        <Image
          src={objectimg}
          alt=""
          width={504}
          height={642}
          className=" h-[16rem] xxl:h-[20rem] xxxl:h-[24rem] w-fit"
        />
      </div>
    </div>
  );
};

export default CourseNewCard;
