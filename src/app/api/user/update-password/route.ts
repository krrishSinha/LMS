import redis from "@/db/redis";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {

    const accessToken: any = request.cookies.get('accessToken')?.value
    const { oldPassword, newPassword } = await request.json()

    try {
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN as any);
        const { _id }: any = decode

        if (!_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Unauthorised'
                },
                { status: 401 }
            )
        };


        if (!oldPassword || !newPassword) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'All Feilds are required'
                },
                { status: 401 }
            )
        }

        const user = await User.findById(_id)

        const isPasswordMatched = await user.comparePassword(oldPassword)

        if (!isPasswordMatched) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid old Password'
                },
                { status: 401 }
            )
        };

        user.password = newPassword;

        // await redis.set(userId, JSON.stringify(user))

        await user.save()

        return NextResponse.json({
            success: true,
            message: 'Password Changed successfully...'
        })


    } catch (error: any) {
        console.log('error in updating password');
        return NextResponse.json(
            {
                success: 'false',
                message: error.message
            },
            { status: 401 }
        )
    }
}