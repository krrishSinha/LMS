import { Course } from "@/models";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(request: NextRequest) {

    try {

        const { courseId } = await request.json()

        const course = await Course.findById(courseId)
        
         if (!courseId) {
            return NextResponse.json({
                success: false,
                message: 'Invalid Request, courseId Required'
            })
        }

        if (!course) {
            return NextResponse.json({
                success: false,
                message: 'course not found'
            })
        }

        await course.deleteOne()

        const updatedCourse = await Course.find()

        return NextResponse.json({
            success: true,
            updatedCourse
        })

    } catch (error: any) {
        console.log('error in deleting course');
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }

}