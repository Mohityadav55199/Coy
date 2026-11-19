'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  GraduationCap,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  X,
} from 'lucide-react';
import { MatchRecord, Profile } from '@/types';

interface MatchesViewProps {
  onNavigateToDiscover: () => void;
  selectedChatProfile: Profile | null;
  onClearChatProfile: () => void;
}

export const MatchesView: React.FC<MatchesViewProps> = ({
  onNavigateToDiscover,
  selectedChatProfile,
  onClearChatProfile,
}) => {
  const [matches, setMatches] = useState<MatchRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChatProfile, setActiveChatProfile] = useState<Profile | null>(
    selectedChatProfile
  );
  const [messages, setMessages] = useState<{ sender: 'me' | 'them'; text: string; time: string }[]>([
    {
      sender: 'them',
      text: "Hey Mohit! We matched on Coy 😊 Did you add me first or did I add you?",
      time: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/matches');
      const data = await res.json();
      if (data.success) {
        setMatches(data.matches || []);
      }
    } catch (err) {
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  useEffect(() => {
    if (selectedChatProfile) {
      setActiveChatProfile(selectedChatProfile);
    }
  }, [selectedChatProfile]);

  useEffect(() => {
    if (activeChatProfile) {
      setMessages([
        {
          sender: 'them',
          text: `Hey Mohit! We matched on Coy 😊 Did you add me first or did I add you?`,
          time: 'Just now',
        },
      ]);
      setInputMessage('');
    }
  }, [activeChatProfile?.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      sender: 'me' as const,
      text: inputMessage.trim(),
      time: 'Just now',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Simulated reply after 1.2s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'them' as const,
          text: "Haha that's coy! I guess our secret is safe now 🤫☕",
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  const formatMatchedTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const diffMinutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${Math.floor(diffHours / 24)}d ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="w-full h-[calc(100vh-125px)] max-h-[780px] p-4 overflow-y-auto">
      {/* Header Info Banner */}
      <div className="mb-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-3.5 border border-pink-100 flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-[#E9336B] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-gray-900">Coy Mutual Privacy Guarantee</h4>
          <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
            These profiles only appear because <strong>both of you</strong> swiped right. Unrequited likes are strictly kept secret.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-base font-black text-gray-900 tracking-tight flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-[#E9336B] fill-[#E9336B]" />
          <span>Mutual Matches</span>
          <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
            {matches.length}
          </span>
        </h2>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-pink-100 border-t-[#E9336B] animate-spin mb-3" />
          <p className="text-xs text-gray-400 font-medium">Loading mutual matches...</p>
        </div>
      ) : matches.length === 0 ? (
        /* Empty State */
        <div className="py-16 px-6 text-center bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-[#E9336B] mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No mutual matches yet</h3>
          <p className="text-xs text-gray-500 max-w-xs mb-5 leading-relaxed">
            Matches happen when you like someone who has already liked you. Head over to Discover to swipe!
          </p>
          <button
            onClick={onNavigateToDiscover}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#E9336B] to-[#FF4D82] text-white font-bold text-xs shadow-md hover:brightness-105 transition-all flex items-center gap-1.5"
          >
            <span>Start Swiping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* Matches Grid */
        <div className="grid grid-cols-2 gap-3 pb-16">
          {matches.map(({ profile, matchedAt }) => (
            <motion.div
              key={profile.id}
              whileHover={{ y: -2 }}
              onClick={() => setActiveChatProfile(profile)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <img
                  src={profile.photos[0]}
                  alt={profile.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-medium">
                  {formatMatchedTime(matchedAt)}
                </span>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <p className="text-sm font-bold truncate">
                    {profile.name}, {profile.age}
                  </p>
                  <p className="text-[10px] text-gray-300 truncate">{profile.college}</p>
                </div>
              </div>

              <div className="p-2.5 flex items-center justify-between bg-white">
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  Matched
                </span>
                <button
                  className="p-1.5 rounded-full bg-pink-50 text-[#E9336B] group-hover:bg-[#E9336B] group-hover:text-white transition-colors"
                  title="Say hello"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Interactive Chat Icebreaker Drawer / Modal */}
      <AnimatePresence>
        {activeChatProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 h-[520px]"
            >
              {/* Chat Header */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={activeChatProfile.photos[0]}
                      alt={activeChatProfile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">
                      {activeChatProfile.name}, {activeChatProfile.age}
                    </h4>
                    <p className="text-[10px] text-emerald-600 font-medium">
                      Mutual Match on Coy
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveChatProfile(null);
                    onClearChatProfile();
                  }}
                  className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF9FB]">
                <div className="text-center my-2">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-100 px-2.5 py-1 rounded-full">
                    Matched on Discover
                  </span>
                </div>

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.sender === 'me' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                        msg.sender === 'me'
                          ? 'bg-[#E9336B] text-white rounded-br-xs'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-gray-400 mt-0.5 px-1">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Icebreaker Suggestions */}
              <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
                <button
                  onClick={() => setInputMessage("Guess who made the first move! 😉")}
                  className="px-2.5 py-1 rounded-full bg-pink-50 text-[#E9336B] font-medium hover:bg-pink-100 transition-colors shrink-0"
                >
                  "Guess who made the first move? 😉"
                </button>
                <button
                  onClick={() => setInputMessage(`What's your favorite coffee spot in ${activeChatProfile.city}? ☕`)}
                  className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-medium hover:bg-purple-100 transition-colors shrink-0"
                >
                  "Coffee recommendation? ☕"
                </button>
              </div>

              {/* Message Input Box */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Message ${activeChatProfile.name}...`}
                  className="flex-1 bg-gray-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#E9336B]"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2 rounded-xl bg-[#E9336B] text-white hover:brightness-105 disabled:opacity-40 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

