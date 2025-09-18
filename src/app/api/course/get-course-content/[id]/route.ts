import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/dbConfig";
import { Course, Enrollment } from "@/models";
import jwt from 'jsonwebtoken'


export async function GET(request: NextRequest, { params }: any ) {

    await connectDB()

    try {

        const { id } = params;

        // get userId 
        const accessToken: any = await request.cookies.get('accessToken')?.value

        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN!);

        const { _id }: any = decode;

        const isUserEnrolled: any = await Enrollment.findOne({
            userId: _id,
            courseId: id
        }).populate({
            path: 'courseId',
            populate: [
                { path: 'sections.videos.comments.user', select: 'name email avatar' },
                { path: 'sections.videos.comments.replies.user', select: 'name email role avatar' },
                { path: 'reviews.user', select: 'name email role avatar' },
                { path: 'reviews.replyBy', select: 'name email role avatar' },
            ]
        }).select('-payment_info').lean()

        if (!isUserEnrolled) {
            return NextResponse.json({
                success: false,
                message: 'User not Enrolled',
            })
        };

        return NextResponse.json({
            success: true,
            course: isUserEnrolled.courseId
        })


    } catch (error: any) {
        console.log('error in getting course content');
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }

}