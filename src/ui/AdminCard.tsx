"use client";
import Image from "next/image";
import ReactPlayer from "react-player";
import ToggleInput from "./ToggleInput";

export default function AdminCard({
  img,
  name,
  status,
  deleteCard,
  video = false,
  changeStatus,
}: {
  img: string;
  name: string;
  status: boolean;
  deleteCard: () => Promise<{ success: boolean; message: string }>;
  changeStatus: () => Promise<{ success: boolean; data: any }>;
  video?: boolean;
}) {
  return (
    <div className="flex flex-col rounded overflow-hidden h-full">
      {video ? (
        <ReactPlayer
          url={img}
          width={"100%"}
          height={333}
          className="object-cover w-full flex-1"
        />
      ) : (
        <Image
          src={img}
          alt="cover"
          width={330}
          height={133}
          className="object-cover w-full flex-1"
        />
      )}
      <div className="flex flex-col gap-4 px-6 py-4 bg-[#F7F7F7] text-[#333333]">
        <div className="flex items-center gap-5 text-lg">
          Name <span className="font-bold ">{name}</span>
        </div>
        <div className="flex items-center gap-5">
          Status <ToggleInput status={status} changeStatus={changeStatus} />
        </div>
        <div className="flex items-center gap-5">
          Actions{" "}
          <button
            type="button"
            className="text-red-500 font-medium text-lg"
            onClick={deleteCard}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
