import { Review } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request: NextRequest) {

    try {

        const userId = request.headers.get('userId')
        const { reply, courseReviewId } = await request.json();

        if (!userId) {
            return NextResponse.json({
                success: false,
                userId
            })
        }

        // save reply in Review Model.
        const updatedReview = await Review.findByIdAndUpdate(courseReviewId, {
            $set: {
                creatorReply: reply,
                courseCreator: userId
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Reply Send to User',
            updatedReview
        })

    } catch (error: any) {
        console.log('error in add review');
        return NextResponse.json({
            success: true,
            message: error.message
        })
    }

}