function getMostRecentSunday() {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday
    const diff = day === 0 ? 0 : day;
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - diff);
    return sunday.toISOString().split("T")[0];
  }
  
  import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default function CurrentMeetingPage() {
  const sunday = getMostRecentSunday();
  const meeting = getMeetings(sunday)[0];

  if (!meeting) return <p>No meeting found for this Sunday.</p>;

  redirect(`/meetings/${meeting.id}`);
}
