import React from 'react';
import { APP_CONFIG } from '../config/constants';
import { PlayCircle, ArrowRight, Lock, Sparkles } from 'lucide-react';

export const MiniCourseBridge: React.FC = () => {
  const hasCourseUrl = Boolean(APP_CONFIG.MINI_COURSE_URL && APP_CONFIG.MINI_COURSE_URL.trim() !== '');

  return (
    <section className="bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15] rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        {/* Subtle badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#040405] border border-[#4A2F15] text-[11px] font-semibold text-[#F5BF1E]">
          <span>الخطوة التالية في بناء البيزنس</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA] leading-tight">
          الأرقام قالتلك <span className="text-[#F5BF1E]">"إيه"</span>… دلوقتي افهم <span className="text-[#F5BF1E]">"إزاي"</span>
        </h2>

        {/* Copy */}
        <div className="text-xs sm:text-sm text-[#C8C5BA] leading-relaxed space-y-3 font-normal max-w-2xl mx-auto">
          <p>
            الحاسبة دي بتوريك الرياضيات وراء Affiliate Marketing (التسويق بالعمولة). لكن الأرقام لوحدها مش بتبني المشروع.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 py-2 text-xs font-medium text-[#FCFCFA]">
            <span className="px-2.5 py-1 bg-[#040405] rounded border border-[#4A2F15]">السوق</span>
            <span className="text-[#A7690C]">•</span>
            <span className="px-2.5 py-1 bg-[#040405] rounded border border-[#4A2F15]">الجمهور</span>
            <span className="text-[#A7690C]">•</span>
            <span className="px-2.5 py-1 bg-[#040405] rounded border border-[#4A2F15]">المشكلة</span>
            <span className="text-[#A7690C]">•</span>
            <span className="px-2.5 py-1 bg-[#040405] rounded border border-[#4A2F15]">العرض</span>
            <span className="text-[#A7690C]">•</span>
            <span className="px-2.5 py-1 bg-[#040405] rounded border border-[#4A2F15]">الفانل</span>
            <span className="text-[#A7690C]">•</span>
            <span className="px-2.5 py-1 bg-[#040405] rounded border border-[#4A2F15]">الترافيك</span>
          </div>
          <p>
            وتستخدم الأرقام دي عشان تتعلم وتوسع. أنا عامل ميني كورس مجاني من 3 فيديوهات بيرتبلك الصورة بالكامل من البداية.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          {hasCourseUrl ? (
            <a
              href={APP_CONFIG.MINI_COURSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F5BF1E] hover:bg-[#FBD052] text-[#040405] font-bold text-base rounded-lg shadow-lg hover:shadow-[#F5BF1E]/20 transition-all cursor-pointer"
            >
              <span>ابدأ الميني كورس مجانًا</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </a>
          ) : (
            <div className="inline-flex flex-col items-center">
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#4A2F15]/40 text-[#797979] font-medium text-sm rounded-lg border border-[#4A2F15] cursor-not-allowed opacity-80"
              >
                <Lock className="w-4 h-4" />
                <span>ابدأ الميني كورس مجانًا</span>
              </button>
              <span className="text-[11px] text-[#A7690C] mt-2">
                سيتم إضافة رابط الميني كورس هنا
              </span>
            </div>
          )}
        </div>

        {/* R.B.T.L.S Visual Connection */}
        <div className="pt-6 mt-6 border-t border-[#4A2F15]/40">
          <div className="text-[11px] font-bold text-[#797979] uppercase tracking-wider mb-3">
            نظام R.B.T.L.S لبناء بيزنس الأفلييت
          </div>

          <div className="grid grid-cols-5 gap-2 max-w-xl mx-auto">
            {/* R */}
            <div className="p-2 bg-[#040405] rounded border border-[#4A2F15] text-center">
              <div className="text-base font-black text-[#C8C5BA]">R</div>
              <div className="text-[10px] text-[#FCFCFA] font-medium">Research</div>
              <div className="text-[9px] text-[#797979]">ابحث</div>
            </div>

            {/* B */}
            <div className="p-2 bg-[#040405] rounded border border-[#4A2F15] text-center">
              <div className="text-base font-black text-[#C8C5BA]">B</div>
              <div className="text-[10px] text-[#FCFCFA] font-medium">Build</div>
              <div className="text-[9px] text-[#797979]">ابنِ</div>
            </div>

            {/* T */}
            <div className="p-2 bg-[#040405] rounded border border-[#4A2F15] text-center">
              <div className="text-base font-black text-[#C8C5BA]">T</div>
              <div className="text-[10px] text-[#FCFCFA] font-medium">Traffic</div>
              <div className="text-[9px] text-[#797979]">اجلب الترافيك</div>
            </div>

            {/* L (Highlighted!) */}
            <div className="p-2 bg-[#23170D] rounded border border-[#F5BF1E] text-center shadow-md">
              <div className="text-base font-black text-[#F5BF1E]">L</div>
              <div className="text-[10px] text-[#F5BF1E] font-bold">Learn</div>
              <div className="text-[9px] text-[#FBD052]">تعلم</div>
            </div>

            {/* S */}
            <div className="p-2 bg-[#040405] rounded border border-[#4A2F15] text-center">
              <div className="text-base font-black text-[#C8C5BA]">S</div>
              <div className="text-[10px] text-[#FCFCFA] font-medium">Scale</div>
              <div className="text-[9px] text-[#797979]">وسع</div>
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-[#C8C5BA] mt-3">
            الأرقام اللي حسبتها هنا جزء من <strong className="text-[#F5BF1E]">Learn (التعلم)</strong> قبل <strong className="text-[#FCFCFA]">Scale (التوسع)</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};
