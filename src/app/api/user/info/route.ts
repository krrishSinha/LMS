import redis from "@/db/redis";
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'



export async function GET(request: NextRequest) {
    try {

        const userId = request.headers.get('userId');
        const accessToken: any = request.cookies.get('accessToken')?.value
        
        try {
            const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN as any);

        } catch (error) {
            console.log('fwefwefwfwfwef')
            return NextResponse.json(
                {
                    success: false,
                    message: 'Unauthorised'
                },
                { status: 401 }
            )
        }

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User id not found'
                },
                { status: 401 }
            )
        }

        // get user info from redis DB
        const redisUser: any = await redis.get(JSON.stringify(userId))

        const user = redisUser

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User not found'
                },
                { status: 401 }
            )
        }

        return NextResponse.json({
            success: true,
            user,
            accessToken
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                success: true,
                message: 'error in get user info',
                error
            },
            { status: 401 }
        )
    }
}