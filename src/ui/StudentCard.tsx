import Image from "next/image";
import React from "react";

const StudentCard = ({
  studenticon,
  studentname,
  desc,
}: {
  studenticon: string;
  studentname: string;
  desc: string;
}) => {
  return (
    <div className=" relative w-full h-[25rem] xxl:h-[28rem] xxxl:h-[33rem] bg-[#FAFAFA] rounded-2xl">
      <Image
        src={"/extra/student-bg.png"}
        alt=""
        fill
        className="w-full h-full rounded-2xl"
      />
      <div className=" absolute inset-0 flex justify-center items-center w-full">
        <div className="flex flex-col ">
          <div className=" relative flex flex-col justify-center items-center">
            <div className=" size-[15rem] relative bg-site-yellow rounded-full border-r-4 border-site-darkgreen">
              <div className=" absolute bottom-0 left-[12%] ">
                <Image
                  src={studenticon}
                  alt=""
                  width={504}
                  height={642}
                  className=" h-[14rem] w-fit "
                />
              </div>
            </div>

            <div className=" flex flex-col absolute -bottom-8 justify-center items-center">
              <div className=" h-[3rem] w-[15rem] px-4 flex justify-center items-center bg-gradient-to-r from-site-darkgreen to-site-litegreen text-white text-lg rounded-tr-xl rounded-bl-xl ">
                {studentname}
              </div>
              <div className=" text-site-darkgreen font-medium text-lg ">
                {desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
