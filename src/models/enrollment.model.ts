

import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    purchasedAt: {
        type: Date,
        default: Date.now()
    }
});


export const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema)