import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
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
    runtime: String,
    director: String,
    cast: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);

export default Movie;