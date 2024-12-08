import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    about: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }
});

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);
export default Article;