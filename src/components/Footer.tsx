import React from 'react';

interface FooterProps {
  onNavigate: (screen: 'explore-wall' | 'tags-and-stacks' | 'pin-a-project') => void;
  onOpenManifesto: () => void;
  onShowRadar: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenManifesto,
  onShowRadar,
}) => {
  return (
    <footer className="w-full bg-[#0a0e1a]/90 border-t border-[#7dd3fc]/10 backdrop-blur-xl py-12 relative z-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/80"></div>
            <span className="text-xs font-headline font-bold tracking-widest text-on-surface">
              THE PINBOARD
            </span>
            <span className="text-xs text-outline">/</span>
            <span className="text-xs text-on-surface-variant font-mono">
              MONDRIAN MATRIX ARCHIVE
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant/70">
            Ethereal indie projects showcase. Zero telemetry. Pure webcraft.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-on-surface-variant">
          <button
            onClick={() => onNavigate('explore-wall')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            WALL
          </button>
          <button
            onClick={() => onNavigate('tags-and-stacks')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            STACKS
          </button>
          <button
            onClick={onShowRadar}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            RADAR
          </button>
          <button
            onClick={onOpenManifesto}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            MANIFESTO
          </button>
        </div>

        <div className="text-[11px] font-mono text-on-surface-variant/60">
          v2.4.0 · GLACIER EDITION
        </div>
      </div>
    </footer>
  );
};
