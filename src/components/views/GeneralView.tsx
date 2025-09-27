import React from 'react';
import { Analysis } from '../../types';
import { CriticalAlerts } from '../analysis/CriticalAlerts.tsx';
import { TrendAnalysis } from '../analysis/TrendAnalysis.tsx';
import { RiskMetrics } from '../analysis/RiskMetrics.tsx';
import { SystemAlert } from '../analysis/SystemAlert.tsx';
import { InsightsPanel } from '../analysis/InsightsPanel.tsx';
import { Card, CardHeader, CardTitle } from '../ui/Card.tsx';

interface GeneralViewProps {
  analysis: Analysis;
  historicalDataLength: number;
}

export const GeneralView: React.FC<GeneralViewProps> = ({ analysis, historicalDataLength }) => {
  return (
    <div className="space-y-4">
      <CriticalAlerts alerts={analysis.alerts} />

      <TrendAnalysis analysis={analysis} historicalDataLength={historicalDataLength} />

      <RiskMetrics analysis={analysis} />

      <Card>
        <CardHeader>
          <CardTitle>Análisis por Sistemas</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {Object.entries(analysis.systemAlerts).map(([system, data]) => (
            <SystemAlert key={system} system={system} data={data} />
          ))}
        </div>
      </Card>

      <InsightsPanel insights={analysis.insights} />

      <Card>
        <CardHeader>
          <CardTitle>Plan de Acción Personalizado</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {analysis.recommendations.length > 0 ? (
            <>
              {analysis.recommendations.filter(rec => 
                rec.includes('URGENTE') || rec.includes('urgente') || 
                rec.includes('inmediata') || rec.includes('infección') ||
                rec.includes('hígado') || rec.includes('riñones')
              ).length > 0 && (
                <div>
                  <h3 className="font-semibold text-xs text-red-600 mb-2">🚨 Urgente (1-2 semanas)</h3>
                  <ul className="space-y-1 text-xs">
                    {analysis.recommendations.filter(rec => 
                      rec.includes('URGENTE') || rec.includes('urgente') || 
                      rec.includes('inmediata') || rec.includes('infección') ||
                      rec.includes('hígado') || rec.includes('riñones')
                    ).map((rec, idx) => (
                      <li key={idx}>• {rec}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {analysis.recommendations.filter(rec => 
                rec.includes('diabetes') || rec.includes('inflamación') || 
                rec.includes('Control') || rec.includes('Evaluación') ||
                rec.includes('Dieta') || rec.includes('Ejercicio')
              ).length > 0 && (
                <div>
                  <h3 className="font-semibold text-xs text-yellow-600 mb-2">⏰ Medio plazo (1-3 meses)</h3>
                  <ul className="space-y-1 text-xs">
                    {analysis.recommendations.filter(rec => 
                      rec.includes('diabetes') || rec.includes('inflamación') || 
                      rec.includes('Control') || rec.includes('Evaluación') ||
                      rec.includes('Dieta') || rec.includes('Ejercicio')
                    ).map((rec, idx) => (
                      <li key={idx}>• {rec}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {analysis.recommendations.filter(rec => 
                rec.includes('azúcar') || rec.includes('Mantener') ||
                rec.includes('periódico') || rec.includes('equilibrada')
              ).length > 0 && (
                <div>
                  <h3 className="font-semibold text-xs text-green-600 mb-2">📅 Largo plazo (3-6 meses)</h3>
                  <ul className="space-y-1 text-xs">
                    {analysis.recommendations.filter(rec => 
                      rec.includes('azúcar') || rec.includes('Mantener') ||
                      rec.includes('periódico') || rec.includes('equilibrada')
                    ).map((rec, idx) => (
                      <li key={idx}>• {rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 text-sm">
              <p>📊 Sube un PDF para obtener recomendaciones personalizadas</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};