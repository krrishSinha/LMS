import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import redis from "@/db/redis";
import { User } from "@/models";

export async function GET(request: NextRequest) {

    try {

        const incomingRefreshToken: any = request.cookies.get('refreshToken')?.value;



        try {
            const decode: any = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN as any);

            let user = await User.findOne({ refreshToken: incomingRefreshToken })

            if (!user) {
                return NextResponse.json({
                    success: false,
                    message: 'Invalid Refresh Token'
                })
            }

            const accessToken = jwt.sign(
                { _id: user._id, name: user.name, email: user.email, role: user.role },
                process.env.ACCESS_TOKEN!,
                { expiresIn: '1h' }
            )

            const refreshToken = jwt.sign(
                { _id: user._id, name: user.name, email: user.email, role: user.role },
                process.env.REFRESH_TOKEN!,
                { expiresIn: '10d' }
            )

            user.refreshToken = refreshToken;
            await user.save()

            await redis.set(JSON.stringify(user._id), JSON.stringify(user))

            const response = NextResponse.json({
                success: true,
                message: 'Access Token Updated',
                accessToken
            })

            response.cookies.set('accessToken', accessToken)
            response.cookies.set('refreshToken', refreshToken)

            return response

        } catch (error) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Refresh Token Expired'
                },
                { status: 401 }
            )
        }

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