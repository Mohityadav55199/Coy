'use strict';
import React from 'react';
import { RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  activeTab: string;
  isResetting?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReset, activeTab, isResetting }) => {
  return (
    <header className="px-5 py-3.5 flex items-center justify-between border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <div className="flex items-baseline">
          <span className="text-2xl font-black tracking-tight text-[#141416]">coy</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#E9336B] inline-block ml-0.5 animate-pulse"></span>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-pink-50 text-[#E9336B] border border-pink-100 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          Discover
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Blind Double-Opt-In</span>
        </div>

        <button
          onClick={onReset}
          disabled={isResetting}
          title="Reset Demo Data (Clear swipes & restore all 30+ profiles)"
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <RotateCcw className={`w-4 h-4 ${isResetting ? 'animate-spin text-[#E9336B]' : ''}`} />
          <span className="hidden md:inline text-[11px]">Reset Feed</span>
        </button>
      </div>
    </header>
  );
};

