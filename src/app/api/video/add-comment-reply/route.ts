import { Comment, Reply } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request: NextRequest) {

    try {

        const userId = request.headers.get('userId')

        const { reply, commentId } = await request.json()

        if (!reply) {
            return NextResponse.json({
                success: false,
                message: 'reply should not be empty'
            })
        }

        if (!commentId) {
            return NextResponse.json({
                success: false,
                message: 'Either Comment has been removed or Invalid Comment Id'
            })
        }

        // save comment reply in Reply Model 
        const savedReply = await Reply.create({
            reply,
            userId,
            commentId
        });

        // push savedReply._id in Comment Model.replies Array
        const updatedComment = await Comment.findByIdAndUpdate(commentId, {
            $push: { replies: savedReply._id }
        },{new:true});

        return NextResponse.json({
            success: true,
            message: 'Reply Created',
            updatedComment
        });



    } catch (error: any) {
        console.log('error in adding coment reply');
        return NextResponse.json({
            success: true,
            message: error.message
        })
    }

}