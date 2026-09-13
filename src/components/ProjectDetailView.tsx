import React, { useState } from 'react';
import { ProjectPin, CheerMessage } from '../types';

interface ProjectDetailViewProps {
  project: ProjectPin;
  cheers: CheerMessage[];
  onBack: () => void;
  onOpenTipModal: (project: ProjectPin, tier?: number) => void;
  onCopyText: (text: string, label: string) => void;
  onAddCheer: (projectId: string, author: string, message: string, amount?: number) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  cheers,
  onBack,
  onOpenTipModal,
  onCopyText,
  onAddCheer,
}) => {
  const [newCheerText, setNewCheerText] = useState('');
  const [newCheerAuthor, setNewCheerAuthor] = useState('');

  const projectCheers = cheers.filter(c => c.projectId === project.id);

  const handleCheerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCheerText.trim()) return;
    onAddCheer(
      project.id,
      newCheerAuthor.trim() || 'Fellow Indie Hacker',
      newCheerText.trim()
    );
    setNewCheerText('');
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-8">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-surface-variant/40 text-xs font-mono text-on-surface-variant hover:text-on-surface transition-all group"
        >
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-0.5 transition-transform">
            arrow_back
          </span>
          <span>Return to Matrix Wall</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SCREEN 7 // ARCHIVE SPEC</span>
        </div>
      </div>

      {/* Hero Banner Card */}
      <div className="relative w-full rounded-2xl bg-[#111828]/75 border border-[#7dd3fc]/20 backdrop-blur-2xl p-6 sm:p-8 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
        {/* Pushpin */}
        <div className="absolute top-4 left-6 w-4 h-4 rounded-full bg-primary shadow-[0_0_14px_#7dd3fc] flex items-center justify-center z-20">
          <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pt-4">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
                {project.categoryLabel || project.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                {project.statusText || 'LIVE'}
              </span>
              {project.versionBadge && (
                <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-mono text-tertiary border border-tertiary/20">
                  {project.versionBadge}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-headline font-bold text-on-surface">
              {project.title}
            </h1>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {project.pitch}
            </p>

            {/* Builder / Author */}
            {project.author && (
              <div className="flex items-center gap-3 pt-2 text-xs font-mono text-on-surface-variant">
                <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
                  {project.author.name[0]}
                </div>
                <div>
                  <span className="text-on-surface font-semibold">{project.author.name}</span>{' '}
                  <span className="text-primary">{project.author.handle}</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics & Direct Tipping CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 shrink-0 lg:min-w-[260px]">
            <div className="p-4 rounded-xl bg-surface-container-lowest/80 border border-surface-variant/40 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-on-surface-variant">Indie Grants Fuel</span>
                <span className="text-primary font-bold">${project.tipTotal}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-on-surface-variant">Backers / Patrons</span>
                <span className="text-on-surface font-semibold">{project.supporters} supporters</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-on-surface-variant">Wall Impressions</span>
                <span className="text-on-surface font-semibold">{project.views} views</span>
              </div>
            </div>

            <button
              onClick={() => onOpenTipModal(project, 5)}
              className="px-5 py-3 rounded-xl bg-primary hover:bg-white text-on-primary font-headline font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(125,211,252,0.35)] transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>DIRECT MICRO-GRANT ($5)</span>
            </button>

            {project.website && (
              <a
                href={`https://${project.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-surface-variant/40 text-xs font-mono text-on-surface text-center flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Visit {project.website}</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            )}
          </div>
        </div>

        {/* Action Slips Strip */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-surface-variant/50">
          <div className="text-[10px] font-mono tracking-widest text-on-surface-variant/60 uppercase mb-3">
            ▼ TEAR-OFF COMMUNITY SLIPS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.slips.map((slip) => (
              <button
                key={slip.id}
                onClick={() => {
                  if (slip.actionType === 'tip') {
                    onOpenTipModal(project, slip.amount || 5);
                  } else if (slip.actionType === 'copy' && slip.actionPayload) {
                    onCopyText(slip.actionPayload, slip.title);
                  } else if (slip.actionPayload) {
                    window.open(slip.actionPayload, '_blank');
                  }
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-container/60 hover:bg-primary-container/60 border border-[#7dd3fc]/15 transition-all text-left group cursor-pointer active:scale-98"
              >
                <div>
                  <div className="text-xs font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {slip.title}
                  </div>
                  <div className="text-[10px] font-mono text-on-surface-variant">
                    {slip.subtitle}
                  </div>
                </div>
                <span className="material-symbols-outlined text-[16px] text-primary group-hover:translate-x-0.5 transition-transform">
                  {slip.actionType === 'tip' ? 'volunteer_activism' : slip.actionType === 'copy' ? 'content_copy' : 'arrow_outward'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deep Dive Details & Interactive Artifact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Story, Code, Features (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Backstory & Philosophy */}
          <div className="rounded-2xl bg-[#111828]/70 border border-surface-variant/40 backdrop-blur-xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
            <h2 className="text-lg font-headline font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">architecture</span>
              Architecture &amp; Mission
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {project.details?.fullDescription || project.pitch}
            </p>

            {project.details?.features && (
              <div className="mt-5 pt-4 border-t border-surface-variant/30">
                <h3 className="text-xs font-mono uppercase text-primary tracking-wider mb-3">
                  Key Technical Capabilities
                </h3>
                <ul className="space-y-2">
                  {project.details.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px] text-emerald-400 shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Interactive Code Snippet / AST Viewer */}
          {project.details?.codeSnippet && (
            <div className="rounded-2xl bg-[#0a0e1a]/90 border border-primary/20 backdrop-blur-xl p-6 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-surface-variant/40">
                <div className="flex items-center gap-2 text-xs font-mono text-on-surface">
                  <span className="w-2.5 h-2.5 rounded-full bg-error/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70"></span>
                  <span className="ml-2 text-on-surface-variant font-medium">AST Code Specimen</span>
                </div>
                <button
                  onClick={() => onCopyText(project.details!.codeSnippet!, 'Code specimen')}
                  className="flex items-center gap-1 text-[11px] font-mono text-primary hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  Copy Code
                </button>
              </div>
              <pre className="mt-4 p-3 rounded-lg bg-[#0f1524]/90 overflow-x-auto text-xs font-mono text-primary leading-relaxed border border-surface-variant/30">
                <code>{project.details.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="rounded-2xl bg-[#111828]/70 border border-surface-variant/40 backdrop-blur-xl p-6">
            <h3 className="text-xs font-mono uppercase text-on-surface-variant tracking-wider mb-3">
              Technologies &amp; Libraries
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stacks.map((st) => (
                <span
                  key={st}
                  className="px-3 py-1 rounded-lg bg-surface-container border border-surface-variant/50 text-xs font-mono text-on-surface"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Community Cheers & Support Board (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-2xl bg-[#111828]/75 border border-[#7dd3fc]/15 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between pb-4 border-b border-surface-variant/40">
              <div>
                <h3 className="text-base font-headline font-bold text-on-surface">
                  Community Cheer Board
                </h3>
                <p className="text-[11px] font-mono text-on-surface-variant mt-0.5">
                  Real feedback from fellow builders & patrons
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-primary-container text-[11px] font-mono text-primary font-bold">
                {projectCheers.length} Cheers
              </span>
            </div>

            {/* List of Cheers */}
            <div className="flex flex-col gap-3.5 my-4 max-h-80 overflow-y-auto pr-1">
              {projectCheers.length === 0 ? (
                <div className="text-center py-6 text-xs font-mono text-on-surface-variant/60">
                  No cheers recorded yet. Be the first to fuel this builder!
                </div>
              ) : (
                projectCheers.map((cheer) => (
                  <div
                    key={cheer.id}
                    className="p-3.5 rounded-xl bg-surface-container-lowest/80 border border-surface-variant/30 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-on-surface font-semibold">{cheer.author}</span>
                      {cheer.amount && (
                        <span className="text-emerald-400 font-bold">+${cheer.amount} Tip</span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      "{cheer.message}"
                    </p>
                    <span className="text-[10px] font-mono text-on-surface-variant/50">
                      {cheer.timestamp}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Submit Cheer Form */}
            <form onSubmit={handleCheerSubmit} className="pt-3 border-t border-surface-variant/40 flex flex-col gap-2.5">
              <label className="text-[11px] font-mono text-on-surface-variant font-medium">
                Post an encouraging cheer note
              </label>
              <input
                value={newCheerAuthor}
                onChange={(e) => setNewCheerAuthor(e.target.value)}
                placeholder="Your name or handle (e.g. @dev_alex)"
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-container-lowest border border-surface-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary"
              />
              <textarea
                required
                rows={2}
                value={newCheerText}
                onChange={(e) => setNewCheerText(e.target.value)}
                placeholder="Write your note..."
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-container-lowest border border-surface-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary resize-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-primary-container hover:bg-primary-container/80 border border-primary/30 text-xs font-mono text-primary font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">send</span>
                <span>Post Cheer Message</span>
              </button>
            </form>
          </div>

          {/* Version Changelog */}
          {project.details?.changelog && (
            <div className="rounded-2xl bg-[#111828]/70 border border-surface-variant/40 backdrop-blur-xl p-6">
              <h3 className="text-xs font-mono uppercase text-on-surface-variant tracking-wider mb-3">
                Release Changelog
              </h3>
              <div className="space-y-3">
                {project.details.changelog.map((entry, i) => (
                  <div key={i} className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-primary font-bold">{entry.version}</span>
                      <span className="text-on-surface-variant/60 text-[10px]">{entry.date}</span>
                    </div>
                    <p className="text-on-surface-variant text-[11px] leading-relaxed">
                      {entry.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
