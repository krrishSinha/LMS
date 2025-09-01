
import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question: { type: String },
    answer: { type: String },
});

const categorySchema = new mongoose.Schema({
    title: { type: String },
});

const bannerSchema = new mongoose.Schema({
    image: {
        public_id: { type: String },
        url: { type: String }
    },
    title: { type: String },
    description: { type: String },
});

const layoutSchema = new mongoose.Schema({
    type: { type: String },
    faqs: [faqSchema],
    categories: [categorySchema],
    banner: bannerSchema 
})


export const Layout = mongoose.models.Layout || mongoose.model('Layout', layoutSchema)