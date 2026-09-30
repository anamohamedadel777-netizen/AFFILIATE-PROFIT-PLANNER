import React from 'react';
import { CalculationResults, CalculatorInputs, formatCurrency, formatNumber, formatPercent } from '../utils/calculator';
import { CurrencyOption } from '../config/constants';
import { Tooltip } from './Tooltip';
import { TrendingUp, Users, DollarSign, Target, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

interface ResultDashboardProps {
  results: CalculationResults;
  inputs: CalculatorInputs;
  currency: CurrencyOption;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ results, inputs, currency }) => {
  const {
    commissionPerSale,
    expectedSales,
    isSalesFractional,
    grossCommission,
    actualCPC,
    actualCPA,
    netProfit,
    roi,
    breakEvenCPA,
    breakEvenCPC,
    expectedValuePerVisitor,
    netValuePerVisitor,
    profitStatus,
  } = results;

  return (
    <section id="results" className="space-y-6">
      {/* Dashboard Top Header & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-[#4A2F15]/40">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#FCFCFA] flex items-center gap-2">
            <span>صورتك بالأرقام</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#C8C5BA] mt-0.5">
            نتائج تقديرية ناتجة عن حسابات إحصائية ومالية مباشرة مبنية على مدخلاتك.
          </p>
        </div>

        {/* Status Badge using restrained brand palette */}
        <div className="flex items-center gap-2">
          {profitStatus === 'above_break_even' && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#23170D] border border-[#F5BF1E]/40 text-[#F5BF1E] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#F5BF1E] animate-pulse" />
              <span>فوق نقطة التعادل</span>
            </div>
          )}
          {profitStatus === 'at_break_even' && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#23170D] border border-[#FBD052]/30 text-[#FBD052] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#FBD052]" />
              <span>قريب من نقطة التعادل</span>
            </div>
          )}
          {profitStatus === 'below_break_even' && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#23170D] border border-[#4A2F15] text-[#C8C5BA] text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#A7690C]" />
              <span>تحت نقطة التعادل</span>
            </div>
          )}
        </div>
      </div>

      {/* Primary KPI Cards Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: Expected Sales */}
        <div className="bg-[#23170D]/70 border border-[#4A2F15] rounded-xl p-5 hover:border-[#4A2F15]/90 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#C8C5BA] mb-2 font-medium">
              <div className="flex items-center gap-1.5">
                <span>المبيعات المتوقعة</span>
                <Tooltip
                  content="عدد المبيعات المقدر إحصائيًا من إجمالي الزيارات ومعدل التحويل. قد يكون رقمًا عشريًا لأنه تقدير احتمالي."
                  termAr="المبيعات المتوقعة"
                  termEn="Expected Sales"
                />
              </div>
              <span className="text-[10px] text-[#797979]">Sales</span>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA] tabular-numbers my-1">
              {isSalesFractional ? (
                <div className="flex flex-col">
                  <span>≈ {formatNumber(expectedSales, 2)}</span>
                  <span className="text-[11px] font-normal text-[#C8C5BA] mt-0.5">
                    مبيعة متوقعة إحصائيًا
                  </span>
                </div>
              ) : (
                <span>{formatNumber(expectedSales, 0)} مبيعة</span>
              )}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#4A2F15]/50 text-[11px] text-[#C8C5BA]">
            من إجمالي {inputs.visitors.toLocaleString()} زائر بنسبة {inputs.conversionRate}%
          </div>
        </div>

        {/* CARD 2: Gross Commission Revenue */}
        <div className="bg-[#23170D]/70 border border-[#4A2F15] rounded-xl p-5 hover:border-[#4A2F15]/90 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#C8C5BA] mb-2 font-medium">
              <div className="flex items-center gap-1.5">
                <span>إجمالي العمولات المتوقع</span>
                <Tooltip
                  content="إجمالي الإيراد الإجمالي للعمولات (Expected Commission Revenue) = المبيعات المتوقعة × العمولة لكل مبيعة، قبل خصم أي تكاليف إعلانية."
                  termAr="إجمالي العمولات"
                  termEn="Gross Commission"
                />
              </div>
              <span className="text-[10px] text-[#797979]">Revenue</span>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA] tabular-numbers my-1">
              {formatCurrency(grossCommission, currency.symbol)}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#4A2F15]/50 text-[11px] text-[#C8C5BA]">
            عمولة {formatCurrency(commissionPerSale, currency.symbol)} لكل مبيعة
          </div>
        </div>

        {/* CARD 3: Projected Net Profit */}
        <div className="bg-[#23170D]/70 border border-[#4A2F15] rounded-xl p-5 hover:border-[#F5BF1E]/40 transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#F5BF1E]/5 rounded-bl-full pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-xs text-[#C8C5BA] mb-2 font-medium">
              <div className="flex items-center gap-1.5">
                <span>صافي الربح المتوقع</span>
                <Tooltip
                  content="العمولات المتوقعة - ميزانية الإعلانات. هذا الرقم لا يشمل الضرائب، اشتراكات الأدوات والبرمجيات، الاسترجاعات، رسوم بوابات الدفع أو أي نفقات تشغيلية أخرى."
                  termAr="صافي الربح"
                  termEn="Net Profit"
                />
              </div>
              <span className="text-[10px] text-[#797979]">Profit</span>
            </div>

            <div
              className={`text-2xl sm:text-3xl font-black tabular-numbers my-1 ${
                netProfit > 0.01
                  ? 'text-[#F5BF1E]'
                  : netProfit < -0.01
                  ? 'text-[#C8C5BA]'
                  : 'text-[#FCFCFA]'
              }`}
            >
              {formatCurrency(netProfit, currency.symbol)}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#4A2F15]/50 text-[11px] text-[#C8C5BA]">
            {inputs.adBudget > 0 ? (
              <span>بعد خصم إعلانات {formatCurrency(inputs.adBudget, currency.symbol)}</span>
            ) : (
              <span>سيناريو عضوي (بدون تكلفة إعلانية)</span>
            )}
          </div>
        </div>

        {/* CARD 4: ROI */}
        <div className="bg-[#23170D]/70 border border-[#4A2F15] rounded-xl p-5 hover:border-[#4A2F15]/90 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#C8C5BA] mb-2 font-medium">
              <div className="flex items-center gap-1.5">
                <span>ROI (العائد على الإنفاق)</span>
                <Tooltip
                  content="العائد على الاستثمار الإعلاني = (صافي الربح ÷ ميزانية الإعلانات) × 100."
                  termAr="العائد على الاستثمار"
                  termEn="ROI (Return on Investment)"
                />
              </div>
              <span className="text-[10px] text-[#797979]">%</span>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA] tabular-numbers my-1">
              {roi !== null ? (
                <span className={roi > 0 ? 'text-[#F5BF1E]' : 'text-[#C8C5BA]'}>
                  {formatPercent(roi, 1)}
                </span>
              ) : (
                <div className="text-xs font-normal text-[#C8C5BA] leading-tight">
                  غير قابل للحساب بدون تكلفة إعلانية
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#4A2F15]/50 text-[11px] text-[#C8C5BA]">
            {roi !== null ? (
              <span>لكل 1 {currency.symbol} إعلانات يعود {((grossCommission / (inputs.adBudget || 1))).toFixed(2)} {currency.symbol}</span>
            ) : (
              <span>ترافيك عضوي بالكامل</span>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Metrics Panel */}
      <div className="bg-[#040405] border border-[#4A2F15] rounded-xl p-5">
        <h3 className="text-xs font-bold text-[#F5BF1E] uppercase tracking-wider mb-4 pb-2 border-b border-[#4A2F15]/60 flex items-center justify-between">
          <span>المؤشرات الاقتصادية ونقاط التعادل (Break-Even)</span>
          <span className="text-[11px] text-[#797979] font-normal normal-case">معادلات الوحدة الاقتصادية (Unit Economics)</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* 1. Commission Per Sale */}
          <div className="p-3 bg-[#23170D]/40 rounded-lg border border-[#4A2F15]/60">
            <div className="text-[11px] text-[#C8C5BA] flex items-center justify-between mb-1">
              <span>العمولة لكل مبيعة</span>
              <Tooltip
                content="صافي العمولة التي يمنحها العرض عن كل مبيعة."
                termAr="العمولة لكل مبيعة"
                termEn="Commission Per Sale"
              />
            </div>
            <div className="text-base font-bold text-[#FCFCFA] tabular-numbers">
              {formatCurrency(commissionPerSale, currency.symbol)}
            </div>
          </div>

          {/* 2. Current CPC */}
          <div className="p-3 bg-[#23170D]/40 rounded-lg border border-[#4A2F15]/60">
            <div className="text-[11px] text-[#C8C5BA] flex items-center justify-between mb-1">
              <span>CPC الحالي</span>
              <Tooltip
                content="تكلفة النقرة الفعلية بناءً على ميزانية الإعلانات مقسومة على الزيارات المدخلة."
                termAr="تكلفة النقرة"
                termEn="CPC (Cost Per Click)"
              />
            </div>
            <div className="text-base font-bold text-[#FCFCFA] tabular-numbers">
              {actualCPC !== null ? (
                formatCurrency(actualCPC, currency.symbol, 3)
              ) : (
                <span className="text-xs text-[#797979] font-normal">ترافيك عضوي</span>
              )}
            </div>
          </div>

          {/* 3. Expected CPA */}
          <div className="p-3 bg-[#23170D]/40 rounded-lg border border-[#4A2F15]/60">
            <div className="text-[11px] text-[#C8C5BA] flex items-center justify-between mb-1">
              <span>CPA الحالي المتوقع</span>
              <Tooltip
                content="تكلفة اكتساب مبيعة واحدة = ميزانية الإعلانات ÷ عدد المبيعات المتوقعة."
                termAr="تكلفة اكتساب المبيعة"
                termEn="CPA (Cost Per Acquisition)"
              />
            </div>
            <div className="text-base font-bold text-[#FCFCFA] tabular-numbers">
              {actualCPA !== null ? (
                formatCurrency(actualCPA, currency.symbol)
              ) : (
                <span className="text-xs text-[#797979] font-normal">ترافيك عضوي</span>
              )}
            </div>
          </div>

          {/* 4. Break-Even CPC */}
          <div className="p-3 bg-[#23170D]/40 rounded-lg border border-[#F5BF1E]/30 relative">
            <div className="text-[11px] text-[#F5BF1E] font-medium flex items-center justify-between mb-1">
              <span>أقصى CPC تعادل</span>
              <Tooltip
                content="ده أقصى متوسط تكلفة للنقرة قبل ما العمولة الإعلانية المتوقعة توصل لنقطة التعادل، بافتراض ثبات معدل التحويل وعدم وجود تكاليف إضافية."
                termAr="أقصى CPC عند التعادل"
                termEn="Break-Even CPC"
              />
            </div>
            <div className="text-base font-black text-[#F5BF1E] tabular-numbers">
              {formatCurrency(breakEvenCPC, currency.symbol, 3)}
            </div>
          </div>

          {/* 5. Break-Even CPA */}
          <div className="p-3 bg-[#23170D]/40 rounded-lg border border-[#F5BF1E]/30">
            <div className="text-[11px] text-[#F5BF1E] font-medium flex items-center justify-between mb-1">
              <span>أقصى CPA تعادل</span>
              <Tooltip
                content="لو تكلفة الحصول على مبيعة واحدة أعلى من الرقم ده، فأنت غالبًا بتدفع في الإعلان أكتر من العمولة اللي بتحصل عليها — قبل احتساب أي تكاليف إضافية."
                termAr="أقصى CPA عند التعادل"
                termEn="Break-Even CPA"
              />
            </div>
            <div className="text-base font-black text-[#F5BF1E] tabular-numbers">
              {formatCurrency(breakEvenCPA, currency.symbol)}
            </div>
          </div>

          {/* 6. Expected Value Per Visitor (EPV) */}
          <div className="p-3 bg-[#23170D]/40 rounded-lg border border-[#4A2F15]/60">
            <div className="text-[11px] text-[#C8C5BA] flex items-center justify-between mb-1">
              <span>قيمة الزائر (EPV)</span>
              <Tooltip
                content="Expected Value Per Visitor = العمولة لكل مبيعة × معدل التحويل. القيمة الإجمالية التي يولدها كل زائر للعرض إحصائيًا."
                termAr="قيمة الزائر المتوقعة"
                termEn="EPV (Expected Value Per Visitor)"
              />
            </div>
            <div className="text-base font-bold text-[#FCFCFA] tabular-numbers">
              {formatCurrency(expectedValuePerVisitor, currency.symbol, 3)}
            </div>
            {actualCPC !== null && (
              <div className="text-[10px] text-[#C8C5BA] mt-0.5 pt-0.5 border-t border-[#4A2F15]/40 tabular-numbers">
                الصافي: {formatCurrency(netValuePerVisitor, currency.symbol, 3)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightweight Visual Flow: "من الزيارات إلى الربح" */}
      <div className="bg-[#23170D]/40 border border-[#4A2F15] rounded-xl p-5">
        <h3 className="text-xs font-bold text-[#C8C5BA] mb-3">
          تسلسل التحويل من الزيارة إلى صافي الربح
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-[#040405] rounded-lg border border-[#4A2F15]/70">
            <div className="text-[10px] text-[#797979] uppercase font-semibold">1. الزيارات (Traffic)</div>
            <div className="text-lg font-bold text-[#FCFCFA] my-1 tabular-numbers">
              {inputs.visitors.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#C8C5BA]">نقرة أو زائر</div>
          </div>

          <div className="p-3 bg-[#040405] rounded-lg border border-[#4A2F15]/70">
            <div className="text-[10px] text-[#797979] uppercase font-semibold">2. المبيعات (Sales)</div>
            <div className="text-lg font-bold text-[#FCFCFA] my-1 tabular-numbers">
              {formatNumber(expectedSales, 1)}
            </div>
            <div className="text-[11px] text-[#C8C5BA]">بمعدل {inputs.conversionRate}%</div>
          </div>

          <div className="p-3 bg-[#040405] rounded-lg border border-[#4A2F15]/70">
            <div className="text-[10px] text-[#797979] uppercase font-semibold">3. العمولات (Revenue)</div>
            <div className="text-lg font-bold text-[#FCFCFA] my-1 tabular-numbers">
              {formatCurrency(grossCommission, currency.symbol)}
            </div>
            <div className="text-[11px] text-[#C8C5BA]">إجمالي العمولات</div>
          </div>

          <div className="p-3 bg-[#040405] rounded-lg border border-[#4A2F15]/70 relative overflow-hidden">
            <div className="text-[10px] text-[#797979] uppercase font-semibold">4. صافي الربح (Profit)</div>
            <div
              className={`text-lg font-black my-1 tabular-numbers ${
                netProfit > 0 ? 'text-[#F5BF1E]' : 'text-[#FCFCFA]'
              }`}
            >
              {formatCurrency(netProfit, currency.symbol)}
            </div>
            <div className="text-[11px] text-[#C8C5BA]">
              {inputs.adBudget > 0 ? `بعد الإعلانات` : 'ترافيك عضوي'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
