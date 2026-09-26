'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addMeeting,
  updateMeeting,
  deleteMeeting,
} from './meetings-db';
import type { MeetingType } from './types';

const MeetingFormSchema = z.object({
  date: z.string().min(1),
  meetingType: z.enum([
    'testimony',
    'regular',
    'stake',
    'general',
    'special',
  ]),
  presiding: z.string().min(2),
  conducting: z.string().min(2),
  openingHymnNumber: z.coerce.number().int().positive(),
  openingHymnTitle: z.string().min(2),
  openingPrayer: z.string().min(2),
  sacramentHymnNumber: z.coerce.number().int().positive(),
  sacramentHymnTitle: z.string().min(2),
  closingHymnNumber: z.coerce.number().int().positive(),
  closingHymnTitle: z.string().min(2),
  closingPrayer: z.string().min(2),
});

function parseMeetingForm(formData: FormData) {
  const raw = {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
  };

  const parsed = MeetingFormSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error('Invalid meeting input.');
  }

  return parsed.data;
}

export async function createMeeting(formData: FormData) {
  const data = parseMeetingForm(formData);

  await addMeeting({
    date: data.date,
    meetingType: data.meetingType as MeetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: [],
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers: [],
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  });

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function editMeeting(
  id: number,
  formData: FormData
) {
  const data = parseMeetingForm(formData);

  await updateMeeting(id, {
    date: data.date,
    meetingType: data.meetingType as MeetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  });

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function removeMeeting(id: number) {
  await deleteMeeting(id);

  revalidatePath('/meetings');
}
