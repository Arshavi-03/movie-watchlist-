export interface UserProfile {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    watchlist: WatchlistItem[];
    favorites: string[]; // Movie IDs
    preferences: {
        favoriteGenres: string[];
        emailNotifications: boolean;
        theme: 'light' | 'dark' | 'system';
    };
}