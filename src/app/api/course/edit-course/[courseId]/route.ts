import { Course } from "@/models/course.model";
import { destroyImageFromCloudinary } from "@/utils/Cloudinary";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, { params }: { params: { courseId: string } }) {

    try {

        const courseId = params.courseId

        const data = await request.json()

        const thumbnail = data.thumbnail

        if (thumbnail) {

            // const ImageResult:any = await destroyImageFromCloudinary(thumbnail.public_id)

            // const ImageResult:any = await uploadToCloudinary(thumbnail, 'courses')

            // data.thumbnail = {
            //     public_id: ImageResult.public_id,
            //     url: ImageResult.url
            // };

        }

        const course = await Course.findByIdAndUpdate(
            { courseId },
            {
                $set: data
            },
            { new: true }
        )

        return NextResponse.json({
            success: true,
            message: 'Course Updated Successfully',
            course
        })

    } catch (error: any) {
        console.log('error in edit course');
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}