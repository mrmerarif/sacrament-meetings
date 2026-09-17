import type { SacramentMeeting } from "@/lib/types";
import PrintButton from "@/components/PrintButton";

export default function MeetingDetail({
meeting,
}: {
meeting: SacramentMeeting;
}) {
return ( <article className="space-y-8"> <PrintButton />


  <header className="border-b border-gray-200 pb-6">
    <h1 className="text-3xl font-bold">
      {meeting.date} — {meeting.meetingType.toUpperCase()}
    </h1>

    <div className="mt-3 space-y-1 text-gray-700">
      <p>
        <span className="font-medium">Presiding:</span>{" "}
        {meeting.presiding}
      </p>
      <p>
        <span className="font-medium">Conducting:</span>{" "}
        {meeting.conducting}
      </p>
    </div>
  </header>

  <section>
    <h2 className="text-xl font-semibold">Announcements</h2>
    {meeting.announcements && meeting.announcements.length > 0 ? (
      <ul className="mt-2 list-disc space-y-1 pl-6">
        {meeting.announcements.map((announcement, index) => (
          <li key={index}>{announcement}</li>
        ))}
      </ul>
    ) : (
      <p className="mt-2 text-gray-600">No announcements.</p>
    )}
  </section>

  <section>
    <h2 className="text-xl font-semibold">Opening Hymn</h2>
    <p className="mt-2">
      {meeting.openingHymn.number}: {meeting.openingHymn.title}
    </p>
  </section>

  <section>
    <h2 className="text-xl font-semibold">Opening Prayer</h2>
    <p className="mt-2">{meeting.openingPrayer}</p>
  </section>

  <section>
    <h2 className="text-xl font-semibold">Ward Business</h2>
    {meeting.wardBusiness.length > 0 ? (
      <ul className="mt-2 list-disc space-y-1 pl-6">
        {meeting.wardBusiness.map((item, index) => (
          <li key={index}>{item.description}</li>
        ))}
      </ul>
    ) : (
      <p className="mt-2 text-gray-600">No ward business.</p>
    )}
  </section>

  <section>
    <h2 className="text-xl font-semibold">Stake Business</h2>
    <p className="mt-2">
      {meeting.stakeBusiness ? "Yes" : "No"}
    </p>
  </section>

  <section>
    <h2 className="text-xl font-semibold">Sacrament Hymn</h2>
    <p className="mt-2">
      {meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}
    </p>
  </section>

  <section>
    <h2 className="text-xl font-semibold">
      Speakers and Musical Numbers
    </h2>

    {meeting.speakers.length > 0 ? (
      <ul className="mt-2 list-disc space-y-2 pl-6">
        {meeting.speakers.map((speaker, index) => (
          <li key={index}>
            {speaker.type === "speaker" ? (
              <>
                <span className="font-medium">{speaker.name}</span>
                {speaker.topic && ` — ${speaker.topic}`}
              </>
            ) : (
              <>
                <span className="font-medium">Musical Number:</span>{" "}
                {speaker.name}
              </>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p className="mt-2 text-gray-600">
        No speakers or musical numbers.
      </p>
    )}
  </section>

  <section>
    <h2 className="text-xl font-semibold">Closing Hymn</h2>
    <p className="mt-2">
      {meeting.closingHymn.number}: {meeting.closingHymn.title}
    </p>
  </section>

  <section>
    <h2 className="text-xl font-semibold">Closing Prayer</h2>
    <p className="mt-2">{meeting.closingPrayer}</p>
  </section>
</article>


);
}
