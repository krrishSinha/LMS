import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {

    try {
       
        const {videoId} = await request.json()
        console.log(videoId)
        const response = await axios.post(
            `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
            {ttl: 300},
            {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                    Authorization: `Apisecret ${process.env.VDOCIPHER_API_KEY}`
                }
            }
        );

        return NextResponse.json(response.data)
        
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error
        })
    }

}