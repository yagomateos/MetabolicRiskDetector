import React from 'react';
import { Brain } from 'lucide-react';

interface HeaderProps {
  patientName?: string;
  age?: number;
  gender?: string;
}

export const Header: React.FC<HeaderProps> = ({
  patientName = "Santiago Mateos",
  age = 45,
  gender = "Varón"
}) => {
  return (
    <div className="bg-white shadow-sm p-4">
      <div className="flex items-center justify-center mb-2">
        <Brain className="h-6 w-6 text-blue-600 mr-2" />
        <h1 className="text-lg font-bold text-gray-800">Agente IA Metabólico</h1>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">{patientName} - Análisis personalizado</p>
        <div className="flex justify-center space-x-2 mt-2 text-xs">
          <span className="bg-blue-100 px-2 py-1 rounded">{age} años</span>
          <span className="bg-blue-100 px-2 py-1 rounded">{gender}</span>
        </div>
      </div>
    </div>
  );
};