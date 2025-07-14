import {
  createExamQuestions,
  getExamQuestions,
} from "@/actions/examQuestionActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const questionData = await request.json();
    const result = await createExamQuestions(questionData);

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;

    const classFilter = url.searchParams.get("class") || undefined;
    const courseNameFilter = url.searchParams.get("courseName") || undefined;
    const qnsTypeFilter = url.searchParams.get("qnsType") || undefined;

    const result = await getExamQuestions({
      page,
      limit,
      className: classFilter,
      courseName: courseNameFilter,
      qnsType: qnsTypeFilter,
    });

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
