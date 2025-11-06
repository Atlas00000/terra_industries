/**
 * Next.js Middleware
 * 
 * Protects admin routes - redirects to login if not authenticated
 * Runs on server before page loads
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Get token from cookies or Authorization header
    const token = request.cookies.get('terra_auth_token')?.value;

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Note: Token validation happens on the client side
    // For stronger security, implement server-side token validation here
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};

