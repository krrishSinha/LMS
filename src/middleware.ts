// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken'
import * as jose from 'jose'
import { User } from './models/user.model';

export async function middleware(request: NextRequest) {

    const baseAuthUrl = '/api/auth'

    const publicPath = [`${baseAuthUrl}/login`, `${baseAuthUrl}/register`];

    const protectedAdminPath = [
        `/api/course/add-course`,
        '/api/course/edit-course/:path*',
        '/api/course/reply-review',
        "/api/notifications/get-all-notifications",
        '/api/course/get-all-courses-data',
        '/api/user/get-all-users',
        '/api/enrollment/get-all-enrollments',
        '/api/user/update-user-role',
        '/api/user/delete-user',
        '/api/course/delete-course',
        '/api/layout/create-layout',
    ]

    const token: any = request.cookies.get('accessToken')?.value;

    const pathname = request.nextUrl.pathname;

    if (!token) {
        // console.log('Unauthorised, Please Login first.');
        // return NextResponse.redirect(new URL(`/`, request.url));
        return NextResponse.json(
            {
                success: false,
                message: 'token not found'
            },
            { status: 401 }
        )
    }

    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN);

    try {

        const {payload}: any = await jose.jwtVerify(token, secret);

        if (protectedAdminPath.includes(pathname) && payload.role !== 'admin') {
            console.log('Unauthorised. Admin only');
            return NextResponse.redirect(new URL(`/`, request.url));
        }

        const response = NextResponse.next();
        response.headers.set('userId', payload._id);
        response.headers.set('userEmail', payload.email);
        response.headers.set('username', payload.name);
        return response;

    } catch (error) {
        return NextResponse.json(
            {
                success: true,
                message: "JWT verify failed"
            },
            { status: 401 }
        )
    }

}

// Apply middleware only to certain paths
export const config = {
    matcher: [
        '/api/auth/logout',
        '/api/user/info',
        '/api/user/update-info',
        '/api/user/update-password',

        '/api/course/get-course-content/:path*',

        // video 
        '/api/video/add-comment',
        '/api/video/add-comment-reply',

        //Course
        '/api/course/add-review',
        '/api/course/purchase',

        //admin protected Route
        '/api/course/add-course',
        '/api/course/edit-course/:path*',
        '/api/course/purchase/:path*',
        '/api/course/get-all-courses-data',
        '/api/course/reply-review',
        '/api/course/delete-course',

        '/api/notifications/get-all-notifications',
        '/api/enrollment/get-all-enrollments',

        '/api/user/get-all-users',
        '/api/user/update-user-role',
        '/api/user/delete-user',

        // layout 
        '/api/layout/create-layout',
    ] // protected routes
};
