export const dynamic = "force-dynamic";

import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

export default async function MeetingsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const url = new URL("/api/meetings", baseUrl);

  const res = await fetch(url.toString());
  const meetings: SacramentMeeting[] = await res.json();

  return (
    <div className="space-y-4">
      {meetings.map((m) => (
        <MeetingCard key={m.id} meeting={m} />
      ))}
    </div>
  );
}
