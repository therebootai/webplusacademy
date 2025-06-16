"use client";

import { getStudents } from "@/actions/studentAction";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import ToggleAttendance from "./ToggleAttendancePopup";
import useClickOutside from "@/hooks/useClickOutside";

function getDaysCountInMonth(dateString: string) {
  try {
    const date = new Date(dateString);

    // Check if the date is valid.
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string provided.");
    }

    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed month (0 for January, 11 for December)

    // A clever trick: Create a Date object for the 1st day of the *next* month,
    // then subtract one day (one millisecond) from it. The .getDate() of
    // this resulting date will be the number of days in the *original* month.
    const nextMonthFirstDay = new Date(year, month + 1, 1);
    const lastDayOfMonth = new Date(nextMonthFirstDay.getTime() - 1);

    return lastDayOfMonth.getDate();
  } catch (error: any) {
    console.error(`Error getting days count in month: ${error.message}`);
    return 0; // Return null on error
  }
}

export default function AddManageAttendance({
  batch_id,
}: {
  batch_id: string;
}) {
  const [monthYear, setMonthYear] = useState<Date | null>(new Date());
  const [batchStudenrts, setBatchStudents] = useState([]);
  const [day, setDay] = useState<string | number>("");
  const [attendanceData, setAttendanceData] = useState<any>([]);

  const attendanceToggleRef = useClickOutside<HTMLDivElement>(() => setDay(""));

  async function getBatchStudents() {
    try {
      const students = await getStudents({ currentBatch: batch_id });
      setBatchStudents(students.data);
      setAttendanceData(
        students.data.map((student: any) => ({
          batch_id: batch_id,
          student_id: student._id,
          attendance_date: new Date((monthYear as Date) ?? "")
            .getDay()
            .toString(),
          attendance_month: new Date((monthYear as Date) ?? "").toLocaleString(
            "default",
            { month: "long" }
          ),
          attendance_year: new Date((monthYear as Date) ?? "")
            .getFullYear()
            .toString(),
          batch_subject: "",
          attendance_status: "",
          leave_reason: "",
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBatchStudents();
  }, [batch_id]);

  const daysCount = useMemo(() => {
    if (monthYear) {
      return getDaysCountInMonth(monthYear.toISOString());
    }
    return 0;
  }, [monthYear]);

  return (
    <section className="flex flex-col gap-5 p-4 bg-white mx-4 my-2 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-site-litegreen/5 rounded-md flex gap-2 items-center px-2 relative">
          <DatePicker
            selected={monthYear}
            name="attendance_month"
            onChange={(date) => setMonthYear(date)}
            placeholderText="Choose attendence month and year"
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            className="h-[3rem] !w-full outline-none placeholder:text-site-gray !flex-1 capitalize placeholder:capitalize"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-site-darkgreen text-lg font-bold">
          List of Students
        </h1>
        {attendanceData.length < 0 ? (
          <h1>No student found in this batch</h1>
        ) : (
          attendanceData.map((attendance: any, index: number) => (
            <div key={index} className="flex flex-col gap-2">
              <h3 className="font-medium text-lg text-site-darkgreen">
                {index + 1}.{" "}
                {batchStudenrts.find(
                  (student: any) => student._id === attendance.student_id
                )?.studentName ?? ""}{" "}
                |{" "}
                {batchStudenrts.find(
                  (student: any) => student._id === attendance.student_id
                )?.student_id ?? ""}
              </h3>
              <div className="flex items-center gap-1">
                {Array.from({ length: daysCount }).map((_, dayIndex) => (
                  <div key={dayIndex} className="relative flex">
                    <button
                      className={`size-7 rounded-xl relative ${
                        attendance.attendance_status === "present" &&
                        attendance.attendance_date === dayIndex + 1 &&
                        "bg-[#00D59D]"
                      } ${
                        attendance.attendance_status === "absent" &&
                        attendance.attendance_date === dayIndex + 1 &&
                        "bg-[#E10000]"
                      } ${
                        attendance.attendance_status === "" &&
                        attendance.attendance_date === dayIndex + 1 &&
                        "bg-[#F0F0F0]"
                      }`}
                      onClick={() => {
                        setDay(dayIndex + 1);
                      }}
                    />
                    {Number(day) === dayIndex + 1 &&
                      attendanceData.student_id === student.student_id && (
                        <div
                          className="absolute top-[calc(100%_+_0.75rem)] left-1/2 -translate-x-1/2 z-[100]"
                          ref={attendanceToggleRef}
                        >
                          <ToggleAttendance
                            status={attendanceData.attendance_status}
                            onChangeStatus={(value: string) => {
                              setAttendanceData({
                                ...attendanceData,
                                attendance_status: value,
                              });
                            }}
                            leaveReason={attendanceData.leave_reason}
                            onChangeLeaveReason={(value: string) => {
                              setAttendanceData({
                                ...attendanceData,
                                leave_reason: value,
                              });
                            }}
                          />
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
