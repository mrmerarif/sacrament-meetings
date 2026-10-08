import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-3xl font-bold">
          Bishopric Sign In
        </h1>

        <p className="mb-6 text-gray-600">
          Sign in to manage sacrament meeting schedules and details.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}