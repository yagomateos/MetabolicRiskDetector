import React from 'react';
import { BloodAnalysis, Analysis } from '../../types';
import { Card, CardHeader, CardTitle } from '../ui/Card.tsx';

interface HepaticViewProps {
  baseline: BloodAnalysis;
  analysis: Analysis | null;
}

export const HepaticView: React.FC<HepaticViewProps> = ({ baseline: currentData, analysis }) => {
  const getStatus = (value: number, normalRange: {min: number, max: number}) => {
    if (value < normalRange.min) return 'BAJO';
    if (value > normalRange.max) return 'ALTO';
    return 'NORMAL';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NORMAL': return 'bg-green-50 text-green-600';
      case 'ALTO': return 'bg-red-50 text-red-600';
      case 'BAJO': return 'bg-yellow-50 text-yellow-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const altStatus = getStatus(currentData.alt, {min: 7, max: 56});
  const astStatus = getStatus(currentData.ast, {min: 10, max: 40});
  const astAltRatio = currentData.ast / currentData.alt;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Función Hepática</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          <div className={`text-center p-3 rounded-lg ${getStatusColor(altStatus)}`}>
            <h3 className="font-semibold text-sm mb-1">ALT (Alanina Aminotransferasa)</h3>
            <div className="text-2xl font-bold mb-1">{currentData.alt} U/L</div>
            <p className="text-xs font-semibold">{altStatus}</p>
            <p className="text-xs text-gray-500 mt-1">Ref: 7-56 U/L</p>
          </div>
          <div className={`text-center p-3 rounded-lg ${getStatusColor(astStatus)}`}>
            <h3 className="font-semibold text-sm mb-1">AST (Aspartato Aminotransferasa)</h3>
            <div className="text-2xl font-bold mb-1">{currentData.ast} U/L</div>
            <p className="text-xs font-semibold">{astStatus}</p>
            <p className="text-xs text-gray-500 mt-1">Ref: 10-40 U/L</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-sm mb-1">Ratio AST/ALT</h3>
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {analysis?.systemAlerts.hepatico.ratio || astAltRatio.toFixed(2)}
            </div>
            <p className="text-xs text-blue-600">
              {analysis?.systemAlerts.hepatico.interpretation || 'Evaluando función hepática'}
            </p>
            <p className="text-xs text-gray-500 mt-1">Normal: &lt;1.0</p>
          </div>
        </div>
      </Card>
    </div>
  );
};