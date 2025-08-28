

import mongoose from "mongoose";

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
    categories: {
        type: String,
        // required: true,
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
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    sections: [
        {
            title: {
                type: String,
            },
            videos: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Video'
                }
            ]
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});


export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema)