"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import DatePicker from "react-datepicker";

const getDateFromMonthYear = (
  mon: string | undefined,
  year: string | undefined
) => {
  if (!mon || !year) return null;
  const date = new Date(`${mon} 1, ${year}`);
  return isNaN(date.getTime()) ? null : date;
};

export default function FeesHeader({
  search,
  mon,
  year,
}: {
  search?: string;
  mon?: string;
  year?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  const handleMonthYear = useCallback(
    (date: Date | null | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (date) {
        params.set(
          "mon",
          new Date(date).toLocaleString("default", { month: "long" })
        ); // otherwise set it
        params.set("year", new Date(date).getFullYear().toString());
      } else {
        params.delete("mon"); // remove "q" if query is empty, null, or undefined
        params.delete("year"); // remove "q" if query is empty, null, or undefined
      }
      router.push(`?${params.toString()}`);
    },
    [searchParams]
  );

  return (
    <div className="flex gap-3.5">
      <div className="basis-[33%] flex-1">
        <input
          type="search"
          defaultValue={search}
          placeholder="Search mobile no  & student name"
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-white rounded-md  text-site-black border border-[#f0f0f0] px-5 h-[3.5rem]"
        />
      </div>
      <div className="basis-[33%] border border-[#f0f0f0] rounded-md flex-1">
        <DatePicker
          placeholderText="Select Month & Year"
          className="w-full px-5 h-[3.5rem]"
          onChange={(date) => handleMonthYear(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          selected={getDateFromMonthYear(mon, year)}
        />
      </div>
    </div>
  );
}
