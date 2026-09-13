import React from 'react';

interface ToastNotificationProps {
  message: string | null;
  visible: boolean;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message, visible }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 pointer-events-none px-4 py-3 rounded-xl bg-[#1a2438]/95 border border-[#7dd3fc]/30 text-on-surface text-xs font-mono shadow-2xl flex items-center gap-2.5 backdrop-blur-xl ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <span className="material-symbols-outlined text-primary text-[18px]">
        check_circle
      </span>
      <span>{message}</span>
    </div>
  );
};
