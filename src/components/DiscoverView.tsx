'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Heart,
  RotateCcw,
  Sparkles,
  Inbox,
  Flame,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { SwipeCard } from './SwipeCard';
import { Profile } from '@/types';

interface DiscoverViewProps {
  onMatch: (profile: Profile) => void;
  onNavigateToMatches: () => void;
  onRefreshMatches: () => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  onMatch,
  onNavigateToMatches,
  onRefreshMatches,
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [swipingId, setSwipingId] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [swipeFeedback, setSwipeFeedback] = useState<{
    text: string;
    type: 'like' | 'pass';
  } | null>(null);

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/feed');
      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles || []);
      } else {
        setError(data.error || 'Failed to load profiles');
      }
    } catch (err: any) {
      console.error('Error fetching feed:', err);
      setError('Network error while connecting to Coy feed.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleSwipe = useCallback(
    async (action: 'like' | 'pass') => {
      if (profiles.length === 0 || swipingId) return;

      const currentProfile = profiles[0];
      setSwipingId(currentProfile.id);
      setSwipeDirection(action === 'like' ? 'right' : 'left');

      // Visual feedback toast
      setSwipeFeedback({
        text: action === 'like' ? `Liked ${currentProfile.name}` : `Passed on ${currentProfile.name}`,
        type: action,
      });

      // Clear feedback toast after 1.5s
      setTimeout(() => setSwipeFeedback(null), 1500);

      try {
        // Post swipe to backend
        const res = await fetch('/api/swipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            profileId: currentProfile.id,
            action,
          }),
        });

        const data = await res.json();

        // Optimistically remove card from deck after exit animation
        setTimeout(() => {
          setProfiles((prev) => prev.filter((p) => p.id !== currentProfile.id));
          setSwipingId(null);
          setSwipeDirection(null);

          // If mutual match occurred, trigger celebration modal & refresh badge
          if (data.success && data.match && data.profile) {
            onMatch(data.profile);
            onRefreshMatches();
          }
        }, 220);
      } catch (err) {
        console.error('Error recording swipe:', err);
        // Fallback: still remove from UI
        setProfiles((prev) => prev.filter((p) => p.id !== currentProfile.id));
        setSwipingId(null);
        setSwipeDirection(null);
      }
    },
    [profiles, swipingId, onMatch, onRefreshMatches]
  );

  // Keyboard navigation for desktop users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleSwipe('pass');
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        e.preventDefault();
        handleSwipe('like');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSwipe]);

  const handleResetFeed = async () => {
    try {
      setLoading(true);
      await fetch('/api/reset', { method: 'POST' });
      await fetchFeed();
      onRefreshMatches();
    } catch (err) {
      console.error('Error resetting feed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-between w-full h-[calc(100vh-125px)] max-h-[780px] p-4 select-none">
      {/* Toast feedback pill */}
      <AnimatePresence>
        {swipeFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className={`fixed top-16 z-40 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-md ${
              swipeFeedback.type === 'like'
                ? 'bg-emerald-600/90 border border-emerald-400'
                : 'bg-rose-600/90 border border-rose-400'
            }`}
          >
            {swipeFeedback.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card Deck Area */}
      <div className="relative w-full flex-1 max-w-sm mx-auto mb-4">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full border-4 border-pink-100 border-t-[#E9336B] animate-spin mb-4" />
            <p className="text-sm font-semibold text-gray-700">Curating students around you...</p>
            <p className="text-xs text-gray-400 mt-1">Filtering unswiped profiles</p>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-[2rem] border border-red-100 p-6 text-center">
            <ShieldAlert className="w-10 h-10 text-rose-500 mb-3" />
            <p className="text-sm font-semibold text-gray-800">{error}</p>
            <button
              onClick={fetchFeed}
              className="mt-4 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700"
            >
              Retry
            </button>
          </div>
        ) : profiles.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center text-[#E9336B] mb-5 shadow-inner">
              <Sparkles className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-[#141416] tracking-tight mb-2">
              You're all caught up!
            </h3>

            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mb-6">
              You have reviewed all seeded student profiles in your radius. No one has been repeated — swiped profiles never reappear.
            </p>

            <div className="w-full space-y-2.5">
              <button
                onClick={onNavigateToMatches}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#E9336B] to-[#FF4D82] text-white font-bold text-xs shadow-coy-bold hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <span>View Mutual Matches</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleResetFeed}
                className="w-full py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Profiles</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Cards Stack */
          <div className="relative w-full h-full">
            {/* Background 2nd card */}
            {profiles.length > 1 && (
              <SwipeCard
                key={profiles[1].id}
                profile={profiles[1]}
                isFront={false}
                isNext={true}
                onSwipe={() => {}}
              />
            )}

            {/* Front Interactive Card */}
            <AnimatePresence>
              {profiles.length > 0 && (
                <motion.div
                  key={profiles[0].id}
                  className="w-full h-full"
                  animate={
                    swipingId === profiles[0].id
                      ? {
                          x: swipeDirection === 'right' ? 500 : -500,
                          rotate: swipeDirection === 'right' ? 25 : -25,
                          opacity: 0,
                        }
                      : { x: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <SwipeCard
                    profile={profiles[0]}
                    isFront={true}
                    onSwipe={handleSwipe}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom Desktop / Action Buttons */}
      {profiles.length > 0 && (
        <div className="w-full max-w-sm flex items-center justify-center gap-6 py-2 z-20">
          {/* Pass Button */}
          <button
            onClick={() => handleSwipe('pass')}
            disabled={swipingId !== null}
            className="w-14 h-14 rounded-full bg-white border-2 border-rose-100 text-rose-500 shadow-md hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group focus:outline-none"
            title="Pass (Swipe Left or Press ←)"
          >
            <X className="w-6 h-6 stroke-[2.5] group-hover:scale-110 transition-transform" />
          </button>

          {/* Keyboard hint badge */}
          <div className="hidden sm:flex flex-col items-center text-[10px] text-gray-400 font-medium select-none">
            <span>← Pass</span>
            <span>Like →</span>
          </div>

          {/* Like Button */}
          <button
            onClick={() => handleSwipe('like')}
            disabled={swipingId !== null}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E9336B] to-[#FF5E8E] text-white shadow-coy-bold hover:scale-105 active:scale-95 transition-all flex items-center justify-center group focus:outline-none"
            title="Like (Swipe Right or Press →)"
          >
            <Heart className="w-7 h-7 fill-white stroke-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

