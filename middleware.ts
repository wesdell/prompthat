import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';

export async function middleware (req: NextRequest): Promise<NextResponse> {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile',
    '/create-prompt',
    '/update-prompt',
    '/api/prompt/new/',
    '/api/prompt/:id/',
    '/api/users/:id/prompts/'
  ],
};
