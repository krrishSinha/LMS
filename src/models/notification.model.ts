

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        requred: true
    },
    message: {
        type: String,
        requred: true
    },
    status: {
        type: String,
        requred: true,
        default: 'unread'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});


export const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)