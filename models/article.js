import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    type: {
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
    born: {
        type: String,
        required: false,
    },
    died: {
        type: String,
        required: false,
    },
    nationality: {
        type: String,
        required: false,
    },
    knownFor: {
        type: String,
        required: false,
    },
    notableWorks: {
        type: String,
        required: false,
    },
    year: {
        type: String,
        required: false,
    },
    medium: {
        type: String,
        required: false,
    },
    dimensions: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    designedBy: {
        type: String,
        required: false,
    },
    developer: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    }
});

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);
export default Article;