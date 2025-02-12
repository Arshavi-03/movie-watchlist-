"use client";
import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Play, Film, Star, ChevronRight, Eye, EyeOff, Loader2, Camera, Clapperboard, Trophy } from 'lucide-react';

const SpotlightButton = ({ children, ...props }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const updateSpotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <button
      onMouseMove={updateSpotlight}
      className="group relative w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.1), transparent 40%)`,
        }}
      />
      {children}
    </button>
  );
};

const FloatingIcons = () => {
  const icons = [Camera, Film, Clapperboard, Trophy, Star];
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

export default function SignIn() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [formTouched, setFormTouched] = useState(false);

    const isFormValid = email && password;

    useEffect(() => {
        if (email || password) setFormTouched(true);
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

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

            const callbackUrl = searchParams.get('callbackUrl') || '/movies';
            router.push(callbackUrl);
            router.refresh();
        } catch (error) {
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black/95 flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(76,29,149,0.2),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(129,140,248,0.2),transparent_50%)]" />
            
            {/* Floating Icons */}
            <FloatingIcons />
            
            {/* Animated Grid Lines */}
            <div className="absolute inset-0" style={{ opacity: 0.1 }}>
                <div className="absolute left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-pulse" />
                <div className="absolute left-2/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-pulse delay-75" />
                <div className="absolute left-3/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-pulse delay-150" />
                <div className="absolute top-1/4 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse delay-200" />
                <div className="absolute top-2/4 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse delay-300" />
                <div className="absolute top-3/4 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse delay-500" />
            </div>

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="backdrop-blur-xl bg-black/40 rounded-3xl border border-purple-500/20 p-8 shadow-2xl shadow-purple-500/10">
                    {/* Animated Logo Section */}
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="relative">
                            <Film className="w-12 h-12 text-purple-400 animate-pulse" />
                            <div className="absolute inset-0 animate-ping opacity-20">
                                <Film className="w-12 h-12 text-purple-400" />
                            </div>
                        </div>
                        <h2 className="mt-4 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-200">
                            CineStream
                        </h2>
                        <p className="mt-2 text-gray-400 text-sm">Your Premium Entertainment Hub</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-500/10 backdrop-blur-sm border border-red-500/50 rounded-xl p-4 text-red-200 text-sm animate-shake">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    {searchParams.get('registered') && (
                        <div className="mb-6 bg-green-500/10 backdrop-blur-sm border border-green-500/50 rounded-xl p-4 text-green-200 text-sm">
                            <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-green-400 animate-spin-slow" />
                                <span>Welcome aboard! Your premium experience awaits.</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 group">
                            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                                <span>Email</span>
                                <div className={`h-px flex-1 transition-colors duration-300
                                    ${focusedField === 'email' ? 'bg-purple-500' : 'bg-purple-500/20'}`} />
                            </label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-purple-950/20 border-2 border-purple-900/50 focus:border-purple-500/50 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500/20"
                                    placeholder="Enter your email"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                                <span>Password</span>
                                <div className={`h-px flex-1 transition-colors duration-300
                                    ${focusedField === 'password' ? 'bg-purple-500' : 'bg-purple-500/20'}`} />
                            </label>
                            <div className="relative group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-purple-950/20 border-2 border-purple-900/50 focus:border-purple-500/50 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 pr-12"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                        </div>

                        <SpotlightButton
                            type="submit"
                            disabled={isLoading || (!isFormValid && formTouched)}
                        >
                            <div className="relative flex items-center justify-center space-x-2">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Please wait...</span>
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-5 h-5" />
                                        <span>Start Your Journey</span>
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </SpotlightButton>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/auth/signup"
                                className="text-purple-400 hover:text-purple-300 transition-colors relative group"
                            >
                                Join Now
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                            </Link>
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                            Premium content awaits. Sign in to continue your journey.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}