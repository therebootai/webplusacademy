import { getExamSets } from "@/actions/examSetActions";
import GanerateQuestionHeader from "@/components/admin/exam/ganerateQuestions/GanerateQuestionHeader";
import GanerateQuestionTable from "@/components/admin/exam/ganerateQuestions/GanerateQuestionTable";
import AdminTemplate from "@/templates/AdminTemplate";
import PaginationBox from "@/ui/PaginationBox";
import React from "react";

const GanerateQuestions = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    batchName: string;
    examSetName: string;
  }>;
}) => {
  const { page, batchName, examSetName } = await searchParams;
  const { data, pagination } = await getPageData(
    parseInt(page) || 1,
    batchName,
    examSetName
  );
  return (
    <AdminTemplate>
      <GanerateQuestionHeader />
      <GanerateQuestionTable QuestionData={data} />
      <PaginationBox
        pagination={pagination}
        prefix="/admin/exam/ganerate-questions"
      />
    </AdminTemplate>
  );
};

export default GanerateQuestions;

async function getPageData(
  page: number = 1,
  batchName: string,
  examSetName: string
) {
  try {
    const { data, pagination } = await getExamSets({
      page,
      batchName,
      examSetName,
    });

    return { data, pagination };
  } catch (error) {
    console.error("Failed to fetch page data:", error);
    return {
      data: [],
      pagination: {
        totalCount: 0,
        currentPage: page,
        limit: 10,
        totalPages: 0,
      },
    };
  }
}
