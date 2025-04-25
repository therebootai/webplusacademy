"use client";
import { deleteResult, updateResult } from "@/actions/resultActions";
import { ResultDocument } from "@/models/Results";
import ResultCard from "@/ui/ResultCard";

export default function ResultsList({
  Results,
}: {
  Results: ResultDocument[];
}) {
  const classWiseData = Object.groupBy(Results, (item) => item.classFor);
  return Object.entries(classWiseData).map(([className, results]) => (
    <div key={className} className="flex flex-col gap-5">
      <h2 className="font-medium text-2xl text-site-black">
        For class {className.toUpperCase()}
      </h2>
      <ul className="flex flex-wrap gap-5">
        {results && Array.isArray(results) ? (
          results.map((result) => (
            <ResultCard
              key={result._id as string}
              {...result}
              deleteCard={() => deleteResult(result._id as string)}
              changeStatus={() =>
                updateResult(result._id as string, undefined, !result.status)
              }
            />
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  ));
}
