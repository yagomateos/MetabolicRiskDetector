import React from 'react';
import { SystemAlert as SystemAlertType } from '../../types';

interface SystemAlertProps {
  system: string;
  data: SystemAlertType;
}

export const SystemAlert: React.FC<SystemAlertProps> = ({ system, data }) => {
  const colors = {
    'ALTO': 'border-red-500 bg-red-50',
    'MODERADO': 'border-yellow-500 bg-yellow-50',
    'BAJO': 'border-green-500 bg-green-50',
    'NORMAL': 'border-green-500 bg-green-50'
  };

  return (
    <div className={`p-3 border-l-4 rounded-lg ${colors[data.risk as keyof typeof colors] || 'border-gray-300 bg-gray-50'}`}>
      <h4 className="font-semibold text-sm capitalize">{system}</h4>
      <p className="text-xs text-gray-700">{data.details || data.interpretation}</p>
    </div>
  );
};