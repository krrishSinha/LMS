// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken'
import { jwtVerify } from 'jose';
import { User } from './models/user.model';

export async function middleware(request: NextRequest) {

    const baseAuthUrl = '/api/auth'

    const publicPath = [`${baseAuthUrl}/login`, `${baseAuthUrl}/register`];

    const protectedPath = [`${baseAuthUrl}/logout`]

    const token: any = request.cookies.get('accessToken')?.value;

    const pathname = request.nextUrl.pathname;

    if (!token) {
        console.log('Unauthorised, Please Login first.');
        return NextResponse.redirect(new URL(`/login`, request.url));
    }

    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN || '');
    const { payload }: any = await jwtVerify(token, secret);

    if (!payload) {
        console.log('Invalid Token or Token has expired');
        return NextResponse.redirect(new URL(`/login`, request.url));
    }

    if (protectedPath.includes(pathname) && payload.role !== 'admin') {
        console.log('Unauthorised. Admin only');
        return NextResponse.redirect(new URL(`/`, request.url));
    }

    const response = NextResponse.next();
    response.headers.set('userId', payload._id);
    return response;
}

// Apply middleware only to certain paths
export const config = {
    matcher: [
        '/api/auth/logout',
        '/api/user/info',
        '/api/user/update-info',
        '/api/user/update-password'
    ] // protected routes
};
