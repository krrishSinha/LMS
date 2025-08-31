import connectDB from "@/db/dbConfig";
import { Video } from "@/models";
import { Course } from "@/models/course.model";
import { destroyImageFromCloudinary, uploadToCloudinary } from "@/utils/Cloudinary";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    await connectDB()

    try {

        const { data, courseId } = await request.json()

        // get Course from DB FIRST 
        const existingCourse = await Course.findById(courseId)

        if (!existingCourse) {
            return NextResponse.json({
                success: false,
                message: 'Course Not Found',
            })
        };

        // Process sections & videos
        if (data.sections) {
            for (let section of data.sections) {
                if (section.videos && section.videos.length > 0) {
                    const videoIds = [];

                    for (let vid of section.videos) {
                        if (vid._id) {
                            // ✅ Update existing video
                            const updated = await Video.findByIdAndUpdate(vid._id, vid, { new: true });
                            videoIds.push(updated._id);
                        } else {
                            // ✅ Create new video
                            const created = await Video.create(vid);
                            videoIds.push(created._id);
                        }
                    }

                    // Replace videos array with their ObjectIds
                    section.videos = videoIds;
                }
            }
        };

        if (!data.thumbnail.public_id) {

            const thumbnail = data.thumbnail

            await destroyImageFromCloudinary(existingCourse.thumbnail.public_id)

            const ImageResult: any = await uploadToCloudinary(thumbnail, 'courses')

            data.thumbnail = {
                public_id: ImageResult.public_id,
                url: ImageResult.url
            };

        };

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $set: data },
            { new: true }
        )

        return NextResponse.json({
            success: true,
            message: 'Course Updated Successfully',
            updatedCourse
        })



    } catch (error: any) {
        console.log('error in edit course');
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}