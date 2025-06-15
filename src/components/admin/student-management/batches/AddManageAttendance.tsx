"use client";

import { getStudents } from "@/actions/studentAction";
import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";

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
  const [month, setMonth] = useState<Date | null>(new Date());
  const [batchStudenrts, setBatchStudents] = useState([]);

  async function getBatchStudents() {
    try {
      const students = await getStudents({ currentBatch: batch_id });
      setBatchStudents(students.data);
    } catch (error) {
      console.log(error);
    }
  }

  useMemo(() => {
    getBatchStudents();
  }, [batch_id]);

  const daysCount = useMemo(() => {
    if (month) {
      return getDaysCountInMonth(month.toISOString());
    }
    return 0;
  }, [month]);

  return (
    <section className="flex flex-col gap-5 p-4 bg-white">
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-site-litegreen/5 rounded-md flex gap-2 items-center px-2 relative">
          <DatePicker
            selected={month}
            name="attendance_month"
            onChange={(date) => setMonth(date)}
            placeholderText="Choose attendence month and year"
            dateFormat="MM/yyyy"
            showMonthDropdown
            className="h-[3rem] !w-full outline-none placeholder:text-site-gray !flex-1 capitalize placeholder:capitalize"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-site-darkgreen text-lg font-bold">
          List of Students
        </h1>
        {batchStudenrts.length < 0 ? (
          <h1>No student found in this batch</h1>
        ) : (
          batchStudenrts.map((student: any, index: number) => (
            <div key={student._id as string} className="flex flex-col gap-2">
              <h3 className="font-medium text-lg text-site-darkgreen">
                {index + 1}. {student.studentName} | {student.student_id}
              </h3>
              <div className="flex items-center gap-1">
                {Array.from({ length: daysCount }).map((_, dayIndex) => (
                  <span
                    key={dayIndex}
                    className="size-7 bg-[#F0F0F0] rounded-xl"
                  ></span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
