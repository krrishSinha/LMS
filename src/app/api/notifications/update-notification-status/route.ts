import { Notification } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    try {

        const notificationId = await request.json()

        if(!notificationId){
            return NextResponse.json({
                success: false,
                message: 'notification id required'
            })
        }

        const updatedNotification = await Notification.findByIdAndUpdate(notificationId, {
            status: 'read'
        })

        return NextResponse.json({
            success: false,
            updatedNotification,
            message: 'Status Updated'
        })
        
    } catch (error:any) {
        console.log('error in update notification status');
        return NextResponse.json({
            success:false,
            message: error.message
        })
        
    }

}