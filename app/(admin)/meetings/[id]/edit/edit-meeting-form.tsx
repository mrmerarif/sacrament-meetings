'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { editMeeting, type State } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

const initialState: State = {
  message: null,
  errors: {},
};

export default function EditMeetingForm({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  const updateMeetingWithId = editMeeting.bind(null, meeting.id);

  const [state, formAction, isPending] = useActionState(
    updateMeetingWithId,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="date" className="block font-medium">
          Meeting Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={meeting.date}
          aria-describedby="date-error"
          className="w-full rounded border p-2"
        />
        <div
          id="date-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.date?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="meetingType"
          className="block font-medium"
        >
          Meeting Type
        </label>
        <select
          id="meetingType"
          name="meetingType"
          required
          defaultValue={meeting.meetingType}
          aria-describedby="meetingType-error"
          className="w-full rounded border p-2"
        >
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
          <option value="special">Special</option>
        </select>
        <div
          id="meetingType-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.meetingType?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="presiding" className="block font-medium">
          Presiding
        </label>
        <input
          id="presiding"
          name="presiding"
          type="text"
          required
          defaultValue={meeting.presiding}
          aria-describedby="presiding-error"
          className="w-full rounded border p-2"
        />
        <div
          id="presiding-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.presiding?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="conducting" className="block font-medium">
          Conducting
        </label>
        <input
          id="conducting"
          name="conducting"
          type="text"
          required
          defaultValue={meeting.conducting}
          aria-describedby="conducting-error"
          className="w-full rounded border p-2"
        />
        <div
          id="conducting-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.conducting?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <fieldset className="space-y-2 rounded border p-4">
        <legend className="px-2 font-semibold">
          Opening Hymn
        </legend>

        <label
          htmlFor="openingHymnNumber"
          className="block font-medium"
        >
          Hymn Number
        </label>
        <input
          id="openingHymnNumber"
          name="openingHymnNumber"
          type="number"
          min="1"
          required
          defaultValue={meeting.openingHymn.number}
          aria-describedby="openingHymnNumber-error"
          className="w-full rounded border p-2"
        />
        <div
          id="openingHymnNumber-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.openingHymnNumber?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>

        <label
          htmlFor="openingHymnTitle"
          className="block font-medium"
        >
          Hymn Title
        </label>
        <input
          id="openingHymnTitle"
          name="openingHymnTitle"
          type="text"
          required
          defaultValue={meeting.openingHymn.title}
          aria-describedby="openingHymnTitle-error"
          className="w-full rounded border p-2"
        />
        <div
          id="openingHymnTitle-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.openingHymnTitle?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="openingPrayer"
          className="block font-medium"
        >
          Opening Prayer
        </label>
        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          required
          defaultValue={meeting.openingPrayer}
          aria-describedby="openingPrayer-error"
          className="w-full rounded border p-2"
        />
        <div
          id="openingPrayer-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.openingPrayer?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <fieldset className="space-y-2 rounded border p-4">
        <legend className="px-2 font-semibold">
          Sacrament Hymn
        </legend>

        <label
          htmlFor="sacramentHymnNumber"
          className="block font-medium"
        >
          Hymn Number
        </label>
        <input
          id="sacramentHymnNumber"
          name="sacramentHymnNumber"
          type="number"
          min="1"
          required
          defaultValue={meeting.sacramentHymn.number}
          aria-describedby="sacramentHymnNumber-error"
          className="w-full rounded border p-2"
        />
        <div
          id="sacramentHymnNumber-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.sacramentHymnNumber?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>

        <label
          htmlFor="sacramentHymnTitle"
          className="block font-medium"
        >
          Hymn Title
        </label>
        <input
          id="sacramentHymnTitle"
          name="sacramentHymnTitle"
          type="text"
          required
          defaultValue={meeting.sacramentHymn.title}
          aria-describedby="sacramentHymnTitle-error"
          className="w-full rounded border p-2"
        />
        <div
          id="sacramentHymnTitle-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.sacramentHymnTitle?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2 rounded border p-4">
        <legend className="px-2 font-semibold">
          Closing Hymn
        </legend>

        <label
          htmlFor="closingHymnNumber"
          className="block font-medium"
        >
          Hymn Number
        </label>
        <input
          id="closingHymnNumber"
          name="closingHymnNumber"
          type="number"
          min="1"
          required
          defaultValue={meeting.closingHymn.number}
          aria-describedby="closingHymnNumber-error"
          className="w-full rounded border p-2"
        />
        <div
          id="closingHymnNumber-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.closingHymnNumber?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>

        <label
          htmlFor="closingHymnTitle"
          className="block font-medium"
        >
          Hymn Title
        </label>
        <input
          id="closingHymnTitle"
          name="closingHymnTitle"
          type="text"
          required
          defaultValue={meeting.closingHymn.title}
          aria-describedby="closingHymnTitle-error"
          className="w-full rounded border p-2"
        />
        <div
          id="closingHymnTitle-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.closingHymnTitle?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="closingPrayer"
          className="block font-medium"
        >
          Closing Prayer
        </label>
        <input
          id="closingPrayer"
          name="closingPrayer"
          type="text"
          required
          defaultValue={meeting.closingPrayer}
          aria-describedby="closingPrayer-error"
          className="w-full rounded border p-2"
        />
        <div
          id="closingPrayer-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.closingPrayer?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {state.message && (
        <p
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-red-600"
        >
          {state.message}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? 'Updating...' : 'Update Meeting'}
        </button>

        <Link
          href="/meetings"
          className="rounded border px-4 py-2"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}