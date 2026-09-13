import React, { useState } from 'react';
import { ProjectPin, ProjectCategory, TearOffSlip } from '../types';

interface PinProjectViewProps {
  onAddProject: (project: ProjectPin) => void;
  onCancel: () => void;
}

export const PinProjectView: React.FC<PinProjectViewProps> = ({
  onAddProject,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [pitch, setPitch] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('AI & Micro-SaaS');
  const [website, setWebsite] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [stacksInput, setStacksInput] = useState('TypeScript, Tailwind CSS, Vite');
  const [pushpinColor, setPushpinColor] = useState<'primary' | 'tertiary' | 'secondary' | 'emerald' | 'amber'>('primary');
  
  // Custom tear-off slips
  const [couponCode, setCouponCode] = useState('LAUNCH-INDIE');
  const [couponTitle, setCouponTitle] = useState('Beta Code');
  const [tipAmount, setTipAmount] = useState<number>(5);

  const categories: ProjectCategory[] = [
    'Dev Tools',
    'AI & Micro-SaaS',
    'Design & Fonts',
    'Productivity',
    'Open Source',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !pitch.trim()) return;

    const stacks = stacksInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const slips: TearOffSlip[] = [
      {
        id: `slip-tip-${Date.now()}`,
        title: `Tip Jar ($${tipAmount})`,
        subtitle: 'Direct grant',
        actionType: 'tip',
        amount: tipAmount,
      },
    ];

    if (couponCode.trim()) {
      slips.push({
        id: `slip-code-${Date.now()}`,
        title: couponTitle || 'Beta Key',
        subtitle: 'Click to copy',
        actionType: 'copy',
        actionPayload: couponCode.trim(),
      });
    }

    if (repoUrl.trim()) {
      slips.push({
        id: `slip-repo-${Date.now()}`,
        title: 'Source Code',
        subtitle: 'GitHub',
        actionType: 'link',
        actionPayload: repoUrl.trim(),
      });
    }

    const newPin: ProjectPin = {
      id: `user-pin-${Date.now()}`,
      title: title.trim(),
      pitch: pitch.trim(),
      category,
      categoryLabel: category.toUpperCase(),
      website: website.replace(/^https?:\/\//, '').trim() || undefined,
      repoUrl: repoUrl.trim() || undefined,
      statusText: 'JUST PINNED',
      versionBadge: '★ Fresh Pin',
      pushpinColor,
      gridSpan: 'compact',
      views: 1,
      supporters: 0,
      tipTotal: 0,
      updatedAgo: 'Just now',
      stacks: stacks.length ? stacks : ['Webcraft'],
      tags: [category, 'Indie'],
      author: {
        name: 'Indie Builder',
        handle: '@indie_creator',
      },
      details: {
        fullDescription: pitch.trim(),
        features: [
          'Built with zero algorithmic manipulation',
          'Supported by frictionless direct indie micro-grants',
        ],
      },
      slips,
    };

    onAddProject(newPin);
  };

  const getPinHex = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-primary shadow-[0_0_12px_#7dd3fc]';
      case 'tertiary': return 'bg-tertiary shadow-[0_0_12px_#c8a0f0]';
      case 'secondary': return 'bg-secondary shadow-[0_0_12px_#88b4cc]';
      case 'emerald': return 'bg-emerald-400 shadow-[0_0_12px_#34d399]';
      case 'amber': return 'bg-amber-400 shadow-[0_0_12px_#fbbf24]';
      default: return 'bg-primary shadow-[0_0_12px_#7dd3fc]';
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-8">
      {/* Billboard Banner */}
      <div className="relative w-full rounded-2xl bg-[#111828]/60 border border-[#7dd3fc]/15 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded bg-primary/15 text-primary border border-primary/20">
                SCREEN 8 // COMPOSER
              </span>
              <span className="text-xs text-outline">/</span>
              <span className="text-xs font-mono text-emerald-400">
                ZERO-AUTH ENGINE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-headline font-bold text-on-surface mt-1">
              Pin Your Indie Project
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
              No sign-up wall, no password, no email verification. Configure your card, design custom tear-off slips, and post it to the live Mondrian matrix instantly.
            </p>
          </div>

          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-surface-variant/40 text-xs font-mono text-on-surface-variant hover:text-on-surface transition-all shrink-0 self-start md:self-auto"
          >
            ← Back to Wall
          </button>
        </div>
      </div>

      {/* Main Composer Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: 7 cols */}
        <div className="lg:col-span-7 rounded-2xl bg-[#111828]/75 border border-[#7dd3fc]/15 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.36)] flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-on-surface-variant font-medium">
                  PROJECT TITLE *
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. GlacierDB, Rayon, InkDrop"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-lowest border border-surface-variant/60 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-body transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-on-surface-variant font-medium">
                  CATEGORY *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-lowest border border-surface-variant/60 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-body transition-all"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-surface-container text-on-surface">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pitch */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono text-on-surface-variant font-medium">
                THE PITCH / ONE-LINER *
              </label>
              <textarea
                required
                rows={3}
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                placeholder="What does your project do? Keep it sharp, technical, and concrete without generic buzzwords..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-lowest border border-surface-variant/60 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-body transition-all resize-none"
              />
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-on-surface-variant font-medium">
                  WEBSITE / DEMO URL
                </label>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="e.g. mytool.sh or demo.app"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-lowest border border-surface-variant/60 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-body transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-on-surface-variant font-medium">
                  GITHUB / REPO URL
                </label>
                <input
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-lowest border border-surface-variant/60 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-body transition-all"
                />
              </div>
            </div>

            {/* Tech Stacks */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono text-on-surface-variant font-medium">
                TECH STACKS (COMMA-SEPARATED)
              </label>
              <input
                value={stacksInput}
                onChange={(e) => setStacksInput(e.target.value)}
                placeholder="TypeScript, Rust, Tailwind CSS, Svelte, WebAssembly..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-lowest border border-surface-variant/60 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-body transition-all"
              />
            </div>

            {/* Pushpin Color Picker */}
            <div className="flex flex-col gap-2 pt-1">
              <label className="text-xs font-mono text-on-surface-variant font-medium">
                PUSHPIN GLOW ACCENT
              </label>
              <div className="flex items-center gap-3">
                {[
                  { id: 'primary', label: 'Cyan Glacier', color: 'bg-primary' },
                  { id: 'tertiary', label: 'Lavender', color: 'bg-tertiary' },
                  { id: 'secondary', label: 'Ice Blue', color: 'bg-secondary' },
                  { id: 'emerald', label: 'Emerald', color: 'bg-emerald-400' },
                  { id: 'amber', label: 'Warm Amber', color: 'bg-amber-400' },
                ].map((pin) => (
                  <button
                    key={pin.id}
                    type="button"
                    onClick={() => setPushpinColor(pin.id as any)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                      pushpinColor === pin.id
                        ? 'border-primary bg-surface-container text-on-surface shadow-[0_0_12px_rgba(125,211,252,0.2)]'
                        : 'border-surface-variant/40 text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${pin.color}`}></span>
                    <span className="hidden sm:inline">{pin.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Perforated Slip Config */}
            <div className="p-4 rounded-xl bg-surface-container-lowest/80 border border-surface-variant/40 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary font-semibold uppercase">
                  Customize Tear-off Action Slips
                </span>
                <span className="text-[10px] font-mono text-on-surface-variant">Interactive Slips</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-on-surface-variant">Slip 1: Coupon / Beta Code</span>
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. SPROUT100 or FREE_TIER"
                    className="px-3 py-1.5 text-xs rounded-lg bg-surface-container border border-surface-variant/40 text-on-surface focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-on-surface-variant">Slip 2: Micro-Tip Target ($)</span>
                  <select
                    value={tipAmount}
                    onChange={(e) => setTipAmount(Number(e.target.value))}
                    className="px-3 py-1.5 text-xs rounded-lg bg-surface-container border border-surface-variant/40 text-on-surface focus:outline-none"
                  >
                    <option value={3}>$3 Cold Brew</option>
                    <option value={5}>$5 High Five</option>
                    <option value={10}>$10 Server Fuel</option>
                    <option value={15}>$15 Core Sponsor</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Zero Auth Notice & Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-surface-variant/40">
              <div className="flex items-center gap-2 text-[11px] font-mono text-on-surface-variant">
                <span className="material-symbols-outlined text-[15px] text-emerald-400">lock_open</span>
                <span>Zero telemetry · Instant publication</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-primary hover:bg-white text-on-primary font-headline font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(125,211,252,0.35)] hover:shadow-[0_0_30px_rgba(125,211,252,0.5)] transition-all cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">push_pin</span>
                <span>PIN TO WALL MATRIX</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Live Glacier Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3 sticky top-24">
          <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant px-1">
            <span>LIVE GLACIER MATRIX PREVIEW</span>
            <span className="text-primary">Real-time</span>
          </div>

          <div className="relative rounded-2xl bg-[#111828]/85 border border-[#7dd3fc]/25 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            {/* Live Pushpin */}
            <div className={`absolute -top-2.5 left-8 w-4 h-4 rounded-full ${getPinHex(pushpinColor)} flex items-center justify-center z-20`}>
              <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-primary/15 text-primary border border-primary/20">
                  {category}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  READY TO PIN
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-headline font-bold text-on-surface">
                  {title || 'Project Title'}
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  {pitch || 'Enter your pitch on the left to see your card take shape on the frozen wall...'}
                </p>
              </div>

              {/* Stacks */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {stacksInput
                  .split(',')
                  .map(s => s.trim())
                  .filter(Boolean)
                  .map(st => (
                    <span key={st} className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-mono text-on-surface-variant border border-surface-variant/40">
                      {st}
                    </span>
                  ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant pt-2 border-t border-surface-variant/30">
                <span>0 views · 0 patrons</span>
                <span className="text-secondary">Just now</span>
              </div>

              {/* Slips preview */}
              <div className="pt-3 border-t-2 border-dashed border-surface-variant/50">
                <div className="text-[9px] font-mono tracking-widest text-on-surface-variant/60 uppercase mb-2">
                  ▼ TEAR-OFF SLIPS PREVIEW
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-surface-container/60 border border-primary/20 text-center">
                    <div className="text-[11px] font-headline font-bold text-primary">Tip Jar (${tipAmount})</div>
                    <div className="text-[9px] font-mono text-on-surface-variant">Direct grant</div>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container/60 border border-surface-variant/40 text-center">
                    <div className="text-[11px] font-headline font-semibold text-on-surface truncate">
                      {couponCode || 'VOUCHER'}
                    </div>
                    <div className="text-[9px] font-mono text-emerald-400">Click to copy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
