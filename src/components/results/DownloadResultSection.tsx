"use client";
import { ResultDocument } from "@/models/Results";
import Accordian from "@/ui/Accordian";
import Link from "next/link";

export default function DownloadResultSection({
  Results,
}: {
  Results: ResultDocument[];
}) {
  const classWiseData = Object.groupBy(Results, (item) => item.classFor);
  return (
    <div className="flex flex-col gap-2.5 xl:px-16 lg:px-8 px-4">
      {Object.entries(classWiseData).map(([className, results]) => (
        <Accordian key={className} open={false}>
          <Accordian.Trigger>
            <span className="text-site-gray inline-flex justify-between items-center text-base md:text-lg xl:text-xl">
              Download PDF for batch {className}
            </span>
          </Accordian.Trigger>
          <div className="flex flex-wrap gap-5 items-center">
            {results && Array.isArray(results) ? (
              results.map((result) => (
                <Accordian.Content
                  className="text-center text-base lg:text-lg font-medium bg-site-darkgreen text-white px-4 py-2 rounded"
                  key={result._id as string}
                >
                  <Link href={result.result_file.secure_url} target="_blank">
                    {result.year}
                  </Link>
                </Accordian.Content>
              ))
            ) : (
              <Accordian.Content className="text-center text-lg font-medium text-site-black">
                No results found
              </Accordian.Content>
            )}
          </div>
        </Accordian>
      ))}
    </div>
  );
}
