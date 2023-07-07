import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth' {
  interface Profile {
    picture: string
  }
}
