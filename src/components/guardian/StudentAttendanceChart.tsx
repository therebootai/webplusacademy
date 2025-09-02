"use client";

import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import DatePicker from "react-datepicker";

export default function StudentAttendanceChart({
  attendance,
}: {
  attendance: any;
}) {
  const [barData, setBarData] = useState<any>([]);
  const [year, setYear] = useState<Date | null>(new Date());
  const [presentStatus, setPresentStatus] = useState("present");

  useEffect(() => {
    const data = [
      { name: "January", days: 31 },
      { name: "February", days: 28 },
      { name: "March", days: 31 },
      { name: "April", days: 30 },
      { name: "May", days: 31 },
      { name: "June", days: 30 },
      { name: "July", days: 31 },
      { name: "August", days: 31 },
      { name: "September", days: 30 },
      { name: "October", days: 31 },
      { name: "November", days: 30 },
      { name: "December", days: 31 },
    ].map((month) => {
      const att = attendance.filter(
        (item: any) =>
          item.attendance_year ===
            new Date(year ?? "").getFullYear().toString() &&
          item.attendance_month === month.name &&
          item.attendance_status === presentStatus
      );
      return {
        name: month.name,
        present: att.length ?? 0,
        total: month.days,
      };
    });
    setBarData(data);
  }, [attendance, year, presentStatus]);

  return (
    <div className="relative flex gap-8">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="min-h-[70vmin]"
      >
        <BarChart
          data={barData}
          margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="total" type="number" />
          <Tooltip />
          <Bar dataKey="present" fill="#0b5844" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-4 basis-[25%] self-start">
        <select
          name="status"
          className="h-[2.5rem] xlg:px-6 flex justify-center items-center bg-site-darkgreen text-white rounded   font-medium xlg:font-normal text-sm"
          value={presentStatus}
          onChange={(e) => setPresentStatus(e.target.value)}
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="leave">Leave</option>
          <option value="holiday">Holiday</option>
        </select>
        <div className="h-[2.5rem] flex justify-center items-center bg-site-darkgreen text-white rounded  font-medium xlg:font-normal text-sm">
          <DatePicker
            selected={year}
            name="year"
            onChange={(date) => setYear(date)}
            showYearPicker
            placeholderText="Choose year"
            dateFormat="yyyy"
            className="flex-1 placeholder:capitalize"
          />
        </div>
      </div>
    </div>
  );
}
