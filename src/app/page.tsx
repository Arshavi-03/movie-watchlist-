'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Play, Star, Film, Users, TrendingUp, ChevronDown } from 'lucide-react';
import { BackgroundLines } from '../components/ui/background-lines';
import { motion, useScroll, useTransform } from 'framer-motion';

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
    image: 'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    rating: '9.2',
    genre: 'Sci-Fi'
  },
  {
    title: 'Oppenheimer',
    image: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg',
    rating: '9.0',
    genre: 'Drama'
  },
  {
    title: 'Poor Things',
    image: 'https://m.media-amazon.com/images/I/818YbB0LlvL._AC_UF1000,1000_QL80_.jpg',
    rating: '8.8',
    genre: 'Fantasy'
  }
];

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={targetRef}
        style={{ opacity, scale, y }}
        className="relative min-h-screen flex items-center justify-center"
      >
        <BackgroundLines className="absolute inset-0 w-full h-full opacity-40" svgOptions={{ duration: 8 }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(145,46,255,0.15)_0%,rgba(0,0,0,0.8)_100%)]" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 w-full"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <motion.div 
                className="space-y-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400 animate-gradient-x">
                    Your Personal
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-500">
                    Movie Journey
                  </span>
                </h1>
                <motion.div 
                  className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "10rem" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
              >
                Step into a world of cinematic excellence. Track, discover, and share your
                movie experiences in a beautifully curated space.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <Link
                  href="/movies"
                  className="group relative overflow-hidden rounded-full px-8 py-4 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 backdrop-blur-xl hover:from-purple-600/30 hover:to-fuchsia-600/30 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div 
                    className="relative flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="h-5 w-5 text-purple-400" />
                    <span className="text-lg font-medium text-white">Get Started</span>
                  </motion.div>
                </Link>

                <Link
                  href="/auth/signin"
                  className="relative rounded-full px-8 py-4 overflow-hidden group border border-purple-500/30 hover:border-purple-500/60 transition-colors duration-500"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 backdrop-blur-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  <div className="relative text-lg text-white/90 font-medium">
                    Sign In
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
      </motion.section>

      {/* Features Section */}
      <section className="relative py-32">
        <BackgroundLines className="absolute inset-0 w-full h-full opacity-20" svgOptions={{ duration: 12 }} />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600/20 via-transparent to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <motion.div 
                  className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                >
                  <feature.icon className="h-12 w-12 text-purple-400 mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-base text-gray-400">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="relative py-32">
        <BackgroundLines className="absolute inset-0 w-full h-full opacity-20" svgOptions={{ duration: 15 }} />
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex items-center mb-16"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TrendingUp className="h-8 w-8 text-purple-400 mr-4" />
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
              Trending Now
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {trendingMovies.map((movie, index) => (
              <motion.div
                key={movie.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl overflow-hidden"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-transparent to-fuchsia-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <motion.div 
                  className="relative aspect-[2/3] overflow-hidden rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <motion.div 
                    className="absolute inset-0 p-6 flex flex-col justify-end"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="inline-block px-3 py-1 bg-purple-500/30 backdrop-blur-md border border-purple-500/40 rounded-full text-sm text-purple-300 mb-3 w-fit">
                      {movie.genre}
                    </span>
                    <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 mr-2 fill-current" />
                      <span className="text-base">{movie.rating}</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <BackgroundLines className="absolute inset-0 w-full h-full opacity-30" svgOptions={{ duration: 10 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />
        
        <motion.div 
          className="container mx-auto px-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.h2 
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
            >
              Begin Your Cinematic Adventure
            </motion.h2>
            <p className="text-xl text-gray-400 font-light">
              Join a community of passionate film enthusiasts and start your journey today.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full text-lg
                         bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white 
                         hover:from-purple-500 hover:to-fuchsia-500 transform
                         transition-all duration-500 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                Create Your Account
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}