"use client";

import { getAllBatches } from "@/actions/batchesActions";
import { searchCourses } from "@/actions/coursesActions";
import { createStudent, updateStudent } from "@/actions/studentAction";
import StudentIcon from "@/icon/StudentIcon";
import { BatchesDocument } from "@/models/Batches";
import { CourseDocument } from "@/models/Courses";
import { IStudentType } from "@/types/StudentType";
import { parse } from "date-fns";
import { useActionState, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { BiBookBookmark } from "react-icons/bi";
import { BsBuildings } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { GrDocumentUser } from "react-icons/gr";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LiaObjectGroupSolid } from "react-icons/lia";
import { LuBookA, LuCalendarDays } from "react-icons/lu";
import { MdLockOutline, MdOutlinePhone } from "react-icons/md";
import { PiMapPinArea, PiMapPinPlusBold } from "react-icons/pi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TbUserHeart } from "react-icons/tb";

export default function AddNewStudent({
  existingStudent,
  onSuccess,
  onCancel,
}: {
  existingStudent?: IStudentType | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const [currentYear, setCurrentYear] = useState<string>("");
  const [dob, setDOB] = useState<Date | null>(null);
  const [doAdmission, setDOAdmission] = useState<Date>(new Date());
  const [tenthPassYear, setTenthPassYear] = useState<Date | null>(null);
  const [twelvethPassYear, setTwelvethPassYear] = useState<Date | null>(null);
  const [courseName, setCourseName] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const [courses, setCourses] = useState<CourseDocument[]>([]);
  const [batchId, setBatchId] = useState<string>("");
  const [batches, setBatches] = useState([]);
  const [courseFees, setCouseFees] = useState<string[]>([]);
  const [currentCourseFees, setCurrentCourseFees] = useState<string>("");
  const [hostelMonthlyAmount, setHostelMonthlyAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = (name: string, mobileNumber: string) => {
    if (name && mobileNumber) {
      const namePart = name.split(" ")[0].substring(0, 4);
      const mobilePart = mobileNumber.substring(0, 4);
      const newPassword = `${
        namePart.charAt(0).toUpperCase() + namePart.slice(1)
      }@${mobilePart}`;
      return newPassword;
    } else {
      alert("Please ensure name and mobile number are set.");
    }
  };

  async function addStudent(prevState: {}, formData: FormData) {
    const studentName = formData.get("student_name") as string;
    const mobileNumber = formData.get("student_mobile") as string;
    const dateOfBirth = formData.get("date_of_birth") as string;
    const dateOfAdmission = formData.get("date_of_admission") as string;
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

    const emis = courseFees.map((amountStr, index) => {
      const amount = Number(amountStr);
      return {
        installmentNumber: index + 1,
        payments: [
          {
            paymentName: "course fees",
            amount,
            scholarship: 0,
            paid: 0,
            remarks: "",
          },
        ],
        totalPaid: 0,
        totalDue: amount,
        dueDate: null,
        remarks: "",
      };
    });

    const courseFeesTotal = emis.reduce(
      (acc, emi) => acc + emi.payments.reduce((pAcc, p) => pAcc + p.amount, 0),
      0
    );

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
        attendance_id: existingStudent
          ? [...existingStudent.studentData?.[0]?.attendance_id]
          : [],
      },
      attendance_id:
        existingStudent?.studentData?.[0]?.attendance_id || undefined,
    };

    const data = {
      studentName,
      mobileNumber,
      dateOfBirth,
      dateOfAdmission,
      gurdianName,
      gurdianMobileNumber,
      gender,
      address,
      pinCode,
      city,
      caste,
      password: password !== "" ? password : undefined,
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
        setPassword("");
        onSuccess();
      }

      console.log(data);
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
      return { ...prevState };
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

      if (
        existingStudent.dateOfAdmission &&
        typeof existingStudent.dateOfAdmission === "string"
      ) {
        const parsedAdmissionDate = parse(
          existingStudent.dateOfAdmission,
          "dd/MM/yyyy",
          new Date()
        );
        if (!isNaN(parsedAdmissionDate.getTime())) {
          setDOAdmission(parsedAdmissionDate);
        }
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
              .map((emi) => {
                const courseFeesPayment = emi.payments?.find(
                  (p) => p.paymentName.toLowerCase() === "course fees"
                );
                return courseFeesPayment?.amount?.toString() ?? "0";
              })
          : []
      );
    }
  }, [existingStudent]);

  useEffect(() => {
    async function loadAllCourses() {
      try {
        const data = await searchCourses("");
        setCourses(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadAllCourses();
  }, []);

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

  const [, formActtion] = useActionState(addStudent, {});

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
            dropdownMode="select"
            showMonthDropdown
            showYearDropdown
            className="h-[3rem]  outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
            autoComplete="off"
          />
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <LuCalendarDays className="text-site-gray text-2xl" />
          <DatePicker
            selected={doAdmission}
            onChange={(date) => setDOAdmission(date!)}
            name="date_of_admission"
            placeholderText="Enter Date of Admission"
            dateFormat="dd/MM/yyyy"
            dropdownMode="select"
            showMonthDropdown
            showYearDropdown
            className="h-[3rem]  outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
            autoComplete="off"
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
          <select
            className="h-[3rem] outline-none placeholder:text-site-gray flex-1 capitalize placeholder:capitalize"
            value={courseId}
            onChange={(e) => {
              const selectedCourse = courses.find(
                (course: CourseDocument) => course._id === e.target.value
              );
              setCourseId(e.target.value);
              setCourseName(selectedCourse?.course_name || "");
            }}
            name="course_id"
          >
            <option value="">Select Course</option>
            {courses.map((course: CourseDocument) => (
              <option key={course._id as string} value={course._id as string}>
                {course.course_name}
              </option>
            ))}
          </select>
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

              const selectedBatch = batches.find(
                (batch: BatchesDocument) => batch?._id === selectedBatchId
              );
              if (selectedBatch)
                setCurrentYear(
                  (selectedBatch as BatchesDocument).year as string
                );
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
            <option value="">Select Caste</option>
            <option value="general">General</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
            <option value="obc">OBC</option>
            <option value="BL">BL</option>
            <option value="PL">PL</option>
          </select>
        </div>
        <div className="flex-1 border border-[#cccccc] rounded-md flex gap-2 items-center px-2">
          <MdLockOutline className="text-site-gray size-5" />
          <div className="flex flex-1">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={`Password`}
              name="password"
              className=" h-[3rem] outline-none placeholder:text-site-gray flex-1 placeholder:capitalize"
            />
            <button
              type="button"
              className="text-site-gray"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>
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
                if (
                  currentCourseFees.trim() !== "" &&
                  courseFees.length < 5 &&
                  !isNaN(Number(currentCourseFees))
                ) {
                  setCouseFees((prev) => [...prev, currentCourseFees]);
                  setCurrentCourseFees("");
                }
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
            onClick={() => {
              if (onCancel) onCancel();
            }}
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
