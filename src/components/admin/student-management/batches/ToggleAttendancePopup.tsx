"use client";

export default function ToggleAttendance({
  status,
  onChangeStatus,
  leaveReason,
  onChangeLeaveReason,
}: {
  status: string;
  onChangeStatus: (value: "present" | "absent" | "leave" | "") => void;
  leaveReason: string;
  onChangeLeaveReason: (value: string) => void;
}) {
  return (
    <div className="relative bg-white rounded-2xl px-3 py-5 border border-[#eeeeee] z-[100]">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-l border-t border-gray-300 rotate-45 z-0" />
      <form className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="atttendance"
              id="Present"
              value="present"
              checked={status === "present"}
              onChange={() => onChangeStatus("present")}
              className="size-4 accent-site-darkgreen peer"
            />
            <label
              htmlFor="Present"
              className="peer-checked:text-site-darkgreen"
            >
              Present
            </label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="atttendance"
              id="Absent"
              value="absent"
              checked={status === "absent"}
              onChange={() => onChangeStatus("absent")}
              className="size-4 accent-site-darkgreen peer"
            />
            <label
              htmlFor="Absent"
              className="peer-checked:text-site-darkgreen"
            >
              Absent
            </label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="atttendance"
              id="Leave"
              value="leave"
              checked={status === "leave"}
              onChange={() => onChangeStatus("leave")}
              className="size-4 accent-site-darkgreen peer"
            />
            <label htmlFor="Leave" className="peer-checked:text-site-darkgreen">
              Leave
            </label>
          </div>
        </div>
        {status === "leave" && (
          <input
            type="text"
            name="leave_reason"
            value={leaveReason}
            onChange={(e) => onChangeLeaveReason(e.target.value)}
            placeholder="Leave Reason (Optional)"
            className="px-3 py-2 border border-[#eeeeee] placeholder:text-site-gray placeholder:capitalize rounded"
          />
        )}
        <button
          type="submit"
          className="px-3 py-2 bg-site-darkgreen text-white text-center text-xs rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
