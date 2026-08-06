import { NextResponse } from "next/server";
import { deleteStudent, findStudentById, updateStudent } from "@/lib/studentStore";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
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
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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
