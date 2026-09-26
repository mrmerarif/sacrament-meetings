import Link from 'next/link';
import { createMeeting } from '@/lib/actions';

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Create Meeting
      </h1>

      <form action={createMeeting} className="space-y-4">
        <div>
          <label htmlFor="date" className="block font-medium">
            Meeting Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className="w-full rounded border p-2"
          />
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
            defaultValue=""
            className="w-full rounded border p-2"
          >
            <option value="" disabled>
              Select a meeting type
            </option>
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
            <option value="special">Special</option>
          </select>
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
            className="w-full rounded border p-2"
          />
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
            className="w-full rounded border p-2"
          />
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
            className="w-full rounded border p-2"
          />

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
            className="w-full rounded border p-2"
          />
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
            className="w-full rounded border p-2"
          />
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
            className="w-full rounded border p-2"
          />

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
            className="w-full rounded border p-2"
          />
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
            className="w-full rounded border p-2"
          />

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
            className="w-full rounded border p-2"
          />
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
            className="w-full rounded border p-2"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-white"
          >
            Save Meeting
          </button>

          <Link
            href="/meetings"
            className="rounded border px-4 py-2"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}