import connectDB from "@/db/dbConfig";
import { Enrollment } from "@/models/enrollment.model";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, context: { params: { courseId: string } }) {

    await connectDB()

    try {
        const { courseId } = await context.params

        const userId = request.headers.get('userId')

        console.log(userId);

        const enrollment = await Enrollment.create({
            user: userId,
            course: courseId
        })

        return NextResponse.json({
            success: false,
            enrollment
        })

    } catch (error: any) {
        console.log('error in purchasee course');
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }

}