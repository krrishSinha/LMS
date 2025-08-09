import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){

    try {

        const {email, name, password, avatar} = await request.json()

        const existingUser = await User.findOne({email})

        // check if user already exists
        if(existingUser){
            return NextResponse.json({
                success: false,
                message: "Email Already Exists. please login"
            })
        }

        const user = await User.create({
            email,
            password,
            name,
            avatar
        });

        await user.save()

        return NextResponse.json({
            success: true,
            message: "Email Registered. Please Login",
        })
        
        
    } catch (error:any) {
        console.log('error in social auth');
        return NextResponse.json({
            success: true,
            message: error.message
        })
        
    }

}