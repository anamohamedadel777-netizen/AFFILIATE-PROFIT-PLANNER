import React, { useState } from 'react';
import {
  CalculationResults,
  CalculatorInputs,
  generateSensitivityScenarios,
  formatCurrency,
  formatNumber,
  formatPercent,
} from '../utils/calculator';
import { CurrencyOption } from '../config/constants';
import { Sliders, ArrowUpRight, Sparkles } from 'lucide-react';

interface SensitivitySimulatorProps {
  inputs: CalculatorInputs;
  results: CalculationResults;
  currency: CurrencyOption;
}

export const SensitivitySimulator: React.FC<SensitivitySimulatorProps> = ({
  inputs,
  results,
  currency,
}) => {
  const scenarios = generateSensitivityScenarios(inputs, results);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('plus_25');

  const activeScenario =
    scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  return (
    <section
      id="simulator"
      className="bg-[#23170D]/60 border border-[#4A2F15] rounded-xl p-5 sm:p-7 shadow-xl space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#F5BF1E]" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#FCFCFA]">
              إيه اللي يحصل لو حسّنت التحويل؟
            </h2>
            <p className="text-xs sm:text-sm text-[#C8C5BA] mt-0.5">
              محاكاة سيناريوهات افتراضية لتأثير تحسين صفحة البيع أو الفانل على أرقامك الحالية.
            </p>
          </div>
        </div>

        {/* Disclaimer Tag */}
        <span className="text-[11px] text-[#A7690C] bg-[#040405] px-2.5 py-1 rounded border border-[#4A2F15] self-start sm:self-auto font-medium">
          سيناريوهات افتراضية استرشادية
        </span>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#040405] p-1.5 rounded-lg border border-[#4A2F15]">
        {scenarios.map((sc) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => setSelectedScenarioId(sc.id)}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer ${
              selectedScenarioId === sc.id
                ? 'bg-[#F5BF1E] text-[#040405] shadow-sm'
                : 'text-[#C8C5BA] hover:text-[#FCFCFA]'
            }`}
          >
            <span>{sc.label}</span>
            <span className="block text-[11px] font-normal opacity-80 tabular-numbers mt-0.5">
              ({formatPercent(sc.conversionRate, 2)})
            </span>
          </button>
        ))}
      </div>

      {/* Scenario Results Comparison Box */}
      <div className="p-5 bg-[#040405] border border-[#4A2F15] rounded-xl space-y-4">
        <div className="flex items-center justify-between text-xs text-[#C8C5BA] pb-2 border-b border-[#4A2F15]/50">
          <span>
            لو وصل معدل التحويل إلى{' '}
            <strong className="text-[#F5BF1E] tabular-numbers">
              {formatPercent(activeScenario.conversionRate, 2)}
            </strong>{' '}
            (بدلاً من {formatPercent(inputs.conversionRate, 2)}) مع نفس الترافيك الحالي:
          </span>
          <span className="text-[11px] text-[#797979]">
            {inputs.visitors.toLocaleString()} زائر
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {/* 1. Expected Sales */}
          <div className="p-3 bg-[#23170D]/40 rounded-lg border border-[#4A2F15]">
            <div className="text-[11px] text-[#C8C5BA]">المبيعات المتوقعة</div>
            <div className="text-xl font-bold text-[#FCFCFA] my-1 tabular-numbers">
              {formatNumber(activeScenario.expectedSales, 1)}
            </div>
            <div className="text-[10px] text-[#797979]">
              الحالي: {formatNumber(results.expectedSales, 1)}
            </div>
          </div>

          {/* 2. Gross Commission */}
          <div className="p-3 bg-[#23170D]/40 rounded-lg border border-[#4A2F15]">
            <div className="text-[11px] text-[#C8C5BA]">إجمالي العمولات</div>
            <div className="text-xl font-bold text-[#FCFCFA] my-1 tabular-numbers">
              {formatCurrency(activeScenario.grossCommission, currency.symbol)}
            </div>
            <div className="text-[10px] text-[#797979]">
              الحالي: {formatCurrency(results.grossCommission, currency.symbol)}
            </div>
          </div>

          {/* 3. Net Profit */}
          <div className="p-3 bg-[#23170D]/40 rounded-lg border border-[#4A2F15]">
            <div className="text-[11px] text-[#C8C5BA]">صافي الربح المتوقع</div>
            <div
              className={`text-xl font-black my-1 tabular-numbers ${
                activeScenario.netProfit > 0 ? 'text-[#F5BF1E]' : 'text-[#FCFCFA]'
              }`}
            >
              {formatCurrency(activeScenario.netProfit, currency.symbol)}
            </div>
            <div className="text-[10px] text-[#797979]">
              الحالي: {formatCurrency(results.netProfit, currency.symbol)}
            </div>
          </div>

          {/* 4. Break-Even CPC */}
          <div className="p-3 bg-[#23170D]/40 rounded-lg border border-[#4A2F15]">
            <div className="text-[11px] text-[#C8C5BA]">أقصى CPC تعادل</div>
            <div className="text-xl font-bold text-[#F5BF1E] my-1 tabular-numbers">
              {formatCurrency(activeScenario.breakEvenCPC, currency.symbol, 3)}
            </div>
            <div className="text-[10px] text-[#797979]">
              هامش قدرتك على شراء نقرات أغلى
            </div>
          </div>
        </div>

        <div className="pt-2 text-[11px] text-[#C8C5BA]/80 text-center">
          * تذكير: هذه مجرد عمليات حسابية رياضية؛ تحسين معدل التحويل في الواقع يتطلب اختبار وتطوير العرض، زوايا البيع، وتطابق الترافيك مع صفحة الهبوط.
        </div>
      </div>
    </section>
  );
};
