import React from 'react';
import { Target, Zap, Shield, LineChart } from 'lucide-react';
import { Analysis } from '../../types';
import { Card } from '../ui/Card.tsx';

interface RiskMetricsProps {
  analysis: Analysis;
}

export const RiskMetrics: React.FC<RiskMetricsProps> = ({ analysis }) => {
  return (
    <div className="grid grid-cols-2 mobile-grid gap-4 sm:gap-5 max-w-full">
      <Card className={`text-center transform hover:scale-105 ${parseFloat(analysis.calculatedRisks.cardiovascular) > 20 ? 'pulse-critical border-red-200 shadow-red-100' : 'shadow-lg'}`}>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-2xl w-fit mx-auto mb-4 shadow-sm">
          <Target className="h-7 w-7 sm:h-8 sm:w-8 text-red-600" />
        </div>
        <h3 className="mobile-subtitle text-gray-800 mb-2 font-semibold">❤️ Riesgo CV</h3>
        <p className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">{analysis.calculatedRisks.cardiovascular}%</p>
        <p className="mobile-caption text-gray-600 font-medium">10 años</p>
      </Card>

      <Card className={`text-center transform hover:scale-105 ${analysis.calculatedRisks.diabetes > 70 ? 'pulse-critical border-yellow-200 shadow-yellow-100' : 'shadow-lg'}`}>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-2xl w-fit mx-auto mb-4 shadow-sm">
          <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-600" />
        </div>
        <h3 className="mobile-subtitle text-gray-800 mb-2 font-semibold">🍯 Diabetes</h3>
        <p className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-2">{analysis.calculatedRisks.diabetes}%</p>
        <p className="mobile-caption text-gray-600 font-medium">Probabilidad</p>
      </Card>

      <Card className={`text-center transform hover:scale-105 ${analysis.calculatedRisks.hepatico > 60 ? 'pulse-critical border-orange-200 shadow-orange-100' : 'shadow-lg'}`}>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl w-fit mx-auto mb-4 shadow-sm">
          <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-orange-600" />
        </div>
        <h3 className="mobile-subtitle text-gray-800 mb-2 font-semibold">🛡️ Hepático</h3>
        <p className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">{analysis.calculatedRisks.hepatico}%</p>
        <p className="mobile-caption text-gray-600 font-medium">Riesgo</p>
      </Card>

      <Card className={`text-center transform hover:scale-105 ${analysis.riskScore > 7 ? 'pulse-critical border-blue-200 shadow-blue-100' : 'shadow-lg'}`}>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl w-fit mx-auto mb-4 shadow-sm">
          <LineChart className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600" />
        </div>
        <h3 className="mobile-subtitle text-gray-800 mb-2 font-semibold">📊 Score Global</h3>
        <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{analysis.riskScore}/10</p>
        <p className="mobile-caption text-gray-600 font-medium">Integrado</p>
      </Card>
    </div>
  );
};