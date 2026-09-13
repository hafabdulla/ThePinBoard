import React, { useState } from 'react';
import { ProjectPin } from '../types';

interface TagsAndStacksViewProps {
  projects: ProjectPin[];
  onSelectProject: (project: ProjectPin) => void;
  onOpenTipModal: (project: ProjectPin, amount?: number) => void;
  onCopyText: (text: string, label: string) => void;
}

export const TagsAndStacksView: React.FC<TagsAndStacksViewProps> = ({
  projects,
  onSelectProject,
  onOpenTipModal,
  onCopyText,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'stacks' | 'tags'>('stacks');

  // Extract all unique stacks
  const allStacks = Array.from(
    new Set(projects.flatMap(p => p.stacks))
  ).sort();

  // Extract all unique tags
  const allTags = Array.from(
    new Set(projects.flatMap(p => p.tags))
  ).sort();

  const currentItems = activeTab === 'stacks' ? allStacks : allTags;

  // Filter projects based on selected tag/stack
  const filteredProjects = selectedTag === 'All'
    ? projects
    : projects.filter(p => 
        activeTab === 'stacks' 
          ? p.stacks.includes(selectedTag) 
          : p.tags.includes(selectedTag)
      );

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-8">
      {/* Header Banner */}
      <div className="relative w-full rounded-2xl bg-[#111828]/60 border border-[#7dd3fc]/15 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded bg-primary/15 text-primary border border-primary/20">
                DISCOVERY DIRECTORY
              </span>
              <span className="text-xs text-outline">/</span>
              <span className="text-xs font-mono text-on-surface-variant">
                TECH RADAR & TAXONOMY
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-headline font-bold text-on-surface">
              Tags &amp; Tech Stacks
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Explore the engineering DNA powering the indie web. From zero-dependency Rust tools to generative variable typography and client-side AST vision models.
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="flex items-center p-1 rounded-xl bg-surface-container-lowest border border-surface-variant/40 shrink-0">
            <button
              onClick={() => {
                setActiveTab('stacks');
                setSelectedTag('All');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === 'stacks'
                  ? 'bg-primary text-on-primary font-bold shadow-[0_0_15px_rgba(125,211,252,0.3)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Tech Stacks ({allStacks.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('tags');
                setSelectedTag('All');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === 'tags'
                  ? 'bg-primary text-on-primary font-bold shadow-[0_0_15px_rgba(125,211,252,0.3)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Categories &amp; Tags ({allTags.length})
            </button>
          </div>
        </div>

        {/* Quick Filter Pill List */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-surface-variant/30 scrollbar-none">
          <button
            onClick={() => setSelectedTag('All')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border shrink-0 ${
              selectedTag === 'All'
                ? 'bg-primary-container text-on-primary-container border-primary/50 shadow-[0_0_12px_rgba(125,211,252,0.2)] font-semibold'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-surface-variant/40'
            }`}
          >
            All ({projects.length})
          </button>
          {currentItems.map((item) => {
            const count = projects.filter(p => 
              activeTab === 'stacks' ? p.stacks.includes(item) : p.tags.includes(item)
            ).length;
            const isCurrent = selectedTag === item;
            return (
              <button
                key={item}
                onClick={() => setSelectedTag(item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all border shrink-0 ${
                  isCurrent
                    ? 'bg-primary-container text-on-primary-container border-primary/50 shadow-[0_0_12px_rgba(125,211,252,0.2)] font-semibold'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-surface-variant/40'
                }`}
              >
                {item} <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Filtered Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant px-1">
          <span>
            SHOWING <strong className="text-primary">{filteredProjects.length}</strong> PINS MATCHING{' '}
            <span className="uppercase text-on-surface font-semibold">"{selectedTag}"</span>
          </span>
          {selectedTag !== 'All' && (
            <button
              onClick={() => setSelectedTag('All')}
              className="text-primary hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-2xl bg-[#111828]/75 border border-[#7dd3fc]/15 backdrop-blur-2xl p-6 relative group shadow-[0_8px_32px_rgba(0,0,0,0.36)] hover:border-primary/40 hover:shadow-[0_12px_40px_rgba(125,211,252,0.12)] transition-all"
            >
              {/* Pushpin */}
              <div className="absolute -top-2 left-6 w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_10px_#7dd3fc] flex items-center justify-center z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-surface-container text-primary border border-primary/20">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono text-on-surface-variant">
                    {project.supporters} supporters · ${project.tipTotal} tipped
                  </span>
                </div>

                <div>
                  <button
                    onClick={() => onSelectProject(project)}
                    className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors text-left"
                  >
                    {project.title}
                  </button>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed line-clamp-2">
                    {project.pitch}
                  </p>
                </div>

                {/* Stacks chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stacks.map((st) => (
                    <span
                      key={st}
                      onClick={() => {
                        setActiveTab('stacks');
                        setSelectedTag(st);
                      }}
                      className={`cursor-pointer px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                        selectedTag === st
                          ? 'bg-primary text-on-primary font-bold border-primary'
                          : 'bg-surface-container-low text-on-surface-variant hover:text-primary border-surface-variant/40'
                      }`}
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {/* Perforated Action Slips */}
              <div className="mt-5 pt-3 border-t-2 border-dashed border-surface-variant/50 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenTipModal(project, 5)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container/70 hover:bg-primary-container border border-primary/20 text-xs font-mono text-primary flex items-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">bolt</span> Tip ($5)
                </button>
                <button
                  onClick={() => onSelectProject(project)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container/50 hover:bg-surface-container border border-surface-variant/40 text-xs font-mono text-on-surface flex items-center gap-1 transition-all"
                >
                  View Details <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
