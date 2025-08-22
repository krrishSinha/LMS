import redis from "@/db/redis";
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {

        const userId = request.headers.get('userId');
        const accessToken = request.cookies.get('accessToken')?.value

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorised'
            })
        }

        // get user info from redis DB
        const redisUser: any = await redis.get(JSON.stringify(userId))

        const user = redisUser

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            })
        }

        return NextResponse.json({
            success: true,
            user,
            accessToken
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: true,
            message: 'error in get user info',
            error
        })
    }
}