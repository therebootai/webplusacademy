import { getExamSets } from "@/actions/examSetActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const batchName = searchParams.get("batchName") || undefined;
    const examSetName = searchParams.get("examSetName") || undefined;

    const examSetData = await getExamSets({
      page,
      limit,
      batchName,
      examSetName,
    });

    if (examSetData.success) {
      return NextResponse.json({
        data: examSetData.data,
        pagination: examSetData.pagination,
      });
    } else {
      return NextResponse.json(
        { error: examSetData.error || "Failed to fetch Exam set" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
