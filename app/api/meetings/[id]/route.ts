import { NextRequest } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }

  const meeting = getMeetingById(numericId);

  if (!meeting) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(meeting);
}
