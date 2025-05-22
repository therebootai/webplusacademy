import { createStudent, getStudents } from "@/actions/studentAction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await createStudent(data);

    if (result.success) {
      return NextResponse.json(result.student, { status: 201 });
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
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const mobileNumber = searchParams.get("mobileNumber") || undefined;
    const studentName = searchParams.get("studentName") || undefined;
    const studentId = searchParams.get("studentId") || undefined;

    const currentCourse = searchParams.get("currentCourse") || undefined;
    const currentBatch = searchParams.get("currentBatch") || undefined;

    const studentsData = await getStudents({
      page,
      limit,
      mobileNumber,
      studentName,
      currentCourse,
      currentBatch,
      studentId,
    });

    if (studentsData.success) {
      return NextResponse.json({
        data: studentsData.data,
        pagination: studentsData.pagination,
      });
    } else {
      return NextResponse.json(
        { error: studentsData.error || "Failed to fetch students" },
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
