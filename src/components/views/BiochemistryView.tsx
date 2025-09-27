import React from 'react';
import { BloodAnalysis } from '../../types';
import { Card, CardHeader, CardTitle } from '../ui/Card.tsx';

interface BiochemistryViewProps {
  baseline: BloodAnalysis;
}

export const BiochemistryView: React.FC<BiochemistryViewProps> = ({ baseline }) => {
  const getStatus = (value: number, normalRange: {min: number, max: number}) => {
    if (value < normalRange.min) return 'BAJO';
    if (value > normalRange.max) return 'ALTO';
    return 'NORMAL';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NORMAL': return 'green';
      case 'ALTO': return 'red';
      case 'BAJO': return 'yellow';
      default: return 'gray';
    }
  };

  const biochemistryData = [
    {
      name: 'Glucosa',
      value: baseline.glucosa,
      unit: 'mg/dL',
      status: getStatus(baseline.glucosa, {min: 74, max: 110}),
      range: '74-110'
    },
    {
      name: 'Creatinina',
      value: baseline.creatinina,
      unit: 'mg/dL',
      status: getStatus(baseline.creatinina, {min: 0.6, max: 1.1}),
      range: '0.6-1.1'
    },
    {
      name: 'Urea',
      value: baseline.urea,
      unit: 'mg/dL',
      status: getStatus(baseline.urea, {min: 17, max: 49}),
      range: '17-49'
    },
    {
      name: 'Bilirrubina',
      value: baseline.bilirrubina,
      unit: 'mg/dL',
      status: getStatus(baseline.bilirrubina, {min: 0.1, max: 1.2}),
      range: '0.1-1.2'
    }
  ].filter(item => item.value != null);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-50 border-red-200 text-red-700';
      case 'green': return 'bg-green-50 border-green-200 text-green-700';
      case 'yellow': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getValueColor = (color: string) => {
    switch (color) {
      case 'red': return 'text-red-600';
      case 'green': return 'text-green-600';
      case 'yellow': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Panel Bioquímico</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-3">
          {biochemistryData.map((item, index) => {
            const color = getStatusColor(item.status);
            return (
              <div key={index} className={`p-3 rounded-lg border ${getColorClasses(color)}`}>
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <span className={`text-lg font-bold ${getValueColor(color)}`}>
                    {item.value} {item.unit}
                  </span>
                </div>
                <p className={`text-xs ${getValueColor(color)}`}>
                  {item.status}
                </p>
                <p className="text-xs text-gray-500 mt-1">Ref: {item.range} {item.unit}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};