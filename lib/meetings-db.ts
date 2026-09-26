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

export async function addMeeting(
  meeting: Omit<SacramentMeeting, 'id'>
): Promise<void> {
  await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${meeting.date},
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ${meeting.announcements ?? []},
      ${JSON.stringify(meeting.openingHymn)},
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)},
      ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)},
      ${JSON.stringify(meeting.speakers)},
      ${JSON.stringify(meeting.closingHymn)},
      ${meeting.closingPrayer}
    )
  `;
}

export async function updateMeeting(
  id: number,
  meeting: Partial<SacramentMeeting>
): Promise<void> {
  const existingMeeting = await getMeetingById(id);

  if (!existingMeeting) {
    throw new Error('Meeting not found.');
  }

  const updatedMeeting = {
    ...existingMeeting,
    ...meeting,
  };

  await sql`
    UPDATE meetings
    SET
      date = ${updatedMeeting.date},
      meeting_type = ${updatedMeeting.meetingType},
      presiding = ${updatedMeeting.presiding},
      conducting = ${updatedMeeting.conducting},
      announcements = ${updatedMeeting.announcements ?? []},
      opening_hymn = ${JSON.stringify(updatedMeeting.openingHymn)},
      opening_prayer = ${updatedMeeting.openingPrayer},
      ward_business = ${JSON.stringify(updatedMeeting.wardBusiness)},
      stake_business = ${updatedMeeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(updatedMeeting.sacramentHymn)},
      speakers = ${JSON.stringify(updatedMeeting.speakers)},
      closing_hymn = ${JSON.stringify(updatedMeeting.closingHymn)},
      closing_prayer = ${updatedMeeting.closingPrayer}
    WHERE id = ${id}
  `;
}

export async function deleteMeeting(id: number): Promise<void> {
  await sql`
    DELETE FROM meetings
    WHERE id = ${id}
  `;
}