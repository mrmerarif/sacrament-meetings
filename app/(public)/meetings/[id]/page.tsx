
import type { Metadata } from "next";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return {
      title: "Invalid Meeting",
      description: "The requested meeting ID is invalid.",
    };
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    return {
      title: "Meeting Not Found",
      description: "The requested sacrament meeting could not be found.",
    };
  }

  return {
    title: `Meeting ${id}`,
    description: `View the details and agenda for sacrament meeting ${id}.`,
  };
}

export default async function MeetingDetailPage({
  params,
}: Props) {
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
