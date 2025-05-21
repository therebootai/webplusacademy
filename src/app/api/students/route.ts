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
  const studentsData = await getStudents();
  if (studentsData.success) {
    return NextResponse.json(studentsData.students);
  } else {
    return NextResponse.json({ error: studentsData.error }, { status: 500 });
  }
}
