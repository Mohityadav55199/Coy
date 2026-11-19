'use client';

import React from 'react';
import { Home, Compass, Heart, User } from 'lucide-react';

export type TabKey = 'home' | 'discover' | 'matches' | 'profile';

interface TabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  matchesCount: number;
}

export const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  onTabChange,
  matchesCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-2.5 z-30">
      <div className="flex items-center justify-around">
        {/* Home Tab (Placeholder per assignment prompt) */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'home'
              ? 'text-[#E9336B] font-semibold scale-105'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Home className="w-5 h-5" strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="text-[11px]">Home</span>
        </button>

        {/* Discover Tab (Core swipe experience) */}
        <button
          onClick={() => onTabChange('discover')}
          className={`flex flex-col items-center gap-1 relative transition-all ${
            activeTab === 'discover'
              ? 'text-[#E9336B] font-semibold scale-105'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <div className="relative">
            <Compass
              className="w-5 h-5"
              strokeWidth={activeTab === 'discover' ? 2.5 : 2}
            />
            {activeTab === 'discover' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E9336B]" />
            )}
          </div>
          <span className="text-[11px]">Discover</span>
        </button>

        {/* Matches Tab */}
        <button
          onClick={() => onTabChange('matches')}
          className={`flex flex-col items-center gap-1 relative transition-all ${
            activeTab === 'matches'
              ? 'text-[#E9336B] font-semibold scale-105'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <div className="relative">
            <Heart
              className="w-5 h-5"
              strokeWidth={activeTab === 'matches' ? 2.5 : 2}
              fill={activeTab === 'matches' ? '#E9336B' : 'none'}
            />
            {matchesCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-[#E9336B] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow-sm">
                {matchesCount}
              </span>
            )}
          </div>
          <span className="text-[11px]">Matches</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'profile'
              ? 'text-[#E9336B] font-semibold scale-105'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <User className="w-5 h-5" strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span className="text-[11px]">Settings</span>
        </button>
      </div>
    </nav>
  );
};

