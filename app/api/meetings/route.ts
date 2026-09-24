import { getMeetings } from "@/lib/meetings-db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const meetings = await getMeetings(date ?? "");

    return NextResponse.json(meetings);
  } catch (error) {
    console.error("GET /api/meetings failed:", error);

    return NextResponse.json(
      { error: "Failed to load meetings" },
      { status: 500 }
    );
  }
}