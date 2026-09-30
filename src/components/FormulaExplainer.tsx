import React, { useState } from 'react';
import {
  CalculationResults,
  CalculatorInputs,
  formatCurrency,
  formatNumber,
  formatPercent,
} from '../utils/calculator';
import { CurrencyOption } from '../config/constants';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface FormulaExplainerProps {
  inputs: CalculatorInputs;
  results: CalculationResults;
  currency: CurrencyOption;
}

export const FormulaExplainer: React.FC<FormulaExplainerProps> = ({
  inputs,
  results,
  currency,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const crDecimal = (inputs.conversionRate || 0) / 100;

  return (
    <div className="bg-[#23170D]/40 border border-[#4A2F15] rounded-xl overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-right hover:bg-[#23170D]/70 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#F5BF1E]" />
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#FCFCFA]">
              عايز تعرف الحاسبة وصلت للأرقام دي إزاي؟
            </h3>
            <p className="text-xs text-[#C8C5BA]">
              شرح المعادلات الرياضية خطوة بخطوة باستخدام أرقامك المدخلة حاليًا.
            </p>
          </div>
        </div>

        <div className="p-1.5 rounded-full bg-[#040405] border border-[#4A2F15] text-[#F5BF1E]">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 sm:p-7 pt-2 border-t border-[#4A2F15]/50 bg-[#040405]/80 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Formula 1: Expected Sales */}
            <div className="p-4 bg-[#23170D]/40 border border-[#4A2F15] rounded-lg">
              <div className="text-xs font-semibold text-[#F5BF1E] mb-1">
                1. المبيعات المتوقعة (Expected Sales)
              </div>
              <div className="text-xs text-[#C8C5BA] mb-2 font-mono">
                المبيعات = الزيارات × معدل التحويل
              </div>
              <div className="p-2.5 bg-[#040405] rounded border border-[#4A2F15]/60 text-xs sm:text-sm text-[#FCFCFA] tabular-numbers font-medium">
                {inputs.visitors.toLocaleString()} زيارة × {formatPercent(inputs.conversionRate, 2)} ={' '}
                <span className="text-[#F5BF1E] font-bold">
                  {formatNumber(results.expectedSales, 2)} مبيعة متوقعة
                </span>
              </div>
            </div>

            {/* Formula 2: Commission per Sale */}
            <div className="p-4 bg-[#23170D]/40 border border-[#4A2F15] rounded-lg">
              <div className="text-xs font-semibold text-[#F5BF1E] mb-1">
                2. العمولة لكل مبيعة (Commission Per Sale)
              </div>
              <div className="text-xs text-[#C8C5BA] mb-2 font-mono">
                {inputs.commissionType === 'percentage'
                  ? 'العمولة = سعر المنتج × نسبة العمولة'
                  : 'العمولة = القيمة الثابتة المحددة بالعرض'}
              </div>
              <div className="p-2.5 bg-[#040405] rounded border border-[#4A2F15]/60 text-xs sm:text-sm text-[#FCFCFA] tabular-numbers font-medium">
                {inputs.commissionType === 'percentage' ? (
                  <span>
                    {formatCurrency(inputs.productPrice, currency.symbol)} × {inputs.commissionRate}% ={' '}
                    <strong className="text-[#F5BF1E]">
                      {formatCurrency(results.commissionPerSale, currency.symbol)}
                    </strong>
                  </span>
                ) : (
                  <span>
                    قيمة ثابتة ={' '}
                    <strong className="text-[#F5BF1E]">
                      {formatCurrency(results.commissionPerSale, currency.symbol)}
                    </strong>
                  </span>
                )}
              </div>
            </div>

            {/* Formula 3: Gross Commission */}
            <div className="p-4 bg-[#23170D]/40 border border-[#4A2F15] rounded-lg">
              <div className="text-xs font-semibold text-[#F5BF1E] mb-1">
                3. إجمالي العمولات المتوقع (Gross Revenue)
              </div>
              <div className="text-xs text-[#C8C5BA] mb-2 font-mono">
                الإجمالي = المبيعات المتوقعة × العمولة لكل مبيعة
              </div>
              <div className="p-2.5 bg-[#040405] rounded border border-[#4A2F15]/60 text-xs sm:text-sm text-[#FCFCFA] tabular-numbers font-medium">
                {formatNumber(results.expectedSales, 2)} × {formatCurrency(results.commissionPerSale, currency.symbol)} ={' '}
                <span className="text-[#F5BF1E] font-bold">
                  {formatCurrency(results.grossCommission, currency.symbol)}
                </span>
              </div>
            </div>

            {/* Formula 4: Net Profit */}
            <div className="p-4 bg-[#23170D]/40 border border-[#4A2F15] rounded-lg">
              <div className="text-xs font-semibold text-[#F5BF1E] mb-1">
                4. صافي الربح المتوقع (Projected Net Profit)
              </div>
              <div className="text-xs text-[#C8C5BA] mb-2 font-mono">
                صافي الربح = إجمالي العمولات - ميزانية الإعلانات
              </div>
              <div className="p-2.5 bg-[#040405] rounded border border-[#4A2F15]/60 text-xs sm:text-sm text-[#FCFCFA] tabular-numbers font-medium">
                {formatCurrency(results.grossCommission, currency.symbol)} - {formatCurrency(inputs.adBudget, currency.symbol)} ={' '}
                <span className="text-[#F5BF1E] font-bold">
                  {formatCurrency(results.netProfit, currency.symbol)}
                </span>
              </div>
            </div>

            {/* Formula 5: Break-Even CPC */}
            <div className="p-4 bg-[#23170D]/40 border border-[#4A2F15] rounded-lg">
              <div className="text-xs font-semibold text-[#F5BF1E] mb-1">
                5. أقصى تكلفة نقرة عند التعادل (Break-Even CPC)
              </div>
              <div className="text-xs text-[#C8C5BA] mb-2 font-mono">
                Max CPC = العمولة لكل مبيعة × معدل التحويل
              </div>
              <div className="p-2.5 bg-[#040405] rounded border border-[#4A2F15]/60 text-xs sm:text-sm text-[#FCFCFA] tabular-numbers font-medium">
                {formatCurrency(results.commissionPerSale, currency.symbol)} × {formatPercent(inputs.conversionRate, 2)} ={' '}
                <span className="text-[#F5BF1E] font-bold">
                  {formatCurrency(results.breakEvenCPC, currency.symbol, 3)}
                </span>
              </div>
            </div>

            {/* Formula 6: Expected Value Per Visitor */}
            <div className="p-4 bg-[#23170D]/40 border border-[#4A2F15] rounded-lg">
              <div className="text-xs font-semibold text-[#F5BF1E] mb-1">
                6. قيمة الزائر المتوقعة (Expected Value Per Visitor)
              </div>
              <div className="text-xs text-[#C8C5BA] mb-2 font-mono">
                EPV = العمولة لكل مبيعة × معدل التحويل
              </div>
              <div className="p-2.5 bg-[#040405] rounded border border-[#4A2F15]/60 text-xs sm:text-sm text-[#FCFCFA] tabular-numbers font-medium">
                {formatCurrency(results.commissionPerSale, currency.symbol)} × {formatPercent(inputs.conversionRate, 2)} ={' '}
                <span className="text-[#F5BF1E] font-bold">
                  {formatCurrency(results.expectedValuePerVisitor, currency.symbol, 3)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
