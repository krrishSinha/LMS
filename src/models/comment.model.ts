

import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema({
//     user: Object,
//     comment: String,
//     commetReplies: [Object]
// });

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String
    },
    replies: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            reply: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
}, { timestamps: true })


export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);