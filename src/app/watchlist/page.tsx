'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Star, Film, Eye, List, Trash2, Info } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/use-toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import type { Movie } from '../../types/movie.types';

interface WatchlistMovie extends Movie {
    addedAt: string;
    status: 'plan_to_watch' | 'watching' | 'completed' | 'dropped';
}

interface MovieWithStatus extends Movie {
    watchlistStatus: string;
    addedAt: string;
}

const statusLabels = {
    plan_to_watch: 'Plan to Watch',
    watching: 'Watching',
    completed: 'Completed',
    dropped: 'Dropped'
};

export default function WatchlistPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState<MovieWithStatus[]>([]);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                setLoading(true);
                const watchlistResponse = await fetch('/api/watchlist', {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                
                if (!watchlistResponse.ok) {
                    throw new Error('Failed to fetch watchlist');
                }
                
                const watchlistData = await watchlistResponse.json();
                
                if (!watchlistData.watchlist || !Array.isArray(watchlistData.watchlist)) {
                    throw new Error('Invalid watchlist data structure');
                }

                const moviePromises = watchlistData.watchlist.map(async (item: WatchlistMovie) => {
                    try {
                        const movieResponse = await fetch(`/api/movies/${item.movieId}`, {
                            headers: {
                                'Cache-Control': 'no-cache'
                            }
                        });
                        
                        if (!movieResponse.ok) {
                            throw new Error(`Failed to fetch movie ${item.movieId}`);
                        }
                        
                        const movieData = await movieResponse.json();
                        
                        return {
                            ...movieData.movie,
                            watchlistStatus: item.status || 'plan_to_watch',
                            addedAt: item.addedAt,
                        };
                    } catch (error) {
                        console.error(`Error fetching movie ${item.movieId}:`, error);
                        return null;
                    }
                });

                const moviesData = (await Promise.all(moviePromises)).filter(movie => movie !== null);
                setMovies(moviesData);
            } catch (error) {
                console.error('Error in fetchWatchlist:', error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load watchlist. Please try again.",
                });
            } finally {
                setLoading(false);
            }
        };

        if (status === 'authenticated') {
            fetchWatchlist();
        } else if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [status, router, toast]);

    const handleRemoveFromWatchlist = async (movieId: string, movieTitle: string) => {
        try {
            const response = await fetch(`/api/watchlist/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to remove from watchlist');
            }

            setMovies(prevMovies => 
                prevMovies.filter(movie => movie._id !== movieId)
            );

            toast({
                title: "Removed from Watchlist",
                description: `${movieTitle} has been removed from your watchlist.`,
                duration: 3000,
            });
        } catch (error) {
            console.error('Remove from watchlist error:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to remove from watchlist. Please try again.",
            });
        }
    };

    const handleStatusChange = async (movieId: string, newStatus: string) => {
        try {
            const response = await fetch('/api/watchlist/status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify({ movieId, status: newStatus }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update status');
            }

            setMovies(prevMovies =>
                prevMovies.map(movie =>
                    movie._id === movieId
                        ? { ...movie, watchlistStatus: newStatus }
                        : movie
                )
            );

            toast({
                title: "Status Updated",
                description: `Movie status updated to ${statusLabels[newStatus as keyof typeof statusLabels]}.`,
                duration: 3000,
            });
        } catch (error) {
            console.error('Status update error:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update status. Please try again.",
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-400">Loading your watchlist...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <List className="h-8 w-8 text-purple-500" />
                        <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-400 text-sm">
                            {movies.length} {movies.length === 1 ? 'Movie' : 'Movies'}
                        </span>
                    </div>
                </div>

                {movies.length === 0 ? (
                    <div className="text-center py-20 bg-black/30 rounded-xl border border-purple-500/20">
                        <Film className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg mb-4">Your watchlist is empty</p>
                        <Button
                            onClick={() => router.push('/movies')}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            Browse Movies
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {movies.map((movie) => (
                            <div
                                key={movie._id}
                                className="bg-black/30 rounded-xl border border-purple-500/20"
                            >
                                <div className="flex gap-4 p-4">
                                    {/* Movie Poster */}
                                    <div className="relative w-1/3 aspect-[2/3] rounded-lg overflow-hidden">
                                        <Image
                                            src={movie.image}
                                            alt={movie.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Movie Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-semibold text-white mb-2">
                                                {movie.title}
                                            </h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-400 hover:text-red-500"
                                                onClick={() => handleRemoveFromWatchlist(movie._id, movie.title)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <Badge variant="secondary" className="text-sm">
                                                <Star className="w-3 h-3 text-yellow-500 mr-1" />
                                                {movie.rating}
                                            </Badge>
                                            <Badge variant="outline" className="text-sm">
                                                {movie.year}
                                            </Badge>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-400">
                                                Added {new Date(movie.addedAt).toLocaleDateString()}
                                            </p>
                                            
                                            <Select
                                                value={movie.watchlistStatus}
                                                onValueChange={(value) => handleStatusChange(movie._id, value)}
                                            >
                                                <SelectTrigger className="w-full bg-purple-950/20">
                                                    <SelectValue placeholder="Select status">
                                                        {statusLabels[movie.watchlistStatus as keyof typeof statusLabels]}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(statusLabels).map(([value, label]) => (
                                                        <SelectItem key={value} value={value}>
                                                            {label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <Button
                                                variant="outline"
                                                className="w-full mt-2 border-purple-500/20"
                                                onClick={() => router.push(`/movies/${movie._id}`)}
                                            >
                                                <Eye className="w-4 h-4 mr-2" />
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}