import { redirect } from "next/navigation";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

function getMostRecentSunday(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);

  sunday.setDate(today.getDate() - dayOfWeek);

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, "0");
  const date = String(sunday.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
}

export default async function CurrentMeetingPage() {
  const sunday = getMostRecentSunday();

  const rows = await sql`
    SELECT id
    FROM meetings
    WHERE date = ${sunday}
    LIMIT 1
  `;

  if (rows.length === 0) {
    redirect("/meetings");
  }

  redirect(`/meetings/${rows[0].id}`);
}