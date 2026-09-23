import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Heart } from 'lucide-react';

const WishCard = ({ wish, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group border border-pink-100/80 shadow-glass"
    >
      {/* Background soft glow */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
      
      {/* Quote Icon */}
      <div className="mb-4">
        <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-500 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300 shadow-sm">
          <Quote className="w-5 h-5" />
        </div>
      </div>

      {/* Wish text */}
      <p className="text-gray-700 text-base sm:text-lg font-normal leading-relaxed mb-6 italic relative z-10">
        "{wish.text}"
      </p>

      {/* Author tag */}
      <div className="flex items-center justify-between pt-4 border-t border-pink-100/60 relative z-10">
        <span className="font-semibold text-sm text-pink-600 flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          {wish.author || 'With Love'}
        </span>
        <Sparkles className="w-4 h-4 text-amber-400 opacity-70 group-hover:rotate-45 transition-transform" />
      </div>
    </motion.div>
  );
};

export default WishCard;
