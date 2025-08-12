

import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    purchasedAt: {
        type: Date,
        default: Date.now()
    },
    payment_info: {
        type: Object
    }
});


export const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema)