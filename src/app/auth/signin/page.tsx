// app/auth/signin/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BackgroundBeams } from '@/components/ui/background-beams';

export default function SignIn() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if (result?.error) {
                setError('Invalid email or password');
                setIsLoading(false);
                return;
            }

            // Get callback URL from query parameters or default to movies page
            const callbackUrl = searchParams.get('callbackUrl') || '/movies';
            router.push(callbackUrl);
            router.refresh();
        } catch (error) {
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative">
            <BackgroundBeams className="absolute top-0 left-0 w-full h-full opacity-40" />

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-800/20 p-8">
                    <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-200">
                        Welcome Back
                    </h2>

                    {error && (
                        <div className="mb-4 bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    {searchParams.get('registered') && (
                        <div className="mb-4 bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-green-200 text-sm">
                            Registration successful! Please sign in.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-purple-950/20 border border-purple-900/50 focus:border-purple-500/50 text-white placeholder-gray-400 outline-none transition-all"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-purple-950/20 border border-purple-900/50 focus:border-purple-500/50 text-white placeholder-gray-400 outline-none transition-all"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-400">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/auth/signup"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}