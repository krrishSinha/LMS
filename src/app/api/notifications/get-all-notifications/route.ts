import { Notification } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){

    try {

        const notifications = await Notification.find().sort({createdAt: -1})

        return NextResponse.json({
            success: true,
            notifications
        })
        
    } catch (error:any) {
        console.log('error in et all notification');
        return NextResponse.json({
            succes: false,
            message:error.message
        })
        
    }


}