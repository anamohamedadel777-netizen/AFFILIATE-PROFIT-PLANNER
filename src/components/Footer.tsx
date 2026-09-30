import React from 'react';
import { APP_CONFIG } from '../config/constants';
import { ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-[#4A2F15]/60 bg-[#040405] pt-10 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-center">
        {/* Mandatory Educational Disclaimer */}
        <div className="p-4 sm:p-5 rounded-lg bg-[#23170D]/40 border border-[#4A2F15] text-right text-xs leading-relaxed text-[#C8C5BA]">
          <div className="flex items-center gap-2 mb-1.5 text-[#F5BF1E] font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>إخلاء مسؤولية قانوني وتعليمي:</span>
          </div>
          <p>
            تنبيه: النتائج تقديرية مبنية على الأرقام التي تدخلها. الأداء الفعلي قد يختلف بسبب جودة الترافيك، العرض، صفحة البيع، الاسترجاعات، التكاليف، وسلوك العملاء. الأداة تعليمية وليست وعدًا أو ضمانًا بأي مستوى من الأرباح.
          </p>
        </div>

        {/* Brand & Taglines */}
        <div className="space-y-2">
          <div className="text-lg font-extrabold text-[#FCFCFA] tracking-wide">
            {APP_CONFIG.brandName}
          </div>
          <div className="text-xs sm:text-sm text-[#F5BF1E] font-medium">
            {APP_CONFIG.brandTaglineAr}
          </div>
          <div className="text-xs text-[#797979] font-mono">
            {APP_CONFIG.brandTaglineEn}
          </div>
        </div>

        {/* Minimal Copyright */}
        <div className="text-[11px] text-[#797979] pt-4 border-t border-[#4A2F15]/30">
          © {new Date().getFullYear()} AFFILIATE PROFIT PLANNER • جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
};
