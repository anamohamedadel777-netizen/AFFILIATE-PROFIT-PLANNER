import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-10 pb-8 sm:pt-14 sm:pb-10 border-b border-[#4A2F15]/40 bg-gradient-to-b from-[#040405] via-[#040405] to-[#23170D]/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Small label */}
        <div className="inline-block mb-3 text-[11px] sm:text-xs font-semibold tracking-widest text-[#F5BF1E] uppercase">
          AFFILIATE PROFIT PLANNER • مخطط أرباح الأفلييت
        </div>

        {/* Main Arabic headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#FCFCFA] leading-tight tracking-tight mb-5">
          حوّل أهداف أرباح الأفلييت إلى{' '}
          <span className="text-[#F5BF1E] underline decoration-[#A7690C]/60 decoration-2 underline-offset-8">
            أرقام حقيقية
          </span>
        </h1>

        {/* Supporting text */}
        <div className="text-sm sm:text-base text-[#C8C5BA] max-w-2xl mx-auto space-y-2 leading-relaxed mb-6 font-normal">
          <p>
            بدل ما تسأل: <span className="text-[#FCFCFA] font-medium">"إزاي أعمل 1000$ أو 5000$ من الأفلييت؟"</span> خلّي الأرقام تجاوبك.
          </p>
          <p className="text-xs sm:text-sm text-[#C8C5BA]/90">
            احسب عدد المبيعات والزيارات المطلوبة، العمولة المتوقعة، نقطة التعادل (Break-Even)، وأقصى CPC وCPA تقدر تتحملهم.
          </p>
        </div>

        {/* Trust Statement */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2 px-4 rounded-md bg-[#23170D]/70 border border-[#4A2F15] text-xs sm:text-sm text-[#FCFCFA]">
          <span className="text-[#C8C5BA]">لا وعود أرباح</span>
          <span className="text-[#A7690C]" aria-hidden="true">•</span>
          <span className="text-[#C8C5BA]">لا أرقام سحرية</span>
          <span className="text-[#A7690C]" aria-hidden="true">•</span>
          <span className="text-[#F5BF1E] font-medium">مجرد Math (حسابات) تساعدك تاخد قرارات أفضل</span>
        </div>
      </div>
    </section>
  );
};
