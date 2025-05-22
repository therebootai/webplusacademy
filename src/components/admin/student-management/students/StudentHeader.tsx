"use client";

import SidePopUpSlider from "@/ui/SidePopup";
import { useEffect, useState } from "react";
import { LuUserPlus } from "react-icons/lu";
import AddNewStudent from "./AddNewStudent";
import { getAllCourses } from "@/actions/coursesActions";
import { getAllBatches } from "@/actions/batchesActions";
import { BatchesDocument } from "@/models/Batches";
import { CourseDocument } from "@/models/Courses";

export default function StudentHeader() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await getAllCourses({ limit: 100 });
        setCourses(courseRes.data);

        const batchRes = await getAllBatches({ limit: 100 });
        setBatches(batchRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex gap-3.5">
        <button
          type="button"
          onClick={() => setShowPopUp(true)}
          className="flex items-center justify-center rounded-lg xl:text-lg md:text-base text-white bg-site-darkgreen px-5 h-[3.5rem]"
        >
          <LuUserPlus />
          <span className="ml-2">Add</span>
        </button>
        <div className=" w-[40%]">
          <input
            type="text"
            placeholder="Search mobile no  & student name"
            className=" w-full bg-white rounded-md  text-site-black border border-[#f0f0f0] px-5 h-[3.5rem]"
          />
        </div>
        <div className="w-[20%]">
          <select
            name=""
            id=""
            className="w-full bg-white rounded-md  text-site-black border border-[#f0f0f0] px-5 h-[3.5rem]"
          >
            <option value="">Select Batch</option>
            {batches.map((batch: BatchesDocument) => (
              <option key={batch._id as string} value={batch._id as string}>
                {batch.batch_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[20%]">
          <select
            name=""
            id=""
            className="w-full bg-white rounded-md  text-site-black border border-[#f0f0f0] px-5 h-[3.5rem]"
          >
            <option value="">Select Course</option>
            {courses.map((course: CourseDocument) => (
              <option key={course._id as string} value={course._id as string}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <SidePopUpSlider
        showPopUp={showPopUp}
        handleClose={() => setShowPopUp(false)}
      >
        <AddNewStudent />
      </SidePopUpSlider>
    </>
  );
}
