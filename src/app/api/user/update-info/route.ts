import { NextRequest, NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser"
import { User } from "@/models/user.model";
import redis from "@/db/redis";


export async function PUT(request: NextRequest) {

    try {
        const { name, email } = await request.json()

        // check if user is authenticated or not
        const userId = await getAuthenticatedUser(request)

        if (!userId) {
            console.log('Unauthorised');
            return NextResponse.json({
                success: false,
                message: 'Unauthorised'
            })
        }

        /// get user from DB
        const user = await User.findById(userId)

        if (email && user) {

            // check if email already exists in DB
            const isEmailExists = await User.findOne({ email })

            if (isEmailExists) {
                return NextResponse.json({
                    success: false,
                    message: 'Email Already Exists'
                })
            }

            user.email = email;
        }

        if (name && user) {
            user.name = name
        }

        await user.save()

        await redis.set(userId, JSON.stringify(user))

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