import connectDB from "@/db/dbConfig";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){

    await connectDB()

    try {

        const users = await User.find().select('-password')

        return NextResponse.json({
            success: true,
            users
        })
        
    } catch (error:any) {
        console.log('error in getting all Users');
        return NextResponse.json({
            success: false,
            message: error.message
        })
        
    }

}