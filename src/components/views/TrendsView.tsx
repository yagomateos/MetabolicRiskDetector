import React from 'react';
import { BloodAnalysis } from '../../types';
import { Card, CardHeader, CardTitle } from '../ui/Card.tsx';

interface TrendsViewProps {
  historicalData: BloodAnalysis[];
}

export const TrendsView: React.FC<TrendsViewProps> = ({ historicalData }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Historial Analíticas</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {historicalData.map((data, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border ${
                idx === historicalData.length - 1
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold">{data.fecha}</span>
                <span className="text-xs">
                  {idx === 0
                    ? '📊 Baseline'
                    : idx === historicalData.length - 1
                    ? '🔥 Actual'
                    : '📈 Histórico'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  Glucosa: <span className="font-semibold">{data.glucosa}</span>
                </div>
                <div>
                  ALT: <span className="font-semibold">{data.alt}</span>
                </div>
                <div>
                  AST: <span className="font-semibold">{data.ast}</span>
                </div>
                <div>
                  Leucocitos: <span className="font-semibold">{data.leucocitos}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {historicalData.length === 1 && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">
            Sin datos de comparación
          </h3>
          <p className="text-xs text-yellow-700">
            Sube una nueva analítica para ver la evolución
          </p>
        </div>
      )}
    </div>
  );
};