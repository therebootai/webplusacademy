"use client";

import SidePopUpSlider from "@/ui/SidePopup";
import { useCallback, useEffect, useState } from "react";
import { LuUserPlus } from "react-icons/lu";
import AddNewStudent from "./AddNewStudent";
import { getAllCourses } from "@/actions/coursesActions";
import { getAllBatches } from "@/actions/batchesActions";
import { BatchesDocument } from "@/models/Batches";
import { CourseDocument } from "@/models/Courses";
import { useRouter, useSearchParams } from "next/navigation";

export default function StudentHeader({
  search,
  course,
  batch,
}: {
  search?: string;
  course?: string;
  batch?: string;
}) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  const searchParams = useSearchParams();
  const router = useRouter();

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

  const handleSearch = useCallback(
    (query: string | null | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!query) {
        params.delete("q"); // remove "q" if query is empty, null, or undefined
      } else {
        params.set("q", query); // otherwise set it
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams]
  );

  const handelBatchFilter = useCallback(
    (query: string | null | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!query) {
        params.delete("batch"); // remove "batch" if query is empty, null, or undefined
      } else {
        params.set("batch", query); // otherwise set it
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams]
  );

  const handelCourseFilter = useCallback(
    (query: string | null | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!query) {
        params.delete("course"); // remove "course" if query is empty, null, or undefined
      } else {
        params.set("course", query); // otherwise set it
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams]
  );

  return (
    <>
      <div className="flex gap-3.5">
        <button
          type="button"
          onClick={() => setShowPopUp(true)}
          className="flex items-center justify-center rounded-lg xl:text-lg md:text-base text-white bg-site-darkgreen px-5 h-[3.5rem] flex-1"
        >
          <LuUserPlus />
          <span className="ml-2">Add</span>
        </button>
        <div className="basis-[40%]">
          <input
            type="search"
            defaultValue={search}
            placeholder="Search mobile no  & student name"
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-white rounded-md  text-site-black border border-[#f0f0f0] px-5 h-[3.5rem]"
          />
        </div>
        <div className="basis-[20%]">
          <select
            value={batch ?? ""}
            onChange={(e) => handelBatchFilter(e.target.value)}
            className="w-full bg-white rounded-md  text-site-black border border-[#f0f0f0] px-5 h-[3.5rem] outline-none"
          >
            <option value="">Select Batch</option>
            {batches.map((batch: BatchesDocument) => (
              <option key={batch._id as string} value={batch._id as string}>
                {batch.batch_name}
              </option>
            ))}
          </select>
        </div>
        <div className="basis-[20%]">
          <select
            value={course ?? ""}
            onChange={(e) => handelCourseFilter(e.target.value)}
            className="w-full bg-white rounded-md  text-site-black border border-[#f0f0f0] px-5 h-[3.5rem] outline-none"
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
