import React, { useState } from 'react';
import { ProjectPin, ProjectCategory } from '../types';

interface ExploreWallProps {
  projects: ProjectPin[];
  selectedCategory: ProjectCategory;
  setSelectedCategory: (cat: ProjectCategory) => void;
  onOpenTipModal: (project: ProjectPin, tier?: number) => void;
  onCopyText: (text: string, label: string) => void;
  onOpenPinModal: () => void;
  onSelectProject: (project: ProjectPin) => void;
  totalTips: number;
}

export const ExploreWall: React.FC<ExploreWallProps> = ({
  projects,
  selectedCategory,
  setSelectedCategory,
  onOpenTipModal,
  onCopyText,
  onOpenPinModal,
  onSelectProject,
  totalTips,
}) => {
  // Local state for interactive TypeForge slider in the wall
  const [typeForgeWeight, setTypeForgeWeight] = useState<number>(400);

  // Category counts
  const categories: ProjectCategory[] = [
    'All Pins',
    'Dev Tools',
    'AI & Micro-SaaS',
    'Design & Fonts',
    'Productivity',
    'Open Source'
  ];

  const getCategoryCount = (cat: ProjectCategory) => {
    if (cat === 'All Pins') return projects.length;
    return projects.filter(p => p.category === cat).length;
  };

  // Find standard cards from the dataset
  const promptSprout = projects.find(p => p.id === 'promptsprout');
  const tabZenith = projects.find(p => p.id === 'tabzenith');
  const fontRadar = projects.find(p => p.id === 'fontradar');
  const ghostCraft = projects.find(p => p.id === 'ghostcraft');
  const microCron = projects.find(p => p.id === 'microcron');
  const typeForge = projects.find(p => p.id === 'typeforge');

  // Any custom or added user projects
  const standardIds = ['promptsprout', 'tabzenith', 'fontradar', 'ghostcraft', 'microcron', 'typeforge'];
  const userProjects = projects.filter(p => !standardIds.includes(p.id));

  // Determine if a project matches the current category filter
  const matchesFilter = (p: ProjectPin | undefined) => {
    if (!p) return false;
    if (selectedCategory === 'All Pins') return true;
    return p.category === selectedCategory;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-8">
      {/* Ambient Glow Gradients */}
      <div className="absolute -top-12 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. Mondrian Master Sign / Top Billboard Header */}
      <div className="relative w-full rounded-2xl bg-[#111828]/60 border border-[#7dd3fc]/15 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        {/* Top Decorative Pushpins for Physical Wall Illusion */}
        <div className="absolute top-3.5 left-4 flex items-center gap-1.5 opacity-80">
          <div className="w-2.5 h-2.5 rounded-full bg-primary/90 shadow-[0_0_8px_#7dd3fc]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
        </div>
        <div className="absolute top-3.5 right-4 flex items-center gap-1.5 opacity-80">
          <div className="w-1.5 h-1.5 rounded-full bg-tertiary/30"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-tertiary/90 shadow-[0_0_8px_#c8a0f0]"></div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded bg-primary/15 text-primary border border-primary/20">
                COMMUNITY ARCHIVE
              </span>
              <span className="text-xs text-outline">/</span>
              <span className="text-[11px] font-mono text-on-surface-variant flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE BULLETIN REALTIME
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold tracking-tight text-on-surface">
              The Pinboard <span className="text-primary font-normal">//</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-primary to-secondary-fixed-dim">
                Zero-Auth Indie Wall
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-2xl">
              A frictionless showcase for indie builders, open-source hackers, and micro-studios.
              No sign-up wall, no algorithmic sorting. Grab a tear-off slip, explore real repositories, or fuel indie software with zero fee cuts.
            </p>

            {/* Ticker Metric Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container/70 border border-surface-variant/40 backdrop-blur-md">
                <span className="material-symbols-outlined text-primary text-[15px]">push_pin</span>
                <span className="text-xs font-mono text-on-surface">
                  <strong className="text-primary">{projects.length}</strong> PINS ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container/70 border border-surface-variant/40 backdrop-blur-md">
                <span className="material-symbols-outlined text-secondary text-[15px]">lock_open</span>
                <span className="text-xs font-mono text-on-surface">
                  <strong className="text-secondary">0</strong> PAYWALLS
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container/70 border border-surface-variant/40 backdrop-blur-md">
                <span className="material-symbols-outlined text-tertiary text-[15px]">volunteer_activism</span>
                <span className="text-xs font-mono text-on-surface">
                  <strong className="text-tertiary">${totalTips.toLocaleString()}</strong> DIRECTLY TIPPED
                </span>
              </div>
            </div>
          </div>

          {/* Call to Action Banner Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
            <button
              onClick={onOpenPinModal}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-on-primary font-headline font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_24px_rgba(125,211,252,0.35)] hover:scale-[1.02] hover:bg-white active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ PIN YOUR PROJECT</span>
            </button>
            <span className="text-[10px] font-mono text-on-surface-variant text-center lg:text-right">
              Instant deployment · Markdown supported
            </span>
          </div>
        </div>

        {/* Categories Filter Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-surface-variant/30 scrollbar-none">
          {categories.map((cat) => {
            const count = getCategoryCount(cat);
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-pill shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container border-primary/50 shadow-[0_0_12px_rgba(125,211,252,0.2)] font-semibold'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border-surface-variant/40'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. The Mondrian Wall Grid (Asymmetrical Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[minmax(210px,auto)]">
        
        {/* TILE 1: Large 2x2 Featured Hero Card [PromptSprout] */}
        {promptSprout && matchesFilter(promptSprout) && (
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-between rounded-2xl bg-[#111828]/75 border border-[#7dd3fc]/20 backdrop-blur-2xl p-6 sm:p-7 relative group shadow-[0_8px_32px_rgba(0,0,0,0.36)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(125,211,252,0.15)] hover:border-primary/40">
            {/* Physical Cyan Glowing Pin */}
            <div className="absolute -top-2 left-6 w-4 h-4 rounded-full bg-primary shadow-[0_0_14px_#7dd3fc] flex items-center justify-center z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Card Top Bar */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
                    {promptSprout.categoryLabel || promptSprout.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    {promptSprout.statusText}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-[11px] font-mono text-tertiary border border-tertiary/20">
                  <span className="material-symbols-outlined text-[13px]">star</span>
                  <span>{promptSprout.versionBadge}</span>
                </div>
              </div>

              {/* Project Title & Pitch */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <button
                    onClick={() => onSelectProject(promptSprout)}
                    className="text-2xl sm:text-3xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors text-left"
                  >
                    {promptSprout.title}
                  </button>
                  <a
                    href={`https://${promptSprout.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-on-surface-variant hover:text-primary flex items-center gap-1"
                  >
                    {promptSprout.website}
                    <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                  </a>
                </div>
                <p className="text-sm text-on-surface-variant/90 leading-relaxed">
                  {promptSprout.pitch}
                </p>
              </div>

              {/* Visual Artifact: Interactive Generation Preview Mock */}
              <div className="relative w-full rounded-xl overflow-hidden bg-[#0a0e1a]/85 border border-surface-variant/40 p-4 shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-surface-variant/30 text-[11px] font-mono text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-error/70"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-400/70"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400/70"></span>
                    <span className="ml-2 text-on-surface/80">napkin_wireframe.png</span>
                  </div>
                  <span className="text-primary font-bold">99.4% AST Match</span>
                </div>
                <div className="pt-3 font-mono text-[11px] text-secondary flex flex-col gap-1 opacity-90 overflow-x-auto">
                  <div>
                    <span className="text-tertiary">&lt;section</span>{' '}
                    <span className="text-primary">class</span>=
                    <span className="text-on-surface">"grid grid-cols-12 gap-6 bg-surface-glass"</span>&gt;
                  </div>
                  <div className="pl-4">
                    <span className="text-tertiary">&lt;h2</span>{' '}
                    <span className="text-primary">class</span>=
                    <span className="text-on-surface">"text-2xl font-bold tracking-tight"</span>&gt;
                    The Cold Engine&lt;/h2&gt;
                  </div>
                  <div className="pl-4">
                    <span className="text-tertiary">&lt;button</span>{' '}
                    <span className="text-primary">class</span>=
                    <span className="text-on-surface">"btn-glacier"</span>&gt;
                    Deploy Sketch&lt;/button&gt;
                  </div>
                  <div>
                    <span className="text-tertiary">&lt;/section&gt;</span>
                  </div>
                </div>
              </div>

              {/* Reach & Supporter Metrics */}
              <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant pt-1">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-primary">visibility</span>{' '}
                    {promptSprout.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-tertiary">favorite</span>{' '}
                    {promptSprout.supporters} supporters
                  </span>
                </div>
                <span className="text-[11px] text-secondary">Updated {promptSprout.updatedAgo}</span>
              </div>
            </div>

            {/* Physical Perforated Tear-off Tabs */}
            <div className="mt-6 pt-4 relative border-t-2 border-dashed border-surface-variant/50">
              <div className="text-[9px] font-mono tracking-widest text-on-surface-variant/60 uppercase mb-2">
                ▼ TEAR-OFF SLIPS (CLICK TO ACTION)
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onOpenTipModal(promptSprout, 5)}
                  className="slip-tab flex flex-col items-center justify-center p-2.5 rounded-lg bg-surface-container/60 hover:bg-primary-container/70 border border-primary/20 transition-all text-center group/tab cursor-pointer active:scale-95"
                >
                  <span className="text-[11px] font-headline font-bold text-primary group-hover/tab:scale-105 transition-transform">
                    Tip Jar ($5)
                  </span>
                  <span className="text-[9px] font-mono text-on-surface-variant">Direct grant</span>
                </button>

                <button
                  onClick={() => onCopyText('SPROUT100', 'Beta Invite: SPROUT100')}
                  className="slip-tab flex flex-col items-center justify-center p-2.5 rounded-lg bg-surface-container/60 hover:bg-surface-container-high border border-surface-variant/40 transition-all text-center group/tab cursor-pointer active:scale-95"
                >
                  <span className="text-[11px] font-headline font-semibold text-on-surface group-hover/tab:text-primary">
                    Beta: SPROUT100
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400">Click to copy</span>
                </button>

                <a
                  href={promptSprout.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slip-tab flex flex-col items-center justify-center p-2.5 rounded-lg bg-surface-container/60 hover:bg-surface-container-high border border-surface-variant/40 transition-all text-center group/tab"
                >
                  <span className="text-[11px] font-headline font-semibold text-on-surface group-hover/tab:text-primary flex items-center gap-0.5">
                    Visit Repo <span className="material-symbols-outlined text-[11px]">north_east</span>
                  </span>
                  <span className="text-[9px] font-mono text-on-surface-variant">GitHub v1.4</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TILE 2: Tall 1x2 Productivity Card [TabZenith] */}
        {tabZenith && matchesFilter(tabZenith) && (
          <div className="lg:row-span-2 flex flex-col justify-between rounded-2xl bg-[#111828]/75 border border-[#7dd3fc]/15 backdrop-blur-2xl p-6 relative group shadow-[0_8px_32px_rgba(0,0,0,0.36)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(125,211,252,0.12)] hover:border-primary/40">
            {/* Physical Cyan Glowing Pin */}
            <div className="absolute -top-2 right-6 w-4 h-4 rounded-full bg-primary/90 shadow-[0_0_12px_#7dd3fc] flex items-center justify-center z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-secondary-container/60 text-secondary-fixed border border-secondary/20">
                  {tabZenith.categoryLabel}
                </span>
                <span className="text-[10px] font-mono text-on-surface-variant">
                  {tabZenith.statusText}
                </span>
              </div>

              <div>
                <button
                  onClick={() => onSelectProject(tabZenith)}
                  className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors text-left"
                >
                  {tabZenith.title}
                </button>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  {tabZenith.pitch}
                </p>
              </div>

              {/* Memory Compression Visual Meter */}
              <div className="p-3.5 rounded-xl bg-surface-container-lowest/90 border border-surface-variant/30 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-on-surface-variant">Memory Usage</span>
                  <span className="text-emerald-400 font-bold">-78.4% Saved</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-variant overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: '22%' }}></div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-on-surface-variant/70">
                  <span>Before: 4.8 GB</span>
                  <span>Suspended: 1.0 GB</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono text-on-surface-variant">
                <div className="flex items-center justify-between">
                  <span>Views</span>
                  <span className="text-on-surface font-semibold">{tabZenith.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Backers</span>
                  <span className="text-on-surface font-semibold">{tabZenith.supporters} indie patrons</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>License</span>
                  <span className="text-primary font-semibold">{tabZenith.versionBadge}</span>
                </div>
              </div>
            </div>

            {/* Tear-off Slips for TabZenith */}
            <div className="mt-6 pt-4 border-t-2 border-dashed border-surface-variant/50">
              <div className="text-[9px] font-mono tracking-widest text-on-surface-variant/60 uppercase mb-2">
                ▼ TEAR-OFF SLIP
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onOpenTipModal(tabZenith, 3)}
                  className="w-full py-2.5 px-3 rounded-lg bg-surface-container/70 hover:bg-primary-container/80 border border-primary/20 transition-all flex items-center justify-between text-xs font-headline font-semibold text-primary cursor-pointer active:scale-95"
                >
                  <span>Buy Builder a Coffee</span>
                  <span className="text-xs font-mono">$3 ↗</span>
                </button>
                <button
                  onClick={() => onCopyText('chrome.google.com/webstore/detail/tabzenith', 'Extension URL')}
                  className="w-full py-2 px-3 rounded-lg bg-surface-container/40 hover:bg-surface-container border border-surface-variant/30 transition-all flex items-center justify-between text-xs font-mono text-on-surface-variant hover:text-on-surface"
                >
                  <span>Chrome Web Store</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TILE 3: Compact 1x1 Design Card [FontRadar] */}
        {fontRadar && matchesFilter(fontRadar) && (
          <div className="flex flex-col justify-between rounded-2xl bg-[#111828]/75 border border-[#7dd3fc]/15 backdrop-blur-2xl p-6 relative group shadow-[0_8px_32px_rgba(0,0,0,0.36)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(125,211,252,0.12)] hover:border-tertiary/40">
            {/* Physical Cyan Glowing Pin */}
            <div className="absolute -top-2 left-6 w-4 h-4 rounded-full bg-tertiary shadow-[0_0_12px_#c8a0f0] flex items-center justify-center z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-tertiary-container/70 text-on-tertiary-container border border-tertiary/20">
                  {fontRadar.categoryLabel}
                </span>
                <span className="text-[10px] font-mono text-tertiary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">verified</span> {fontRadar.statusText}
                </span>
              </div>

              <div>
                <button
                  onClick={() => onSelectProject(fontRadar)}
                  className="text-lg font-headline font-bold text-on-surface group-hover:text-primary transition-colors text-left"
                >
                  {fontRadar.title}
                </button>
                <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
                  {fontRadar.pitch}
                </p>
              </div>

              {/* Micro Visual Typography Specimen */}
              <div className="flex items-baseline justify-between px-3 py-2 rounded-lg bg-surface-container-lowest/80 border border-surface-variant/30 font-mono text-xs">
                <span className="font-serif italic text-on-surface text-base">Aa Bb Gg</span>
                <span className="text-[10px] text-tertiary font-semibold">{fontRadar.supporters} Supporters</span>
              </div>
            </div>

            {/* Tear Slip */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-surface-variant/50">
              <button
                onClick={() => onCopyText('MATRIX-FREE-PDF', 'Free Font Matrix PDF Key')}
                className="w-full py-2 px-3 rounded-lg bg-surface-container/60 hover:bg-surface-container-high border border-surface-variant/40 transition-all flex items-center justify-between text-xs font-mono text-on-surface cursor-pointer active:scale-95"
              >
                <span className="text-primary font-semibold">Free Font Matrix PDF</span>
                <span className="text-[10px] text-on-surface-variant">Tear slip</span>
              </button>
            </div>
          </div>
        )}

        {/* TILE 4: Wide 2x1 Card [GhostCraft] */}
        {ghostCraft && matchesFilter(ghostCraft) && (
          <div className="md:col-span-2 flex flex-col justify-between rounded-2xl bg-[#111828]/75 border border-[#7dd3fc]/15 backdrop-blur-2xl p-6 relative group shadow-[0_8px_32px_rgba(0,0,0,0.36)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(125,211,252,0.12)] hover:border-primary/40">
            {/* Physical Cyan Glowing Pin */}
            <div className="absolute -top-2 left-10 w-4 h-4 rounded-full bg-primary/80 shadow-[0_0_12px_#7dd3fc] flex items-center justify-center z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex flex-col gap-2 max-w-md">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-surface-container text-on-surface-variant border border-surface-variant/50">
                    {ghostCraft.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-medium">
                    {ghostCraft.statusText}
                  </span>
                </div>
                <button
                  onClick={() => onSelectProject(ghostCraft)}
                  className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors text-left"
                >
                  {ghostCraft.title}
                </button>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {ghostCraft.pitch}
                </p>
              </div>

              {/* Code Snippet Pill */}
              <div className="shrink-0 flex flex-col items-end gap-1.5">
                <button
                  onClick={() => onCopyText('npx ghostcraft init', 'CLI initialization command')}
                  className="px-3 py-2 rounded-xl bg-surface-container-lowest/90 border border-primary/20 font-mono text-[11px] text-primary flex items-center gap-2 hover:bg-surface-variant transition-colors group/cli cursor-pointer"
                >
                  <span>$ npx ghostcraft init</span>
                  <span className="material-symbols-outlined text-[13px] text-on-surface-variant group-hover/cli:text-primary">
                    content_copy
                  </span>
                </button>
                <span className="text-[10px] font-mono text-on-surface-variant">
                  {ghostCraft.views} views · {ghostCraft.supporters} sponsors
                </span>
              </div>
            </div>

            {/* Tear-off slips */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-surface-variant/50 flex flex-wrap items-center justify-between gap-2">
              <div className="text-[9px] font-mono tracking-widest text-on-surface-variant/60 uppercase">
                ▼ TEAR-OFF ACTION SLIPS
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenTipModal(ghostCraft, 5)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container/60 hover:bg-primary-container border border-primary/20 text-xs font-mono text-primary flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[13px]">favorite</span> GitHub Sponsor ($5)
                </button>
                <button
                  onClick={() => onSelectProject(ghostCraft)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container/60 hover:bg-surface-container-high border border-surface-variant/40 text-xs font-mono text-on-surface flex items-center gap-1 transition-all"
                >
                  Live Demo <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TILE 5: Compact 1x1 Dev Tools Card [MicroCron] */}
        {microCron && matchesFilter(microCron) && (
          <div className="flex flex-col justify-between rounded-2xl bg-[#111828]/75 border border-[#7dd3fc]/15 backdrop-blur-2xl p-6 relative group shadow-[0_8px_32px_rgba(0,0,0,0.36)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(125,211,252,0.12)] hover:border-primary/40">
            {/* Physical Cyan Glowing Pin */}
            <div className="absolute -top-2 right-6 w-4 h-4 rounded-full bg-primary shadow-[0_0_12px_#7dd3fc] flex items-center justify-center z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-primary-container/40 text-on-primary-container border border-primary/20">
                  {microCron.categoryLabel}
                </span>
                <span className="text-[10px] font-mono text-primary font-bold">
                  {microCron.statusText}
                </span>
              </div>

              <div>
                <button
                  onClick={() => onSelectProject(microCron)}
                  className="text-lg font-headline font-bold text-on-surface group-hover:text-primary transition-colors text-left"
                >
                  {microCron.title}
                </button>
                <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
                  {microCron.pitch}
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Edge fleet in 18 regions</span>
              </div>
            </div>

            {/* Tear Slip */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-surface-variant/50">
              <button
                onClick={() => onCopyText('CRON_TIER_FREE', 'Free Forever Tier Voucher')}
                className="w-full py-2 px-3 rounded-lg bg-surface-container/60 hover:bg-surface-container-high border border-surface-variant/40 transition-all flex items-center justify-between text-xs font-mono text-on-surface cursor-pointer active:scale-95"
              >
                <span className="text-primary font-semibold">Tear: Free Forever Tier</span>
                <span className="material-symbols-outlined text-[13px]">redeem</span>
              </button>
            </div>
          </div>
        )}

        {/* TILE 6: Tall 1x2 Design Card [TypeForge] */}
        {typeForge && matchesFilter(typeForge) && (
          <div className="lg:row-span-2 flex flex-col justify-between rounded-2xl bg-[#111828]/75 border border-[#7dd3fc]/15 backdrop-blur-2xl p-6 relative group shadow-[0_8px_32px_rgba(0,0,0,0.36)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(125,211,252,0.12)] hover:border-secondary/40">
            {/* Physical Cyan Glowing Pin */}
            <div className="absolute -top-2 left-6 w-4 h-4 rounded-full bg-secondary shadow-[0_0_12px_#88b4cc] flex items-center justify-center z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-surface-container text-secondary border border-secondary/20">
                  {typeForge.categoryLabel}
                </span>
                <span className="text-[10px] font-mono text-tertiary">
                  {typeForge.statusText}
                </span>
              </div>

              <div>
                <button
                  onClick={() => onSelectProject(typeForge)}
                  className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors text-left"
                >
                  {typeForge.title}
                </button>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  {typeForge.pitch}
                </p>
              </div>

              {/* Variable Font Interactive Specimen */}
              <div className="p-4 rounded-xl bg-surface-container-lowest/80 border border-surface-variant/30 flex flex-col items-center justify-center text-center gap-3">
                <span
                  className="text-3xl font-serif text-on-surface tracking-widest transition-all duration-150"
                  style={{ fontWeight: typeForgeWeight }}
                >
                  GLACIER
                </span>
                <div className="w-full flex flex-col gap-1 pt-2 border-t border-surface-variant/30">
                  <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                    <span>Weight & Ink Trap</span>
                    <span className="text-primary font-bold">{typeForgeWeight}</span>
                  </div>
                  <input
                    className="w-full accent-primary h-1 bg-surface-variant rounded-lg cursor-pointer"
                    max={900}
                    min={100}
                    step={50}
                    value={typeForgeWeight}
                    onChange={(e) => setTypeForgeWeight(Number(e.target.value))}
                    type="range"
                  />
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono text-on-surface-variant">
                <div className="flex items-center justify-between">
                  <span>Format</span>
                  <span className="text-on-surface">WOFF2 + OTF</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Glyphs</span>
                  <span className="text-on-surface">840 characters</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Curator Pick</span>
                  <span className="text-secondary font-medium">#Mondrian24</span>
                </div>
              </div>
            </div>

            {/* Tear Slip */}
            <div className="mt-6 pt-4 border-t-2 border-dashed border-surface-variant/50">
              <div className="text-[9px] font-mono tracking-widest text-on-surface-variant/60 uppercase mb-2">
                ▼ TEAR-OFF SLIP
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onOpenTipModal(typeForge, 12)}
                  className="w-full py-2.5 px-3 rounded-lg bg-surface-container/70 hover:bg-primary-container/80 border border-primary/20 transition-all flex items-center justify-between text-xs font-headline font-semibold text-primary cursor-pointer active:scale-95"
                >
                  <span>Back Font Foundry</span>
                  <span className="text-xs font-mono">$12 ↗</span>
                </button>
                <button
                  onClick={() => onCopyText('TYPEFORGE_BETA', 'Webfont License Key')}
                  className="w-full py-2 px-3 rounded-lg bg-surface-container/40 hover:bg-surface-container border border-surface-variant/30 transition-all flex items-center justify-between text-xs font-mono text-on-surface-variant hover:text-on-surface active:scale-95"
                >
                  <span>Snag Webfont License</span>
                  <span className="text-[11px] text-emerald-400">Copy Key</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC USER-PINNED CARDS */}
        {userProjects.filter(matchesFilter).map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between rounded-2xl bg-[#111828]/80 border border-[#7dd3fc]/20 backdrop-blur-2xl p-6 relative group shadow-[0_8px_32px_rgba(0,0,0,0.36)] hover:border-primary/40 transition-all"
          >
            {/* Pushpin */}
            <div className="absolute -top-2 left-6 w-4 h-4 rounded-full bg-primary shadow-[0_0_12px_#7dd3fc] flex items-center justify-center z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-primary-container/40 text-on-primary-container border border-primary/20">
                  {project.category}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> NEW PIN
                </span>
              </div>

              <div>
                <button
                  onClick={() => onSelectProject(project)}
                  className="text-lg font-headline font-bold text-on-surface group-hover:text-primary transition-colors text-left"
                >
                  {project.title}
                </button>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  {project.pitch}
                </p>
              </div>

              {/* Tech stacks tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.stacks.map(st => (
                  <span key={st} className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-mono text-on-surface-variant border border-surface-variant/40">
                    {st}
                  </span>
                ))}
              </div>
            </div>

            {/* Tear-off Slips */}
            <div className="mt-5 pt-3 border-t-2 border-dashed border-surface-variant/50">
              <div className="text-[9px] font-mono tracking-widest text-on-surface-variant/60 uppercase mb-2">
                ▼ TEAR-OFF SLIPS
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onOpenTipModal(project, 5)}
                  className="w-full py-2 px-3 rounded-lg bg-surface-container/60 hover:bg-primary-container/70 border border-primary/20 text-xs font-mono text-primary flex items-center justify-between transition-all"
                >
                  <span>Fuel Indie Builder</span>
                  <span>$5 ↗</span>
                </button>
                {project.slips.filter(s => s.actionType !== 'tip').map(slip => (
                  <button
                    key={slip.id}
                    onClick={() => {
                      if (slip.actionType === 'copy' && slip.actionPayload) {
                        onCopyText(slip.actionPayload, slip.title);
                      } else if (slip.actionPayload) {
                        window.open(slip.actionPayload, '_blank');
                      }
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-surface-container/40 hover:bg-surface-container border border-surface-variant/30 text-xs font-mono text-on-surface-variant hover:text-on-surface flex items-center justify-between"
                  >
                    <span>{slip.title}</span>
                    <span className="text-[10px] text-emerald-400">Detach</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Physical Wall Bottom Barometer / Notice */}
      <div className="w-full py-5 px-6 rounded-xl bg-surface-container-lowest/60 border border-[#7dd3fc]/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-on-surface-variant">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary/70 animate-pulse"></div>
          <span>Mondrian Glacier Matrix · 100% Free · No algorithmic feed · Pure indie craft</span>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-outline">·</span>
          <button
            onClick={() => onCopyText('https://thepinboard.indie/rss.xml', 'RSS Feed URL')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            SUBMIT RSS FEED
          </button>
          <span className="text-outline">·</span>
          <button
            onClick={() => onCopyText('curl -s https://thepinboard.indie/api/pins | jq .', 'API Command')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            API ACCESS
          </button>
          <span className="text-outline">·</span>
          <span className="text-primary font-semibold">ALL SERVERS FROZEN & CLEAN</span>
        </div>
      </div>
    </div>
  );
};
