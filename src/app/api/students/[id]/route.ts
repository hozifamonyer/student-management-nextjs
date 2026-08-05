import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const student = await prisma.student.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        age: body.age,
        department: body.department,
      },
    });

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}


// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.student.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Student deleted",
    });

  } catch (error) {
    return NextResponse.json(
      {
        message: "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}