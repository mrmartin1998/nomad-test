import { NextResponse } from 'next/server';

export function middleware(request) {
  // Rewrite sitemap.xml requests to our API route
  if (request.nextUrl.pathname === '/sitemap.xml') {
    return NextResponse.rewrite(new URL('/api/sitemap', request.url));
  }
}

export const config = {
  matcher: '/sitemap.xml'
}; 