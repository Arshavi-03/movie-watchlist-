'use client';

import { useState, useEffect } from 'react';
import { Film, Popcorn, Sparkles, AlertCircle, Loader2, Search, Star, Calendar, TrendingUp } from 'lucide-react';
import { MovieCard } from '../../components/movies/MovieCard';
import { MovieGrid } from '../../components/movies/MovieGrid';
import SearchFilters from '../../components/movies/SearchFilters';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { useToast } from '../../components/ui/use-toast';
import type { Movie, MovieFilter } from '../../types/movie.types';

export default function MoviesPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentFilters, setCurrentFilters] = useState({
        genre: '',
        year: '',
        rating: '',
        sortBy: 'popularity'
    });

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('/api/movies');
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                setMovies(data.movies);
                setFilteredMovies(data.movies);
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

    const getFeaturedMovies = () => {
        return [...movies]
            .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
            .slice(0, 4);
    };

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

        if (query) {
            const searchLower = query.toLowerCase();
            filtered = filtered.filter(movie =>
                movie.title.toLowerCase().includes(searchLower) ||
                movie.description.toLowerCase().includes(searchLower) ||
                movie.genre.toLowerCase().includes(searchLower) ||
                (movie.director && movie.director.toLowerCase().includes(searchLower)) ||
                (movie.cast && movie.cast.some(actor => 
                    actor.toLowerCase().includes(searchLower)
                ))
            );
        }

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

        switch (filters.sortBy) {
            case 'rating':
                filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                break;
            case 'latest':
                filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
                break;
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        setFilteredMovies(filtered);
    };

    const handleAddToWatchlist = async (movie: Movie) => {
        try {
            await fetch('/api/watchlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movieId: movie._id }),
            });

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
            <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                       <Loader2 className="h-12 w-12 text-purple-500 animate-spin" />
                        <div className="absolute inset-0 blur-xl bg-purple-500/20 animate-pulse" />
                    </div>
                    <p className="text-gray-400 font-medium text-lg animate-pulse">Loading your cinematic journey...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black flex items-center justify-center p-4">
                <Alert variant="destructive" className="max-w-xl backdrop-blur-xl bg-red-950/50 border-red-500/50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    const featuredMovies = getFeaturedMovies();

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
            <div className="relative">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-purple-500/20 via-transparent to-transparent animate-slow-spin" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-90" />
                </div>

                <div className="relative">
                    {/* Hero Section */}
                    <div className="relative h-96 overflow-hidden mb-12">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
                        <div 
                            className="absolute inset-0 bg-cover bg-center animate-slow-pan"
                            style={{
                                backgroundImage: `url('/movie-collage.jpg')`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover'
                            }}
                        />
                        <div className="relative container mx-auto px-6 h-full flex items-center">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <Film className="h-12 w-12 text-purple-500" />
                                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-purple-500">
                                        Cinematic Universe
                                    </h1>
                                </div>
                                <p className="text-xl text-gray-300 mb-8">Discover your next favorite movie in our carefully curated collection</p>
                                <div className="flex items-center gap-6 text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Popcorn className="h-5 w-5 text-purple-500" />
                                        <span>{filteredMovies.length} Movies</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 text-yellow-500" />
                                        <span>Top Rated</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-green-500" />
                                        <span>Trending</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-6">
                        {/* Search and Filters */}
                        <div className="mb-16">
                            <div className="backdrop-blur-xl bg-black/30 rounded-2xl border border-purple-500/20 p-6 shadow-2xl">
                                <SearchFilters
                                    onSearch={handleSearch}
                                    onFilterChange={handleFilterChange}
                                    genres={[...new Set(movies.map(movie => movie.genre))]}
                                    years={[...new Set(movies.map(movie => movie.year))]}
                                />
                            </div>
                        </div>

                        {/* Featured Section */}
                        {featuredMovies.length > 0 && (
                            <div className="mb-20">
                                <div className="flex items-center gap-3 mb-8">
                                    <Sparkles className="h-8 w-8 text-purple-500" />
                                    <h2 className="text-3xl font-bold text-white">Featured Films</h2>
                                </div>

                                <div className="relative rounded-3xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-black/30 backdrop-blur-sm" />
                                    <div className="relative p-8">
                                        <MovieGrid>
                                            {featuredMovies.map((movie) => (
                                                <MovieCard
                                                    key={movie._id}
                                                    movie={movie}
                                                    onAddToWatchlist={handleAddToWatchlist}
                                                    featured
                                                />
                                            ))}
                                        </MovieGrid>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* All Movies Section */}
                        <div className="mb-20">
                            <h2 className="text-3xl font-bold text-white mb-8">Explore All Movies</h2>
                            {filteredMovies.length > 0 ? (
                                <MovieGrid>
                                    {filteredMovies.map((movie) => (
                                        <MovieCard
                                            key={movie._id}
                                            movie={movie}
                                            onAddToWatchlist={handleAddToWatchlist}
                                        />
                                    ))}
                                </MovieGrid>
                            ) : (
                                <div className="text-center py-20 backdrop-blur-xl bg-black/30 rounded-3xl border border-purple-500/20">
                                    <Search className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                                    <p className="text-gray-400 text-lg">No movies found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}