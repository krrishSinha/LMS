import redis from "@/db/redis";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'



export async function GET(request: NextRequest) {
    try {

        const accessToken: any = request.cookies.get('accessToken')?.value

        try {
            const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN as any);

            const { _id }: any = decode

            const user = await User.findById(_id).populate('enrolledCourses')
            // const redisUser: any = await redis.get(JSON.stringify(_id))

            // const user = redisUser


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
            return NextResponse.json(
                {
                    success: false,
                    message: 'Unauthorised'
                },
                { status: 401 }
            )
        }

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