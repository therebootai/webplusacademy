import { getAllResults } from "@/actions/resultActions";
import DownloadResultSection from "@/components/results/DownloadResultSection";
import { ResultDocument } from "@/models/Results";
import MainTemplate from "@/templates/MainTemplate";
import SubBanner from "@/ui/SubBanner";

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
export default async function ResultsPage() {
  const pageData = await getResultsData();
  return (
    <MainTemplate>
      <SubBanner heading="Results" />
      <DownloadResultSection Results={pageData.data} />
    </MainTemplate>
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
