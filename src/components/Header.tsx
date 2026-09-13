import React, { useState } from 'react';
import { ProjectCategory } from '../types';

interface HeaderProps {
  activeScreen: 'explore-wall' | 'tags-and-stacks' | 'pin-a-project';
  setActiveScreen: (screen: 'explore-wall' | 'tags-and-stacks' | 'pin-a-project') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  pinCount: number;
  onOpenPinModal: () => void;
  onOpenManifesto: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  setActiveScreen,
  searchQuery,
  setSearchQuery,
  pinCount,
  onOpenPinModal,
  onOpenManifesto,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0f1524]/75 backdrop-blur-2xl border-b border-[#7dd3fc]/10 shadow-[0_1px_16px_rgba(10,14,26,0.8)]">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4 lg:gap-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setActiveScreen('explore-wall')}
            className="flex flex-col text-left group transition-all"
            title="Return to Explore Wall"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_#7dd3fc] animate-pulse"></div>
              <span className="text-sm sm:text-base font-headline font-bold tracking-widest text-on-surface group-hover:text-primary transition-colors">
                THE PINBOARD
              </span>
            </div>
            <span className="text-[10px] font-mono font-medium tracking-wider text-on-surface-variant/70 pl-5">
              MONDRIAN MATRIX · V2.4
            </span>
          </button>

          {/* Active Ticker */}
          <div className="hidden xl:flex items-center gap-3 pl-3">
            <div className="h-4 w-px bg-surface-variant"></div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container/60 border border-[#7dd3fc]/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/80"></span>
              <span className="text-[11px] font-mono tracking-wide text-on-surface-variant font-medium">
                {pinCount} PINS ACTIVE
              </span>
              <span className="text-[11px] text-outline">·</span>
              <span className="text-[11px] font-mono tracking-wide text-primary font-medium">
                $0 FREE PUBLISH
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <div className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-container-low/80 border border-[#7dd3fc]/15 backdrop-blur-md focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(125,211,252,0.15)] transition-all">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
            <input
              className="w-full bg-transparent text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none font-body"
              placeholder="Filter projects, stacks, tags (e.g. Tailwind, Rust, AST)..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[11px] font-mono text-on-surface-variant hover:text-primary transition-colors px-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setActiveScreen('explore-wall')}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
              activeScreen === 'explore-wall'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_15px_rgba(125,211,252,0.15)]'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            EXPLORE WALL
          </button>
          <button
            onClick={() => setActiveScreen('tags-and-stacks')}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
              activeScreen === 'tags-and-stacks'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_15px_rgba(125,211,252,0.15)]'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            TAGS & STACKS
          </button>
          <button
            onClick={() => setActiveScreen('pin-a-project')}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
              activeScreen === 'pin-a-project'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_15px_rgba(125,211,252,0.15)]'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            PIN A PROJECT
          </button>
        </nav>

        {/* Action Button & Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPinModal}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-primary-container/90 hover:bg-primary-container text-on-primary-container text-xs font-headline font-semibold tracking-wider transition-all shadow-[0_0_20px_rgba(125,211,252,0.15)] hover:shadow-[0_0_25px_rgba(125,211,252,0.3)] hover:scale-[1.02] active:scale-98"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span className="hidden sm:inline">+ PIN YOUR PROJECT</span>
            <span className="sm:hidden">PIN</span>
          </button>

          <button
            onClick={onOpenManifesto}
            title="Indie Manifesto & About"
            className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 hover:bg-primary/30 transition-all flex items-center justify-center text-primary group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
              info
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4 pt-2 border-t border-surface-variant/40 bg-surface-container/95 flex flex-col gap-2">
          <div className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-lowest text-xs mb-2">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">search</span>
            <input
              className="w-full bg-transparent text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
              placeholder="Search pins, tags, stacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setActiveScreen('explore-wall');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono uppercase ${
              activeScreen === 'explore-wall' ? 'bg-primary-container text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            EXPLORE WALL
          </button>
          <button
            onClick={() => {
              setActiveScreen('tags-and-stacks');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono uppercase ${
              activeScreen === 'tags-and-stacks' ? 'bg-primary-container text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            TAGS & STACKS
          </button>
          <button
            onClick={() => {
              setActiveScreen('pin-a-project');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono uppercase ${
              activeScreen === 'pin-a-project' ? 'bg-primary-container text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            PIN A PROJECT
          </button>
        </div>
      )}
    </header>
  );
};
