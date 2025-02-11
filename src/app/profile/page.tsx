// app/profile/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Film, Settings, LogOut } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/background-beams';

interface WatchlistItem {
    movieId: string;
    title: string;
    status: string;
    addedAt: string;
}

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [status, router]);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await fetch('/api/user/watchlist');
                const data = await response.json();
                setWatchlist(data.watchlist);
            } catch (error) {
                console.error('Error fetching watchlist:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (session?.user) {
            fetchWatchlist();
        }
    }, [session]);

    if (status === 'loading' || !session) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="relative">
                <BackgroundBeams className="absolute top-0 left-0 w-full h-full opacity-40" />

                <div className="relative container mx-auto px-6 py-12">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-purple-900/20 border-2 border-purple-500/30">
                            <img
                                src={session.user.image || '/default-avatar.png'}
                                alt={session.user.name || 'Profile'}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-white mb-2">
                                {session.user.name}
                            </h1>
                            <p className="text-gray-400 mb-4">{session.user.email}</p>

                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-white transition-all">
                                    <Settings className="w-4 h-4" />
                                    Edit Profile
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-white transition-all">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Watchlist Section */}
                    <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-800/20 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Film className="w-6 h-6 text-purple-500" />
                            <h2 className="text-2xl font-semibold text-white">My Watchlist</h2>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-8 text-gray-400">Loading watchlist...</div>
                        ) : watchlist.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">
                                Your watchlist is empty. Start adding movies!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {watchlist.map((item) => (
                                    <div
                                        key={item.movieId}
                                        className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4"
                                    >
                                        <h3 className="text-white font-medium mb-2">{item.title}</h3>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-purple-300">{item.status}</span>
                                            <span className="text-gray-400">
                                                Added {new Date(item.addedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}