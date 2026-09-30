import React from 'react';
import {
  CalculationResults,
  CalculatorInputs,
  generateDiagnosticInsights,
} from '../utils/calculator';
import { Lightbulb, AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';

interface DiagnosticPanelProps {
  inputs: CalculatorInputs;
  results: CalculationResults;
}

export const DiagnosticPanel: React.FC<DiagnosticPanelProps> = ({ inputs, results }) => {
  const insights = generateDiagnosticInsights(inputs, results);

  return (
    <section
      id="diagnostic"
      className="bg-[#23170D]/50 border border-[#4A2F15] rounded-xl p-5 sm:p-7 shadow-xl space-y-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-5 h-5 text-[#F5BF1E]" />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#FCFCFA]">
            إيه الرقم اللي يستحق تركيزك دلوقتي؟
          </h2>
          <p className="text-xs sm:text-sm text-[#C8C5BA] mt-0.5">
            تشخيص تعليمي مبني على قواعد اقتصاديات الأفلييت لمساعدتك على اتخاذ القرار الصحيح قبل المخاطرة بمالك.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {insights.map((insight) => {
          let borderClass = 'border-[#4A2F15]';
          let bgClass = 'bg-[#040405]';
          let icon = <Info className="w-4 h-4 text-[#F5BF1E] shrink-0 mt-0.5" />;

          if (insight.type === 'critical') {
            borderClass = 'border-[#A7690C]';
            icon = <ShieldAlert className="w-4 h-4 text-[#F5BF1E] shrink-0 mt-0.5" />;
          } else if (insight.type === 'warning') {
            borderClass = 'border-[#4A2F15]';
            icon = <AlertTriangle className="w-4 h-4 text-[#FBD052] shrink-0 mt-0.5" />;
          } else if (insight.type === 'positive') {
            borderClass = 'border-[#4A2F15]';
            icon = <CheckCircle className="w-4 h-4 text-[#F5BF1E] shrink-0 mt-0.5" />;
          }

          return (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border ${borderClass} ${bgClass} flex items-start gap-3 transition-all`}
            >
              {icon}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#FCFCFA] leading-snug">
                  {insight.headline}
                </h4>
                <p className="text-xs text-[#C8C5BA] leading-relaxed">
                  {insight.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
