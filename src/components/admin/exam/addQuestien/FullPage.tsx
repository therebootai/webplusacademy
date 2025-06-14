"use client";
import { useEffect, useState } from "react";
import { getExamQuestions } from "@/actions/examQuestionActions";
import AdminTemplate from "@/templates/AdminTemplate";
import AddQuestionHeader from "./AddQuestionHeader";
import ManageQuestion from "./ManageQuestion";

export default function FullPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    currentPage: 1,
    limit: 40,
    totalPages: 0,
  });

  useEffect(() => {
    async function fetchPageData(page: number = 1, filters = {}) {
      console.log("Fetching page data for page:", page);

      // Mocked data fetch
      const response = await getExamQuestions(page, filters);

      if (response.success) {
        setData(response.data);
        setPagination({
          totalCount: response.total,
          currentPage: page,
          limit: 40,
          totalPages: response.totalPages,
        });

        // Avoiding infinite loops: only fetch if the page is within bounds
        if (page < response.totalPages) {
          fetchPageData(page + 1, filters); // Ensure the page number does not go beyond totalPages
        }
      } else {
        console.error("Failed to fetch page data:", response.error);
      }
    }

    fetchPageData();
  }, []);

  return (
    <AdminTemplate>
      <AddQuestionHeader />
      <ManageQuestion QuestionData={data} />
    </AdminTemplate>
  );
}
