import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultDashboard } from './components/ResultDashboard';
import { TargetPlanner } from './components/TargetPlanner';
import { DiagnosticPanel } from './components/DiagnosticPanel';
import { SensitivitySimulator } from './components/SensitivitySimulator';
import { ReverseCalculator } from './components/ReverseCalculator';
import { FormulaExplainer } from './components/FormulaExplainer';
import { ShareBox } from './components/ShareBox';
import { MiniCourseBridge } from './components/MiniCourseBridge';
import { Footer } from './components/Footer';
import { APP_CONFIG, CurrencyOption } from './config/constants';
import {
  CalculatorInputs,
  calculateAffiliateEconomics,
} from './utils/calculator';

export function App() {
  // Calculator Inputs State with default demo values
  const [inputs, setInputs] = useState<CalculatorInputs>({
    productPrice: APP_CONFIG.defaults.productPrice,
    commissionType: APP_CONFIG.defaults.commissionType,
    commissionRate: APP_CONFIG.defaults.commissionRate,
    commissionFixed: APP_CONFIG.defaults.commissionFixed,
    conversionRate: APP_CONFIG.defaults.conversionRate,
    visitors: APP_CONFIG.defaults.visitors,
    adBudget: APP_CONFIG.defaults.adBudget,
  });

  // Currency State
  const [currency, setCurrency] = useState<CurrencyOption>(
    APP_CONFIG.currencies[0] // USD ($) default
  );

  // Synchronous, live, deterministic calculation
  const results = useMemo(() => {
    return calculateAffiliateEconomics(inputs);
  }, [inputs]);

  // Handler for updating inputs with safe defaults
  const handleInputChange = (field: keyof CalculatorInputs, value: any) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Reset all fields to official defaults
  const handleReset = () => {
    setInputs({
      productPrice: APP_CONFIG.defaults.productPrice,
      commissionType: APP_CONFIG.defaults.commissionType,
      commissionRate: APP_CONFIG.defaults.commissionRate,
      commissionFixed: APP_CONFIG.defaults.commissionFixed,
      conversionRate: APP_CONFIG.defaults.conversionRate,
      visitors: APP_CONFIG.defaults.visitors,
      adBudget: APP_CONFIG.defaults.adBudget,
    });
    setCurrency(APP_CONFIG.currencies[0]);
  };

  // Scroll to results when primary button is clicked
  const handleCalculateClick = () => {
    const resultsElement = document.getElementById('results');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#040405] text-[#FCFCFA] flex flex-col font-sans selection:bg-[#F5BF1E]/20 selection:text-[#F5BF1E]">
      {/* Top Bar Contract (1 Row, 3 Zones) */}
      <Header onReset={handleReset} />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Core Split Section: Inputs (Left in RTL is Right in LTR) & Results Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-5 w-full sticky lg:top-20 z-10">
            <CalculatorForm
              inputs={inputs}
              currency={currency}
              onInputChange={handleInputChange}
              onCurrencyChange={setCurrency}
              onCalculateClick={handleCalculateClick}
              calculatedCommissionPerSale={results.commissionPerSale}
            />
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 w-full space-y-8">
            <ResultDashboard
              results={results}
              inputs={inputs}
              currency={currency}
            />
          </div>
        </div>

        {/* Section 4: Target Planner */}
        <TargetPlanner
          inputs={inputs}
          results={results}
          currency={currency}
        />

        {/* Section 5: Educational Diagnosis (What needs to change?) */}
        <DiagnosticPanel
          inputs={inputs}
          results={results}
        />

        {/* Section 6: Sensitivity Simulator */}
        <SensitivitySimulator
          inputs={inputs}
          results={results}
          currency={currency}
        />

        {/* Section 7: Reverse Calculator */}
        <ReverseCalculator
          defaultCommission={results.commissionPerSale}
          currency={currency}
        />

        {/* Section 8: Formula Explainer (Collapsible) */}
        <FormulaExplainer
          inputs={inputs}
          results={results}
          currency={currency}
        />

        {/* Shareable Result Section */}
        <ShareBox
          inputs={inputs}
          results={results}
          currency={currency}
        />

        {/* Section 9: Mini Course Bridge & R.B.T.L.S Connection */}
        <MiniCourseBridge />
      </main>

      {/* Footer & Disclaimer */}
      <Footer />
    </div>
  );
}

export default App;
