import redis from "@/db/redis";
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    try {

        const userId: any = await getAuthenticatedUser(request)

        if(!userId){
            return NextResponse.json({
                success: false,
                message: 'Unauthorised'
            }) 
        };

        const {oldPassword, newPassword} = await request.json()

        if(!oldPassword || !newPassword){
            return NextResponse.json({
                success: false,
                message: 'All Feilds are required'
            }) 
        }

        const user = await User.findById(userId)

        const isPasswordMatched = await user.comparePassword(oldPassword)

        if(!isPasswordMatched){
            return NextResponse.json({
                success: false,
                message: 'Invalid old Password'
            })
        };

        user.password = newPassword;

        // await redis.set(userId, JSON.stringify(user))

        await user.save()

        return NextResponse.json({
            success: true,
            message: 'Password Changed successfully...'
        })

        
    } catch (error:any) {
        console.log('error in updating password');
        return NextResponse.json({
            success: 'false',
            message: error.message
        })
    }
}