
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const email = process.env.AUTH_USER_EMAIL;
        const encodedHash = process.env.AUTH_USER_PASSWORD_HASH_BASE64;

        if (!email || !encodedHash) {
          return null;
        }

        const { email: enteredEmail, password } = parsed.data;

        const emailMatches =
          enteredEmail.trim().toLowerCase() ===
          email.trim().toLowerCase();

        if (!emailMatches) {
          return null;
        }

        const passwordHash = Buffer.from(
          encodedHash,
          'base64'
        ).toString('utf8');

        const passwordMatches = await bcrypt.compare(
          password,
          passwordHash
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: 'bishopric',
          email,
          name: 'Bishopric',
        };
      },
    }),
  ],
});
