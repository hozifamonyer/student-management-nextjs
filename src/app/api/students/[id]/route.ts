import { NextRequest, NextResponse } from "next/server";
import { deleteStudent, updateStudent } from "@/lib/studentStore";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const student = updateStudent(Number(id), {
    name: body.name,
    age: body.age,
    department: body.department,
  });

  if (!student) {
    return NextResponse.json(
      { message: "Student not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(student);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const deleted = deleteStudent(Number(id));
  if (!deleted) {
    return NextResponse.json(
      { message: "Student not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Student deleted",
  });
}
