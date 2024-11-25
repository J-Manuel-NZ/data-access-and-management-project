import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: false,
        default: Date.now,
    },
});

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);
export default Article;