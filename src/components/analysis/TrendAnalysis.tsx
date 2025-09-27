import React from 'react';
import { Analysis } from '../../types';
import { Card, CardHeader, CardTitle } from '../ui/Card.tsx';

interface TrendAnalysisProps {
  analysis: Analysis;
  historicalDataLength: number;
}

export const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ analysis, historicalDataLength }) => {
  if (historicalDataLength <= 1 || !analysis.trends) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolución vs Anterior</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(analysis.trends).map(([param, trend]) => (
          <div key={param} className={`p-3 rounded-lg ${
            trend.trend === 'up' ? 'bg-red-50 border border-red-200' :
            trend.trend === 'down' ? 'bg-green-50 border border-green-200' :
            'bg-gray-50 border border-gray-200'
          }`}>
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-sm capitalize">{param}</h4>
              <div className="text-right">
                <span className={`text-sm font-bold ${
                  trend.trend === 'up' ? 'text-red-600' :
                  trend.trend === 'down' ? 'text-green-600' :
                  'text-gray-600'
                }`}>
                  {trend.change > 0 ? '+' : ''}{trend.change}
                </span>
                <span className="text-xs text-gray-600 ml-1">({trend.percentage}%)</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {trend.trend === 'up' ? '📈 Aumentó' :
               trend.trend === 'down' ? '📉 Disminuyó' :
               '➡️ Estable'}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};