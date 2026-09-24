import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return NextResponse.json(
      { error: "Invalid id" },
      { status: 400 }
    );
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting);
}