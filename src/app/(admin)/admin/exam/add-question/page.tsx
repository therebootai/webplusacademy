import { getExamQuestions } from "@/actions/examQuestionActions";
import AddQuestionHeader from "@/components/admin/exam/addQuestien/AddQuestionHeader";
import ManageQuestion from "@/components/admin/exam/addQuestien/ManageQuestion";
import AdminTemplate from "@/templates/AdminTemplate";
import PaginationBox from "@/ui/PaginationBox";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    className: string;
    courseName: string;
    qnsType: string;
  }>;
}) {
  const { page, className, courseName, qnsType } = await searchParams;
  const { data, pagination } = await getPageData(
    parseInt(page) || 1,
    className,
    courseName,
    qnsType
  );

  return (
    <AdminTemplate>
      <AddQuestionHeader />
      <ManageQuestion QuestionData={data} />
      <PaginationBox
        pagination={pagination}
        prefix="/admin/exam/add-question"
      />
    </AdminTemplate>
  );
}

async function getPageData(
  page: number = 1,
  className: string,
  courseName: string,
  qnsType: string
) {
  try {
    const { data, pagination } = await getExamQuestions({
      page,
      className,
      courseName,
      qnsType,
    });

    const serializedData = data.map((item: any) => ({
      ...item,
      _id: item._id.toString(),
      ansOption: {
        optionA: item.ansOption.optionA || "",
        optionB: item.ansOption.optionB || "",
        optionC: item.ansOption.optionC || "",
        optionD: item.ansOption.optionD || "",
      },
    }));

    return { data: serializedData, pagination };
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
