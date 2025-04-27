"use client";

import { createNewNotice } from "@/actions/noticeAction";
import { useActionState, useState } from "react";

export default function AddNewNotice() {
  const [file, setFile] = useState<File | null>(null);

  async function addNewNotice(prevState: unknown, formData: FormData) {
    try {
      const title = formData.get("title") as string;
      const notice_file = formData.get("notice_file") as File;

      if (!title) {
        alert("Title is required");
        return {
          success: false,
          data: null,
          message: "All fields are required",
        };
      }

      if (notice_file.size !== 0 && notice_file.type !== "application/pdf") {
        return alert("Only PDF files are allowed");
      }

      const notice = await createNewNotice(title, notice_file);
      console.log(notice);
      return notice;
    } catch (error) {
      console.log(error);
    }
  }

  const [, formActions, isPending] = useActionState(addNewNotice, null);
  return (
    <form className="flex gap-2 items-center" action={formActions}>
      <input
        type="text"
        required
        placeholder={`Notice Title`}
        name="title"
        className="px-2 h-[3rem] border border-[#cccccc] outline-none placeholder:text-site-gray rounded-md flex-1 capitalize placeholder:capitalize"
      />
      <div className="relative flex-1 h-[3rem] border border-[#cccccc] rounded-md truncate">
        <label
          htmlFor="file-input"
          className="absolute capitalize top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer truncate"
        >
          {file ? file.name : "Choose Notice file"}
        </label>
        <input
          id="file-input"
          type="file"
          name="notice_file"
          onChange={(e) => setFile(e.target?.files?.[0] ?? null)}
          accept="application/pdf"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer truncate"
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
