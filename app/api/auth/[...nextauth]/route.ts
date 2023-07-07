import NextAuth, { type Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { dbUser } from '@/database';

const handler = NextAuth ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    })
  ],
  callbacks: {
    async session ({ session }): Promise<Session> {
      const sessionUser = await dbUser.findUser({ email: session.user?.email });
      session.user.id = sessionUser?.toString();
      return session;
    },
    async signIn ({ profile }) {
      return await dbUser.createUser({
        username: profile?.name?.replace(' ', '').toLowerCase(),
        email: profile?.email,
        image: profile?.picture
      });
    }
  }
});

export { handler as GET, handler as POST };
