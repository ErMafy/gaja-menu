import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if accessing admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const authCookie = request.cookies.get('admin-auth');

        // If not authenticated and not on login page, redirect to login
        if (!authCookie && !request.nextUrl.pathname.startsWith('/admin/login')) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
