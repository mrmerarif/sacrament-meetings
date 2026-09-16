export const dynamic = "force-dynamic";

import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const url = new URL(`/api/meetings/${id}`, baseUrl);

  const res = await fetch(url.toString());

  if (res.status === 400) return <p>Invalid meeting ID.</p>;
  if (res.status === 404) return <p>Meeting not found.</p>;

  const meeting: SacramentMeeting = await res.json();
  return <MeetingDetail meeting={meeting} />;
}

// temporary update for peer review
