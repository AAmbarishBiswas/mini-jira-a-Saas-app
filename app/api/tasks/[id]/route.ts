import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    console.log("DELETE ID:", id); // ✅ debug

    // ✅ SAFE DELETE (won't crash)
    const result = await prisma.task.deleteMany({
      where: { id },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE ERROR:", error); // 🔥 SHOW REAL ERROR
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();

    console.log("ID:", id);
    console.log("BODY:", body);

    // ✅ SAFE update (no crash)
    const result = await prisma.task.updateMany({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.status && { status: body.status }),
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error: any) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}