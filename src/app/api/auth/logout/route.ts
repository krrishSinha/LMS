import redis from "@/db/redis";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest,) {

    try {

        const response = NextResponse.json({
            success: true,
            message: "Logout successful",
        });

        response.cookies.set('accessToken', '', { maxAge: 1 })
        response.cookies.set('refreshToken', '', { maxAge: 1 })

        // await redis.del(JSON.stringify(isUserAuthenticated._id), '')

        return response

    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({
            success: false,
            message: "Logout failed",
        })
    }
}