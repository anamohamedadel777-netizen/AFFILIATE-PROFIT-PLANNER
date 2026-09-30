export interface CalculatorInputs {
  productPrice: number;
  commissionType: 'percentage' | 'fixed';
  commissionRate: number; // in percent (e.g. 30)
  commissionFixed: number; // in currency units (e.g. 30)
  conversionRate: number; // in percent (e.g. 2)
  visitors: number; // integer (e.g. 1000)
  adBudget: number; // in currency units (e.g. 0)
}

export interface CalculationResults {
  commissionPerSale: number;
  expectedSales: number;
  isSalesFractional: boolean;
  grossCommission: number;
  actualCPC: number | null;
  actualCPA: number | null;
  netProfit: number;
  roi: number | null;
  breakEvenCPA: number;
  breakEvenCPC: number;
  expectedValuePerVisitor: number; // EPV
  netValuePerVisitor: number;
  profitStatus: 'above_break_even' | 'at_break_even' | 'below_break_even';
}

export interface TargetAnalysisResult {
  targetType: 'gross' | 'net';
  targetAmount: number;
  salesNeeded: number;
  visitorsNeeded: number;
  requiredAdSpend: number;
  grossCommissionAtTarget: number;
  status: 'feasible' | 'impossible_negative_unit_economics' | 'invalid_input';
  statusExplanation?: string;
  actualCPCUsed: number | null;
  expectedNetValuePerVisitor: number;
}

export interface SensitivityScenario {
  id: string;
  label: string;
  factorName: string;
  multiplier: number;
  conversionRate: number;
  expectedSales: number;
  grossCommission: number;
  netProfit: number;
  breakEvenCPC: number;
  roi: number | null;
}

export interface ReverseCRResult {
  requiredSales: number;
  requiredCR: number;
  isImpossible: boolean; // > 100%
  isVeryHigh: boolean; // > 15%
  message: string;
}

export interface DiagnosticInsight {
  id: string;
  type: 'critical' | 'warning' | 'positive' | 'info';
  headline: string;
  body: string;
  priority: number;
}

/**
 * Format numbers cleanly without scientific notation or unnecessary decimals
 */
export function formatNumber(value: number, maxDecimals: number = 2): string {
  if (value === null || value === undefined || isNaN(value) || !isFinite(value)) {
    return '0';
  }
  // If whole number, format without decimals
  if (Math.abs(value - Math.round(value)) < 0.0001) {
    return Math.round(value).toLocaleString('en-US');
  }
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });
}

/**
 * Format currency with display symbol (no conversion)
 */
export function formatCurrency(amount: number, symbol: string, maxDecimals: number = 2): string {
  if (amount === null || amount === undefined || isNaN(amount) || !isFinite(amount)) {
    return `0 ${symbol}`;
  }
  const formatted = formatNumber(amount, maxDecimals);
  // Place symbol appropriately for RTL / Arabic
  return `${formatted} ${symbol}`;
}

/**
 * Format percentages cleanly
 */
export function formatPercent(value: number, maxDecimals: number = 2): string {
  if (value === null || value === undefined || isNaN(value) || !isFinite(value)) {
    return '0%';
  }
  return `${formatNumber(value, maxDecimals)}%`;
}

/**
 * Core deterministic calculations
 */
export function calculateAffiliateEconomics(inputs: CalculatorInputs): CalculationResults {
  const price = Math.max(0, inputs.productPrice || 0);
  const conversionRatePercent = Math.max(0, Math.min(100, inputs.conversionRate || 0));
  const crDecimal = conversionRatePercent / 100;
  const visitors = Math.max(0, Math.floor(inputs.visitors || 0));
  const adBudget = Math.max(0, inputs.adBudget || 0);

  // Commission Per Sale
  let commissionPerSale = 0;
  if (inputs.commissionType === 'percentage') {
    const rate = Math.max(0, Math.min(100, inputs.commissionRate || 0));
    commissionPerSale = price * (rate / 100);
  } else {
    commissionPerSale = Math.max(0, inputs.commissionFixed || 0);
  }

  // Expected Sales
  const expectedSales = visitors * crDecimal;
  const isSalesFractional = Math.abs(expectedSales - Math.round(expectedSales)) > 0.001;

  // Gross Commission Revenue
  const grossCommission = expectedSales * commissionPerSale;

  // Actual CPC
  const actualCPC = adBudget > 0 && visitors > 0 ? adBudget / visitors : null;

  // Expected CPA
  const actualCPA = expectedSales > 0 && adBudget > 0 ? adBudget / expectedSales : null;

  // Net Profit
  const netProfit = grossCommission - adBudget;

  // ROI
  const roi = adBudget > 0 ? (netProfit / adBudget) * 100 : null;

  // Break-Even CPA (equals commission per sale)
  const breakEvenCPA = commissionPerSale;

  // Break-Even CPC
  const breakEvenCPC = commissionPerSale * crDecimal;

  // Expected Value Per Visitor (EPV)
  const expectedValuePerVisitor = commissionPerSale * crDecimal;

  // Net Value Per Visitor
  const netValuePerVisitor = actualCPC !== null ? expectedValuePerVisitor - actualCPC : expectedValuePerVisitor;

  // Profit Status
  let profitStatus: 'above_break_even' | 'at_break_even' | 'below_break_even';
  if (netProfit > 0.01) {
    profitStatus = 'above_break_even';
  } else if (Math.abs(netProfit) <= 0.01) {
    profitStatus = 'at_break_even';
  } else {
    profitStatus = 'below_break_even';
  }

  return {
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
  };
}

/**
 * Calculate requirements for a target amount (Gross Commission or Net Profit)
 */
export function calculateTargetBreakdown(
  targetAmount: number,
  targetType: 'gross' | 'net',
  inputs: CalculatorInputs,
  coreResults: CalculationResults
): TargetAnalysisResult {
  const safeTarget = Math.max(0, targetAmount || 0);
  const C = coreResults.commissionPerSale;
  const CR = (inputs.conversionRate || 0) / 100;
  const V = Math.max(0, Math.floor(inputs.visitors || 0));
  const B = Math.max(0, inputs.adBudget || 0);

  if (safeTarget <= 0 || C <= 0 || CR <= 0) {
    return {
      targetType,
      targetAmount: safeTarget,
      salesNeeded: 0,
      visitorsNeeded: 0,
      requiredAdSpend: 0,
      grossCommissionAtTarget: 0,
      status: 'invalid_input',
      statusExplanation: 'يرجى إدخال هدف وعمولة ومعدل تحويل أكبر من الصفر للحساب.',
      actualCPCUsed: coreResults.actualCPC,
      expectedNetValuePerVisitor: 0,
    };
  }

  if (targetType === 'gross') {
    const rawSales = safeTarget / C;
    const salesNeeded = Math.ceil(rawSales);
    const visitorsNeeded = Math.ceil(salesNeeded / CR);
    const grossCommissionAtTarget = salesNeeded * C;
    const actualCPC = coreResults.actualCPC;
    const requiredAdSpend = actualCPC !== null ? visitorsNeeded * actualCPC : 0;

    return {
      targetType: 'gross',
      targetAmount: safeTarget,
      salesNeeded,
      visitorsNeeded,
      requiredAdSpend,
      grossCommissionAtTarget,
      status: 'feasible',
      actualCPCUsed: actualCPC,
      expectedNetValuePerVisitor: coreResults.netValuePerVisitor,
    };
  }

  // Net Profit Target
  if (B > 0 && V > 0) {
    const actualCPC = B / V;
    const expectedGrossValuePerVisitor = C * CR;
    const expectedNetValuePerVisitor = expectedGrossValuePerVisitor - actualCPC;

    if (expectedNetValuePerVisitor <= 0.0001) {
      return {
        targetType: 'net',
        targetAmount: safeTarget,
        salesNeeded: 0,
        visitorsNeeded: 0,
        requiredAdSpend: 0,
        grossCommissionAtTarget: 0,
        status: 'impossible_negative_unit_economics',
        statusExplanation:
          'بالأرقام الحالية، كل زيارة إعلانية لا تحقق صافي قيمة إيجابية، لذلك زيادة عدد الزيارات وحدها لن توصلك لهدف الربح.',
        actualCPCUsed: actualCPC,
        expectedNetValuePerVisitor,
      };
    }

    const visitorsNeeded = Math.ceil(safeTarget / expectedNetValuePerVisitor);
    const salesExpected = Math.ceil(visitorsNeeded * CR);
    const requiredAdSpend = visitorsNeeded * actualCPC;
    const grossCommissionAtTarget = salesExpected * C;

    return {
      targetType: 'net',
      targetAmount: safeTarget,
      salesNeeded: salesExpected,
      visitorsNeeded,
      requiredAdSpend,
      grossCommissionAtTarget,
      status: 'feasible',
      actualCPCUsed: actualCPC,
      expectedNetValuePerVisitor,
    };
  } else {
    // Organic / Zero ad budget
    const rawSales = safeTarget / C;
    const salesNeeded = Math.ceil(rawSales);
    const visitorsNeeded = Math.ceil(salesNeeded / CR);

    return {
      targetType: 'net',
      targetAmount: safeTarget,
      salesNeeded,
      visitorsNeeded,
      requiredAdSpend: 0,
      grossCommissionAtTarget: salesNeeded * C,
      status: 'feasible',
      actualCPCUsed: null,
      expectedNetValuePerVisitor: C * CR,
    };
  }
}

/**
 * Generate Sensitivity Scenarios for Conversion Rate improvements
 */
export function generateSensitivityScenarios(
  inputs: CalculatorInputs,
  coreResults: CalculationResults
): SensitivityScenario[] {
  const baseCR = inputs.conversionRate || 0;
  const C = coreResults.commissionPerSale;
  const V = inputs.visitors || 0;
  const B = inputs.adBudget || 0;

  const scenariosConfig = [
    { id: 'current', label: 'المعدل الحالي', factorName: 'الحالي', multiplier: 1.0 },
    { id: 'plus_25', label: 'تحسن +25%', factorName: '+25%', multiplier: 1.25 },
    { id: 'plus_50', label: 'تحسن +50%', factorName: '+50%', multiplier: 1.5 },
    { id: 'double', label: 'مضاعفة 2X', factorName: '2X', multiplier: 2.0 },
  ];

  return scenariosConfig.map((sc) => {
    const simCR = Math.min(100, baseCR * sc.multiplier);
    const crDec = simCR / 100;
    const expectedSales = V * crDec;
    const grossCommission = expectedSales * C;
    const netProfit = grossCommission - B;
    const breakEvenCPC = C * crDec;
    const roi = B > 0 ? (netProfit / B) * 100 : null;

    return {
      id: sc.id,
      label: sc.label,
      factorName: sc.factorName,
      multiplier: sc.multiplier,
      conversionRate: simCR,
      expectedSales,
      grossCommission,
      netProfit,
      breakEvenCPC,
      roi,
    };
  });
}

/**
 * Reverse Calculator: Given available visitors & target, what CR is required?
 */
export function calculateRequiredCR(
  target: number,
  availableVisitors: number,
  commissionPerSale: number
): ReverseCRResult {
  const safeTarget = Math.max(0, target || 0);
  const safeVisitors = Math.max(0, availableVisitors || 0);
  const safeCommission = Math.max(0, commissionPerSale || 0);

  if (safeTarget <= 0 || safeVisitors <= 0 || safeCommission <= 0) {
    return {
      requiredSales: 0,
      requiredCR: 0,
      isImpossible: false,
      isVeryHigh: false,
      message: 'أدخل أرقامًا صالحة لحساب معدل التحويل المطلوب.',
    };
  }

  const requiredSales = safeTarget / safeCommission;
  const requiredCR = (requiredSales / safeVisitors) * 100;

  if (requiredCR > 100) {
    return {
      requiredSales,
      requiredCR,
      isImpossible: true,
      isVeryHigh: true,
      message: 'الهدف غير ممكن رياضيًا بهذه المدخلات (معدل التحويل المطلوب يتجاوز 100%).',
    };
  }

  if (requiredCR > 15) {
    return {
      requiredSales,
      requiredCR,
      isImpossible: false,
      isVeryHigh: true,
      message: 'السيناريو يتطلب معدل تحويل مرتفع جدًا، لذلك قد تحتاج إلى زيادة الترافيك أو العمولة أو تعديل الهدف.',
    };
  }

  return {
    requiredSales,
    requiredCR,
    isImpossible: false,
    isVeryHigh: false,
    message: `تحتاج إلى معدل تحويل يبلغ تقريبًا ${formatPercent(requiredCR, 2)} لتحقيق هذا الهدف بالزيارات المتاحة.`,
  };
}

/**
 * Rule-based Educational Diagnosis (What needs to change?)
 */
export function generateDiagnosticInsights(
  inputs: CalculatorInputs,
  results: CalculationResults
): DiagnosticInsight[] {
  const insights: DiagnosticInsight[] = [];
  const { actualCPC, breakEvenCPC, expectedSales } = results;
  const cr = inputs.conversionRate || 0;
  const adBudget = inputs.adBudget || 0;

  // Case 1: Actual CPC > Break-Even CPC
  if (actualCPC !== null && actualCPC > breakEvenCPC + 0.0001) {
    insights.push({
      id: 'cpc-above-breakeven',
      type: 'critical',
      headline: 'تكلفة النقرة الحالية أعلى من نقطة التعادل.',
      body: 'قبل ما تزود الميزانية، اختبر خفض CPC أو رفع Conversion Rate (معدل التحويل) أو اختيار Offer (عرض) بعمولة أفضل. كل نقرة حالية تُدخل في خانة الخسارة قبل التكاليف الإضافية.',
      priority: 1,
    });
  }

  // Case 2: Actual CPC close to Break-Even CPC
  if (actualCPC !== null && actualCPC <= breakEvenCPC && actualCPC >= breakEvenCPC * 0.8) {
    insights.push({
      id: 'cpc-near-breakeven',
      type: 'warning',
      headline: 'هامش الأمان عندك ضعيف.',
      body: 'تكلفة النقرة قريبة جدًا من أقصى CPC مسموح به (فارق أقل من 20%). أي تراجع بسيط في معدل التحويل أو تذبذب تكلفة الإعلانات سينقلك سريعًا تحت نقطة التعادل.',
      priority: 2,
    });
  }

  // Case 3: Actual CPC is substantially below Break-Even CPC
  if (actualCPC !== null && actualCPC < breakEvenCPC * 0.8) {
    insights.push({
      id: 'cpc-healthy-margin',
      type: 'positive',
      headline: 'اقتصاديات الترافيك تبدو أفضل من نقطة التعادل الحالية، لكن اختبرها ببيانات حقيقية قبل التوسع.',
      body: 'الفارق بين تكلفة النقرة الفعلية وأقصى CPC يمنحك هامش أمان نظري جيد. تأكد من أن جودة الترافيك لا تنخفض عند زيادة الميزانية.',
      priority: 3,
    });
  }

  // Case 4: Conversion Rate < 1%
  if (cr > 0 && cr < 1) {
    insights.push({
      id: 'cr-low',
      type: 'info',
      headline: 'معدل التحويل المدخل منخفض نسبيًا في هذا السيناريو، وأي تحسن صغير فيه سيؤثر بقوة على النتائج.',
      body: 'في العروض ذات التحويل الأقل من 1%، مضاعفة التحويل من 0.5% إلى 1% تعني مضاعفة المبيعات دون إنفاق دولار إضافي واحد على الزيارات.',
      priority: 4,
    });
  }

  // Case 5: Ad budget is zero (Organic Traffic)
  if (adBudget === 0) {
    insights.push({
      id: 'organic-scenario',
      type: 'info',
      headline: 'أنت حاليًا بتحسب سيناريو Organic Traffic (ترافيك عضوي)، لذلك لا نحسب CPC أو ROI إعلاني.',
      body: 'في الترافيك العضوي، التكلفة الأساسية هي وقتك وجهدك في إنشاء المحتوى أو الفانل، ولا توجد تكلفة مالية مباشرة تدفعها عن كل نقرة.',
      priority: 5,
    });
  }

  // Case 6: Expected sales < 1
  if (expectedSales < 1) {
    insights.push({
      id: 'sales-below-one',
      type: 'warning',
      headline: 'بحجم الترافيك ومعدل التحويل الحاليين، السيناريو لا يصل إحصائيًا إلى مبيعة واحدة متوقعة بعد.',
      body: `إحصائيًا تحتاج إلى ما يقارب ${Math.ceil(cr > 0 ? 100 / cr : 0).toLocaleString()} زيارة لتحقيق مبيعة واحدة متوقعة بمعدل التحويل الحالي.`,
      priority: 6,
    });
  }

  return insights.sort((a, b) => a.priority - b.priority);
}
