export const dynamic = "force-dynamic";

import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return <p>Invalid meeting ID.</p>;
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    return <p>Meeting not found.</p>;
  }

  return <MeetingDetail meeting={meeting} />;
}