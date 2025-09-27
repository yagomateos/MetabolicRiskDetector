import React from 'react';
import { Target, Zap, Shield, LineChart } from 'lucide-react';
import { Analysis } from '../../types';
import { Card } from '../ui/Card.tsx';

interface RiskMetricsProps {
  analysis: Analysis;
}

export const RiskMetrics: React.FC<RiskMetricsProps> = ({ analysis }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="text-center">
        <Target className="h-6 w-6 text-red-500 mx-auto mb-1" />
        <h3 className="text-sm font-semibold">Riesgo CV</h3>
        <p className="text-xl font-bold text-red-600">{analysis.calculatedRisks.cardiovascular}%</p>
        <p className="text-xs text-gray-600">10 años</p>
      </Card>
      <Card className="text-center">
        <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
        <h3 className="text-sm font-semibold">Diabetes</h3>
        <p className="text-xl font-bold text-yellow-600">{analysis.calculatedRisks.diabetes}%</p>
        <p className="text-xs text-gray-600">Probabilidad</p>
      </Card>
      <Card className="text-center">
        <Shield className="h-6 w-6 text-orange-500 mx-auto mb-1" />
        <h3 className="text-sm font-semibold">Hepático</h3>
        <p className="text-xl font-bold text-orange-600">{analysis.calculatedRisks.hepatico}%</p>
        <p className="text-xs text-gray-600">Riesgo</p>
      </Card>
      <Card className="text-center">
        <LineChart className="h-6 w-6 text-blue-500 mx-auto mb-1" />
        <h3 className="text-sm font-semibold">Score Global</h3>
        <p className="text-xl font-bold text-blue-600">{analysis.riskScore}/10</p>
        <p className="text-xs text-gray-600">Riesgo integrado</p>
      </Card>
    </div>
  );
};