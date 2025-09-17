import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import connectDB from "@/db/dbConfig";
import { Course } from "@/models";

export async function PUT(request: NextRequest) {

    await connectDB()

    const { reviewReply, courseId, reviewId } = await request.json();

    console.log(reviewReply)

    try {
        const accessToken: any = await request.cookies.get('accessToken')?.value
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN!);
        const { _id }: any = decode;

        const course = await Course.findById(courseId);

        let review = course.reviews?.find((review: any) => review._id == reviewId);

        review.reply = reviewReply;
        review.replyBy = _id;

        await course.save();

        return NextResponse.json({
            success: true,
            message: 'Reply Send to User',
            course
        })

    } catch (error: any) {
        console.log('error in add review');
        return NextResponse.json({
            success: true,
            message: error.message
        })
    }

}