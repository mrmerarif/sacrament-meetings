import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

export default function MeetingCard({
meeting,
}: {
meeting: SacramentMeeting;
}) {
return (
<article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
<h2 className="text-xl font-semibold">
{meeting.date} — {meeting.meetingType.toUpperCase()}
</h2>

  <div className="mt-3 space-y-1 text-gray-700">
    <p>
      <span className="font-medium">Presiding:</span>{" "}
      {meeting.presiding}
    </p>
    <p>
      <span className="font-medium">Conducting:</span>{" "}
      {meeting.conducting}
    </p>
  </div>

  <Link
    href={`/meetings/${meeting.id}`}
    className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    View Details
  </Link>
</article>

);
}