import { getAllResults } from "@/actions/resultActions";
import AddnewResult from "@/components/admin/results/AddNewResult";
import ResultsList from "@/components/admin/results/ResultsList";
import Result, { ResultDocument } from "@/models/Results";
import AdminTemplate from "@/templates/AdminTemplate";
import ResultCard from "@/ui/ResultCard";
import Link from "next/link";

type ResultResponse = {
  success: boolean;
  data: ResultDocument[];
  pagination: {
    totalCount: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
};

export default async function ResultPage() {
  const pageData = await getResultsData();

  return (
    <AdminTemplate>
      <AddnewResult />
      <ResultsList Results={pageData.data} />
    </AdminTemplate>
  );
}

async function getResultsData(): Promise<ResultResponse> {
  try {
    const results = await getAllResults();
    return results;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        limit: 10,
        totalPages: 0,
      },
    };
  }
}
