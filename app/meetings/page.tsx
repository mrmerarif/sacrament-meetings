"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMeetings() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
        const res = await fetch(`${baseUrl}/api/meetings`);
        if (!res.ok) {
          setError("Failed to load meetings.");
          return;
        }
        const data = await res.json();
        setMeetings(data);
      } catch {
        setError("Failed to load meetings.");
      }
    }
    loadMeetings();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">All Meetings</h1>
      {meetings.length === 0 && <p>No meetings found.</p>}
      <ul className="space-y-2">
        {meetings.map((meeting) => (
          <li key={meeting.id}>
            <Link href={`/meetings/${meeting.id}`} className="text-blue-600 underline">
              {meeting.date} — {meeting.conducting}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
