'use client';

import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Bell,
  Link as LinkIcon,
  RotateCcw,
  ShieldCheck,
  Check,
  LogOut,
  Flame,
  Info,
} from 'lucide-react';

interface ProfileViewProps {
  onReset: () => void;
  matchesCount: number;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onReset, matchesCount }) => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText('https://app.getcoy.com/i/k868pjy');
      }
    } catch {
      // Fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-[calc(100vh-125px)] max-h-[780px] p-4 overflow-y-auto space-y-4">
      {/* Title */}
      <h2 className="text-2xl font-black text-gray-950 px-1 tracking-tight">
        Settings
      </h2>

      {/* User Information Cards */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
        {/* Name */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium">First name</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">Mohit</p>
          </div>
          <button className="text-xs font-bold text-gray-900 underline">Change</button>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Number */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium">Your number</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">+91 88169 27228</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            Verified
          </span>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Email */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium">Email</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">
              mohityadav55199@gmail.com
            </p>
          </div>
          <button className="text-xs font-bold text-gray-900 underline">Remove</button>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Alerts Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-900">Alerts</p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              When someone new adds you, or it's a match.
            </p>
          </div>
          <button
            onClick={() => setAlertsEnabled(!alertsEnabled)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              alertsEnabled ? 'bg-[#E9336B]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                alertsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Invite link */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-900">Invite link</p>
            <p className="text-[11px] text-gray-500 mt-0.5 truncate max-w-[200px]">
              https://app.getcoy.com/i/k868pjy
            </p>
          </div>
          <button
            onClick={handleCopyLink}
            className="text-xs font-bold text-gray-900 underline flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Demo & Architecture Panel */}
      <div className="bg-gradient-to-br from-gray-900 to-[#1A1A22] text-white rounded-3xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-pink-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">
              Intern Demo Controls
            </h4>
          </div>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-gray-300 font-mono">
            {matchesCount} Mutual Matches
          </span>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          Need to test matching or re-run the demo from scratch? Click below to reset swipes and reload all 30+ mock student profiles.
        </p>

        <button
          onClick={onReset}
          className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Swipes & Matches</span>
        </button>
      </div>

      <div className="pt-2 flex items-center justify-between px-1">
        <button className="py-2.5 px-6 rounded-full border border-gray-900 text-xs font-bold hover:bg-gray-50 transition-colors">
          Log out
        </button>
        <button className="text-xs font-bold text-rose-600 underline">
          Delete account
        </button>
      </div>
    </div>
  );
};

