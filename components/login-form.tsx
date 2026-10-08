'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/auth-actions';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={6}
          required
          autoComplete="current-password"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <button
        type="submit"
        aria-disabled={isPending}
        disabled={isPending}
        className="w-full rounded-md bg-blue-700 px-4 py-2 font-medium text-white disabled:opacity-60"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>

      {errorMessage && (
        <p role="alert" className="text-sm text-red-700">
          {errorMessage}
        </p>
      )}
    </form>
  );
}