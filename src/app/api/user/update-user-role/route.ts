import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(request: NextRequest) {

    try {

        const { userId, role } = await request.json()

        if (!userId || !role) {
            return NextResponse.json({
                success: false,
                message: 'All feild required'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true })


        return NextResponse.json({
            success: true,
            updatedUser,
        })

    } catch (error: any) {
        console.log('error in update user role');
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }

}