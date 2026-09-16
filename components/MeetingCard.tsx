import type { SacramentMeeting } from "@/lib/types";
import Link from "next/link";

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-2">
        {meeting.date} — {meeting.meetingType.toUpperCase()}
      </h2>

      <p className="text-gray-700">
        Presiding: {meeting.presiding}
      </p>
      <p className="text-gray-700">
        Conducting: {meeting.conducting}
      </p>

      <Link
        href={`/meetings/${meeting.id}`}
        className="text-blue-600 underline mt-3 inline-block"
      >
        View Details
      </Link>
    </div>
  );
}
