import React from 'react';
import { Activity, Droplets, Zap, Shield, TrendingUp, Upload, Camera } from 'lucide-react';
import { Category, UploadMode } from '../types';
import { Button } from './ui/Button.tsx';

interface NavigationProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  onToggleForm: (mode: UploadMode) => void;
}

const categories = {
  general: { icon: Activity, name: 'Resumen' },
  hemato: { icon: Droplets, name: 'Sangre' },
  bioquim: { icon: Zap, name: 'Bioquímica' },
  hepatico: { icon: Shield, name: 'Hígado' },
  tendencias: { icon: TrendingUp, name: 'Evolución' }
};

export const Navigation: React.FC<NavigationProps> = ({
  selectedCategory,
  onCategoryChange,
  onToggleForm
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-3 max-w-full overflow-x-hidden">
      <div className="flex overflow-x-auto gap-2 pb-2 nav-scroll">
        {Object.entries(categories).map(([key, cat]) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === key;
          return (
            <button
              key={key}
              onClick={() => onCategoryChange(key as Category)}
              className={`flex items-center justify-center flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{ minWidth: '70px' }}
            >
              <Icon className="h-3 w-3 mr-1.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <Button
          onClick={() => onToggleForm('manual')}
          variant="success"
          className="mobile-button smooth-transition py-3.5 rounded-2xl shadow-lg hover:shadow-xl button-press focus-ring hover-lift"
          size="sm"
        >
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-white" />
          <span className="hidden sm:inline mobile-button-text">Manual</span>
          <span className="sm:hidden mobile-button-text">✏️ Manual</span>
        </Button>
        <Button
          onClick={() => onToggleForm('pdf')}
          className="mobile-button smooth-transition py-3.5 rounded-2xl shadow-lg hover:shadow-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 button-press focus-ring hover-lift text-white"
          size="sm"
        >
          <Upload className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-white" />
          <span className="hidden sm:inline mobile-button-text">Subir PDF</span>
          <span className="sm:hidden mobile-button-text">📄 PDF</span>
        </Button>
        <Button
          onClick={() => onToggleForm('camera')}
          variant="warning"
          className="mobile-button smooth-transition py-3.5 rounded-2xl shadow-lg hover:shadow-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 button-press focus-ring hover-lift text-white"
          size="sm"
        >
          <Camera className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-white" />
          <span className="hidden sm:inline mobile-button-text">Foto</span>
          <span className="sm:hidden mobile-button-text">📸 Foto</span>
        </Button>
      </div>
    </div>
  );
};