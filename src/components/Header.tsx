import React from 'react';
import { RotateCcw } from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="w-full border-b border-[#4A2F15]/60 bg-[#040405]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand title, one line */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="text-base sm:text-lg font-bold tracking-tight text-[#FCFCFA] hover:text-[#F5BF1E] transition-colors whitespace-nowrap"
          >
            <span>AFFILIATE PROFIT PLANNER</span>
            <span className="hidden sm:inline mr-2 text-xs font-normal text-[#C8C5BA]">
              | {APP_CONFIG.brandName}
            </span>
          </a>
        </div>

        {/* Zone 2: Nav links, clean typography */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-[#C8C5BA]">
          <a href="#calculator" className="hover:text-[#F5BF1E] transition-colors">
            الحاسبة
          </a>
          <a href="#results" className="hover:text-[#F5BF1E] transition-colors">
            صورتك بالأرقام
          </a>
          <a href="#target-planner" className="hover:text-[#F5BF1E] transition-colors">
            تخطيط الهدف
          </a>
          <a href="#diagnostic" className="hover:text-[#F5BF1E] transition-colors">
            التشخيص
          </a>
          <a href="#simulator" className="hover:text-[#F5BF1E] transition-colors">
            المحاكي
          </a>
        </nav>

        {/* Zone 3: Reset action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#C8C5BA] hover:text-[#FCFCFA] bg-[#23170D] hover:bg-[#4A2F15] border border-[#4A2F15] rounded transition-all cursor-pointer whitespace-nowrap"
            title="إعادة ضبط المدخلات إلى القيم الافتراضية"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#F5BF1E]" />
            <span>ابدأ حساب جديد</span>
          </button>
        </div>
      </div>
    </header>
  );
};
