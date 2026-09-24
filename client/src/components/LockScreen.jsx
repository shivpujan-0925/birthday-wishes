import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, Calendar, AlertCircle } from 'lucide-react';
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useMusic } from '../context/MusicContext';

const LockScreen = () => {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const { unlockWebsite } = useAuth();
  const { triggerUnlockMusic } = useMusic();

  const triggerConfettiExplosion = () => {
    // Stage 1: Side Cannons
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#FF4D8D', '#FFDE59', '#DFCCF1', '#FAD2E1', '#9C27B0', '#FF80AB'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Stage 2: Central Fireworks Burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        colors: colors,
      });
    }, 400);
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError('');

    if (!date || !month) {
      setError('Please enter both birth date and month! 🎀');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.verifyDate(date, month);
      if (response.data.success) {
        triggerConfettiExplosion();
        triggerUnlockMusic();
        setTimeout(() => {
          unlockWebsite(response.data.token, response.data.name || 'Tanisha');
        }, 800);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'That date does not match the birthday girl\'s special day! 🎈');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`w-full max-w-md glass-card rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden ${shake ? 'animate-bounce' : ''
          }`}
      >
        {/* Decorative corner ribbons & glowing orbs */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-pink-400/30 via-rose-300/20 to-transparent rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-purple-400/30 via-pink-200/20 to-transparent rounded-tr-full pointer-events-none" />

        {/* Floating Crown/Gift Icon Badge */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 p-0.5 shadow-lg flex items-center justify-center"
        >
          <div className="w-full h-full bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <Gift className="w-10 h-10 text-pink-500 drop-shadow-sm" />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="font-script text-4xl sm:text-5xl text-pink-600 mb-2 font-bold drop-shadow-sm">
          A Special Surprise
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6 font-medium">
          Enter the Birthday Girl's special date & month to unlock her magical day ✨
        </p>

        {/* Error notification */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-5 p-3.5 bg-rose-50/90 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm text-rose-700 text-left font-medium"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unlock Form */}
        <form onSubmit={handleUnlock} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold uppercase tracking-wider text-pink-700 flex items-center gap-1.5 ml-1">
                <Calendar className="w-3.5 h-3.5 text-pink-500" />
                Birth Date
              </label>
              <input
                type="number"
                min="1"
                max="31"
                placeholder=" "
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-pink-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none text-center font-bold text-lg text-gray-800 placeholder:text-gray-300 transition-all duration-200 shadow-inner"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-700 flex items-center gap-1.5 ml-1">
                <Calendar className="w-3.5 h-3.5 text-purple-500" />
                Birth Month
              </label>
              <input
                type="number"
                min="1"
                max="12"
                placeholder=" "
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none text-center font-bold text-lg text-gray-800 placeholder:text-gray-300 transition-all duration-200 shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold text-base shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/35 transform active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform duration-300" />
                <span>Unlock Birthday Magic</span>
                <Heart className="w-5 h-5 text-pink-200 fill-pink-200 group-hover:scale-110 transition-transform duration-300" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400 font-medium">
          Protected with birthday love 💖 Only for the birthday star & loved ones
        </p>
      </motion.div>
    </div>
  );
};

export default LockScreen;
