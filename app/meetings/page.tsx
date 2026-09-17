import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

async function getMeetings(): Promise<SacramentMeeting[]> {
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const res = await fetch(baseUrl + "/api/meetings", {
cache: "no-store",
});

if (!res.ok) {
throw new Error("Failed to load meetings");
}

return res.json();
}

export default async function MeetingsPage() {
const meetings = await getMeetings();

return (
<section className="space-y-6">
<div>
<h1 className="text-3xl font-bold">All Meetings</h1>
<p className="mt-2 text-gray-600">
View and review sacrament meeting programs.
</p>
</div>

  {meetings.length === 0 ? (
    <p>No meetings found.</p>
  ) : (
    <div className="grid gap-4">
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  )}
</section>


);
}