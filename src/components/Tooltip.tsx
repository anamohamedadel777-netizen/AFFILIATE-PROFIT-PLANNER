import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  termEn?: string;
  termAr?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, termEn, termAr }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-flex items-center" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-[#797979] hover:text-[#F5BF1E] transition-colors p-1 rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F5BF1E]"
        aria-label="معلومات إضافية"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div
          role="tooltip"
          className="absolute z-50 bottom-full mb-2 right-1/2 translate-x-1/2 w-64 max-w-xs p-3 bg-[#23170D] border border-[#4A2F15] shadow-xl text-right rounded-md text-xs leading-relaxed text-[#FCFCFA] pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95"
        >
          {(termEn || termAr) && (
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#4A2F15] text-[11px] font-semibold">
              <span className="text-[#F5BF1E]">{termAr}</span>
              <span className="text-[#C8C5BA] font-mono">{termEn}</span>
            </div>
          )}
          <p className="text-[#C8C5BA]">{content}</p>
        </div>
      )}
    </div>
  );
};
