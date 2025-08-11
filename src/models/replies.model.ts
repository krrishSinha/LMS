

import mongoose, { mongo } from "mongoose";

const replySchema = new mongoose.Schema({
    reply: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },

}, { timestamps: true })


export const Reply = mongoose.models.Reply || mongoose.model('Reply', replySchema);

