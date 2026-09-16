import { NextResponse } from "next/server";
import { getAllMeetings } from "@/lib/meetings";

export async function GET() {
  try {
    const meetings = await getAllMeetings();
    const res = NextResponse.json(meetings);
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Failed to load meetings" }, { status: 500 });
  }
}
