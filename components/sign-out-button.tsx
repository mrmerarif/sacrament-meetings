import { signOut } from '@/auth';

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    >
      <button
        type="submit"
        className="rounded-md border px-4 py-2 font-medium"
      >
        Sign Out
      </button>
    </form>
  );
}