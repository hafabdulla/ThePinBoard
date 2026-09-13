import React, { useState, useEffect } from 'react';
import { ProjectPin } from '../types';

interface TipModalProps {
  project: ProjectPin | null;
  isOpen: boolean;
  onClose: () => void;
  onSendTip: (projectId: string, amount: number, message: string) => void;
  initialAmount?: number;
}

export const TipModal: React.FC<TipModalProps> = ({
  project,
  isOpen,
  onClose,
  onSendTip,
  initialAmount = 5,
}) => {
  const [activeTier, setActiveTier] = useState<number>(initialAmount);
  const [cheerMessage, setCheerMessage] = useState<string>('');

  useEffect(() => {
    if (initialAmount) {
      setActiveTier(initialAmount);
    }
  }, [initialAmount, project]);

  if (!isOpen || !project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendTip(project.id, activeTier, cheerMessage.trim() || 'Keep shipping indie software!');
    setCheerMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl transition-all duration-300 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md p-6 sm:p-7 rounded-2xl bg-surface-container/95 border border-[#7dd3fc]/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-surface-variant/40">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_12px_#7dd3fc]"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Direct Indie Support
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Project Target Info */}
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
              {project.categoryLabel || project.category}
            </span>
            <h3 className="text-xl font-headline font-bold text-on-surface mt-0.5">
              {project.title}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              100% of this micro-grant routes directly to the indie builder without platform cuts or intermediary fees.
            </p>
          </div>

          {/* Preset Tip Tiers */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setActiveTier(3)}
              className={`py-3 px-2 rounded-xl transition-all text-center flex flex-col items-center gap-1 border ${
                activeTier === 3
                  ? 'bg-primary-container text-on-primary-container border-primary/50 shadow-[0_0_15px_rgba(125,211,252,0.25)]'
                  : 'bg-surface-container-low hover:bg-surface-container-high border-surface-variant/50 text-on-surface'
              }`}
            >
              <span className="text-base font-bold">$3</span>
              <span className={`text-[10px] font-mono ${activeTier === 3 ? 'text-primary' : 'text-on-surface-variant'}`}>
                Cold Brew
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTier(5)}
              className={`py-3 px-2 rounded-xl transition-all text-center flex flex-col items-center gap-1 border ${
                activeTier === 5
                  ? 'bg-primary-container text-on-primary-container border-primary/50 shadow-[0_0_15px_rgba(125,211,252,0.25)]'
                  : 'bg-surface-container-low hover:bg-surface-container-high border-surface-variant/50 text-on-surface'
              }`}
            >
              <span className="text-base font-bold">$5</span>
              <span className={`text-[10px] font-mono ${activeTier === 5 ? 'text-primary' : 'text-on-surface-variant'}`}>
                High Five
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTier(12)}
              className={`py-3 px-2 rounded-xl transition-all text-center flex flex-col items-center gap-1 border ${
                activeTier === 12
                  ? 'bg-primary-container text-on-primary-container border-primary/50 shadow-[0_0_15px_rgba(125,211,252,0.25)]'
                  : 'bg-surface-container-low hover:bg-surface-container-high border-surface-variant/50 text-on-surface'
              }`}
            >
              <span className="text-base font-bold">$12</span>
              <span className={`text-[10px] font-mono ${activeTier === 12 ? 'text-primary' : 'text-on-surface-variant'}`}>
                Server Fuel
              </span>
            </button>
          </div>

          {/* Cheer Message Field */}
          <div className="flex flex-col gap-2 pt-2">
            <label className="text-[11px] font-mono text-on-surface-variant font-medium">
              Leave a cheer message (optional)
            </label>
            <input
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-lowest/90 border border-surface-variant/60 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/70 focus:ring-1 focus:ring-primary/40 font-body transition-all"
              placeholder="Love the design! Keep shipping..."
              type="text"
              value={cheerMessage}
              onChange={(e) => setCheerMessage(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-white text-on-primary font-headline font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_22px_rgba(125,211,252,0.35)] hover:shadow-[0_0_28px_rgba(125,211,252,0.5)] transition-all mt-2 active:scale-98"
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>SEND ${activeTier} DIRECT TIP</span>
          </button>
        </div>
      </div>
    </div>
  );
};
