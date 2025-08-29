import connectDB from "@/db/dbConfig";
import redis from "@/db/redis";
import { Course } from "@/models/course.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){

    await connectDB()

    try {

        // check if course data available in redis
        // const cachedCourses = await redis.get("AllCourses")

        // if(cachedCourses){
        //     return NextResponse.json({
        //         success:true,
        //         courses: cachedCourses
        //     })
        // }

        const courses = await Course.find().select('-reviews -courseData')

        // await redis.set('AllCourses', JSON.stringify(courses))

        return NextResponse.json({
            success: true,
            courses
        })
        
    } catch (error:any) {
        console.log('error in getting all course');
        return NextResponse.json({
            success: false,
            message: error.message
        })
        
    }

}