import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(request: NextRequest) {

    try {

        const { email, role } = await request.json()

        console.log(email, role)

        if (!email || !role) {
            return NextResponse.json({
                success: false,
                message: 'All feild required'
            })
        }

        const updatedUser = await User.findOneAndUpdate(
            {email},
            {$set: {role}},
            {new: true}
        );

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