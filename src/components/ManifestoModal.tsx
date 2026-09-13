import React from 'react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl p-4 transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-[#111828]/95 border border-[#7dd3fc]/25 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-variant/40">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_#7dd3fc] animate-pulse"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              MONDRIAN MATRIX // MANIFESTO
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Core Principles */}
        <div className="space-y-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          <h2 className="text-2xl font-headline font-bold text-on-surface">
            The Zero-Auth Indie Wall
          </h2>
          <p>
            The web used to be a patchwork of personal servers, creative tools, and quirky indie software.
            Today, discovering new tools means navigating algorithmic feeds, paywalled newsletters, and opaque ranking algorithms.
          </p>
          <p>
            <strong className="text-on-surface">The Pinboard</strong> revives the physical bulletin board in a digital glacier matrix:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-surface-container-lowest/80 border border-surface-variant/30">
              <div className="flex items-center gap-2 font-mono text-primary text-xs font-bold mb-1">
                <span className="material-symbols-outlined text-[16px]">lock_open</span>
                <span>Zero-Auth Pinning</span>
              </div>
              <p className="text-xs text-on-surface-variant/80">
                No sign-up wall, no password, no tracking cookies. Anyone can post an honest indie tool directly to the wall.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-lowest/80 border border-surface-variant/30">
              <div className="flex items-center gap-2 font-mono text-tertiary text-xs font-bold mb-1">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>Perforated Tear Slips</span>
              </div>
              <p className="text-xs text-on-surface-variant/80">
                Just like physical street flyers, grab beta coupon codes, repo links, or support the creator with a single click.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-lowest/80 border border-surface-variant/30">
              <div className="flex items-center gap-2 font-mono text-emerald-400 text-xs font-bold mb-1">
                <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                <span>100% Direct Micro-Grants</span>
              </div>
              <p className="text-xs text-on-surface-variant/80">
                Zero platform cut on builder tips. Direct indie patron support fuels ongoing open-source development.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-lowest/80 border border-surface-variant/30">
              <div className="flex items-center gap-2 font-mono text-secondary text-xs font-bold mb-1">
                <span className="material-symbols-outlined text-[16px]">view_quilt</span>
                <span>Mondrian Asymmetry</span>
              </div>
              <p className="text-xs text-on-surface-variant/80">
                A dynamic visual grid pairing varying tile weights (Hero 2x2, Tall 1x2, Wide 2x1) with frozen glassmorphism.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-surface-variant/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-headline font-semibold text-xs tracking-wider uppercase transition-all"
          >
            Acknowledge &amp; Return
          </button>
        </div>
      </div>
    </div>
  );
};
