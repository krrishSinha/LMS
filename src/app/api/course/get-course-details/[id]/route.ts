import connectDB from "@/db/dbConfig";
import redis from "@/db/redis";
import { Course } from "@/models/course.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: any) {

    await connectDB()

    const { id } = await params

    try {

        // get course from redis DB if available
        // const cachedCourse = await redis.get(courseId)

        // if (cachedCourse) {
        //     const course = cachedCourse;
        //     return NextResponse.json({
        //         success: true,
        //         course
        //     })
        // }

        const course = await Course.findById(id)
            .select(
                "-sections.videos.videoUrl " +
                "-sections.videos.links " +
                "-sections.videos.videoPlayer " +
                "-sections.videos.suggestions " +
                "-sections.videos.comments "
            )

        // await redis.set(courseId, JSON.stringify(course))

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