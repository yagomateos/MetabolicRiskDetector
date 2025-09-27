import React from 'react';

interface CriticalAlertsProps {
  alerts: string[];
}

export const CriticalAlerts: React.FC<CriticalAlertsProps> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
      <h3 className="font-semibold text-red-800 text-sm mb-2">🚨 Alertas Críticas</h3>
      <div className="space-y-1">
        {alerts.map((alert, idx) => (
          <p key={idx} className="text-xs text-red-700">{alert}</p>
        ))}
      </div>
    </div>
  );
};