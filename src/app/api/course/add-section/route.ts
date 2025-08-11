import connectDB from "@/db/dbConfig";
import { Course_Section } from "@/models";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {

    try {

        await connectDB()

        const {title, courseId} = await request.json()

        const section = await Course_Section.create({
            title,
            courseId
        })

        return NextResponse.json({
            success: true,
            section
        })
        
    } catch (error:any) {
        console.log('error in section');
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }

}