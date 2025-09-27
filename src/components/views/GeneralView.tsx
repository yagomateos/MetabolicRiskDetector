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
          <CardTitle>Plan de Acción</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-xs text-red-600 mb-2">Urgente (1-2 semanas)</h3>
            <ul className="space-y-1 text-xs">
              <li>• Consulta endocrinólogo</li>
              <li>• HbA1c + curva glucosa</li>
              <li>• Ecografía abdominal</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xs text-yellow-600 mb-2">Medio plazo (1-3 meses)</h3>
            <ul className="space-y-1 text-xs">
              <li>• Panel vitamínico (B12, folato, D)</li>
              <li>• Perfil lipídico completo</li>
              <li>• Repetir analítica completa</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};