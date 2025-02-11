// MovieCard.tsx
'use client';

import { useState } from 'react';
import { Star, Clock, Plus, Info, X } from 'lucide-react';
import type { Movie } from '../../types/movie.types';

interface MovieCardProps {
    movie: Movie;
    onAddToWatchlist?: (movie: Movie) => void;
}

export const MovieCard = ({ movie, onAddToWatchlist }: MovieCardProps) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="group relative rounded-xl overflow-hidden bg-gradient-to-b from-purple-950/30 to-black/80 backdrop-blur-sm border border-purple-900/20 hover:border-purple-700/50 transition-all duration-500">
            <div className="aspect-[2/3] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <button
                        onClick={() => setShowDetails(true)}
                        className="p-2 rounded-full bg-black/50 hover:bg-purple-600/50 border border-purple-500/30 transition-all duration-300"
                    >
                        <Info className="h-5 w-5 text-white" />
                    </button>
                    <button
                        onClick={() => onAddToWatchlist?.(movie)}
                        className="p-2 rounded-full bg-black/50 hover:bg-purple-600/50 border border-purple-500/30 transition-all duration-300"
                    >
                        <Plus className="h-5 w-5 text-white" />
                    </button>
                </div>

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                            {movie.genre}
                        </span>
                        <span className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                            {movie.year}
                        </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-yellow-400">
                            <Star className="h-4 w-4 mr-1" />
                            <span>{movie.rating}</span>
                        </div>
                        {movie.runtime && (
                            <div className="flex items-center text-gray-400">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{movie.runtime}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Movie Details Modal */}
            {showDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowDetails(false)} />
                    <div className="relative bg-gradient-to-b from-purple-950 to-black border border-purple-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowDetails(false)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-purple-600/50 border border-purple-500/30"
                        >
                            <X className="h-5 w-5 text-white" />
                        </button>

                        <div className="p-8">
                            <div className="flex gap-6">
                                <div className="w-1/3">
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-full rounded-lg"
                                    />
                                </div>
                                <div className="w-2/3">
                                    <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                                            {movie.genre}
                                        </span>
                                        <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                                            {movie.year}
                                        </span>
                                        {movie.runtime && (
                                            <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                                                {movie.runtime}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                                        <span className="text-lg font-semibold text-white">{movie.rating}</span>
                                    </div>
                                    <p className="text-gray-300 mb-4">{movie.description}</p>
                                    {movie.director && (
                                        <p className="text-gray-400 mb-2">
                                            <span className="font-semibold">Director:</span> {movie.director}
                                        </p>
                                    )}
                                    {movie.cast && movie.cast.length > 0 && (
                                        <div className="text-gray-400">
                                            <span className="font-semibold">Cast:</span> {movie.cast.join(', ')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
