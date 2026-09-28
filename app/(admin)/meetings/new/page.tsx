import CreateMeetingForm from './create-meeting-form';

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Create Meeting
      </h1>

      <CreateMeetingForm />
    </main>
  );
}