// src/types/movie.types.ts
export interface Movie {
    id: string;
    title: string;
    image: string;
    rating: string;
    genre: string;
    runtime?: string;
    year: string;
    description: string;
    director?: string;
    cast?: string[];
    releaseDate?: string;
    language?: string;
    trailerUrl?: string;
    status?: 'upcoming' | 'released' | 'archived';
}

export interface MovieFilter {
    genre?: string;
    year?: string;
    rating?: string;
    sortBy?: 'popularity' | 'rating' | 'latest';
    language?: string;
    status?: 'upcoming' | 'released' | 'archived';
}

export interface MovieStats {
    totalMovies: number;
    averageRating: number;
    mostPopularGenre: string;
    recentlyAdded: number;
}

export interface WatchlistItem extends Movie {
    addedAt: string;
    watchStatus: 'plan_to_watch' | 'watching' | 'completed' | 'on_hold' | 'dropped';
    userRating?: number;
    userNotes?: string;
}
