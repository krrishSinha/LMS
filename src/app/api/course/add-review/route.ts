import connectDB from "@/db/dbConfig";
import { Course, Enrollment } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {

    await connectDB();
    const { rating, review, courseId } = await request.json();

    try {

        const accessToken: any = await request.cookies.get('accessToken')?.value
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN!);
        const { _id }: any = decode;

        // check if user have purchased course or not 
        const isUserEnrolled = await Enrollment.findOne({
            userId: _id,
            courseId: courseId
        })

        if (!isUserEnrolled) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorised. Please buy the Course to submit Review',
            })
        };

        const course = await Course.findById(isUserEnrolled.courseId)

        await course.reviews.push({
            user: _id,
            rating,
            review,
        })

        await course.save()

        return NextResponse.json({
            success: true,
            message: 'Review Added',
            course
        })

    } catch (error: any) {
        console.log('error in add review');
        return NextResponse.json({
            success: true,
            message: error.message,
        })
    }

}