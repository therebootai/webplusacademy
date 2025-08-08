import HatIcon from "@/icon/HatIcon";
import Link from "next/link";
import React from "react";

const DashboardCountingSection = ({
  totalStudent,
  totalBatch,
  totalCourse,
  totalDue,
}: {
  totalStudent: number;
  totalBatch: number;
  totalCourse: number;
  totalDue: number;
}) => {
  return (
    <div className=" p-4 grid grid-cols-4 gap-4">
      <Link
        href={"/admin/student-management/students"}
        className=" h-[8rem] w-full rounded-md flex justify-center gap-8 items-center bg-site-darkgreen text-site-yellow"
      >
        <div className=" size-[5rem] rounded-full bg-[#FFFFFF33] flex justify-center items-center">
          <HatIcon className=" size-[3rem]" color="#F3CB1E" />
        </div>
        <div className=" flex flex-col gap-2">
          <h1 className=" text-2xl font-semibold">Total Student</h1>{" "}
          <p className=" text-lg font-medium"> {totalStudent}</p>
        </div>
      </Link>
      <Link
        href={"/admin/student-management/batches"}
        className=" h-[8rem] w-full rounded-md flex justify-center gap-8 items-center bg-site-yellow text-site-darkgreen"
      >
        <div className=" size-[5rem] rounded-full bg-[#FFFFFF33] flex justify-center items-center">
          <HatIcon className=" size-[3rem]" color="#0B5844" />
        </div>
        <div className=" flex flex-col gap-2">
          <h1 className=" text-2xl font-semibold">Total Batch</h1>{" "}
          <p className=" text-lg font-medium"> {totalBatch}</p>
        </div>
      </Link>
      <Link
        href={"/admin/student-management/courses"}
        className=" h-[8rem] w-full rounded-md flex justify-center gap-8 items-center bg-site-darkgreen text-site-yellow"
      >
        <div className=" size-[5rem] rounded-full bg-[#FFFFFF33] flex justify-center items-center">
          <HatIcon className=" size-[3rem]" color="#F3CB1E" />
        </div>
        <div className=" flex flex-col gap-2">
          <h1 className=" text-2xl font-semibold">Total Course</h1>{" "}
          <p className=" text-lg font-medium"> {totalCourse}</p>
        </div>
      </Link>
      <Link
        href={"/admin/fees"}
        className=" h-[8rem] w-full rounded-md flex justify-center gap-8 items-center bg-site-yellow text-site-darkgreen"
      >
        <div className=" size-[5rem] rounded-full bg-[#FFFFFF33] flex justify-center items-center">
          <HatIcon className=" size-[3rem]" color="#0B5844" />
        </div>
        <div className=" flex flex-col gap-2">
          <h1 className=" text-2xl font-semibold">Total Due</h1>{" "}
          <p className=" text-lg font-medium"> ₹{totalDue}</p>
        </div>
      </Link>
    </div>
  );
};

export default DashboardCountingSection;
