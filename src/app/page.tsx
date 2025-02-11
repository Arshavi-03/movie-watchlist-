'use client';

import Link from 'next/link';
import { Play, Star, Film, Users, TrendingUp } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/background-beams';

const features = [
  {
    icon: Film,
    title: 'Curate Your Collection',
    description: 'Build your personalized movie collection with our intelligent tracking system.'
  },
  {
    icon: Star,
    title: 'Rate & Discover',
    description: 'Share your insights and discover hidden gems through personalized recommendations.'
  },
  {
    icon: Users,
    title: 'Connect & Share',
    description: 'Join an exclusive community of cinephiles and share your passion for cinema.'
  }
];

const trendingMovies = [
  {
    title: 'Dune: Part Two',
    image: '/movies/dune2.jpg',
    rating: '9.2',
    genre: 'Sci-Fi'
  },
  {
    title: 'Oppenheimer',
    image: '/movies/oppenheimer.jpg',
    rating: '9.0',
    genre: 'Drama'
  },
  {
    title: 'Poor Things',
    image: '/movies/poor-things.jpg',
    rating: '8.8',
    genre: 'Fantasy'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-10">
              <h1 className="text-7xl md:text-8xl font-bold relative animate-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#964dff,45%,#ffffff,55%,#964dff)] bg-[length:200%_100%]">
                Your Personal
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500">
                  Movie Journey
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Step into a world of cinematic excellence. Track, discover, and share your
                movie experiences in a beautifully curated space.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Link
                  href="/movies"
                  className="group relative inline-flex items-center justify-center px-8 py-4 
                           overflow-hidden rounded-lg bg-purple-600 transition-all duration-500"
                >
                  <div className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 
                              bg-purple-800" />
                  <div className="relative flex items-center gap-2 text-white text-lg font-medium">
                    <Play className="h-5 w-5" />
                    <span>Get Started</span>
                  </div>
                  <div className="absolute inset-0 rounded-lg opacity-30 bg-gradient-to-r from-purple-600 via-transparent to-transparent" />
                </Link>

                <Link
                  href="/auth/signin"
                  className="relative inline-flex items-center justify-center px-8 py-4 
                           rounded-lg overflow-hidden group bg-transparent"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 
                              rounded-lg backdrop-blur-xl" />
                  <div className="relative text-white text-lg font-medium">
                    Sign In
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Animated line effects */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent 
                     animate-glow-line-horizontal" />
      </section>

      {/* Features Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl backdrop-blur-sm 
                         bg-gradient-to-b from-purple-900/10 to-black/10 
                         border border-purple-900/20 hover:border-purple-700/50 
                         transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <feature.icon className="h-12 w-12 text-purple-500 mb-4 relative" />
                <h3 className="text-xl font-semibold text-white mb-3 relative">{feature.title}</h3>
                <p className="text-gray-400 relative">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-black/50" />
        <div className="container mx-auto px-6 relative">
          <div className="flex items-center mb-12">
            <TrendingUp className="h-8 w-8 text-purple-500 mr-3" />
            <h2 className="text-4xl font-bold bg-clip-text text-transparent 
                        bg-gradient-to-r from-white to-purple-300">
              Trending Now
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingMovies.map((movie) => (
              <div
                key={movie.title}
                className="group relative rounded-xl overflow-hidden bg-gradient-to-b 
                         from-purple-950/30 to-black/80 backdrop-blur-sm 
                         border border-purple-900/20"
              >
                <div className="aspect-[2/3] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 
                           transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 
                               group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-purple-500/20 
                                 border border-purple-500/30 rounded-full text-sm 
                                 text-purple-300 mb-2">
                      {movie.genre}
                    </span>
                    <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 mr-1" />
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <BackgroundBeams className="absolute top-0 left-0 w-full h-full opacity-40" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent 
                        bg-gradient-to-r from-purple-400 to-fuchsia-400">
              Begin Your Cinematic Adventure
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join a community of passionate film enthusiasts and start your journey today.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg 
                       bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white 
                       hover:from-purple-500 hover:to-fuchsia-500 transform hover:-translate-y-1 
                       transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Create Your Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}