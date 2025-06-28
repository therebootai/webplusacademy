"use client";
import AdminTemplate from "@/templates/AdminTemplate";
import AddQuestionHeader from "./AddQuestionHeader";

export default function FullPage() {
  // const [data, setData] = useState([]);
  // const [pagination, setPagination] = useState({
  //   totalCount: 0,
  //   currentPage: 1,
  //   limit: 40,
  //   totalPages: 0,
  // });

  // useEffect(() => {
  //   async function fetchPageData(page: number = 1, filters = {}) {
  //     console.log("Fetching page data for page:", page);

  //     const response = await getExamQuestions(page, filters);

  //     if (response.success) {
  //       setData(response.data);
  //       setPagination({
  //         totalCount: response.total,
  //         currentPage: page,
  //         limit: 40,
  //         totalPages: response.totalPages,
  //       });

  //       if (page < response.totalPages) {
  //         fetchPageData(page + 1, filters);
  //       }
  //     } else {
  //       console.error("Failed to fetch page data:", response.error);
  //     }
  //   }

  //   fetchPageData();
  // }, []);

  return (
    <AdminTemplate>
      <AddQuestionHeader />
      {/* <ManageQuestion QuestionData={data} /> */}
    </AdminTemplate>
  );
}
