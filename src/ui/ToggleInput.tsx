"use client";

import { cn } from "@/util/cn";
import { motion } from "motion/react";

export default function ToggleInput({
  status,
  changeStatus,
  wrapperClass,
  ballClass,
}: {
  status: boolean;
  changeStatus: () => void;
  wrapperClass?: string;
  ballClass?: string;
}) {
  return (
    <button
      className={cn(wrapperClass, "w-7 h-3.5 rounded-4xl flex p-0.5")}
      style={{
        justifyContent: "flex-" + (status ? "start" : "end"),
        background: status ? "#00CD44" : "#3C65F5",
      }}
      onClick={changeStatus}
    >
      <motion.div
        className={cn(ballClass, "size-2.5 rounded-full bg-white")}
        layout
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
    </button>
  );
}
