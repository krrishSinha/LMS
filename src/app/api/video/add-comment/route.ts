import connectDB from "@/db/dbConfig";
import { Comment, Notification, Video } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request:NextRequest){

    await connectDB()

    try {

        const userId  = request.headers.get('userId')
        const username  = request.headers.get('username')

        const {comment, videoId} =   await request.json()

        if(!comment || videoId) {
            return NextResponse.json({
                success: false,
                message: 'Comment & VideoId should not be empty'
            })
        };

        // save user comment in Comment Model 
        const savedComment = await Comment.create({
            user: userId,
            comment,
            videoId
        });

        // push savedComment _id in  Video Model comments Array
        const updatedVideo = await Video.findByIdAndUpdate(videoId, {
            $push: {comments: savedComment._id}
        },{new:true})

        // send Notification to Admin that User commented on Video in Notification Model
        await Notification.create({
            title: 'New Comment',
            message: `You have a new comment on ${updatedVideo.title} from ${username}`,
            userId
        })

        return NextResponse.json({
            success: true,
            message: 'Comment Created Successfully...',
            updatedVideo
        })

        
    } catch (error:any) {
        console.log('error in video comment');
        return NextResponse.json({
            success: true,
            message: error.message
        })
        
    }

}