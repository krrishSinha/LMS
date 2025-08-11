import { Course } from "@/models/course.model";
import { uploadToCloudinary } from "@/utils/Cloudinary";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){

    try {

        const data = await request.json()

        // const ImageResult:any = await uploadToCloudinary(data.thumbnail, 'courses')

        // data.thumbnail = {
        //     public_id: ImageResult.public_id,
        //     url: ImageResult.url
        // };

        const course = await Course.create(data)

        return NextResponse.json({
            success: true,
            message: 'Course Added Successfully',
            course
        })
        
    } catch (error:any) {
        console.log('error in Add Course route');
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }

}