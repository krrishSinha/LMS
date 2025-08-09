import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import redis from "@/db/redis";

export async function POST(request: NextRequest) {

    try {

        const token: any = request.cookies.get('accessToken')?.value;

        const decode: any = jwt.verify(token, process.env.ACCESS_TOKEN as any)

        if (!decode) {
            return NextResponse.json({
                success: false,
                message: 'Invalid Token'
            })
        }

        const session: any = await redis.get(JSON.stringify(decode._id))

        if (!session) {
            return NextResponse.json({
                success: false,
                message: 'Invalid Token'
            })
        }

        const user = session;

        const accessToken = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN!,
            { expiresIn: '5m' }
        )

        const refreshToken = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
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

    } catch (error:any) {

        console.log(error);
        return NextResponse.json({
            success: false,
            message: error.message
        })
        

    }

}