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
    <div className="bg-white border-b p-2">
      <div className="flex space-x-1 overflow-x-auto pb-2">
        {Object.entries(categories).map(([key, cat]) => {
          const Icon = cat.icon;
          return (
            <button
              key={key}
              onClick={() => onCategoryChange(key as Category)}
              className={`flex items-center px-3 py-2 rounded-lg whitespace-nowrap text-xs ${
                selectedCategory === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Icon className="h-3 w-3 mr-1" />
              {cat.name}
            </button>
          );
        })}
      </div>

      <div className="flex space-x-2 mt-3">
        <Button
          onClick={() => onToggleForm('manual')}
          variant="success"
          className="flex-1"
          size="sm"
        >
          <TrendingUp className="h-4 w-4 mr-1" />
          Manual
        </Button>
        <Button
          onClick={() => onToggleForm('pdf')}
          className="flex-1"
          size="sm"
        >
          <Upload className="h-4 w-4 mr-1" />
          Subir PDF
        </Button>
        <Button
          onClick={() => onToggleForm('camera')}
          variant="warning"
          className="flex-1 bg-purple-600 hover:bg-purple-700"
          size="sm"
        >
          <Camera className="h-4 w-4 mr-1" />
          Foto
        </Button>
      </div>
    </div>
  );
};