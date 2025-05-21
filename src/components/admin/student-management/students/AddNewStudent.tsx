"use client";

import { searchBatches } from "@/actions/batchesActions";
import { searchCourses } from "@/actions/coursesActions";
import { createStudent } from "@/actions/studentAction";
import StudentIcon from "@/icon/StudentIcon";
import { BatchesDocument } from "@/models/Batches";
import { CourseDocument } from "@/models/Courses";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { BiBookBookmark } from "react-icons/bi";
import { BsBuildings } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { GrDocumentUser } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { LiaObjectGroupSolid } from "react-icons/lia";
import { LuBookA, LuCalendarDays } from "react-icons/lu";
import { MdOutlinePhone } from "react-icons/md";
import { PiMapPinArea, PiMapPinPlusBold } from "react-icons/pi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TbUserHeart } from "react-icons/tb";

export default function AddNewStudent() {
  const [dob, setDOB] = useState<Date | null>(null);
  const [tenthPassYear, setTenthPassYear] = useState<Date | null>(null);
  const [twelvethPassYear, setTwelvethPassYear] = useState<Date | null>(null);
  const [courseName, setCourseName] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const [courses, setCourses] = useState([]);
  const [batchName, setBatchName] = useState<string>("");
  const [batchId, setBatchId] = useState<string>("");
  const [batches, setBatches] = useState([]);
  const [courseFees, setCouseFees] = useState<string[]>([]);
  const [currentCourseFees, setCurrentCourseFees] = useState<string>("");

  async function addStudent(formData: FormData) {
    const studentName = formData.get("student_name") as string;
    const mobileNumber = formData.get("student_mobile") as string;
    const dateOfBirth = formData.get("date_of_birth") as string;
    const gurdianName = formData.get("guardian_name") as string;
    const gurdianMobileNumber = formData.get("guardian_mobile") as string;
    const gender = formData.get("gender") as string;
    const address = formData.get("address") as string;
    const pinCode = formData.get("pincode") as string;
    const city = formData.get("city") as string;
    const caste = formData.get("caste") as string;
    const class10SchoolName = formData.get("tenth_school_name") as
      | string
      | null;
    const class10PassYear = formData.get("tenth_pass_year") as string | null;
    const class12SchoolName = formData.get("twelveth_school_name") as
      | string
      | null;
    const class12PassYear = formData.get("twelveth_pass_year") as string | null;

    const bookFees = formData.get("book_fees") as string | null;
    const hostelMonthlyAmountRaw = formData.get("hostel_monthly_amount") as
      | string
      | null;

    const emis = courseFees.map((amount, index) => ({
      installmentNumber: index + 1,
      amount: Number(amount),
      dueDate: null,
    }));

    const courseFeesTotal = emis.reduce((acc, cur) => acc + cur.amount, 0);

    const studentDataEntry = {
      currentBatch: batchId || undefined,
      currentCourse: courseId || undefined,
      currentClass: formData.get("current_class") || undefined,
      currentYear: formData.get("current_year") || undefined,
      bookFees: bookFees || undefined,
      hostelFees: {
        monthlyAmount: hostelMonthlyAmountRaw
          ? Number(hostelMonthlyAmountRaw)
          : undefined,
        monthsDue: [],
      },
    };

    const data = {
      studentName,
      mobileNumber,
      dateOfBirth,
      gurdianName,
      gurdianMobileNumber,
      gender,
      address,
      pinCode,
      city,
      caste,

      class10SchoolName: class10SchoolName || undefined,
      class10PassYear: class10PassYear || undefined,
      class12SchoolName: class12SchoolName || undefined,
      class12PassYear: class12PassYear || undefined,

      courseFees: emis.length
        ? {
            totalAmount: courseFeesTotal,
            emis,
          }
        : undefined,

      studentData: batchId && courseId ? [studentDataEntry] : [],
    };

    const result = await createStudent(data);

    if (!result.success) {
      throw new Error(result.error);
    }
  }

  async function searchCourse(search: string) {
    try {
      const data = await searchCourses(search);
      setCourses(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function searchABatch(search: string) {
    try {
      const data = await searchBatches(search);
      setBatches(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col px-6 gap-5">
      <h3 className="text-site-darkgreen xl:text-lg md:text-base text-sm font-bold">
        Student Details
      </h3>
      <form
        action={addStudent}
        method="post"
        className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 place-items-stretch justify-items-stretch"
      >
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <StudentIcon className="text-site-gray size-5" />
          <input
            type="text"
            required
            placeholder={`Student Name`}
            name="student_name"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <MdOutlinePhone className="text-site-gray size-5" />
          <input
            type="tel"
            required
            placeholder={`Student Mobile Number`}
            pattern="[0-9]{10}"
            minLength={10}
            maxLength={10}
            name="student_mobile"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <LuCalendarDays className="text-site-gray text-2xl" />
          <DatePicker
            selected={dob}
            name="date_of_birth"
            onChange={(date) => setDOB(date)}
            placeholderText="Enter Date of Birth"
            dateFormat="dd/MM/yyyy"
            className="h-[3rem]  outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <FaRegUser className="text-site-gray size-5" />
          <input
            type="text"
            required
            placeholder={`Guardian Name`}
            name="guardian_name"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <MdOutlinePhone className="text-site-gray size-5" />
          <input
            type="tel"
            required
            placeholder={`Guardian Mobile Number`}
            pattern="[0-9]{10}"
            minLength={10}
            maxLength={10}
            name="guardian_mobile"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <TbUserHeart className="text-site-gray size-5" />
          <select
            name="gender"
            required
            className="h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <BiBookBookmark className="text-site-gray size-5" />
          <input
            type="text"
            placeholder={`10th Pass School Name`}
            name="tenth_school_name"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <BiBookBookmark className="text-site-gray size-5" />
          <input
            type="text"
            placeholder={`12th Pass School Name`}
            name="twelveth_school_name"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2 relative">
          <LuBookA className="text-site-gray text-2xl" />
          <div className="flex flex-1 relative">
            <input
              type="text"
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
                searchCourse(e.target.value);
              }}
              placeholder={`Search Course Name`}
              className="h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
            />
          </div>
          {courses.length > 0 && (
            <div className="absolute top-full left-0 w-full z-10 rounded-md p-2 bg-white flex flex-col">
              {courses.map((course: CourseDocument) => (
                <button
                  key={course._id as string}
                  onClick={() => {
                    setCourseName(course.course_name);
                    setCourseId(course._id as string);
                    setCourses([]);
                  }}
                  className="text-left text-site-black capitalize p-1.5 border-b border-site-gray last:border-b-0"
                >
                  {course.course_name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <LuCalendarDays className="text-site-gray text-2xl" />
          <DatePicker
            selected={tenthPassYear}
            name="tenth_pass_year"
            onChange={(date) => setTenthPassYear(date)}
            showYearPicker
            placeholderText="Choose 10th pass year"
            dateFormat="yyyy"
            className="h-[3rem]  outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <LuCalendarDays className="text-site-gray text-2xl" />
          <DatePicker
            selected={twelvethPassYear}
            name="twelveth_pass_year"
            onChange={(date) => setTwelvethPassYear(date)}
            showYearPicker
            placeholderText="Choose 12th pass year"
            dateFormat="yyyy"
            className="h-[3rem]  outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2 relative">
          <LiaObjectGroupSolid className="text-site-gray text-2xl" />
          <div className="flex flex-1 relative">
            <input
              type="text"
              value={batchName}
              onChange={(e) => {
                setBatchName(e.target.value);
                searchABatch(e.target.value);
              }}
              placeholder={`Search Batch Name`}
              className="h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
            />
          </div>
          {batches.length > 0 && (
            <div className="absolute top-full left-0 w-full z-10 rounded-md p-2 bg-white flex flex-col">
              {batches.map((batch: BatchesDocument) => (
                <button
                  key={batch._id as string}
                  onClick={() => {
                    setBatchName(batch.batch_name);
                    setBatchId(batch._id as string);
                    setBatches([]);
                  }}
                  className="text-left text-site-black capitalize p-1.5 border-b border-site-gray last:border-b-0"
                >
                  {batch.batch_name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <PiMapPinArea className="text-site-gray size-5" />
          <input
            type="text"
            required
            placeholder={`Address`}
            name="address"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <BsBuildings className="text-site-gray size-5" />
          <input
            type="text"
            required
            placeholder={`City / Town`}
            name="city"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <PiMapPinPlusBold className="text-site-gray size-5" />
          <input
            type="text"
            required
            placeholder={`Pincode`}
            name="pincode"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <GrDocumentUser className="text-site-gray size-5" />
          <select
            name="caste"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          >
            <option value="">Select Caste &#40;OBC,SC,ST&#41;</option>
            <option value="general">General</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
            <option value="obc">OBC</option>
            <option value="ews">EWS</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex-1 flex-wrap border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          {courseFees.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {courseFees.map((fees, index) => (
                <div
                  key={index}
                  className="text-xs p-1 rounded-lg bg-site-yellow/20 text-site-darkgreen inline-flex items-center justify-center gap-2"
                >
                  {fees}
                  <button
                    type="button"
                    onClick={() =>
                      setCouseFees((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className=" flex flex-row  items-center gap-1">
            <RiMoneyRupeeCircleLine className="text-site-gray size-5" />
            <input
              type="text"
              placeholder={`Course Fees`}
              name="fees"
              value={currentCourseFees}
              onChange={(e) => setCurrentCourseFees(e.target.value)}
              className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
            />
            <button
              type="button"
              onClick={() => {
                setCouseFees((prev) => [...prev, currentCourseFees]);
                setCurrentCourseFees("");
              }}
              className="text-site-darkgreen sticky inline-flex items-center justify-center "
            >
              <CiCirclePlus size={24} />
            </button>
          </div>
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <RiMoneyRupeeCircleLine className="text-site-gray size-5" />
          <input
            type="number"
            name="hostel_monthly_amount"
            placeholder="Hostel Fees per Month"
            className="h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>

        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <RiMoneyRupeeCircleLine className="text-site-gray size-5" />
          <input
            type="text"
            placeholder={`Book Fees`}
            name="book_fees"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <RiMoneyRupeeCircleLine className="text-site-gray size-5" />
          <input
            type="text"
            placeholder={`Other Fees(if aplicable)`}
            name="other_fees"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 col-span-3 rounded-md flex gap-2 items-center px-2">
          <button
            type="submit"
            className="py-5 px-7 bg-site-darkgreen text-white rounded-lg text-center font-semibold text-base"
          >
            Submit
          </button>
          <button
            type="reset"
            className="py-5 px-7 bg-transparent border border-site-darkgreen text-site-darkgreen rounded-lg text-center font-semibold text-base"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
