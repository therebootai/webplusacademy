"use client";

import { getAllBatches } from "@/actions/batchesActions";
import { searchCourses } from "@/actions/coursesActions";
import { createStudent, updateStudent } from "@/actions/studentAction";
import StudentIcon from "@/icon/StudentIcon";
import { BatchesDocument } from "@/models/Batches";
import { CourseDocument } from "@/models/Courses";
import { IStudentType } from "@/types/StudentType";
import { useActionState, useEffect, useState } from "react";
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

export default function AddNewStudent({
  existingStudent,
  onSuccess,
}: {
  existingStudent?: IStudentType | null;
  onSuccess?: () => void;
}) {
  const [currentYear, setCurrentYear] = useState<string>("");
  const [dob, setDOB] = useState<Date | null>(null);
  const [tenthPassYear, setTenthPassYear] = useState<Date | null>(null);
  const [twelvethPassYear, setTwelvethPassYear] = useState<Date | null>(null);
  const [courseName, setCourseName] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const [courses, setCourses] = useState([]);
  const [batchId, setBatchId] = useState<string>("");
  const [batches, setBatches] = useState([]);
  const [courseFees, setCouseFees] = useState<string[]>([]);
  const [currentCourseFees, setCurrentCourseFees] = useState<string>("");
  const [hostelMonthlyAmount, setHostelMonthlyAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function addStudent(prevState: unknown, formData: FormData) {
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
    const scholarship =
      (formData.get("scholarship") as string | undefined) === "on";

    if (courseFees.length === 0) {
      alert("Please enter course fees");
      return;
    }

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
      currentYear,
      bookFees: bookFees || undefined,
      hostelFees: {
        monthlyAmount: hostelMonthlyAmountRaw
          ? Number(hostelMonthlyAmountRaw)
          : undefined,
        monthsDue: [],
        scholarship,
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
      scholarship,
      class10SchoolName: class10SchoolName || undefined,
      class10PassYear: class10PassYear || undefined,
      class12SchoolName: class12SchoolName || undefined,
      class12PassYear: class12PassYear || undefined,

      courseFees: emis.length
        ? [
            {
              totalAmount: courseFeesTotal,
              emis,
              currentBatch: batchId || undefined,
              currentCourse: courseId || undefined,
              currentYear,
              scholarship,
            },
          ]
        : [],

      studentData: batchId && courseId ? [studentDataEntry] : [],
    };
    setIsLoading(true);
    try {
      let result;
      if (existingStudent) {
        result = await updateStudent(existingStudent.student_id, data);
      } else {
        result = await createStudent(data);
      }

      if (!result.success) {
        const errorMsg =
          "error" in result
            ? result.error
            : "message" in result
            ? result.message
            : "Unknown error occurred";

        throw new Error(errorMsg);
      }

      if (onSuccess) {
        setCouseFees([]);
        setCourseName("");
        setHostelMonthlyAmount("");
        onSuccess();
      }
    } catch (error: any) {
      console.log(error);
      if (error.message.includes("E11000 duplicate key")) {
        alert("Student already exists");
      } else {
        alert(error.message);
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (existingStudent) {
      setHostelMonthlyAmount(
        existingStudent.studentData?.[0]?.hostelFees?.monthlyAmount?.toString() ||
          ""
      );

      if (
        existingStudent.dateOfBirth &&
        !isNaN(Date.parse(existingStudent.dateOfBirth))
      ) {
        setDOB(new Date(existingStudent.dateOfBirth));
      } else {
        setDOB(null);
      }

      if (
        existingStudent.class10PassYear &&
        !isNaN(Date.parse(existingStudent.class10PassYear))
      ) {
        setTenthPassYear(new Date(existingStudent.class10PassYear));
      }

      if (
        existingStudent.class12PassYear &&
        !isNaN(Date.parse(existingStudent.class12PassYear))
      ) {
        setTwelvethPassYear(new Date(existingStudent.class12PassYear));
      }
      const course = existingStudent.studentData?.[0]?.currentCourse;
      setCourseName(
        typeof course === "object" && "course_name" in course
          ? course.course_name
          : ""
      );
      setCourseId(
        typeof course === "object" && "_id" in course
          ? (course as { _id: any })._id.toString()
          : ""
      );
      const batch = existingStudent.studentData?.[0]?.currentBatch;
      setBatchId(
        typeof batch === "object" && "_id" in batch ? batch._id.toString() : ""
      );

      setCouseFees(
        Array.isArray(existingStudent.courseFees)
          ? existingStudent.courseFees
              .flatMap((courseFee) =>
                Array.isArray(courseFee.emis) ? courseFee.emis : []
              )
              .filter((emi) => typeof emi.amount === "number")
              .map((emi) => emi.amount!.toString())
          : []
      );
    }
  }, [existingStudent]);

  async function searchCourse(search: string) {
    try {
      const data = await searchCourses(search);
      setCourses(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBatchFromCourse(courseId: string) {
    try {
      const data = await getAllBatches({ course: courseId });
      setBatches(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (courseId !== "") {
      getBatchFromCourse(courseId);
    }
  }, [courseId]);

  const [, formActtion] = useActionState(addStudent, null);

  return (
    <div className="flex flex-col px-6 gap-5">
      <h3 className="text-site-darkgreen xl:text-lg md:text-base text-sm font-bold">
        Student Details
      </h3>
      <form
        action={formActtion}
        className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 place-items-stretch justify-items-stretch"
      >
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <StudentIcon className="text-site-gray size-5" />
          <input
            type="text"
            required
            placeholder={`Student Name`}
            defaultValue={existingStudent?.studentName}
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
            defaultValue={existingStudent?.mobileNumber}
            name="student_mobile"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <LuCalendarDays className="text-site-gray text-2xl" />
          <DatePicker
            selected={dob}
            onChange={(date) => setDOB(date)}
            name="date_of_birth"
            placeholderText="Enter Date of Birth"
            dateFormat="dd/MM/yyyy"
            className="h-[3rem]  outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <FaRegUser className="text-site-gray size-5" />
          <input
            type="text"
            placeholder={`Guardian Name`}
            defaultValue={existingStudent?.gurdianName}
            name="guardian_name"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <MdOutlinePhone className="text-site-gray size-5" />
          <input
            type="tel"
            placeholder={`Guardian Mobile Number`}
            pattern="[0-9]{10}"
            minLength={10}
            maxLength={10}
            defaultValue={existingStudent?.gurdianMobileNumber}
            name="guardian_mobile"
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <TbUserHeart className="text-site-gray size-5" />
          <select
            name="gender"
            required
            defaultValue={existingStudent?.gender}
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
            defaultValue={existingStudent?.class10SchoolName}
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <BiBookBookmark className="text-site-gray size-5" />
          <input
            type="text"
            placeholder={`12th Pass School Name`}
            name="twelveth_school_name"
            defaultValue={existingStudent?.class12SchoolName}
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
          <select
            value={batchId}
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
            onChange={(e) => {
              const selectedBatchId = e.target.value;
              setBatchId(selectedBatchId);

              // Find the selected batch to update the current year
              const selectedBatch = batches.find(
                (batch: BatchesDocument) => batch?._id === selectedBatchId
              );
              if (selectedBatch)
                setCurrentYear(
                  (selectedBatch as BatchesDocument).year as string
                );

              // Add a new course fee entry
              setCouseFees((prevFees) => [...prevFees, ""]);
            }}
          >
            <option value="">Select Batch</option>
            {batches.map((batch: BatchesDocument) => (
              <option
                key={batch._id as string}
                value={batch._id as string}
                onClick={() => setCurrentYear(batch.year)}
              >
                {batch.batch_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <PiMapPinArea className="text-site-gray size-5" />
          <input
            type="text"
            placeholder={`Address`}
            name="address"
            defaultValue={existingStudent?.address}
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <BsBuildings className="text-site-gray size-5" />
          <input
            type="text"
            placeholder={`City / Town`}
            name="city"
            defaultValue={existingStudent?.city}
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
            defaultValue={existingStudent?.pinCode}
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <GrDocumentUser className="text-site-gray size-5" />
          <select
            name="caste"
            defaultValue={existingStudent?.caste}
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
        <div className="flex-1 flex-wrap border border-[#cccccc] rounded-md flex gap-2 items-center px-2 col-span-2">
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
          <div className="flex flex-row  items-center gap-1 flex-1">
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
            value={hostelMonthlyAmount}
            onChange={(e) => setHostelMonthlyAmount(e.target.value)}
            className="h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>

        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <RiMoneyRupeeCircleLine className="text-site-gray size-5" />
          <input
            type="text"
            placeholder={`Book Fees`}
            name="book_fees"
            defaultValue={existingStudent?.studentData[0]?.bookFees}
            className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <RiMoneyRupeeCircleLine className="text-site-gray size-5" />
          <input
            type="text"
            placeholder={`Other Fees (if aplicable)`}
            name="other_fees"
            className="h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
          />
        </div>
        <div className="flex-1 flex gap-2 items-center">
          <input
            type="checkbox"
            name="scholarship"
            defaultChecked={existingStudent?.scholarship}
            className="accent-site-darkgreen size-4"
            id="scholarship"
            value="on"
          />
          <label
            className="text-site-gray font-semibold cursor-pointer"
            htmlFor="scholarship"
          >
            Is student eligible for Scholarship?
          </label>
        </div>
        <div className="flex-1 col-span-3 rounded-md flex gap-2 items-center px-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`py-5 px-7 rounded-lg text-center font-semibold text-base ${
              isLoading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-site-darkgreen text-white"
            }`}
          >
            {isLoading
              ? existingStudent
                ? "Updating..."
                : "Submitting..."
              : existingStudent
              ? "Update"
              : "Submit"}
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
