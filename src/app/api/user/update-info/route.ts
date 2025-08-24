import { NextRequest, NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser"
import { User } from "@/models/user.model";
import redis from "@/db/redis";


export async function PUT(request: NextRequest) {

    try {
        const { name } = await request.json()
        const userId: any = request.headers.get('userId');

        /// get user from DB
        const user = await User.findById(userId)

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

        await redis.set(JSON.stringify(userId), JSON.stringify(user))

        return NextResponse.json({
            success: true,
            message: 'Details Updated successfully',
            user
        })

    } catch (error: any) {
        console.log('error in upate info');
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}