import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  Camera,
  Layers,
  Crown
} from 'lucide-react';

const PhotoGallery = ({ photos = [] }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'favorites' | 'candid'
  const [activeTab, setActiveTab] = useState('grid'); // 'grid' | 'polaroid' | 'spotlight'

  const openLightbox = (index) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);

  const prevPhoto = (e) => {
    e?.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  if (!photos || photos.length === 0) return null;

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
      {/* Section Header with Glowing Aura */}
      <div className="text-center mb-14 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pink-600 bg-pink-100/90 px-5 py-2 rounded-full mb-4 shadow-sm border border-pink-200"
        >
          <Camera className="w-4 h-4 text-pink-500 animate-pulse" />
          <span>The Memory Hall of Fame</span>
          <Crown className="w-4 h-4 text-amber-500" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-serifTitle font-bold text-gray-850 tracking-tight mb-4"
        >
          Cherished Moments & Smiles ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto"
        >
          A curated collection of unforgettable adventures, joyful giggles, and golden memories.
        </motion.p>

        {/* View Layout Toggle Buttons */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'grid'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25 scale-105'
                : 'glass-card hover:bg-white text-gray-700'
            }`}
          >
            🌟 Aesthetic Grid
          </button>
          <button
            onClick={() => setActiveTab('polaroid')}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'polaroid'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/25 scale-105'
                : 'glass-card hover:bg-white text-gray-700'
            }`}
          >
            📸 Vintage Polaroid
          </button>
        </div>
      </div>

      {/* VIEW 1: Aesthetic Modern Mosaic Grid */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {photos.map((photo, index) => {
            // Dynamic styling for varied card height / mosaic feel
            const isTall = index % 5 === 0 || index % 7 === 0;

            return (
              <motion.div
                key={photo._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                onClick={() => openLightbox(index)}
                className={`group relative cursor-pointer rounded-3xl p-3 bg-white/70 backdrop-blur-md border border-white/90 shadow-lg hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 flex flex-col justify-between ${
                  isTall ? 'sm:row-span-2' : ''
                }`}
              >
                {/* Photo container with glowing border */}
                <div className="relative w-full h-full min-h-[260px] rounded-2xl overflow-hidden bg-pink-50">
                  <img
                    src={photo.url}
                    alt={photo.caption || 'Memory'}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Sparkle badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[11px] font-bold text-pink-600 shadow-sm flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>#{index + 1}</span>
                  </div>

                  {/* Expand icon on top right */}
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Gradient bottom overlay with caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                    <div className="flex items-center gap-1 text-pink-300 text-xs font-semibold mb-1">
                      <Heart className="w-3.5 h-3.5 fill-pink-300" />
                      <span>Special Memory</span>
                    </div>
                    <p className="text-white text-sm sm:text-base font-medium leading-snug drop-shadow-md">
                      {photo.caption || 'Such a precious moment! ✨'}
                    </p>
                  </div>
                </div>

                {/* Subtle caption footer when not hovering */}
                <div className="mt-3 px-1 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span className="truncate max-w-[80%] text-gray-700 font-semibold group-hover:text-pink-600 transition-colors">
                    {photo.caption || `Memory #${index + 1}`}
                  </span>
                  <Heart className="w-3.5 h-3.5 text-rose-400 group-hover:fill-rose-400 group-hover:scale-125 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: Vintage Polaroid Gallery */}
      {activeTab === 'polaroid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {photos.map((photo, index) => {
            const rotations = ['-rotate-2', 'rotate-1', '-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3'];
            const rotClass = rotations[index % rotations.length];

            return (
              <motion.div
                key={photo._id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                onClick={() => openLightbox(index)}
                className={`bg-white p-4 pb-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer ${rotClass} border border-gray-100 flex flex-col`}
              >
                {/* Washi Tape Accent */}
                <div className="w-16 h-4 mx-auto -mt-6 mb-3 bg-pink-200/80 backdrop-blur-sm rounded-sm shadow-sm rotate-1" />

                <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-50 shadow-inner mb-3">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="text-center mt-2 px-2">
                  <p className="font-handwriting text-2xl text-gray-800 leading-tight">
                    {photo.caption || 'Precious times 💕'}
                  </p>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-pink-400">
                    Forever & Always
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer z-50 hover:rotate-90 duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Left */}
            <button
              onClick={prevPhoto}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer z-50 hover:scale-110"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Main Lightbox Content Card */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full flex flex-col items-center justify-center relative"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black/40">
                <img
                  src={photos[selectedPhotoIndex].url}
                  alt={photos[selectedPhotoIndex].caption}
                  className="max-w-full max-h-[70vh] object-contain rounded-3xl"
                />
              </div>

              {/* Lightbox Caption & Info */}
              <div className="mt-5 text-center max-w-2xl px-4">
                <p className="text-white text-lg sm:text-xl font-medium drop-shadow-md">
                  {photos[selectedPhotoIndex].caption || 'Special moments with Tanisha ✨'}
                </p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="text-pink-400 text-xs font-semibold px-3 py-1 rounded-full bg-white/10">
                    Photo {selectedPhotoIndex + 1} of {photos.length}
                  </span>
                  <span className="text-amber-300 text-xs flex items-center gap-1 font-medium">
                    <Sparkles className="w-3.5 h-3.5" /> Pure Magic
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Navigation Right */}
            <button
              onClick={nextPhoto}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer z-50 hover:scale-110"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
