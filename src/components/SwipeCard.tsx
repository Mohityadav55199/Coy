'use client';

import React, { useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  PanInfo,
} from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';
import { Profile } from '@/types';

interface SwipeCardProps {
  profile: Profile;
  isFront: boolean;
  onSwipe: (action: 'like' | 'pass') => void;
  isNext?: boolean;
  swipeTrigger?: 'like' | 'pass' | null;
}

const SWIPE_THRESHOLD = 110;
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';

export const SwipeCard: React.FC<SwipeCardProps> = ({
  profile,
  isFront,
  onSwipe,
  isNext = false,
  swipeTrigger = null,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showFullBio, setShowFullBio] = useState(false);
  // Photos after the first are hidden behind a spoiler until tapped (curiosity hook).
  const [revealed, setRevealed] = useState<Set<number>>(new Set([0]));

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 0, 250], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -120], [0, 1]);

  // Reset card state when profile changes
  useEffect(() => {
    setPhotoIndex(0);
    setShowFullBio(false);
    setRevealed(new Set([0]));
    x.set(0);
  }, [profile.id, x]);

  // Handle programmatic trigger (e.g. desktop button click)
  useEffect(() => {
    if (swipeTrigger && isFront) {
      animate(x, swipeTrigger === 'like' ? 650 : -650, {
        duration: 0.28,
        ease: 'easeOut',
      });
    }
  }, [swipeTrigger, isFront, x]);

  const photos = profile.photos?.length ? profile.photos : [FALLBACK_IMAGE];
  const isSpoiled = !revealed.has(photoIndex);
  const revealPhoto = () => setRevealed((prev) => new Set(prev).add(photoIndex));

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isFront) return;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > SWIPE_THRESHOLD || velocity > 600) {
      animate(x, 650, { duration: 0.22, ease: 'easeOut' });
      onSwipe('like');
    } else if (offset < -SWIPE_THRESHOLD || velocity < -600) {
      animate(x, -650, { duration: 0.22, ease: 'easeOut' });
      onSwipe('pass');
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex < photos.length - 1) {
      setPhotoIndex(photoIndex + 1);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex > 0) {
      setPhotoIndex(photoIndex - 1);
    }
  };

  if (!isFront) {
    // Underneath card in stack
    return (
      <div
        className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden bg-slate-900 shadow-xl transition-all duration-300 pointer-events-none"
        style={{
          transform: isNext ? 'scale(0.95) translateY(12px)' : 'scale(0.9) translateY(24px)',
          opacity: isNext ? 0.75 : 0.4,
          zIndex: isNext ? 10 : 5,
        }}
      >
        <img
          src={photos[0]}
          alt={profile.name}
          className="w-full h-full object-cover select-none filter brightness-90"
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold">{profile.name}, {profile.age}</h3>
          </div>
          <p className="text-sm text-gray-300 mt-1">{profile.college}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl cursor-grab active:cursor-grabbing swipe-card z-20 select-none"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      {/* Background Image Carousel */}
      <img
        src={photos[photoIndex]}
        alt={profile.name}
        className={`w-full h-full object-cover select-none transition-all duration-300 ${
          isSpoiled ? 'blur-2xl scale-110' : ''
        }`}
        draggable={false}
        onError={(e) => {
          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
        }}
      />

      {/* Telegram-style spoiler: shimmering dust over hidden photos */}
      {isSpoiled && (
        <div
          className="absolute inset-0 z-[5] spoiler-dust flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            revealPhoto();
          }}
        >
          <div className="px-4 py-2 rounded-full bg-black/55 backdrop-blur-md text-white text-sm font-bold border border-white/20 shadow-lg pointer-events-none">
            ✨ Tap anywhere to reveal photo {photoIndex + 1}
          </div>
        </div>
      )}

      {/* Top Photo Navigation Indicators */}
      {photos.length > 1 && (
        <div className="absolute top-3 left-4 right-4 flex gap-1.5 z-20">
          {photos.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                idx === photoIndex ? 'bg-white shadow-sm' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}

      {/* Interactive Photo Tap Zones (Left 40% prev, Right 40% next) */}
      {photos.length > 1 && !isSpoiled && (
        <>
          <div
            onClick={handlePrevPhoto}
            className="absolute top-12 left-0 bottom-44 w-1/3 z-10 cursor-pointer flex items-center justify-start pl-2 opacity-0 hover:opacity-75 transition-opacity"
            title="Previous photo"
          >
            {photoIndex > 0 && (
              <span className="p-1 rounded-full bg-black/40 text-white backdrop-blur-sm">
                <ChevronLeft className="w-5 h-5" />
              </span>
            )}
          </div>
          <div
            onClick={handleNextPhoto}
            className="absolute top-12 right-0 bottom-44 w-1/3 z-10 cursor-pointer flex items-center justify-end pr-2 opacity-0 hover:opacity-75 transition-opacity"
            title="Next photo"
          >
            {photoIndex < photos.length - 1 && (
              <span className="p-1 rounded-full bg-black/40 text-white backdrop-blur-sm">
                <ChevronRight className="w-5 h-5" />
              </span>
            )}
          </div>
        </>
      )}

      {/* LIKE Stamp Indicator (fades in on drag right) */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-10 left-6 z-30 pointer-events-none border-4 border-pink-400 bg-pink-500/25 backdrop-blur-sm text-pink-200 font-black text-xl px-3 py-1.5 rounded-2xl tracking-wide -rotate-12 shadow-lg"
      >
        🤫 SECRETLY LIKED
      </motion.div>

      {/* NOPE / PASS Stamp Indicator (fades in on drag left) */}
      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-10 right-6 z-30 pointer-events-none border-4 border-slate-300 bg-slate-500/25 backdrop-blur-sm text-slate-100 font-black text-xl px-3 py-1.5 rounded-2xl tracking-wide rotate-12 shadow-lg"
      >
        NOT THIS TIME
      </motion.div>

      {/* Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

      {/* Profile Details Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 pointer-events-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight">{profile.name}</h2>
              <span className="text-2xl font-normal text-white/90">{profile.age}</span>
              {profile.verified && (
                <CheckCircle2 className="w-5 h-5 text-[#38bdf8] fill-[#38bdf8]/20" />
              )}
            </div>

            {/* College & Location */}
            <div className="flex flex-col gap-1 mt-1.5 text-xs text-gray-200">
              <div className="flex items-center gap-1.5 font-medium">
                <GraduationCap className="w-4 h-4 text-pink-300 shrink-0" />
                <span className="line-clamp-1">{profile.college}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>
                  {profile.city} {profile.distanceKm ? `• ${profile.distanceKm} km away` : ''}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowFullBio(!showFullBio);
            }}
            className="pointer-events-auto p-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md transition-colors text-white"
            title="Toggle bio info"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Bio */}
        <p
          className={`text-xs sm:text-sm text-gray-200 mt-3 leading-relaxed transition-all ${
            showFullBio ? '' : 'line-clamp-2'
          }`}
        >
          {profile.bio}
        </p>

        {/* Interest Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-1">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/10 transition-colors"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
