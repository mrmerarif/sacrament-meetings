import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { SignOutButton } from '@/components/sign-out-button';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <>
      <div className="flex justify-end px-6 pt-4">
        <SignOutButton />
      </div>
      {children}
    </>
  );
}