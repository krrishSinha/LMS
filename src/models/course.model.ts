

import mongoose from "mongoose";



const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, default: 0, required: true },
    review: { type: String },
    reply: { type: String }
});


const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: { type: String },
    replies: [Object]
});

const linkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
});

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    links: [linkSchema],
    videoThumbnail: { type: Object },
    videoLength: { type: Number },
    videoPlayer: { type: String, },
    suggestions: { type: String, },
    comments: [commentSchema],
});

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videos: [videoSchema],
});


const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    estimatedPrice: { type: String, },
    categories: { type: String },
    thumbnail: {
        public_id: { type: String, },
        url: { type: String, }
    },
    tags: { type: String, required: true },
    level: { type: String, required: true },
    demoUrl: { type: String, required: true },
    benefits: [{ title: String, }],
    prerequisites: [{ title: String, }],
    reviews: [reviewSchema],
    sections: [sectionSchema],
    ratings: { type: Number, default: 0, },
    purchased: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now, },
    updatedAt: { type: Date, default: Date.now, }
});


export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema)