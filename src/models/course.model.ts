

import mongoose from "mongoose";
import { prerender } from "react-dom/static";


const reviewSchema = new mongoose.Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0
    },
    comment: String
});


const linkSchema = new mongoose.Schema({
    title: String,
    url: String
});

const commentSchema = new mongoose.Schema({
    user: Object,
    comment: String,
    commetReplies: [Object]
});


const courseDataSchema = new mongoose.Schema({
    title: String,
    description: String,
    videoUrl: String,
    videoThumbnail: String,
    videoSection: String,
    videoLength: Number,
    videoPlayer: String,
    links: [linkSchema],
    suggestion: String,
    questions: [commentSchema],
});


const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    estimatedPrice: {
        type: String,
    },
    thumbnail: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    tags: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    demoUrl: {
        type: String,
        required: true
    },
    benefits: [
        {
            title: String,
        }
    ],
    prerequisites: [
        {
            type: String,
            required: true
        }
    ],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
        type: Number,
        default: 0,
    },
    purchased: {
        type: Number,
        default: 0
    },
});


export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema)