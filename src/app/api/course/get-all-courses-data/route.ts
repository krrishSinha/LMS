import connectDB from "@/db/dbConfig";
import redis from "@/db/redis";
import { Course } from "@/models/course.model";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";


export async function GET(request: NextRequest) {

    try {

        const courses = await Course.find().populate({
            path: "sections.videos",   
            model: "Video"
        })

        return NextResponse.json({
            success: true,
            courses
        })

    } catch (error: any) {
        console.log('error in getting all courses data');
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }

}