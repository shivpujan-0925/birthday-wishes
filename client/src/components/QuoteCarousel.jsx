import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquareHeart } from 'lucide-react';
import WishCard from './WishCard';

const QuoteCarousel = ({ wishes = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || wishes.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wishes.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlay, wishes.length]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % wishes.length);
  };

  if (!wishes || wishes.length === 0) return null;

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-pink-600 bg-pink-100/80 px-4 py-1.5 rounded-full mb-3">
          <MessageSquareHeart className="w-4 h-4" />
          <span>Wishes & Blessings</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serifTitle font-bold text-gray-800">
          Heartfelt Birthday Messages
        </h2>
      </div>

      {/* Grid for desktop / Carousel container */}
      <div className="relative">
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {wishes.slice(0, 4).map((wish, idx) => (
            <WishCard key={wish._id || idx} wish={wish} index={idx} />
          ))}
        </div>

        {/* Mobile / Swipe Carousel View */}
        <div className="md:hidden relative overflow-hidden py-2 px-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <WishCard wish={wishes[currentIndex]} index={0} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Wish"
              className="p-2.5 rounded-full glass-card hover:bg-white text-pink-600 shadow-sm transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5">
              {wishes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-6 bg-pink-500' : 'w-2 bg-pink-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Wish"
              className="p-2.5 rounded-full glass-card hover:bg-white text-pink-600 shadow-sm transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteCarousel;
