// models/Movie.ts
import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    runtime: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    cast: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    __v: {
        type: Number,
        default: 0
    }
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);