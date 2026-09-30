export interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
}

export const APP_CONFIG = {
  brandName: 'Mohamed Adel',
  brandTaglineAr: 'التسويق بالعمولة نظام… مش مجرد رابط.',
  brandTaglineEn: 'Affiliate Marketing Is a System, Not a Link.',
  // Centralized Mini Course link - kept empty initially as requested
  // When empty, the CTA is visually disabled with the required notice
  MINI_COURSE_URL: '',
  
  defaults: {
    currencySymbol: '$',
    productPrice: 100,
    commissionType: 'percentage' as 'percentage' | 'fixed',
    commissionRate: 30, // 30%
    commissionFixed: 30, // $30
    conversionRate: 2, // 2%
    visitors: 1000,
    adBudget: 0,
    target: 1000,
    targetType: 'gross' as 'gross' | 'net',
  },

  currencies: [
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
    { code: 'SAR', symbol: 'ر.س', label: 'SAR (ر.س)' },
    { code: 'AED', symbol: 'د.إ', label: 'AED (د.إ)' },
    { code: 'EGP', symbol: 'ج.م', label: 'EGP (ج.م)' },
  ] as CurrencyOption[],

  targetPresets: [500, 1000, 5000],
};
