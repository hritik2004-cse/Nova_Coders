import { NextResponse } from 'next/server';

export function middleware(request) {
    // Skip middleware for most paths since JWT verification requires Node.js runtime
    // We'll handle authentication in individual API routes instead
    
    // Only handle specific redirects or header modifications here
    const publicPaths = [
        '/api/auth/login',
        '/api/auth/signup', 
        '/api/auth/logout',
        '/api/health'
    ];

    // Skip middleware for static files and most paths
    if (
        request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.includes('.') ||
        request.nextUrl.pathname === '/' ||
        request.nextUrl.pathname.startsWith('/services') ||
        publicPaths.some(path => request.nextUrl.pathname.startsWith(path))
    ) {
        return NextResponse.next();
    }

    // Check for auth token in cookies (basic check without verification)
    const token = request.cookies.get('authToken')?.value;
    
    // For protected API routes, just pass the token in headers for server-side verification
    if (request.nextUrl.pathname.startsWith('/api/')) {
        const requestHeaders = new Headers(request.headers);
        if (token) {
            requestHeaders.set('x-auth-token', token);
        }
        
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }
    
    // For page routes, just continue (authentication will be handled client-side)
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
