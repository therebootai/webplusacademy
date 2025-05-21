"use client";

import StudentIcon from "@/icon/StudentIcon";

export default function AddNewStudent() {
  return (
    <div className="flex flex-col px-6 gap-5">
      <h3 className="text-site-darkgreen xl:text-lg md:text-base text-sm font-bold">
        Student Details
      </h3>
      <form
        action=""
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
      </form>
    </div>
  );
}
