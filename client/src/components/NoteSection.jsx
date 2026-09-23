import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Feather } from 'lucide-react';

const NoteSection = ({ note }) => {
  if (!note || !note.text) return null;

  return (
    <section id="note" className="py-16 px-4 max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-600 bg-purple-100/80 px-4 py-1.5 rounded-full mb-3">
          <Feather className="w-4 h-4" />
          <span>From the Heart</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serifTitle font-bold text-gray-800">
          A Special Birthday Letter
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Decorative Stamp & Wax Seal */}
        <div className="absolute -top-5 -right-2 sm:-right-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-lg border-2 border-white/80 z-20 transform rotate-12">
          <Heart className="w-7 h-7 fill-white" />
        </div>

        {/* Vintage Parchment / Aesthetic Letter Container */}
        <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FFF6EB] rounded-3xl p-8 sm:p-12 shadow-2xl border border-amber-200/60 relative overflow-hidden">
          
          {/* Subtle paper line texture styling */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Letter Body */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-amber-700 font-medium mb-6">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-sm uppercase tracking-wider">A Personal Note</span>
            </div>

            <div className="text-gray-800 font-sans sm:text-lg leading-relaxed whitespace-pre-line font-normal space-y-4">
              {note.text}
            </div>

            <div className="mt-8 pt-6 border-t border-amber-200/50 flex items-center justify-between">
              <span className="text-xs text-amber-800/60 font-medium">Written with love 💌</span>
              <span className="font-script text-2xl sm:text-3xl text-pink-600 font-bold">
                Happy Birthday! 🎈
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NoteSection;
