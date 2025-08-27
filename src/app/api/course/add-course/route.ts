import { Video } from "@/models";
import { Course } from "@/models/course.model";
import { uploadToCloudinary } from "@/utils/Cloudinary";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    try {

        const data = await request.json()

        const ImageResult: any = await uploadToCloudinary(data.thumbnail, 'courses')

        data.thumbnail = {
            public_id: ImageResult.public_id,
            url: ImageResult.url
        };

        let updatedSection = []

        for (const section of data?.sections) {
            // insert all videos of this section in one go
            const createdVideos = await Video.insertMany(section.videos);

            const videoIds = createdVideos.map((video) => video._id);

            updatedSection.push({
                title: section.title,
                videos: videoIds
            })
        };

        data.sections = updatedSection;

        const course = await Course.create(data)

        return NextResponse.json({
            success: true,
            message: 'Course Added Successfully',
            course
        })

    } catch (error: any) {
        console.log('error in Add Course route');
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }

}