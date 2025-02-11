'use client';

import { useState, useEffect } from 'react';
import { Film, Popcorn, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { MovieCard} from '@/components/movies/MovieCard';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { SearchFilters } from '@/components/movies/SearchFilters';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import type { Movie, MovieFilter } from '@/types/movie.types';
//import type { ApiResponse } from '@/types/api.types';

// Sample data - Replace with your API calls
const SAMPLE_MOVIES: Movie[] = [
    {
        id: '1',
        title: 'Dune: Part Two',
        image: '/movies/dune2.jpg',
        rating: '9.2',
        genre: 'Sci-Fi',
        runtime: '166m',
        year: '2024',
        description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
        director: 'Denis Villeneuve',
        cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson']
    },
    {
        id: '2',
        title: 'Oppenheimer',
        image: '/movies/oppenheimer.jpg',
        rating: '9.0',
        genre: 'Drama',
        runtime: '180m',
        year: '2023',
        description: 'The story of J. Robert Oppenheimer&poss role in the development of the atomic bomb during World War II.',
    director: 'Christopher Nolan',
        cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon']
    },
    {
        id: '3',
        title: 'Poor Things',
        image: '/movies/poor-things.jpg',
        rating: '8.8',
        genre: 'Fantasy',
        runtime: '141m',
        year: '2023',
        description: 'The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.',
        director: 'Yorgos Lanthimos',
        cast: ['Emma Stone', 'Mark Ruffalo', 'Willem Dafoe']
    }
];

const FEATURED_MOVIES = SAMPLE_MOVIES.slice(0, 4);

export default function MoviesPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentFilters, setCurrentFilters] = useState<MovieFilter>({
        genre: '',
        year: '',
        rating: '',
        sortBy: 'popularity'
    });

    // Simulate API call to fetch movies
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Replace with actual API call
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate loading
                setMovies(SAMPLE_MOVIES);
                setFilteredMovies(SAMPLE_MOVIES);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch movies. Please try again later.');
                setLoading(false);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load movies. Please try again.",
                });
            }
        };

        fetchMovies();
    }, []);

    // Handle search and filtering
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applyFilters(query, currentFilters);
    };

    const handleFilterChange = (filters: MovieFilter) => {
        setCurrentFilters(filters);
        applyFilters(searchQuery, filters);
    };

    const applyFilters = (query: string, filters: MovieFilter) => {
        let filtered = [...movies];

        // Apply search
        if (query) {
            const searchLower = query.toLowerCase();
            filtered = filtered.filter(movie =>
                movie.title.toLowerCase().includes(searchLower) ||
                movie.description.toLowerCase().includes(searchLower) ||
                movie.genre.toLowerCase().includes(searchLower)
            );
        }

        // Apply filters
        if (filters.genre) {
            filtered = filtered.filter(movie =>
                movie.genre.toLowerCase() === filters.genre?.toLowerCase()
            );
        }
        if (filters.year) {
            filtered = filtered.filter(movie => movie.year === filters.year);
        }
        if (filters.rating) {
            filtered = filtered.filter(movie =>
                parseFloat(movie.rating) >= parseFloat(filters.rating || '0')
            );
        }

        // Apply sorting
        switch (filters.sortBy) {
            case 'rating':
                filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                break;
            case 'latest':
                filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
                break;
            // Add more sorting options as needed
        }

        setFilteredMovies(filtered);
    };

    // Handle adding to watchlist
    const handleAddToWatchlist = async (movie: Movie) => {
        try {
            // Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 500));

            toast({
                title: "Added to Watchlist",
                description: `${movie.title} has been added to your watchlist.`,
                duration: 3000,
            });
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to add movie to watchlist. Please try again.",
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
                    <p className="text-gray-400">Loading amazing movies for you...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <Alert variant="destructive" className="max-w-xl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="relative">
                <BackgroundBeams className="absolute top-0 left-0 w-full h-full opacity-40" />

                <div className="relative container mx-auto px-6 py-12">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-4">
                            <Film className="h-10 w-10 text-purple-500" />
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                                Discover Movies
                            </h1>
                        </div>

                        <div className="flex items-center gap-3 text-gray-400">
                            <Popcorn className="h-5 w-5" />
                            <span>{filteredMovies.length} movies available</span>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-12">
                        <SearchFilters
                            onSearch={handleSearch}
                            onFilterChange={handleFilterChange}
                        />
                    </div>

                    {/* Featured Section */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <Sparkles className="h-6 w-6 text-purple-500" />
                            <h2 className="text-2xl font-semibold text-white">Featured Movies</h2>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900/20 to-black/20 border border-purple-900/20 p-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent" />
                            <MovieGrid>
                                {FEATURED_MOVIES.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        onAddToWatchlist={handleAddToWatchlist}
                                    />
                                ))}
                            </MovieGrid>
                        </div>
                    </div>

                    {/* All Movies Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-8">All Movies</h2>
                        {filteredMovies.length > 0 ? (
                            <MovieGrid>
                                {filteredMovies.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        onAddToWatchlist={handleAddToWatchlist}
                                    />
                                ))}
                            </MovieGrid>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-400">No movies found matching your criteria.</p>
                            </div>
                        )}
                    </div>

                    {/* Load More Button */}
                    {filteredMovies.length > 0 && (
                        <div className="flex justify-center mt-12">
                            <button className="px-8 py-4 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 
                               border border-purple-500/30 hover:border-purple-500/50 
                               text-white font-medium transition-all duration-300">
                                Load More Movies
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}