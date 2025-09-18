import connectDB from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {

        await connectDB()

        const {title, courseId} = await request.json()

        return NextResponse.json({
            success: true,
        })
        
    } catch (error:any) {
        console.log('error in section');
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }

}