import type { SacramentMeeting } from "@/lib/types";

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">
          {meeting.date} — {meeting.meetingType.toUpperCase()}
        </h1>
        <p className="text-gray-700">
          Presiding: {meeting.presiding}
        </p>
        <p className="text-gray-700">
          Conducting: {meeting.conducting}
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-2">Opening Hymn</h2>
        <p>
          {meeting.openingHymn.number}: {meeting.openingHymn.title}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Opening Prayer</h2>
        <p>{meeting.openingPrayer}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Ward Business</h2>
        <ul className="list-disc ml-6">
          {meeting.wardBusiness.map((item, i) => (
            <li key={i}>{item.description}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Sacrament Hymn</h2>
        <p>
          {meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Speakers & Musical Numbers</h2>
        <ul className="list-disc ml-6">
          {meeting.speakers.map((s, i) => (
            <li key={i}>
              {s.type === "speaker"
                ? `${s.name} — ${s.topic}`
                : `Musical Number: ${s.name}`}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Closing Hymn</h2>
        <p>
          {meeting.closingHymn.number}: {meeting.closingHymn.title}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Closing Prayer</h2>
        <p>{meeting.closingPrayer}</p>
      </section>
    </article>
  );
}
