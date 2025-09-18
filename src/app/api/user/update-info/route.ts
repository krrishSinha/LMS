import { NextRequest, NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser"
import { User } from "@/models/user.model";
import redis from "@/db/redis";
import jwt from 'jsonwebtoken'

export async function PUT(request: NextRequest) {

    const accessToken: any = request.cookies.get('accessToken')?.value
    const { name } = await request.json()

    try {

        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN as any);
        const { _id }: any = decode

        /// get user from DB
        const user = await User.findById(_id)

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            })
        }

        if (name && user) {
            user.name = name
        }

        await user.save()

        // await redis.set(JSON.stringify(_id), JSON.stringify(user))

        return NextResponse.json(
            {
            success: true,
            message: 'Details Updated successfully',
            user
        },
        {status: 200}
    )

    } catch (error: any) {
        console.log('error in upate info');
        return NextResponse.json(
            {
            success: false,
            message: error.message
        },
        {status: 500}
    )
    }
}