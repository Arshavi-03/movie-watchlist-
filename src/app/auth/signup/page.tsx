"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Film, Clapperboard, Eye, EyeOff, Loader2, Star, Ticket, Camera, ChevronRight } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [Camera, Film, Clapperboard, Ticket, Star];
  return icons.map((Icon, index) => (
    <div
      key={index}
      className={`absolute opacity-20 transform
        ${index % 2 === 0 ? 'animate-float-slow' : 'animate-float-slower'}
        ${index === 0 ? 'top-20 left-20' : 
          index === 1 ? 'top-40 right-24' : 
          index === 2 ? 'bottom-32 left-32' :
          index === 3 ? 'bottom-20 right-20' :
          'top-1/2 left-1/2'}`}
    >
      <Icon className="w-12 h-12 text-purple-400" />
    </div>
  ));
};

export default function SignUp() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');
            router.push('/auth/signin?registered=true');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black/95 flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(76,29,149,0.2),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(129,140,248,0.2),transparent_50%)]" />
                <div className="absolute inset-0 bg-grid-pattern bg-grid animate-grid-flow opacity-10" />
            </div>
            
            {/* Floating Icons */}
            <FloatingIcons />
            
            {/* Content Container */}
            <div className="relative z-10 w-full max-w-xl px-6 py-10">
                <div className="backdrop-blur-xl bg-black/40 rounded-3xl border border-purple-500/20 p-8 shadow-2xl shadow-purple-500/10">
                    {/* Animated Logo Section */}
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="relative mb-3">
                            <Clapperboard className="w-12 h-12 text-purple-400 animate-pulse" />
                            <div className="absolute inset-0 animate-ping opacity-20">
                                <Clapperboard className="w-12 h-12 text-purple-400" />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-200">
                            Join CineStream
                        </h2>
                        <p className="mt-2 text-gray-400 text-sm">Start your cinematic journey today</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-500/10 backdrop-blur-sm border border-red-500/50 rounded-xl p-4 text-red-200 text-sm animate-shake">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="group relative">
                            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                                <span>Full Name</span>
                                <div className="h-px flex-1 bg-purple-500/20 group-focus-within:bg-purple-500/50 transition-colors" />
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 mt-2 rounded-xl bg-purple-950/20 border-2 border-purple-900/50 focus:border-purple-500/50 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500/20"
                                placeholder="Enter your name"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>

                        {/* Email Input */}
                        <div className="group relative">
                            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                                <span>Email</span>
                                <div className="h-px flex-1 bg-purple-500/20 group-focus-within:bg-purple-500/50 transition-colors" />
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 mt-2 rounded-xl bg-purple-950/20 border-2 border-purple-900/50 focus:border-purple-500/50 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500/20"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="group relative">
                            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                                <span>Password</span>
                                <div className="h-px flex-1 bg-purple-500/20 group-focus-within:bg-purple-500/50 transition-colors" />
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 mt-2 rounded-xl bg-purple-950/20 border-2 border-purple-900/50 focus:border-purple-500/50 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 pr-12"
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="group relative">
                            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                                <span>Confirm Password</span>
                                <div className="h-px flex-1 bg-purple-500/20 group-focus-within:bg-purple-500/50 transition-colors" />
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 mt-2 rounded-xl bg-purple-950/20 border-2 border-purple-900/50 focus:border-purple-500/50 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 pr-12"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex items-center justify-center space-x-2">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Creating your account...</span>
                                    </>
                                ) : (
                                    <>
                                        <Ticket className="w-5 h-5" />
                                        <span>Start Your Journey</span>
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <Link
                                href="/auth/signin"
                                className="text-purple-400 hover:text-purple-300 transition-colors relative group"
                            >
                                Sign In
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                            </Link>
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                            Your premium entertainment experience awaits
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}