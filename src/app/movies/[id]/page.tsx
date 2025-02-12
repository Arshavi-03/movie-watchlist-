// app/movies/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Clock, Star, CalendarDays, Film, Users, Award, ChevronLeft, Plus, Check, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/use-toast';
import { Skeleton } from '../../../components/ui/skeleton';
import { Badge } from '../../../components/ui/badge';
import type { Movie } from '../../../types/movie.types';

export default function MovieDetailsPage() {
    const { data: session } = useSession();
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/movies/${params.id}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                
                const data = await response.json();
                setMovie(data.movie);
            } catch (error) {
                console.error('Error fetching movie:', error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load movie details. Please try again.",
                });
            } finally {
                setLoading(false);
            }
        };

        const checkWatchlistStatus = async () => {
            if (!session) return;
            
            try {
                const response = await fetch(`/api/watchlist/check/${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setIsInWatchlist(data.isInWatchlist);
                }
            } catch (error) {
                console.error('Error checking watchlist status:', error);
            }
        };

        if (params.id) {
            fetchMovie();
            checkWatchlistStatus();
        }
    }, [params.id, session, toast]);

    const handleWatchlistAction = async () => {
        if (!movie?._id || isUpdating || !session) {
            if (!session) {
                router.push('/auth/signin');
                return;
            }
            return;
        }

        try {
            setIsUpdating(true);
            
            if (isInWatchlist) {
                // Remove from watchlist
                const response = await fetch(`/api/watchlist/${movie._id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to remove from watchlist');
                }

                setIsInWatchlist(false);
                toast({
                    title: "Success",
                    description: `${movie.title} has been removed from your watchlist.`,
                    duration: 3000,
                });
            } else {
                // Add to watchlist
                const response = await fetch('/api/watchlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        movieId: movie._id,
                        status: 'plan_to_watch'  // Default status when adding
                    }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to add to watchlist');
                }

                setIsInWatchlist(true);
                toast({
                    title: "Success",
                    description: `${movie.title} has been added to your watchlist.`,
                    duration: 3000,
                });
            }
        } catch (error: any) {
            console.error('Watchlist action error:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Failed to update watchlist. Please try again.",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleStatusChange = async (newStatus: string) => {
        if (!movie?._id || isUpdating || !session) return;

        try {
            setIsUpdating(true);
            const response = await fetch('/api/watchlist/status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: movie._id,
                    status: newStatus
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update status');
            }

            toast({
                title: "Success",
                description: "Watch status updated successfully.",
                duration: 3000,
            });
        } catch (error: any) {
            console.error('Status update error:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Failed to update status. Please try again.",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                        <Skeleton className="w-full md:w-1/3 aspect-[2/3] rounded-2xl" />
                        <div className="flex-1 space-y-4">
                            <Skeleton className="h-12 w-3/4" />
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-32 w-full" />
                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!movie) return null;

    const WatchlistButton = ({ className = "", size = "default" }) => (
        <Button
            className={`gap-2 ${isInWatchlist ? 'bg-green-600 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'} ${className}`}
            onClick={handleWatchlistAction}
            disabled={isUpdating}
            size={size}
        >
            {isUpdating ? (
                <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    {isInWatchlist ? 'Removing...' : 'Adding...'}
                </span>
            ) : isInWatchlist ? (
                <>
                    <Check className="w-4 h-4" />
                    In Watchlist
                </>
            ) : (
                <>
                    <Plus className="w-4 h-4" />
                    Add to Watchlist
                </>
            )}
        </Button>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
            {/* Hero Section with Backdrop */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <div className="relative w-full h-full">
                        <Image
                            src={movie.image}
                            alt={movie.title}
                            fill
                            className="object-cover blur-sm"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                {/* Back Button */}
                <div className="absolute top-6 left-6 z-10">
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => router.back()}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Movies
                    </Button>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative -mt-48 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Movie Poster */}
                        <div className="w-full md:w-1/3 lg:w-1/4">
                            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                                <Image
                                    src={movie.image}
                                    alt={movie.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Add to Watchlist Button (Mobile) */}
                            <div className="mt-4 md:hidden">
                                <WatchlistButton className="w-full" />
                            </div>
                        </div>

                        {/* Movie Details */}
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                {movie.title}
                            </h1>

                            {/* Quick Info */}
                            <div className="flex flex-wrap gap-4 mb-6">
                                <Badge variant="secondary" className="text-lg px-4 py-1">
                                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                                    {movie.rating}
                                </Badge>
                                <Badge variant="outline" className="text-lg px-4 py-1">
                                    <CalendarDays className="w-5 h-5 mr-1" />
                                    {movie.year}
                                </Badge>
                                <Badge variant="outline" className="text-lg px-4 py-1">
                                    <Clock className="w-5 h-5 mr-1" />
                                    {movie.runtime}
                                </Badge>
                                <Badge variant="outline" className="text-lg px-4 py-1">
                                    <Film className="w-5 h-5 mr-1" />
                                    {movie.genre}
                                </Badge>
                            </div>

                            {/* Description */}
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                {movie.description}
                            </p>

                            {/* Director & Cast */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-2">
                                    <Award className="w-5 h-5 text-purple-500" />
                                    <span className="text-gray-400">Director:</span>
                                    <span className="text-white">{movie.director}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Users className="w-5 h-5 text-purple-500" />
                                    <span className="text-gray-400">Cast:</span>
                                    <div className="flex-1 flex flex-wrap gap-2">
                                        {movie.cast.map((actor, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="text-sm"
                                            >
                                                {actor}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="hidden md:flex gap-4">
                                <WatchlistButton size="lg" />
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-purple-500/20 hover:bg-purple-500/10"
                                    onClick={() => router.back()}
                                >
                                    Back to Movies
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}