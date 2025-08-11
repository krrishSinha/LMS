
import mongoose from "mongoose";


const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    videoLength: {
        type: Number
    },
    videoPlayer: {
        type: String,
    },
    links: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link'
    },
    suggestions: {
        type: String,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    sectionId: {
        type: String
    }
}, { timestamps: true });


export const Video = mongoose.models.Video || mongoose.model('Video', videoSchema)


