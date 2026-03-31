import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ FIX: ADD THIS (for fetching tasks)
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// ✅ POST (your fixed version with user)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // create/get user
    const user = await prisma.user.upsert({
      where: { email: "test@test.com" },
      update: {},
      create: {
        email: "test@test.com",
      },
    });

    const task = await prisma.task.create({
      data: {
        title: body.title,
        status: "TODO",
        userId: user.id,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}