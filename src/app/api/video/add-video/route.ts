import connectDB from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {

    try {

        await connectDB()

        const {title,description,videoUrl, sectionId} = await request.json()

        return NextResponse.json({
            success: true,
        })
        
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({
            success: true,
            message: error.message
        })
    }

}