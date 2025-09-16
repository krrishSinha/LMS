import connectDB from "@/db/dbConfig";
import { Course, Notification } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function PUT(request: NextRequest) {

    await connectDB()
    const { comment, courseId, sectionId, videoId } = await request.json()

    try {

        const accessToken: any = request.cookies.get('accessToken')?.value

        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN!)
        const { _id, name }: any = decode

        if (!comment || !courseId) {
            return NextResponse.json({
                success: false,
                message: 'Comment & CourseId should not be empty'
            })
        };


        const course = await Course.findById(courseId)

        const section = course.sections.find((section: any, index: any) => section._id == sectionId)

        const video = section?.videos.find((video: any, index: any) => video._id == videoId)

        video.comments.push({
            user: _id,
            comment,
            replies: [],
        });

        await course.save();
        await course.populate({
            path: "sections.videos.comments.user",
            select: 'name email role avatar'
        });

        // send Notification to Admin that User commented on Video in Notification Model
        await Notification.create({
            title: 'New Comment',
            message: `You have a new comment on ${video.title} from ${name}`,
            _id
        })

        return NextResponse.json(
            {
                success: true,
                message: 'Comment Created Successfully...',
                course
            },
            { status: 200 }
        )


    } catch (error: any) {
        console.log('error in video comment');
        return NextResponse.json(
            {
                success: true,
                message: error.message
            },
            { status: 400 }
        )

    }

}