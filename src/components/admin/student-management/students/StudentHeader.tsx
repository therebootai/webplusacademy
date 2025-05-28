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
import { format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function StudentHeader({
  search,
  course,
  batch,
  startDate,
  endDate,
}: {
  search?: string;
  course?: string;
  batch?: string;
  startDate?: string;
  endDate?: string;
}) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  const [popupKey, setPopupKey] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialStartDate = startDate ? parseDateFromString(startDate) : null;
  const initialEndDate = endDate ? parseDateFromString(endDate) : null;
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isDateFiltered, setIsDateFiltered] = useState(
    initialStartDate !== null || initialEndDate !== null
  );

  function parseDateFromString(dateStr: string) {
    const [day, month, year] = dateStr.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  function formatDateToString(date: Date) {
    return format(date, "dd-MM-yyyy");
  }

  function toggleDatePicker() {
    setShowDatePicker((prev) => !prev);
  }

  function handleSelect(ranges: any) {
    setDateRange([ranges.selection]);
  }

  function applyDateFilter() {
    const params = new URLSearchParams(searchParams.toString());

    if (dateRange[0].startDate) {
      params.set("startDate", formatDateToString(dateRange[0].startDate));
    }
    if (dateRange[0].endDate) {
      params.set("endDate", formatDateToString(dateRange[0].endDate));
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);

    setIsDateFiltered(true);
    setShowDatePicker(false);
  }

  function clearDateFilter() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("startDate");
    params.delete("endDate");
    params.set("page", "1");
    router.push(`?${params.toString()}`);

    setIsDateFiltered(false);

    setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  }

  function openAddPopup() {
    setPopupKey((k) => k + 1);
    setShowPopUp(true);
  }

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
        params.delete("q");
      } else {
        params.set("q", query);
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams]
  );

  const handelBatchFilter = useCallback(
    (query: string | null | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!query) {
        params.delete("batch");
      } else {
        params.set("batch", query);
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams]
  );

  const handelCourseFilter = useCallback(
    (query: string | null | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!query) {
        params.delete("course");
      } else {
        params.set("course", query);
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams]
  );

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3.5 items-center w-[80%]">
        <div className=" w-[30%] bg-site-darkgreen h-[2.5rem] flex flex-row gap-2 items-center justify-center px-4 rounded-md">
          <div className="relative w-full">
            <input
              type="text"
              readOnly
              placeholder="select Date"
              value={`From: ${formatDateToString(
                dateRange[0].startDate
              )} To: ${formatDateToString(dateRange[0].endDate)}`}
              className="h-[2.5rem] w-full px-2 xlg:px-6 rounded-md bg-site-darkgreen text-xs xlg:text-sm cursor-pointer outline-none text-site-yellow"
              onClick={toggleDatePicker}
            />
            {showDatePicker && (
              <div className="absolute z-10 mt-2">
                <DateRangePicker
                  ranges={dateRange}
                  onChange={handleSelect}
                  rangeColors={["#0b5844"]}
                  moveRangeOnFirstSelection={false}
                  editableDateInputs={true}
                  maxDate={new Date()}
                />
              </div>
            )}
          </div>

          {!isDateFiltered ? (
            <button
              onClick={applyDateFilter}
              className="h-[2.5rem] xlg:px-6 flex justify-center items-center bg-site-darkgreen text-white rounded   font-medium xlg:font-normal text-sm"
            >
              Show
            </button>
          ) : (
            <button
              onClick={clearDateFilter}
              className="h-[2.5rem] xlg:px-6 flex justify-center items-center bg-transparent xlg:bg-gray-300 rounded text-white  font-medium xlg:font-normal text-sm"
            >
              Clear
            </button>
          )}
        </div>

        <div className="w-[20%]">
          <select
            value={batch ?? ""}
            onChange={(e) => handelBatchFilter(e.target.value)}
            className="w-full bg-site-yellow text-sm font-medium rounded-md  text-site-darkgreen border border-[#f0f0f0] px-5 h-[2.5rem] outline-none"
          >
            <option value="" className=" bg-white text-site-black">
              Select Batch
            </option>
            {batches.map((batch: BatchesDocument) => (
              <option
                className=" bg-white text-site-black"
                key={batch._id as string}
                value={batch._id as string}
              >
                {batch.batch_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[20%]">
          <select
            value={course ?? ""}
            onChange={(e) => handelCourseFilter(e.target.value)}
            className="w-full bg-site-darkgreen rounded-md text-sm font-medium  text-site-yellow border border-[#f0f0f0] px-5 h-[2.5rem] outline-none"
          >
            <option value="" className=" bg-white text-site-black">
              Select Course
            </option>
            {courses.map((course: CourseDocument) => (
              <option
                className=" bg-white text-site-black"
                key={course._id as string}
                value={course._id as string}
              >
                {course.course_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[30%]">
          <input
            type="search"
            defaultValue={search}
            placeholder="Search mobile no  & student name"
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-white rounded-md text-sm  text-site-black border border-[#f0f0f0] px-5 h-[2.5rem]"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={openAddPopup}
        className="flex w-fit items-center justify-center rounded-lg xl:text-base md:text-base text-white bg-site-darkgreen px-5 h-[2.5rem] "
      >
        <LuUserPlus />
        <span className="ml-2">Add</span>
      </button>
      <SidePopUpSlider
        showPopUp={showPopUp}
        handleClose={() => setShowPopUp(false)}
      >
        <AddNewStudent
          key={popupKey}
          onCancel={() => setShowPopUp(false)}
          onSuccess={() => setShowPopUp(false)}
        />
      </SidePopUpSlider>
    </div>
  );
}
