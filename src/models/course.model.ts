

import mongoose from "mongoose";


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
        },
        url: {
            type: String,
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
            title: String,
        }
    ],
    reviews: [reviewSchema],
    sections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course_Section'
        }
    ],
    ratings: {
        type: Number,
        default: 0,
    },
    purchased: {
        type: Number,
        default: 0
    },
}, { timestamps: true });


export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema)