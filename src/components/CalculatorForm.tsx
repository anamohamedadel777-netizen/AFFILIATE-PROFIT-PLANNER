import React from 'react';
import { CalculatorInputs } from '../utils/calculator';
import { APP_CONFIG, CurrencyOption } from '../config/constants';
import { Tooltip } from './Tooltip';
import { ArrowDown, DollarSign, Percent, Users, TrendingUp, Sparkles } from 'lucide-react';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  currency: CurrencyOption;
  onInputChange: (field: keyof CalculatorInputs, value: any) => void;
  onCurrencyChange: (currency: CurrencyOption) => void;
  onCalculateClick: () => void;
  calculatedCommissionPerSale: number;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  inputs,
  currency,
  onInputChange,
  onCurrencyChange,
  onCalculateClick,
  calculatedCommissionPerSale,
}) => {
  return (
    <div
      id="calculator"
      className="bg-[#23170D]/60 border border-[#4A2F15] rounded-xl p-5 sm:p-7 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative top subtle gold accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F5BF1E]/50 to-transparent" />

      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#FCFCFA] flex items-center gap-2">
          <span>ابدأ بأرقام العرض</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#C8C5BA] mt-1">
          دخل الأرقام اللي عندك، وسيب الحاسبة تربطهم ببعض.
        </p>
      </div>

      <div className="space-y-6">
        {/* INPUT 1: Product Price & Currency */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs sm:text-sm font-medium text-[#FCFCFA] flex items-center gap-1.5">
              <span>Product Price (سعر المنتج)</span>
              <Tooltip
                content="السعر النهائي الذي يدفعه العميل لشراء المنتج أو الخدمة المعروضة."
                termAr="سعر المنتج"
                termEn="Product Price"
              />
            </label>
            <span className="text-[11px] text-[#C8C5BA]/70">العملة للعرض فقط</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                min="0.01"
                step="any"
                value={inputs.productPrice === 0 ? '' : inputs.productPrice}
                onChange={(e) => onInputChange('productPrice', parseFloat(e.target.value) || 0)}
                placeholder="100"
                className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] focus:ring-1 focus:ring-[#F5BF1E] rounded-md px-3.5 py-2.5 text-sm sm:text-base text-[#FCFCFA] tabular-numbers outline-none transition-colors"
              />
            </div>

            {/* Currency Selector */}
            <select
              value={currency.code}
              onChange={(e) => {
                const found = APP_CONFIG.currencies.find((c) => c.code === e.target.value);
                if (found) onCurrencyChange(found);
              }}
              className="bg-[#040405] border border-[#4A2F15] text-[#F5BF1E] font-medium rounded-md px-3 py-2.5 text-xs sm:text-sm focus:border-[#F5BF1E] outline-none cursor-pointer"
            >
              {APP_CONFIG.currencies.map((curr) => (
                <option key={curr.code} value={curr.code} className="bg-[#23170D] text-[#FCFCFA]">
                  {curr.symbol} {curr.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* INPUT 2: Commission Model */}
        <div className="p-4 bg-[#040405]/70 border border-[#4A2F15]/80 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs sm:text-sm font-semibold text-[#FCFCFA] flex items-center gap-1.5">
              <span>Commission (العمولة)</span>
              <Tooltip
                content="المبلغ الذي تحصل عليه كمسوق عند إتمام مبيعة ناجحة، إما كنسبة من سعر المنتج أو كقيمة ثابتة."
                termAr="العمولة"
                termEn="Commission"
              />
            </label>

            {/* Segmented Control */}
            <div className="flex items-center bg-[#23170D] p-0.5 rounded border border-[#4A2F15] text-xs">
              <button
                type="button"
                onClick={() => onInputChange('commissionType', 'percentage')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  inputs.commissionType === 'percentage'
                    ? 'bg-[#F5BF1E] text-[#040405] font-bold shadow-sm'
                    : 'text-[#C8C5BA] hover:text-[#FCFCFA]'
                }`}
              >
                نسبة مئوية %
              </button>
              <button
                type="button"
                onClick={() => onInputChange('commissionType', 'fixed')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  inputs.commissionType === 'fixed'
                    ? 'bg-[#F5BF1E] text-[#040405] font-bold shadow-sm'
                    : 'text-[#C8C5BA] hover:text-[#FCFCFA]'
                }`}
              >
                قيمة ثابتة
              </button>
            </div>
          </div>

          {inputs.commissionType === 'percentage' ? (
            <div>
              <div className="flex items-center justify-between text-xs text-[#C8C5BA] mb-1">
                <span>Commission Rate % (نسبة العمولة)</span>
                <span className="text-[#F5BF1E] font-medium">
                  {inputs.commissionRate}% = {calculatedCommissionPerSale.toFixed(2)} {currency.symbol} لكل مبيعة
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  value={inputs.commissionRate === 0 ? '' : inputs.commissionRate}
                  onChange={(e) => onInputChange('commissionRate', parseFloat(e.target.value) || 0)}
                  placeholder="30"
                  className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] focus:ring-1 focus:ring-[#F5BF1E] rounded-md px-3.5 py-2.5 text-sm sm:text-base text-[#FCFCFA] tabular-numbers outline-none transition-colors"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#797979]">%</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-xs text-[#C8C5BA] mb-1">
                <span>Commission Per Sale (العمولة الثابتة لكل مبيعة)</span>
                <span className="text-[#F5BF1E] font-medium">
                  {calculatedCommissionPerSale.toFixed(2)} {currency.symbol}
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={inputs.commissionFixed === 0 ? '' : inputs.commissionFixed}
                  onChange={(e) => onInputChange('commissionFixed', parseFloat(e.target.value) || 0)}
                  placeholder="30"
                  className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] focus:ring-1 focus:ring-[#F5BF1E] rounded-md px-3.5 py-2.5 text-sm sm:text-base text-[#FCFCFA] tabular-numbers outline-none transition-colors"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#797979]">
                  {currency.symbol}
                </span>
              </div>
            </div>
          )}

          <div className="mt-2.5 pt-2 border-t border-[#4A2F15]/40 flex items-center justify-between text-xs">
            <span className="text-[#C8C5BA]">العمولة المحسوبة لكل مبيعة:</span>
            <span className="text-sm font-bold text-[#FCFCFA] tabular-numbers">
              {calculatedCommissionPerSale.toFixed(2)} {currency.symbol}
            </span>
          </div>
        </div>

        {/* INPUT 3: Conversion Rate */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs sm:text-sm font-medium text-[#FCFCFA] flex items-center gap-1.5">
              <span>Conversion Rate (معدل التحويل)</span>
              <Tooltip
                content="النسبة المئوية من الزوار الذين ينتهون بشراء المنتج. مثلاً 2% تعني أن كل 100 زائر ينتجون في المتوسط مبيعتين."
                termAr="معدل التحويل"
                termEn="Conversion Rate (CR)"
              />
            </label>
            <span className="text-[11px] text-[#F5BF1E] tabular-numbers font-mono">{inputs.conversionRate}%</span>
          </div>
          <div className="relative">
            <input
              type="number"
              min="0.01"
              max="100"
              step="any"
              value={inputs.conversionRate === 0 ? '' : inputs.conversionRate}
              onChange={(e) => onInputChange('conversionRate', parseFloat(e.target.value) || 0)}
              placeholder="2"
              className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] focus:ring-1 focus:ring-[#F5BF1E] rounded-md px-3.5 py-2.5 text-sm sm:text-base text-[#FCFCFA] tabular-numbers outline-none transition-colors"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#797979]">%</span>
          </div>
          <p className="text-[11px] sm:text-xs text-[#C8C5BA]/80 mt-1.5">
            من كل 100 شخص يضغطوا على العرض، كام واحد تقريبًا يشتري؟
          </p>
        </div>

        {/* INPUT 4: Traffic / Visitors */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs sm:text-sm font-medium text-[#FCFCFA] flex items-center gap-1.5">
              <span>Traffic (عدد الزيارات)</span>
              <Tooltip
                content="إجمالي عدد النقرات أو الزوار الذين يتوقع دخولهم لصفحة الهبوط أو رابط الأفلييت خلال فترة زمنية معينة."
                termAr="الزيارات / الترافيك"
                termEn="Traffic / Visitors"
              />
            </label>
            <span className="text-[11px] text-[#C8C5BA] tabular-numbers">
              {inputs.visitors.toLocaleString()} زائر
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              min="1"
              step="1"
              value={inputs.visitors === 0 ? '' : inputs.visitors}
              onChange={(e) => onInputChange('visitors', parseInt(e.target.value, 10) || 0)}
              placeholder="1000"
              className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] focus:ring-1 focus:ring-[#F5BF1E] rounded-md px-3.5 py-2.5 text-sm sm:text-base text-[#FCFCFA] tabular-numbers outline-none transition-colors"
            />
          </div>
          <p className="text-[11px] sm:text-xs text-[#C8C5BA]/80 mt-1.5">
            عدد الأشخاص المتوقع دخولهم إلى العرض أو الفانل خلال الفترة التي تحسبها.
          </p>
        </div>

        {/* INPUT 5: Ad Budget */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs sm:text-sm font-medium text-[#FCFCFA] flex items-center gap-1.5">
              <span>Ad Budget (ميزانية الإعلانات)</span>
              <span className="text-[11px] text-[#797979]">(اختياري)</span>
              <Tooltip
                content="إجمالي الإنفاق الإعلاني المخصص لجلب هذا العدد من الزيارات. اتركه صفرًا إذا كنت تعتمد على ترافيك مجاني/عضوي."
                termAr="ميزانية الإعلانات"
                termEn="Ad Budget"
              />
            </label>
            <span className="text-[11px] text-[#C8C5BA] tabular-numbers">
              {inputs.adBudget} {currency.symbol}
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="any"
              value={inputs.adBudget}
              onChange={(e) => onInputChange('adBudget', parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] focus:ring-1 focus:ring-[#F5BF1E] rounded-md px-3.5 py-2.5 text-sm sm:text-base text-[#FCFCFA] tabular-numbers outline-none transition-colors"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#797979]">
              {currency.symbol}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-[#C8C5BA]/80 mt-1.5">
            لو بتستخدم Organic Traffic (ترافيك عضوي) فقط، خليها صفر.
          </p>
        </div>

        {/* PRIMARY BUTTON */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onCalculateClick}
            className="w-full group relative overflow-hidden bg-[#F5BF1E] hover:bg-[#FBD052] text-[#040405] font-bold text-base sm:text-lg py-3.5 px-6 rounded-lg shadow-lg hover:shadow-[#F5BF1E]/20 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>احسب اقتصاديات الأفلييت</span>
            <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
          </button>
          <p className="text-[11px] text-center text-[#797979] mt-2">
            الحسابات تحدث تلقائيًا في الوقت الفعلي مع كل تغيير بالأسفل.
          </p>
        </div>
      </div>
    </div>
  );
};
