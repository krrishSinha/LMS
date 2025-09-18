import { Notification } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id')
    console.log(id)

    try {

        if (!id) {
            return NextResponse.json({
                success: false,
                message: 'notification id required'
            })
        }

        const updatedNotification = await Notification.findByIdAndUpdate(id, {
            status: 'read'
        })

        return NextResponse.json({
            success: false,
            message: 'Status Updated'
        })

    } catch (error: any) {
        console.log('error in update notification status');
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }

}