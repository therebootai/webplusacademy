"use client";

import { getStudents } from "@/actions/studentAction";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import ToggleAttendance from "./ToggleAttendancePopup";
import useClickOutside from "@/hooks/useClickOutside";
import { getAllAttendance } from "@/actions/attendanceActions";
import { getDaysCountInMonth } from "@/util/ListOfDays";

export default function AddManageAttendance({
  batch_id,
  onCancel,
  minDate,
  maxDate,
}: {
  batch_id: string;
  onCancel: () => void;
  minDate?: Date;
  maxDate?: Date;
}) {
  const [monthYear, setMonthYear] = useState<Date | null>(new Date());
  const [attendanceData, setAttendanceData] = useState<any>([]);
  const [allStudents, setAllStudents] = useState([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null); // To track which day's toggle is open
  const [selectedStudentIndex, setSelectedStudentIndex] = useState<
    number | null
  >(null); // To track which student's toggle is open

  const attendanceToggleRef = useClickOutside<HTMLDivElement>(() => {
    setSelectedDay(null);
    setSelectedStudentIndex(null);
  });

  async function getBatchStudents() {
    try {
      const students = await getStudents({ currentBatch: batch_id });

      setAllStudents(students.data);

      const attendanceData = await getAllAttendance({ batch_id });

      const allAttendances = attendanceData.data;

      const initialAttendanceState = students.data.map((student: any) => {
        const dailyAttendance = Array.from({ length: daysCount }).map(
          (_, dayIndex) => {
            const date = new Date((monthYear as Date) ?? "");
            const attendance = allAttendances.find(
              (item: any) =>
                item.student_id === student._id &&
                item.attendance_date === dayIndex + 1
            );
            return {
              batch_id: batch_id,
              student_id: student._id,
              attendance_date: dayIndex + 1, // Day of the month (1-based)
              attendance_month: date.toLocaleString("default", {
                month: "long",
              }),
              attendance_year: date.getFullYear().toString(),
              batch_subject: "", // You might want to set this based on context
              attendance_status: attendance?.attendance_status ?? "", // Initial empty status
              leave_reason: "",
            };
          }
        );

        return {
          student_id: student._id,
          studentName: student.studentName,
          studentPersonalId: student.student_id, // Store this for display
          dailyAttendance: dailyAttendance,
        };
      });

      setAttendanceData(initialAttendanceState);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAttendanceOfBatches() {
    try {
      const attendanceData = await getAllAttendance({ batch_id });

      const allAttendances = attendanceData.data;

      const currentAttendanceState = allStudents.map((student: any) => {
        const dailyAttendance = Array.from({ length: daysCount }).map(
          (_, dayIndex) => {
            const date = new Date((monthYear as Date) ?? "");
            const attendance = allAttendances.find(
              (item: any) =>
                item.student_id === student._id &&
                item.attendance_date === dayIndex + 1 &&
                item.attendance_month ===
                  date.toLocaleString("default", {
                    month: "long",
                  }) &&
                item.attendance_year === date.getFullYear().toString()
            );
            return {
              batch_id: batch_id,
              student_id: student._id,
              attendance_date: dayIndex + 1, // Day of the month (1-based)
              attendance_month: date.toLocaleString("default", {
                month: "long",
              }),
              attendance_year: date.getFullYear().toString(),
              batch_subject: "", // You might want to set this based on context
              attendance_status: attendance?.attendance_status ?? "", // Initial empty status
              leave_reason: "",
            };
          }
        );

        return {
          student_id: student._id,
          studentName: student.studentName,
          studentPersonalId: student.student_id, // Store this for display
          dailyAttendance: dailyAttendance,
        };
      });

      setAttendanceData(currentAttendanceState);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBatchStudents();
  }, [batch_id]);

  useEffect(() => {
    getAttendanceOfBatches();
  }, [monthYear]);

  const handleAttendanceChange = (
    studentIndex: number,
    dayIndex: number, // This is the 0-based index from map
    status: "present" | "absent" | "leave" | ""
  ) => {
    setAttendanceData((prevAttendanceData: any) => {
      const newAttendanceData = [...prevAttendanceData]; // Shallow copy of students array
      if (
        newAttendanceData[studentIndex] &&
        newAttendanceData[studentIndex].dailyAttendance &&
        newAttendanceData[studentIndex].dailyAttendance[dayIndex]
      ) {
        // Deep copy the dailyAttendance array for the specific student
        newAttendanceData[studentIndex] = {
          ...newAttendanceData[studentIndex],
          dailyAttendance: [...newAttendanceData[studentIndex].dailyAttendance],
        };
        // Deep copy the specific attendance record for the day
        newAttendanceData[studentIndex].dailyAttendance[dayIndex] = {
          ...newAttendanceData[studentIndex].dailyAttendance[dayIndex],
          attendance_status: status,
        };

        // Clear leave reason if status is not 'leave'
        if (status !== "leave") {
          newAttendanceData[studentIndex].dailyAttendance[
            dayIndex
          ].leave_reason = "";
        }
      }
      return newAttendanceData;
    });
  };

  const handleLeaveReasonChange = (
    studentIndex: number,
    dayIndex: number, // This is the 0-based index from map
    reason: string
  ) => {
    setAttendanceData((prevAttendanceData: any) => {
      const newAttendanceData = [...prevAttendanceData]; // Shallow copy of students array
      if (
        newAttendanceData[studentIndex] &&
        newAttendanceData[studentIndex].dailyAttendance &&
        newAttendanceData[studentIndex].dailyAttendance[dayIndex]
      ) {
        // Deep copy the dailyAttendance array for the specific student
        newAttendanceData[studentIndex] = {
          ...newAttendanceData[studentIndex],
          dailyAttendance: [...newAttendanceData[studentIndex].dailyAttendance],
        };
        // Deep copy the specific attendance record for the day
        newAttendanceData[studentIndex].dailyAttendance[dayIndex] = {
          ...newAttendanceData[studentIndex].dailyAttendance[dayIndex],
          leave_reason: reason,
        };
      }
      return newAttendanceData;
    });
  };

  const daysCount = useMemo(() => {
    if (monthYear) {
      return getDaysCountInMonth(monthYear.toISOString());
    }
    return 0;
  }, [monthYear]);

  async function handelSubmit() {
    try {
      const submitData = attendanceData.map((student: any) => {
        return student.dailyAttendance.map((attendance: any) => {
          return {
            batch_id: batch_id,
            student_id: student.student_id,
            attendance_date: attendance.attendance_date,
            attendance_month: attendance.attendance_month,
            attendance_year: attendance.attendance_year,
            batch_subject: "", // You might want to set this based on context
            attendance_status: attendance.attendance_status,
            leave_reason: attendance.leave_reason,
          };
        });
      });
      // await performDailyAttendanceBulkWrite(submitData);
      onCancel();
    } catch (error) {
      console.log(error);
      alert("Something occured");
    }
  }

  return (
    <section className="flex flex-col gap-5 p-4 bg-white mx-4 my-2 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-site-litegreen/5 rounded-md flex gap-2 items-center px-2 relative">
          <DatePicker
            selected={monthYear}
            name="attendance_month"
            onChange={(date) => setMonthYear(date)}
            placeholderText="Choose attendence month and year"
            minDate={minDate}
            maxDate={maxDate}
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
        {attendanceData.length === 0 ? (
          <h1>No student found in this batch</h1>
        ) : (
          attendanceData.map((studentAttendance: any, studentIdx: number) => (
            <div
              key={studentAttendance.student_id as string}
              className="flex flex-col gap-2"
            >
              <h3 className="font-medium text-lg text-site-darkgreen">
                {studentIdx + 1}. {studentAttendance.studentName} |{" "}
                {studentAttendance.studentPersonalId}
              </h3>
              <div className="flex items-center gap-1 flex-wrap">
                {Array.from({ length: daysCount }).map((_, dayIndex) => {
                  const currentDayAttendance =
                    studentAttendance.dailyAttendance.find(
                      (att: any) => att.attendance_date === dayIndex + 1
                    );
                  const status = currentDayAttendance?.attendance_status || ""; // Get status for this specific day

                  return (
                    <div key={dayIndex} className="relative flex">
                      <button
                        className={`size-7 rounded-xl relative ${
                          status === "present" && "bg-[#00D59D]"
                        } ${status === "absent" && "bg-[#E10000]"} ${
                          status === "leave" && "bg-yellow-400" // Added a color for leave
                        } ${status === "" && "bg-[#F0F0F0]"}`}
                        onClick={() => {
                          setSelectedDay(dayIndex + 1);
                          setSelectedStudentIndex(studentIdx);
                        }}
                      >
                        {dayIndex + 1}{" "}
                        {/* Display the day number on the button */}
                      </button>
                      {selectedDay === dayIndex + 1 &&
                        selectedStudentIndex === studentIdx && (
                          <div
                            className="absolute top-[calc(100%_+_0.75rem)] left-1/2 -translate-x-1/2 z-[100]"
                            ref={attendanceToggleRef}
                          >
                            <ToggleAttendance
                              status={status}
                              onChangeStatus={(
                                value: "present" | "absent" | "leave" | ""
                              ) =>
                                handleAttendanceChange(
                                  studentIdx,
                                  dayIndex,
                                  value
                                )
                              }
                              leaveReason={currentDayAttendance?.leave_reason}
                              onChangeLeaveReason={(value: string) =>
                                handleLeaveReasonChange(
                                  studentIdx,
                                  dayIndex,
                                  value
                                )
                              }
                            />
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handelSubmit}
          className="rounded-lg bg-site-darkgreen px-4 py-2 text-white font-medium"
        >
          Submit
        </button>
        <button
          type="reset"
          onClick={onCancel}
          className="rounded-lg border border-site-darkgreen px-4 py-2 text-site-darkgreen font-medium"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
