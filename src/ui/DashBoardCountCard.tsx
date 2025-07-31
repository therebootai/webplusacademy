"use client";
import useCounterAnimation from "@/hooks/useCounterAnimation";
import { cn } from "@/util/cn";
import { PiGraduationCapBold } from "react-icons/pi";

export default function DashBoardCountCard({
  wrapperClass,
  counterClass,
  titleClass,
  title,
  counter,
}: {
  wrapperClass?: string;
  counterClass?: string;
  titleClass?: string;
  title: string;
  counter: number;
}) {
  const countedNumber = useCounterAnimation(counter);
  return (
    <div
      className={cn(
        "flex lg:p-8 p-4 justify-between rounded-3xl",
        wrapperClass
      )}
    >
      <div className="flex gap-2.5">
        <div className="bg-white/20 lg:text-3xl text-2xl rounded-full p-2.5">
          <PiGraduationCapBold />
        </div>
        <h1
          className={cn("font-bold lg:text-xl text-lg self-center", titleClass)}
        >
          {title}
        </h1>
      </div>
      <div className={cn("self-start", counterClass)}>{countedNumber}</div>
    </div>
  );
}
