import { updateStudent } from "@/actions/studentAction";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    const studentId = params.studentId;
    const updatedData = await request.json();

    const result = await updateStudent(studentId, updatedData);

    if (result.success) {
      return NextResponse.json(result.student, { status: 200 });
    } else {
      return NextResponse.json({ error: result.message }, { status: 404 });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
