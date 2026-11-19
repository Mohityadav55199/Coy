'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, MessageCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Profile } from '@/types';

interface MatchModalProps {
  matchedProfile: Profile | null;
  currentUserAvatar?: string;
  onClose: () => void;
  onOpenChat: (profile: Profile) => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  matchedProfile,
  currentUserAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  onClose,
  onOpenChat,
}) => {
  useEffect(() => {
    if (matchedProfile) {
      // Trigger festive confetti explosion
      const end = Date.now() + 1.8 * 1000;
      const colors = ['#E9336B', '#FF758F', '#10B981', '#F59E0B', '#3B82F6'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 65,
          origin: { x: 0.1, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 65,
          origin: { x: 0.9, y: 0.7 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [matchedProfile]);

  if (!matchedProfile) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-sm bg-gradient-to-b from-[#1E1E24] to-[#121216] border border-white/10 rounded-[2.5rem] p-7 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#E9336B]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9336B]/20 border border-[#E9336B]/40 text-[#FF4D82] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>It's a Mutual Match!</span>
          </div>

          {/* Overlapping User Avatars */}
          <div className="flex items-center justify-center relative mb-6">
            {/* Logged in User */}
            <div className="w-20 h-20 rounded-full ring-4 ring-[#1E1E24] overflow-hidden shadow-xl -mr-3 z-10">
              <img
                src={currentUserAvatar}
                alt="You"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Glowing Heart Link */}
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-10 h-10 rounded-full bg-[#E9336B] text-white flex items-center justify-center z-20 shadow-lg ring-4 ring-[#1E1E24]"
            >
              <Heart className="w-5 h-5 fill-white" />
            </motion.div>

            {/* Matched Profile */}
            <div className="w-20 h-20 rounded-full ring-4 ring-[#1E1E24] overflow-hidden shadow-xl -ml-3 z-10">
              <img
                src={matchedProfile.photos[0]}
                alt={matchedProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Match Copy */}
          <h2 className="text-2xl font-black tracking-tight text-white mb-2">
            You & {matchedProfile.name}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed px-2 mb-4">
            You both liked each other! Because your feelings are mutual, Coy has revealed your connection.
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-medium mb-6 bg-emerald-950/40 border border-emerald-800/40 py-1.5 px-3 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Zero-Knowledge Match Protection</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={() => onOpenChat(matchedProfile)}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#E9336B] to-[#FF4D82] text-white font-bold text-sm shadow-coy-bold hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Say Hello to {matchedProfile.name}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-gray-300 font-semibold text-xs transition-colors"
            >
              Keep Swiping
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

