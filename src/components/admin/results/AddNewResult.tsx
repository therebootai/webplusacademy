"use client";

import { addNewResult } from "@/actions/resultActions";
import { useActionState, useState } from "react";
import DatePicker from "react-datepicker";

export default function AddnewResult() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  async function addResult(prevState: unknown, formData: FormData) {
    try {
      const result_file = formData.get("result_file") as File;
      const classFor = formData.get("classFor") as string;
      const year = formData.get("year") as string;

      if (!classFor || !year) {
        return alert("All fields are required");
      }

      const result = await addNewResult(classFor, result_file, year);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  const [, formActions, isPending] = useActionState(addResult, null);
  return (
    <form className="flex gap-2 items-center" action={formActions}>
      <select
        name="classFor"
        defaultValue="ix"
        className="px-2 h-[3rem] border border-[#cccccc] outline-none placeholder:text-site-gray rounded-md flex-1 capitalize placeholder:capitalize"
      >
        <option value="ix">Class IX</option>
        <option value="x">Class X</option>
        <option value="xi">Class XI</option>
        <option value="xii">Class XII</option>
        <option value="jee">JEE</option>
        <option value="neet">NEET</option>
      </select>
      <div className="relative flex-1 h-[3rem] border border-[#cccccc] rounded-md truncate">
        <label
          htmlFor="file-input"
          className="absolute capitalize top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer truncate"
        >
          Choose Result file
        </label>
        <input
          id="file-input"
          type="file"
          name="result_file"
          accept="file/pdf"
          required
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer truncate"
        />
      </div>
      <div>
        <DatePicker
          selected={startDate}
          name="year"
          onChange={(date) => setStartDate(date)}
          showYearPicker
          placeholderText="Choose year"
          dateFormat="yyyy"
          className="px-2 h-[3rem] border border-[#cccccc] outline-none placeholder:text-site-gray rounded-md flex-1 capitalize placeholder:capitalize"
        />
      </div>
      <button
        className="h-[3rem] flex justify-center items-center flex-1 bg-site-yellow text-base font-medium text-white rounded-md"
        type="submit"
      >
        {isPending ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
