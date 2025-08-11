import connectDB from "@/db/dbConfig";
import { Video } from "@/models/video.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {

    try {

        await connectDB()

        const {title,description,videoUrl, sectionId} = await request.json()

        const video = await Video.create({
            title,
            description,
            videoUrl,
            sectionId
        })

        return NextResponse.json({
            success: true,
            video
        })
        
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({
            success: true,
            message: error.message
        })
    }

}