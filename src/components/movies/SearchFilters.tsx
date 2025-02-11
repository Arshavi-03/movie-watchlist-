// SearchFilters.tsx
'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchFiltersProps {
    onSearch: (query: string) => void;
    onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
    genre: string;
    rating: string;
    year: string;
    sortBy: string;
}

export const SearchFilters = ({ onSearch, onFilterChange }: SearchFiltersProps) => {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        genre: '',
        rating: '',
        year: '',
        sortBy: 'popularity'
    });

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search movies..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-purple-950/20 border border-purple-900/50 focus:border-purple-500/50 text-white placeholder-gray-400 outline-none transition-all duration-300"
                    />
                </div>

                {/* Quick Filters */}
                <div className="flex gap-4">
                    <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        className="px-4 py-3 rounded-lg bg-purple-950/20 border border-purple-900/50 text-white outline-none cursor-pointer hover:border-purple-500/50 transition-all duration-300"
                    >
                        <option value="popularity">Popular</option>
                        <option value="rating">Top Rated</option>
                        <option value="latest">Latest</option>
                    </select>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="p-3 rounded-lg bg-purple-950/20 border border-purple-900/50 text-white hover:border-purple-500/50 transition-all duration-300 flex items-center gap-2"
                    >
                        <SlidersHorizontal className="h-5 w-5" />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
                <div className="p-6 rounded-lg bg-purple-950/20 border border-purple-900/50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
                        <button
                            onClick={() => setShowFilters(false)}
                            className="p-2 rounded-full hover:bg-purple-600/20 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <select
                            value={filters.genre}
                            onChange={(e) => handleFilterChange('genre', e.target.value)}
                            className="px-4 py-3 rounded-lg bg-purple-950/20 border border-purple-900/50 text-white outline-none cursor-pointer hover:border-purple-500/50 transition-all duration-300"
                        >
                            <option value="">All Genres</option>
                            <option value="action">Action</option>
                            <option value="drama">Drama</option>
                            <option value="comedy">Comedy</option>
                            <option value="scifi">Sci-Fi</option>
                            <option value="horror">Horror</option>
                            <option value="thriller">Thriller</option>
                            <option value="romance">Romance</option>
                        </select>

                        <select
                            value={filters.rating}
                            onChange={(e) => handleFilterChange('rating', e.target.value)}
                            className="px-4 py-3 rounded-lg bg-purple-950/20 border border-purple-900/50 text-white outline-none cursor-pointer hover:border-purple-500/50 transition-all duration-300"
                        >
                            <option value="">All Ratings</option>
                            <option value="9">9+ ⭐</option>
                            <option value="8">8+ ⭐</option>
                            <option value="7">7+ ⭐</option>
                            <option value="6">6+ ⭐</option>
                        </select>

                        <select
                            value={filters.year}
                            onChange={(e) => handleFilterChange('year', e.target.value)}
                            className="px-4 py-3 rounded-lg bg-purple-950/20 border border-purple-900/50 text-white outline-none cursor-pointer hover:border-purple-500/50 transition-all duration-300"
                        >
                            <option value="">All Years</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="older">Earlier</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};