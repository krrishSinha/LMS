import connectDB from "@/db/dbConfig";
import { Course } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function PUT(request: NextRequest) {

    await connectDB()
    const { reply, courseId, sectionId, videoId, commentId } = await request.json()

    try {

        const accessToken: any = request.cookies.get('accessToken')?.value

        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN!)
        const { _id, name }: any = decode

        if (!reply) {
            return NextResponse.json({
                success: false,
                message: 'reply should not be empty'
            })
        }

        if (!commentId) {
            return NextResponse.json({
                success: false,
                message: 'Either Comment has been removed or Invalid Comment Id'
            })
        };

        const course = await Course.findById(courseId)

        const section = course.sections.find((section: any, index: any) => section._id == sectionId)

        const video = section?.videos.find((video: any, index: any) => video._id == videoId)

        const comment = video?.comments.find((comment: any, index: any) => comment._id == commentId)

        comment.replies.push({
            user: _id,
            reply,
        });

        await course.save();

        await course.populate([
            {
                path: "sections.videos.comments.user",
                select: 'name email avatar'
            },
            {
                path: "sections.videos.comments.replies.user",
                select: 'name email role avatar'
            }
        ]);

        return NextResponse.json(
            {
                success: true,
                message: 'Reply Created Successfully...',
                course
            },
            { status: 200 }
        )


    } catch (error: any) {
        console.log('error in adding comment reply');
        return NextResponse.json(
            {
                success: true,
                message: error.message
            },
            { status: 400 }
        )
    }

}