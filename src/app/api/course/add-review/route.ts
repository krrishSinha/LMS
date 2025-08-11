import { Course, Enrollment, Review } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    try {

        const userId = request.headers.get('userId')
        const { rating, review, courseId } = await request.json();
        
        // check if user have purchased course or not 
        const isUserPurchasedCourse = await Enrollment.findOne({
            user: userId,
            course: courseId
        })

        if(!isUserPurchasedCourse){
            return NextResponse.json({
                success: false,
                message: 'Unauthorised. Please buy the Course to submit Review',
                isUserPurchasedCourse
            })
        }

        if(!userId){
            return NextResponse.json({
                success: false,
                userId
            })
        }


        if (!rating) {
            return NextResponse.json({
                success: false,
                message: 'Rating are required for submitting review'
            })
        }

        // save review in Review Model
        const savedReview: any = await Review.create({
            userId,
            rating,
            review,
            courseId
        })

        // push saved review in Course Model.reviews Array
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $push: { reviews: savedReview._id }
        });

        return NextResponse.json({
            success: true,
            message: 'Review Added',
            updatedCourse
        })

    } catch (error: any) {
        console.log('error in add review');
        return NextResponse.json({
            success: true,
            message: error.message
        })
    }

}