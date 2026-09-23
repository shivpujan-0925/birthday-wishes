import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Cake, Music, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HeroSection = () => {
  const { birthdayGirl } = useAuth();

  const handleBurst = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4D8D', '#FFDE59', '#DFCCF1', '#FAD2E1', '#FF80AB']
    });
  };

  return (
    <section className="relative pt-12 pb-16 md:py-24 text-center px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Floating Festive Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border border-pink-200 shadow-sm mb-6 text-pink-600 font-semibold text-sm tracking-wide"
        >
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>CELEBRATING A VERY SPECIAL DAY</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        </motion.div>

        {/* Main Animated Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3 mb-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-700 font-serifTitle italic tracking-wide">
            Happiest Birthday to You
          </h2>
          <h1 className="font-script text-6xl sm:text-7xl md:text-9xl text-shimmer font-bold pb-2 drop-shadow-sm select-none">
            {birthdayGirl || 'Tanisha'} ✨
          </h1>
        </motion.div>

        {/* Subtitle / Wish Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-600 max-w-2xl mx-auto text-base sm:text-xl font-normal leading-relaxed mb-8"
        >
          Today is all about celebrating the brightest smile, the warmest soul, and the most wonderful person! Wishing you infinite joy, laughter, and endless dreams fulfilled. 🌸🎂
        </motion.p>

        {/* Interactive Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleBurst}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium shadow-glow-pink hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Cake className="w-5 h-5" />
            <span>Send Confetti Burst 🎉</span>
          </button>

          <a
            href="#note"
            className="px-8 py-3.5 rounded-full glass-card hover:bg-white/90 text-pink-700 font-medium border border-pink-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
          >
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span>Read Special Note</span>
          </a>
        </motion.div>

        {/* Floating Decorative Icons in Background */}
        <div className="absolute -top-6 left-6 sm:left-12 text-pink-300 opacity-60 animate-float-slow select-none hidden md:block">
          <Star className="w-8 h-8 fill-pink-300" />
        </div>
        <div className="absolute top-1/2 right-4 sm:right-10 text-purple-300 opacity-60 animate-float-medium select-none hidden md:block">
          <Sparkles className="w-9 h-9" />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
