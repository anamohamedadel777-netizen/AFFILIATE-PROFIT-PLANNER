import React, { useState, useEffect } from 'react';
import { calculateRequiredCR, formatCurrency, formatPercent } from '../utils/calculator';
import { CurrencyOption } from '../config/constants';
import { Calculator, ArrowLeftRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ReverseCalculatorProps {
  defaultCommission: number;
  currency: CurrencyOption;
}

export const ReverseCalculator: React.FC<ReverseCalculatorProps> = ({
  defaultCommission,
  currency,
}) => {
  const [targetIncome, setTargetIncome] = useState<number>(1000);
  const [availableVisitors, setAvailableVisitors] = useState<number>(2000);
  const [commission, setCommission] = useState<number>(defaultCommission || 30);

  // Sync if default commission changes from parent
  useEffect(() => {
    if (defaultCommission > 0) {
      setCommission(defaultCommission);
    }
  }, [defaultCommission]);

  const result = calculateRequiredCR(targetIncome, availableVisitors, commission);

  return (
    <section className="bg-[#23170D]/60 border border-[#4A2F15] rounded-xl p-5 sm:p-7 shadow-xl space-y-5">
      <div className="flex items-center gap-2">
        <ArrowLeftRight className="w-5 h-5 text-[#F5BF1E]" />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#FCFCFA]">
            الحاسبة العكسية لمعدل التحويل
          </h2>
          <p className="text-xs sm:text-sm text-[#C8C5BA] mt-0.5">
            لو عندك عدد زيارات محدد وعمولة معينة، كام Conversion Rate تحتاجه للوصول للهدف؟
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. Target Income */}
        <div>
          <label className="block text-xs font-semibold text-[#FCFCFA] mb-1.5">
            الهدف المالي المطلوب ({currency.symbol})
          </label>
          <input
            type="number"
            min="1"
            value={targetIncome === 0 ? '' : targetIncome}
            onChange={(e) => setTargetIncome(parseFloat(e.target.value) || 0)}
            className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] rounded-md px-3 py-2 text-sm text-[#FCFCFA] tabular-numbers outline-none"
            placeholder="1000"
          />
        </div>

        {/* 2. Available Visitors */}
        <div>
          <label className="block text-xs font-semibold text-[#FCFCFA] mb-1.5">
            عدد الزيارات المتاحة (Visitors)
          </label>
          <input
            type="number"
            min="1"
            value={availableVisitors === 0 ? '' : availableVisitors}
            onChange={(e) => setAvailableVisitors(parseInt(e.target.value, 10) || 0)}
            className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] rounded-md px-3 py-2 text-sm text-[#FCFCFA] tabular-numbers outline-none"
            placeholder="2000"
          />
        </div>

        {/* 3. Commission Per Sale */}
        <div>
          <label className="block text-xs font-semibold text-[#FCFCFA] mb-1.5">
            العمولة لكل مبيعة ({currency.symbol})
          </label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={commission === 0 ? '' : commission}
            onChange={(e) => setCommission(parseFloat(e.target.value) || 0)}
            className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] rounded-md px-3 py-2 text-sm text-[#FCFCFA] tabular-numbers outline-none"
            placeholder="30"
          />
        </div>
      </div>

      {/* Output Result Card */}
      <div className="p-4 sm:p-5 bg-[#040405] border border-[#4A2F15] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-[#C8C5BA] mb-1">
            معدل التحويل المطلوب رياضيًا (Required CR):
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#F5BF1E] tabular-numbers">
            {result.isImpossible ? 'غير ممكن (> 100%)' : formatPercent(result.requiredCR, 2)}
          </div>
          <p className="text-xs text-[#C8C5BA] mt-1.5 max-w-lg leading-relaxed">
            {result.message}
          </p>
        </div>

        <div className="p-3 bg-[#23170D] rounded-lg border border-[#4A2F15] text-center min-w-[140px] shrink-0">
          <div className="text-[11px] text-[#C8C5BA]">المبيعات المطلوبة</div>
          <div className="text-lg font-bold text-[#FCFCFA] tabular-numbers">
            {Math.ceil(result.requiredSales).toLocaleString()} مبيعة
          </div>
          <div className="text-[10px] text-[#797979]">
            من {availableVisitors.toLocaleString()} زائر
          </div>
        </div>
      </div>
    </section>
  );
};
