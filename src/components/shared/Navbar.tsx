'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Film, User, LogOut, Menu, X } from 'lucide-react';

export function Navbar() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-900/20">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Film className="h-6 w-6 text-purple-500" />
                        <span className="text-xl font-bold text-white">MovieWatch</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/movies"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Movies
                        </Link>
                        <Link
                            href="/watchlist"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Watchlist
                        </Link>

                        {session ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/profile"
                                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    <User className="h-5 w-5" />
                                    <span>{session.user?.name}</span>
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/auth/signin"
                                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-300 hover:text-white"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/movies"
                                className="text-gray-300 hover:text-white transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Movies
                            </Link>
                            <Link
                                href="/watchlist"
                                className="text-gray-300 hover:text-white transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Watchlist
                            </Link>

                            {session ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className="text-gray-300 hover:text-white transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-gray-300 hover:text-white transition-colors text-left"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/auth/signin"
                                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors inline-block"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}