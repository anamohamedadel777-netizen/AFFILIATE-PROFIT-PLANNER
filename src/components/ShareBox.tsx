import React, { useState } from 'react';
import { CalculationResults, CalculatorInputs, formatCurrency, formatNumber, formatPercent } from '../utils/calculator';
import { CurrencyOption } from '../config/constants';
import { Share2, Copy, Check, FileText } from 'lucide-react';

interface ShareBoxProps {
  inputs: CalculatorInputs;
  results: CalculationResults;
  currency: CurrencyOption;
}

export const ShareBox: React.FC<ShareBoxProps> = ({ inputs, results, currency }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const formattedShareText = `=== ملخص اقتصاديات الأفلييت ===
سعر المنتج: ${formatCurrency(inputs.productPrice, currency.symbol)}
العمولة لكل مبيعة: ${formatCurrency(results.commissionPerSale, currency.symbol)}
معدل التحويل: ${formatPercent(inputs.conversionRate, 2)}
الزيارات المتوقعة: ${inputs.visitors.toLocaleString()}
المبيعات المتوقعة: ${formatNumber(results.expectedSales, 1)}
إجمالي العمولات: ${formatCurrency(results.grossCommission, currency.symbol)}
صافي الربح المتوقع: ${formatCurrency(results.netProfit, currency.symbol)}
Break-Even CPC (أقصى تكلفة نقرة للتعادل): ${formatCurrency(results.breakEvenCPC, currency.symbol, 3)}
Break-Even CPA (أقصى تكلفة مبيعة للتعادل): ${formatCurrency(results.breakEvenCPA, currency.symbol)}
==============================
محسوب عبر AFFILIATE PROFIT PLANNER
الأرقام تقديرية تعليمية وليست ضمانًا للأرباح.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedShareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Manual fallback will be used via the text area
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-[#23170D]/40 border border-[#4A2F15] rounded-xl p-5 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-[#F5BF1E]" />
          <div>
            <h3 className="text-base font-bold text-[#FCFCFA]">
              شارك نتيجتك وحساباتك
            </h3>
            <p className="text-xs text-[#C8C5BA]">
              احصل على ملخص نصي دقيق لأرقامك لمناقشتها مع فريقك أو حفظها لدراسة الجدوى.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#040405] hover:bg-[#23170D] text-[#FCFCFA] text-xs font-semibold rounded-md border border-[#4A2F15] hover:border-[#F5BF1E] transition-all cursor-pointer self-start sm:self-auto"
        >
          <FileText className="w-3.5 h-3.5 text-[#F5BF1E]" />
          <span>{isOpen ? 'إخفاء نص المشاركة' : 'عرض نص الملخص للمشاركة'}</span>
        </button>
      </div>

      {isOpen && (
        <div className="pt-3 border-t border-[#4A2F15]/60 space-y-3 animate-in fade-in duration-200">
          <div className="relative">
            <textarea
              readOnly
              rows={8}
              value={formattedShareText}
              onFocus={(e) => e.target.select()}
              className="w-full bg-[#040405] border border-[#4A2F15] rounded-md p-3 text-xs sm:text-sm text-[#FCFCFA] font-mono leading-relaxed resize-none outline-none focus:border-[#F5BF1E]"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#797979]">
              يمكنك تحديد النص أعلاه ونسخه يدويًا، أو استخدام زر النسخ المباشر.
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#F5BF1E] text-[#040405] text-xs font-bold rounded hover:bg-[#FBD052] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>تم النسخ بنجاح!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ النص</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
