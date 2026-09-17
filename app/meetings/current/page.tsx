import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

function getMostRecentSunday(): string {
const today = new Date();
const dayOfWeek = today.getDay();
const sunday = new Date(today);

sunday.setDate(today.getDate() - dayOfWeek);

const year = sunday.getFullYear();
const month = String(sunday.getMonth() + 1).padStart(2, "0");
const date = String(sunday.getDate()).padStart(2, "0");

return year + "-" + month + "-" + date;
}

export default function CurrentMeetingPage() {
const sunday = getMostRecentSunday();
const meetings = getMeetings(sunday);
const meeting = meetings[0];

if (!meeting) {
return (
<section className="space-y-4">
<h1 className="text-2xl font-bold">Current Sunday Meeting</h1>
<p>No meeting found for this Sunday.</p>
<p className="text-gray-600">
Current Sunday: {sunday}
</p>
</section>
);
}

redirect("/meetings/" + meeting.id);
}