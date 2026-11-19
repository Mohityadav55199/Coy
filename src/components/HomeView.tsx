'use client';

import React from 'react';

interface HomeViewProps {
  onGoToDiscover?: () => void;
}

/**
 * Placeholder for Coy's existing Home experience.
 * Intentionally blank per the assignment: all functionality lives in Discover.
 */
export const HomeView: React.FC<HomeViewProps> = () => {
  return (
    <div
      className="w-full h-[calc(100vh-125px)] max-h-[780px]"
      aria-label="Home (placeholder)"
    />
  );
};
