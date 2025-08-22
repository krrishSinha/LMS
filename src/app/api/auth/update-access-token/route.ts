import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import redis from "@/db/redis";

export async function GET(request: NextRequest) {

    try {

        const token: any = request.cookies.get('accessToken')?.value;

        let user;

        try {
            const decode: any = jwt.verify(token, process.env.ACCESS_TOKEN as any);

            const session: any = await redis.get(JSON.stringify(decode._id))

            if (!session) {
                return NextResponse.json({
                    success: false,
                    message: 'User not found in redis'
                })
            }

            user = session;

        } catch (error) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid Token'
                },
                { status: 401 }
            )
        }

        const accessToken = jwt.sign(
            { _id: user._id, name: user.name, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN!,
            { expiresIn: '5m' }
        )

        const refreshToken = jwt.sign(
            { _id: user._id, name: user.name, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN!,
            { expiresIn: '1d' }
        )


        const response = NextResponse.json({
            success: true,
            message: 'Access Token Updated',
            accessToken
        })

        response.cookies.set('accessToken', accessToken)
        response.cookies.set('refreshToken', refreshToken)

        return response

    } catch (error: any) {

        console.log('error in update acces token');
        return NextResponse.json(
            {
                success: false,
                message: error
            },
            { status: 401 }
        )


    }

}