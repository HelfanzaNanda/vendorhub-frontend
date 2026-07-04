import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY || 'access_token'
  const hasToken = request.cookies.has(tokenKey)

  // Redirect root to dashboard
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  const isGuestRoute = pathname.startsWith('/login') || pathname.startsWith('/register')
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/master')

  if (isProtectedRoute && !hasToken) {
    const loginUrl = new URL('/login', request.url)

    return NextResponse.redirect(loginUrl)
  }

  if (isGuestRoute && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
