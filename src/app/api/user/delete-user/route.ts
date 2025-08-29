import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(request: NextRequest) {

    try {

        const { email } = await request.json()

        if (!email) {
            return NextResponse.json({
                success: false,
                message: 'Invalid Request, email Required'
            })
        }

        const user = await User.findOne()

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'user not found'
            })
        }

        await user.deleteOne()

        const updatedUsers = await User.find()

        return NextResponse.json({
            success: true,
            updatedUsers
        })

    } catch (error: any) {
        console.log('error in deleting user');
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }

}