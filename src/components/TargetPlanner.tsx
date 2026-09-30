import React, { useState } from 'react';
import {
  CalculationResults,
  CalculatorInputs,
  calculateTargetBreakdown,
  formatCurrency,
  formatNumber,
} from '../utils/calculator';
import { APP_CONFIG, CurrencyOption } from '../config/constants';
import { Target, ArrowDown, AlertOctagon, HelpCircle, Layers, TrendingUp } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface TargetPlannerProps {
  inputs: CalculatorInputs;
  results: CalculationResults;
  currency: CurrencyOption;
}

export const TargetPlanner: React.FC<TargetPlannerProps> = ({ inputs, results, currency }) => {
  const [targetType, setTargetType] = useState<'gross' | 'net'>('gross');
  const [selectedPreset, setSelectedPreset] = useState<number | 'custom'>(1000);
  const [customTarget, setCustomTarget] = useState<number>(2500);

  const activeTargetAmount = selectedPreset === 'custom' ? customTarget : selectedPreset;

  const targetAnalysis = calculateTargetBreakdown(activeTargetAmount, targetType, inputs, results);

  return (
    <section
      id="target-planner"
      className="bg-[#23170D]/60 border border-[#4A2F15] rounded-xl p-5 sm:p-7 shadow-xl space-y-6"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Target className="w-5 h-5 text-[#F5BF1E]" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#FCFCFA]">
            طيب لو هدفك رقم معين؟
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#C8C5BA]">
          اختار هدفك وشوف الرياضيات اللي وراه، بدل ما تفترض أرقام غير واقعية.
        </p>
      </div>

      {/* Target Type & Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-[#4A2F15]/50">
        {/* Target Type Selector */}
        <div>
          <label className="block text-xs font-semibold text-[#FCFCFA] mb-2">
            نوع الهدف المالي:
          </label>
          <div className="grid grid-cols-2 gap-2 bg-[#040405] p-1 rounded-lg border border-[#4A2F15]">
            <button
              type="button"
              onClick={() => setTargetType('gross')}
              className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                targetType === 'gross'
                  ? 'bg-[#F5BF1E] text-[#040405] font-bold shadow-sm'
                  : 'text-[#C8C5BA] hover:text-[#FCFCFA]'
              }`}
            >
              هدفي إجمالي عمولات
            </button>
            <button
              type="button"
              onClick={() => setTargetType('net')}
              className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                targetType === 'net'
                  ? 'bg-[#F5BF1E] text-[#040405] font-bold shadow-sm'
                  : 'text-[#C8C5BA] hover:text-[#FCFCFA]'
              }`}
            >
              هدفي صافي ربح
            </button>
          </div>
        </div>

        {/* Target Presets & Custom Input */}
        <div>
          <label className="block text-xs font-semibold text-[#FCFCFA] mb-2">
            المبلغ المستهدف:
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {APP_CONFIG.targetPresets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setSelectedPreset(preset)}
                className={`flex-1 min-w-[70px] py-2 px-3 text-xs sm:text-sm font-bold rounded-md border transition-all cursor-pointer tabular-numbers ${
                  selectedPreset === preset
                    ? 'bg-[#F5BF1E] text-[#040405] border-[#F5BF1E] shadow-sm'
                    : 'bg-[#040405] text-[#FCFCFA] border-[#4A2F15] hover:border-[#A7690C]'
                }`}
              >
                {preset.toLocaleString()} {currency.symbol}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSelectedPreset('custom')}
              className={`flex-1 min-w-[80px] py-2 px-3 text-xs sm:text-sm font-medium rounded-md border transition-all cursor-pointer ${
                selectedPreset === 'custom'
                  ? 'bg-[#F5BF1E] text-[#040405] font-bold border-[#F5BF1E]'
                  : 'bg-[#040405] text-[#C8C5BA] border-[#4A2F15] hover:text-[#FCFCFA]'
              }`}
            >
              هدف مخصص
            </button>
          </div>

          {selectedPreset === 'custom' && (
            <div className="mt-2.5 relative">
              <input
                type="number"
                min="1"
                step="any"
                value={customTarget === 0 ? '' : customTarget}
                onChange={(e) => setCustomTarget(parseFloat(e.target.value) || 0)}
                placeholder="2500"
                className="w-full bg-[#040405] border border-[#F5BF1E] focus:ring-1 focus:ring-[#F5BF1E] rounded-md px-3 py-2 text-sm text-[#FCFCFA] tabular-numbers outline-none"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#F5BF1E] font-medium">
                {currency.symbol}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Target Math Output Breakdown */}
      {targetAnalysis.status === 'impossible_negative_unit_economics' ? (
        <div className="p-4 sm:p-5 bg-[#040405] border border-[#A7690C] rounded-lg space-y-3">
          <div className="flex items-start gap-2.5 text-[#F5BF1E]">
            <AlertOctagon className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-[#FCFCFA]">
                بالأرقام الحالية، كل زيارة إعلانية لا تحقق صافي قيمة إيجابية
              </h4>
              <p className="text-xs text-[#C8C5BA] mt-1 leading-relaxed">
                لذلك زيادة عدد الزيارات وحدها لن توصلك لهدف الربح، بل ستضاعف خسارتك المالية.
              </p>
            </div>
          </div>

          <div className="p-3 bg-[#23170D] rounded border border-[#4A2F15] text-xs text-[#FCFCFA] space-y-1.5">
            <div className="font-semibold text-[#F5BF1E]">ما الذي يجب فعله قبل التوسع؟</div>
            <ul className="list-disc list-inside space-y-1 text-[#C8C5BA]">
              <li>
                ترفع <span className="text-[#FCFCFA] font-medium">Conversion Rate (معدل التحويل)</span> لصفحة الهبوط.
              </li>
              <li>
                أو تختار عرضًا يمنح <span className="text-[#FCFCFA] font-medium">Commission Per Sale (عمولة أعلى)</span>.
              </li>
              <li>
                أو تخفض <span className="text-[#FCFCFA] font-medium">CPC (تكلفة النقرة)</span> عبر استهداف إعلاني أفضل.
              </li>
            </ul>
          </div>
        </div>
      ) : targetAnalysis.status === 'invalid_input' ? (
        <div className="p-4 bg-[#040405] border border-[#4A2F15] rounded-lg text-xs text-[#C8C5BA]">
          {targetAnalysis.statusExplanation}
        </div>
      ) : (
        <div className="space-y-5">
          {/* Summary Box */}
          <div className="p-4 sm:p-5 bg-[#040405] border border-[#4A2F15] rounded-lg">
            <div className="text-xs sm:text-sm text-[#C8C5BA] mb-3">
              للوصول إلى هدف{' '}
              <span className="text-[#F5BF1E] font-bold tabular-numbers">
                {formatCurrency(activeTargetAmount, currency.symbol)}
              </span>{' '}
              ({targetType === 'gross' ? 'إجمالي عمولات' : 'صافي ربح'})، وبناءً على الأرقام الحالية، تحتاج تقريبًا إلى:
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-[#23170D]/60 rounded-lg border border-[#4A2F15]/70">
                <div className="text-[11px] text-[#C8C5BA] mb-0.5">المبيعات المطلوبة</div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#FCFCFA] tabular-numbers">
                  {targetAnalysis.salesNeeded.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#797979]">مبيعة مؤكدة</div>
              </div>

              <div className="p-3 bg-[#23170D]/60 rounded-lg border border-[#4A2F15]/70">
                <div className="text-[11px] text-[#C8C5BA] mb-0.5">الزيارات المطلوبة</div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#F5BF1E] tabular-numbers">
                  {targetAnalysis.visitorsNeeded.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#797979]">زائر تقريبًا</div>
              </div>

              <div className="p-3 bg-[#23170D]/60 rounded-lg border border-[#4A2F15]/70">
                <div className="text-[11px] text-[#C8C5BA] mb-0.5">النقرات المطلوبة (Clicks)</div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#FCFCFA] tabular-numbers">
                  {targetAnalysis.visitorsNeeded.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#797979]">نقرة على الرابط</div>
              </div>

              <div className="p-3 bg-[#23170D]/60 rounded-lg border border-[#4A2F15]/70">
                <div className="text-[11px] text-[#C8C5BA] mb-0.5">
                  {targetType === 'net' && targetAnalysis.requiredAdSpend > 0 ? 'ميزانية الإعلانات المطلوبة' : 'العمولات الناتجة'}
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#FCFCFA] tabular-numbers">
                  {targetType === 'net' && targetAnalysis.requiredAdSpend > 0
                    ? formatCurrency(targetAnalysis.requiredAdSpend, currency.symbol)
                    : formatCurrency(targetAnalysis.grossCommissionAtTarget, currency.symbol)}
                </div>
                <div className="text-[10px] text-[#797979]">
                  {targetType === 'net' && targetAnalysis.requiredAdSpend > 0 ? 'تكلفة الإعلانات المقدرة' : 'إجمالي العمولات'}
                </div>
              </div>
            </div>
          </div>

          {/* TARGET FUNNEL VISUAL */}
          <div className="p-5 bg-[#040405] border border-[#4A2F15] rounded-lg">
            <h4 className="text-xs font-bold text-[#F5BF1E] uppercase tracking-wider mb-4 text-center">
              مسار التدفق المطلوب لتحقيق الهدف (Target Funnel Flow)
            </h4>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
              {/* Step 1: Traffic */}
              <div className="flex-1 w-full p-2.5 bg-[#23170D]/40 rounded border border-[#4A2F15]/50">
                <div className="text-[10px] text-[#797979] font-semibold">TRAFFIC (الزيارات)</div>
                <div className="text-sm font-bold text-[#FCFCFA] mt-1 tabular-numbers">
                  {targetAnalysis.visitorsNeeded.toLocaleString()}
                </div>
              </div>

              <div className="text-[#A7690C] text-sm shrink-0 sm:rotate-[-90deg]">↓</div>

              {/* Step 2: Clicks */}
              <div className="flex-1 w-full p-2.5 bg-[#23170D]/40 rounded border border-[#4A2F15]/50">
                <div className="text-[10px] text-[#797979] font-semibold">CLICKS (النقرات)</div>
                <div className="text-sm font-bold text-[#FCFCFA] mt-1 tabular-numbers">
                  {targetAnalysis.visitorsNeeded.toLocaleString()}
                </div>
              </div>

              <div className="text-[#A7690C] text-sm shrink-0 sm:rotate-[-90deg]">↓</div>

              {/* Step 3: Sales */}
              <div className="flex-1 w-full p-2.5 bg-[#23170D]/40 rounded border border-[#4A2F15]/50">
                <div className="text-[10px] text-[#797979] font-semibold">SALES (المبيعات)</div>
                <div className="text-sm font-bold text-[#FCFCFA] mt-1 tabular-numbers">
                  {targetAnalysis.salesNeeded.toLocaleString()}
                </div>
              </div>

              <div className="text-[#A7690C] text-sm shrink-0 sm:rotate-[-90deg]">↓</div>

              {/* Step 4: Commission */}
              <div className="flex-1 w-full p-2.5 bg-[#23170D]/40 rounded border border-[#4A2F15]/50">
                <div className="text-[10px] text-[#797979] font-semibold">COMMISSION (العمولات)</div>
                <div className="text-sm font-bold text-[#FCFCFA] mt-1 tabular-numbers">
                  {formatCurrency(targetAnalysis.grossCommissionAtTarget, currency.symbol)}
                </div>
              </div>

              <div className="text-[#A7690C] text-sm shrink-0 sm:rotate-[-90deg]">↓</div>

              {/* Step 5: Net Profit */}
              <div className="flex-1 w-full p-2.5 bg-[#23170D]/80 rounded border border-[#F5BF1E]/40">
                <div className="text-[10px] text-[#F5BF1E] font-semibold">NET PROFIT (الربح)</div>
                <div className="text-sm font-black text-[#F5BF1E] mt-1 tabular-numbers">
                  {targetType === 'net'
                    ? formatCurrency(activeTargetAmount, currency.symbol)
                    : formatCurrency(
                        targetAnalysis.grossCommissionAtTarget - targetAnalysis.requiredAdSpend,
                        currency.symbol
                      )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
