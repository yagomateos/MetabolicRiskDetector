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
    <div className="gradient-bg-medical shadow-2xl p-4 sm:p-6 max-w-full overflow-hidden">
      <div className="flex items-center justify-center mb-3">
        <Brain className="h-6 w-6 sm:h-7 sm:w-7 text-white mr-3 flex-shrink-0" />
        <h1 className="text-lg sm:text-xl font-bold text-white truncate mobile-title">🤖 Agente IA Metabólico</h1>
      </div>
      <div className="text-center">
        <p className="text-sm sm:text-base text-white/95 truncate px-2 mobile-subtitle font-medium">{patientName} - Análisis personalizado</p>
        <div className="flex justify-center space-x-2 sm:space-x-3 mt-3">
          <span className="bg-white/25 backdrop-blur-sm text-white px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium shadow-sm">{age} años</span>
          <span className="bg-white/25 backdrop-blur-sm text-white px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium shadow-sm">{gender}</span>
        </div>
      </div>
    </div>
  );
};