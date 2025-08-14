
import mongoose from "mongoose";

const layoutSchema = new mongoose.Schema({
    type: {
        type: String
    },
    faqs: [
        {
            question: { type: String },
            answer: { type: String }
        }
    ],
    categories: [
        { type: String }
    ],
    banner: {
        image: {
            public_id: {type: String},
            url : {type: String}
        },
        title: {type: String},
        description: {type: String}
    }
})


export const Layout = mongoose.models.Layout || mongoose.model('Layout', layoutSchema)