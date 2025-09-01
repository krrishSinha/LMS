import connectDB from "@/db/dbConfig";
import { Course} from "@/models";
import { destroyImageFromCloudinary } from "@/utils/Cloudinary";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(request: NextRequest) {

    await connectDB()

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
        };

        await destroyImageFromCloudinary(course.thumbnail.public_id);

        await course.deleteOne()

        return NextResponse.json({
            success: true,
            message: 'Course Deleted Successfully.'
        })

    } catch (error: any) {
        console.log('error in deleting course');
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }

}