import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import {
  getMeetings,
  getMeetingsTotalPages,
} from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const query = params.query ?? "";
  const currentPage = Number(params.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Meetings</h1>
        <p className="mt-2 text-gray-600">
          View and review sacrament meeting programs.
        </p>
      </div>

      <MeetingSearch />

      {meetings.length === 0 ? (
        <p>No meetings found.</p>
      ) : (
        <div className="grid gap-4">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </section>
  );
}