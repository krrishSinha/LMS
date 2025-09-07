import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/dbConfig";
import { Course, Enrollment } from "@/models";

await connectDB() 

export async function GET(request: NextRequest, context: { params: { courseId: string } }) {


    try {

        const { courseId } = await context.params

        // get userId from headers
        const userId: any = await request.headers.get('userId')

        const isUserEnrolled:any = await Enrollment.findOne({
            user: userId,
            course: courseId
        }).populate({
            path: 'course',
            populate: {
                path: 'sections',
                populate: {
                    path:'videos'
                }
            }
        })
        .lean()
        
        if (!isUserEnrolled) {
            return NextResponse.json({
                success: false,
                message: 'User not Enrolled',
            })
        }

        const fullCourse = isUserEnrolled?.course

        return NextResponse.json({
            success: true,
            fullCourse
        })


    } catch (error: any) {
        console.log('error in getting course content');
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }

}