
import mongoose from "mongoose";

const CourseSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
}, { timestamps: true });


export const Course_Section = mongoose.models.Course_Section || mongoose.model('Course_Section', CourseSectionSchema) 