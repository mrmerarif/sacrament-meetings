import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

function mapMeeting(row: Record<string, unknown>): SacramentMeeting {
  return {
    id: Number(row.id),
    date: new Date(row.date as string).toISOString().split('T')[0],
    meetingType: row.meeting_type as SacramentMeeting['meetingType'],
    presiding: row.presiding as string,
    conducting: row.conducting as string,
    announcements: (row.announcements ?? []) as string[],
    openingHymn: row.opening_hymn as SacramentMeeting['openingHymn'],
    openingPrayer: row.opening_prayer as string,
    wardBusiness: (row.ward_business ?? []) as SacramentMeeting['wardBusiness'],
    stakeBusiness: Boolean(row.stake_business),
    sacramentHymn: row.sacrament_hymn as SacramentMeeting['sacramentHymn'],
    speakers: (row.speakers ?? []) as SacramentMeeting['speakers'],
    closingHymn: row.closing_hymn as SacramentMeeting['closingHymn'],
    closingPrayer: row.closing_prayer as string,
  };
}

export async function getMeetings(
  query = '',
  currentPage = 1
): Promise<SacramentMeeting[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return rows.map(mapMeeting);
}

export async function getMeetingsByDate(
  date: string
): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE date = ${date}
    ORDER BY date DESC
  `;

  return rows.map(mapMeeting);
}

export async function getMeetingsTotalPages(
  query = ''
): Promise<number> {
  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT COUNT(*) AS count
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  const totalMeetings = Number(rows[0].count);

  return Math.ceil(totalMeetings / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return null;
  }

  return mapMeeting(rows[0]);
}

// Mutation functions will be implemented in Week 04.
export async function addMeeting(
  meeting: Omit<SacramentMeeting, 'id'>
): Promise<void> {
  void meeting;
  return;
}

export async function updateMeeting(
  id: number,
  meeting: Partial<SacramentMeeting>
): Promise<void> {
  void id;
  void meeting;
  return;
}

export async function deleteMeeting(id: number): Promise<void> {
  void id;
  return;
}