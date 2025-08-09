import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {

    try {

        response.cookies.set('accessToken', '', { maxAge: 1 })
        response.cookies.set('refreshToken', '', { maxAge: 1 })

        return NextResponse.json({
            success: true,
            message: "Logout successful",
        });

    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({
            success: false,
            message: "Logout failed",
        })
    }
}