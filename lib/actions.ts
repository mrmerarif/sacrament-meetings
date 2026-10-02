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
  date: z.string().min(1, 'Meeting date is required.'),
  meetingType: z.enum([
    'testimony',
    'regular',
    'stake',
    'general',
    'special',
  ]),
  presiding: z
    .string()
    .min(2, 'Presiding name must be at least 2 characters.'),
  conducting: z
    .string()
    .min(2, 'Conducting name must be at least 2 characters.'),
  openingHymnNumber: z.coerce
    .number()
    .int('Opening hymn number must be a whole number.')
    .positive('Opening hymn number must be greater than 0.'),
  openingHymnTitle: z
    .string()
    .min(2, 'Opening hymn title must be at least 2 characters.'),
  openingPrayer: z
    .string()
    .min(2, 'Opening prayer name must be at least 2 characters.'),
  sacramentHymnNumber: z.coerce
    .number()
    .int('Sacrament hymn number must be a whole number.')
    .positive('Sacrament hymn number must be greater than 0.'),
  sacramentHymnTitle: z
    .string()
    .min(2, 'Sacrament hymn title must be at least 2 characters.'),
  closingHymnNumber: z.coerce
    .number()
    .int('Closing hymn number must be a whole number.')
    .positive('Closing hymn number must be greater than 0.'),
  closingHymnTitle: z
    .string()
    .min(2, 'Closing hymn title must be at least 2 characters.'),
  closingPrayer: z
    .string()
    .min(2, 'Closing prayer name must be at least 2 characters.'),
});

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

function getMeetingFormData(formData: FormData) {
  return {
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
}

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse(
    getMeetingFormData(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'Missing or invalid fields. Failed to create meeting.',
    };
  }

  const data = validatedFields.data;

  try {
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
  } catch (error) {
    console.error('Error creating meeting:', error);

    return {
      message:
        'Database Error: Failed to create meeting. Please try again later.',
    };
  }

  redirect('/meetings');
}

export async function editMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse(
    getMeetingFormData(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'Missing or invalid fields. Failed to update meeting.',
    };
  }

  const data = validatedFields.data;

  try {
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
  } catch (error) {
    console.error('Error updating meeting:', error);

    return {
      message:
        'Database Error: Failed to update meeting. Please try again later.',
    };
  }

  redirect('/meetings');
}

export async function removeMeeting(id: number) {
  try {
    await deleteMeeting(id);
    revalidatePath('/meetings');
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error(
      'Failed to delete meeting. Please try again later.'
    );
  }
}