import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { contentApi } from '../services/api';
import LockScreen from '../components/LockScreen';
import HeroSection from '../components/HeroSection';
import QuoteCarousel from '../components/QuoteCarousel';
import NoteSection from '../components/NoteSection';
import PhotoGallery from '../components/PhotoGallery';

const Home = () => {
  const { isUnlocked, birthdayGirl, lockWebsite } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isUnlocked) {
      fetchContent();
    }
  }, [isUnlocked]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const [pRes, wRes, nRes] = await Promise.all([
        contentApi.getPhotos(),
        contentApi.getWishes(),
        contentApi.getNote()
      ]);
      setPhotos(pRes.data || []);
      setWishes(wRes.data || []);
      setNote(nRes.data || null);
    } catch (err) {
      console.error('Error loading birthday content', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isUnlocked) {
    return <LockScreen />;
  }

  return (
    <div className="relative min-h-screen pb-24">
      {/* Top Floating Control Bar */}
      <header className="fixed top-5 right-5 z-40 flex items-center gap-3">
        {/* Lock Screen Button */}
        <button
          onClick={lockWebsite}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-card hover:bg-white/90 text-xs font-semibold text-pink-700 shadow-sm transition-all cursor-pointer border border-pink-200"
          title="Lock Screen"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Lock</span>
        </button>
      </header>

      {/* Main Experience Content */}
      <main className="space-y-12">
        <HeroSection />

        <QuoteCarousel wishes={wishes} />

        <NoteSection note={note} />

        <PhotoGallery photos={photos} />
      </main>

      {/* Sweet Footer */}
      <footer className="mt-20 py-8 text-center text-xs text-gray-500 relative z-10 border-t border-pink-100">
        <p className="flex items-center justify-center gap-1.5 font-medium text-pink-700 mb-1">
          Crafted with love for {birthdayGirl || 'Tanisha'} <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
        </p>
        <p className="text-gray-400">May this special year ahead overflow with boundless happiness ✨</p>
      </footer>
    </div>
  );
};

export default Home;
