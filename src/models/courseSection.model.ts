
import mongoose from "mongoose";

const CourseSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
}, { timestamps: true });


export const Course_Section = mongoose.models.Course_Section || mongoose.model('Course_Section', CourseSectionSchema) 