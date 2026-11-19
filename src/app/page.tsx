'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { TabBar, TabKey } from '@/components/TabBar';
import { DiscoverView } from '@/components/DiscoverView';
import { MatchesView } from '@/components/MatchesView';
import { HomeView } from '@/components/HomeView';
import { ProfileView } from '@/components/ProfileView';
import { MatchModal } from '@/components/MatchModal';
import { Profile } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('discover');
  const [matchesCount, setMatchesCount] = useState<number>(0);
  const [newMatch, setNewMatch] = useState<Profile | null>(null);
  const [selectedChatProfile, setSelectedChatProfile] = useState<Profile | null>(null);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [discoverKey, setDiscoverKey] = useState<number>(0);

  const fetchMatchesCount = useCallback(async () => {
    try {
      const res = await fetch('/api/matches');
      const data = await res.json();
      if (data.success && Array.isArray(data.matches)) {
        setMatchesCount(data.matches.length);
      }
    } catch (err) {
      console.error('Error fetching matches count:', err);
    }
  }, []);

  useEffect(() => {
    fetchMatchesCount();
  }, [fetchMatchesCount]);

  const handleReset = async () => {
    try {
      setIsResetting(true);
      await fetch('/api/reset', { method: 'POST' });
      await fetchMatchesCount();
      // Force remount of Discover deck
      setDiscoverKey((prev) => prev + 1);
    } catch (err) {
      console.error('Error resetting database:', err);
    } finally {
      setIsResetting(false);
    }
  };

  const handleMatch = (profile: Profile) => {
    setNewMatch(profile);
    setMatchesCount((prev) => prev + 1);
  };

  const handleOpenChatFromMatch = (profile: Profile) => {
    setNewMatch(null);
    setSelectedChatProfile(profile);
    setActiveTab('matches');
  };

  return (
    <main className="w-full max-w-md mx-auto min-h-screen bg-[#F8F8FA] relative flex flex-col justify-between overflow-hidden sm:min-h-[844px] sm:max-h-[880px] sm:rounded-[2.75rem] sm:border-[8px] sm:border-[#1E1E24] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onReset={handleReset}
        isResetting={isResetting}
      />

      {/* Main Tab Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'discover' && (
          <DiscoverView
            key={discoverKey}
            onMatch={handleMatch}
            onNavigateToMatches={() => setActiveTab('matches')}
            onRefreshMatches={fetchMatchesCount}
          />
        )}

        {activeTab === 'matches' && (
          <MatchesView
            onNavigateToDiscover={() => setActiveTab('discover')}
            selectedChatProfile={selectedChatProfile}
            onClearChatProfile={() => setSelectedChatProfile(null)}
          />
        )}

        {activeTab === 'home' && (
          <HomeView onGoToDiscover={() => setActiveTab('discover')} />
        )}

        {activeTab === 'profile' && (
          <ProfileView onReset={handleReset} matchesCount={matchesCount} />
        )}
      </div>

      {/* Persistent Bottom Tab Bar */}
      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        matchesCount={matchesCount}
      />

      {/* "It's a Match!" Celebration Screen */}
      <MatchModal
        matchedProfile={newMatch}
        onClose={() => setNewMatch(null)}
        onOpenChat={handleOpenChatFromMatch}
      />
    </main>
  );
}

