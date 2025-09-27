import React from 'react';
import { BloodAnalysis } from '../../types';
import { Card, CardHeader, CardTitle } from '../ui/Card.tsx';

interface HematologyViewProps {
  baseline: BloodAnalysis;
}

export const HematologyView: React.FC<HematologyViewProps> = ({ baseline }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-gray-50';
      case 'Elevado': return 'bg-yellow-50';
      case 'Alto': return 'bg-red-50';
      case 'Bajo': return 'bg-yellow-50';
      default: return 'bg-gray-50';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'text-green-600';
      case 'Elevado': return 'text-yellow-600';
      case 'Alto': return 'text-red-600';
      case 'Bajo': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatus = (value: number, normalRange: {min: number, max: number}) => {
    if (value < normalRange.min) return 'Bajo';
    if (value > normalRange.max) return 'Alto';
    return 'Normal';
  };

  const hematologyData = [
    {
      name: 'Eritrocitos',
      value: baseline.eritrocitos,
      status: getStatus(baseline.eritrocitos, {min: 4.2, max: 5.4}),
      range: '4.2-5.4'
    },
    {
      name: 'Hemoglobina',
      value: baseline.hemoglobina,
      status: getStatus(baseline.hemoglobina, {min: 12.0, max: 16.0}),
      range: '12.0-16.0'
    },
    {
      name: 'Leucocitos',
      value: baseline.leucocitos,
      status: getStatus(baseline.leucocitos, {min: 4.0, max: 10.0}),
      range: '4.0-10.0'
    },
    {
      name: 'Neutrófilos',
      value: `${baseline.neutrofilos}%`,
      status: getStatus(baseline.neutrofilos, {min: 50, max: 70}),
      range: '50-70%'
    },
    {
      name: 'Linfocitos',
      value: `${baseline.linfocitos}%`,
      status: getStatus(baseline.linfocitos, {min: 20, max: 40}),
      range: '20-40%'
    },
    {
      name: 'Plaquetas',
      value: baseline.plaquetas,
      status: getStatus(baseline.plaquetas, {min: 150, max: 400}),
      range: '150-400'
    }
  ].filter(item => item.value != null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis Hematológico</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-2 gap-3 text-center">
        {hematologyData.map((item, index) => (
          <div key={index} className={`p-3 rounded-lg ${getStatusColor(item.status)}`}>
            <p className="text-xs text-gray-600">{item.name}</p>
            <p className="font-semibold text-sm">{item.value}</p>
            <p className={`text-xs ${getStatusTextColor(item.status)}`}>{item.status}</p>
            <p className="text-xs text-gray-500 mt-1">Ref: {item.range}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs">
          <strong>Interpretación IA:</strong> Patrón leucocitario sugiere inflamación sistémica subclínica.
          La neutrofilia con linfopenia relativa es consistente con estrés metabólico asociado a prediabetes.
        </p>
      </div>
    </Card>
  );
};