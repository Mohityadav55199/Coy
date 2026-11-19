'use client';

import React from 'react';
import {
  Compass,
  Plus,
  Share2,
  Copy,
  Gift,
  Smartphone,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface HomeViewProps {
  onGoToDiscover: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onGoToDiscover }) => {
  return (
    <div className="w-full h-[calc(100vh-125px)] max-h-[780px] p-4 overflow-y-auto space-y-4">
      {/* Featured Discover Announcement Card */}
      <div className="bg-gradient-to-br from-[#141416] via-[#211F2E] to-[#E9336B]/40 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-1.5 text-xs font-bold text-pink-300 uppercase tracking-widest mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Assignment Feature</span>
        </div>
        <h3 className="text-xl font-black tracking-tight mb-1">
          Discover Tab is Ready!
        </h3>
        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Browse 30+ mock student profiles, swipe right to like, and experience Coy's zero-knowledge mutual match reveal in action.
        </p>
        <button
          onClick={onGoToDiscover}
          className="py-2.5 px-4 rounded-xl bg-[#E9336B] hover:bg-[#D82057] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Discover Tab</span>
        </button>
      </div>

      {/* Faithful Representation of Coy Home Screen */}
      <div className="bg-[#F0EEFF] rounded-3xl p-5 border border-purple-100 text-center">
        <div className="text-3xl mb-2">🤫</div>
        <h3 className="text-lg font-black text-gray-950 mb-1">
          No one has added you yet
        </h3>
        <p className="text-xs text-gray-600 mb-4">
          Invite friends so your crush can join too.
        </p>
        <button className="py-2.5 px-5 rounded-full bg-white border border-gray-900 text-gray-950 font-bold text-xs shadow-sm hover:bg-gray-50 transition-colors">
          Invite friends
        </button>
      </div>

      {/* Your Crushes Section */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-base font-black text-gray-950">Your crushes</h4>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            1/3
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Slot 1: Added crush */}
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                R
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Riya</p>
                <p className="text-[11px] text-gray-500">+91 79866 60360</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-gray-400 bg-white px-2 py-1 rounded-md border border-gray-100">
              Heads-up sent
            </span>
          </div>

          {/* Slot 2: Add a crush */}
          <button className="w-full p-3.5 rounded-2xl border-2 border-dashed border-gray-200 hover:border-pink-300 text-gray-700 hover:text-[#E9336B] transition-colors flex items-center justify-center gap-2 text-xs font-bold">
            <span className="w-6 h-6 rounded-full bg-pink-100 text-[#E9336B] flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </span>
            <span>Add a crush</span>
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500 pt-1">
          <span>They get an anonymous heads-up right away. Never who.</span>
          <button className="text-[#E9336B] font-bold underline">More slots</button>
        </div>
      </div>

      {/* Referral Card */}
      <div className="bg-[#D1F4E0] rounded-3xl p-5 border border-emerald-200 text-gray-900">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 rounded-xl bg-white/70">
            <Gift className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Get a slot free</h4>
            <p className="text-xs text-gray-700">
              Invite 3 friends. When 3 join and add a crush, you get a slot.
            </p>
          </div>
        </div>

        <div className="flex gap-1.5 mb-3">
          <div className="h-1.5 flex-1 bg-emerald-800/30 rounded-full" />
          <div className="h-1.5 flex-1 bg-emerald-800/20 rounded-full" />
          <div className="h-1.5 flex-1 bg-emerald-800/20 rounded-full" />
        </div>

        <div className="bg-white rounded-2xl p-3 border border-emerald-300 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-semibold">Your Referral Code</p>
            <p className="text-base font-black text-[#E9336B] tracking-wider">K868PJY</p>
          </div>
          <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

