

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        default: 0,
        required: true
    },
    review: {
        type: String
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    courseCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creatorReply: {
        type: String
    }
})

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema)