import connectDB from "@/db/dbConfig";
import redis from "@/db/redis";
import { Course } from "@/models/course.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, context: { params: { courseId: string } }){

    await connectDB()

    const {courseId} = await context.params    
    
    try {

        // get course from redis DB if available
        const cachedCourse = await redis.get(courseId)

        if (cachedCourse) {
            const course = cachedCourse;
            return NextResponse.json({
                success: true,
                course
            })
        }
        
        const course = await Course.findById(courseId).select('-reviews -courseData')

        await redis.set(courseId, JSON.stringify(course))

        return NextResponse.json({
            success: true,
            course
        })

    } catch (error: any) {
        console.log('error in get course');
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }

}