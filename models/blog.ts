import mongoose, { models } from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        default: "Apex Horizon Team"
    },
    coverImage: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    readTime: {
        type: String,
        required: true,
        default: "5 min read"
    },
    published: {
        type: Boolean,
        default: true
    },
    publishedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default models.Blog || mongoose.model('Blog', blogSchema);
