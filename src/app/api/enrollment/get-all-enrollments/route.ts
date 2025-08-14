import { Enrollment } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){

    try {

        const enrollments = await Enrollment.find()

        return NextResponse.json({
            success: true,
            enrollments
        })
        
    } catch (error:any) {
        console.log('error in getting all Enrollments');
        return NextResponse.json({
            success: false,
            message: error.message
        })
        
    }

}