import connectDB from "@/db/dbConfig";
import { Comment, Video } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request:NextRequest){

    await connectDB()

    try {

        const userId  = request.headers.get('userId')

        const {comment, videoId} =   await request.json()

        if(!comment) {
            return NextResponse.json({
                success: false,
                message: 'Comment should not be empty'
            })
        };

        // save user comment in Comment Model 
        const savedComment = await Comment.create({
            user: userId,
            comment,
            videoId
        });

        // push savedComment _id in  Video Model comments Array
        const updatedVideoComments = await Video.findByIdAndUpdate(videoId, {
            $push: {comments: savedComment._id}
        })

        return NextResponse.json({
            success: true,
            message: 'Comment Created Successfully...',
            updatedVideoComments
        })

        
    } catch (error:any) {
        console.log('error in video comment');
        return NextResponse.json({
            success: true,
            message: error.message
        })
        
    }

}