import React, { useState } from 'react';
import { Category, UploadMode } from './types/index.ts';
import { useMetabolicAnalyzer } from './hooks/useMetabolicAnalyzer.ts';

import { Header } from './components/Header.tsx';
import { Navigation } from './components/Navigation.tsx';
import { DataInputForm } from './components/forms/DataInputForm.tsx';
import { GeneralView } from './components/views/GeneralView.tsx';
import { HematologyView } from './components/views/HematologyView.tsx';
import { BiochemistryView } from './components/views/BiochemistryView.tsx';
import { HepaticView } from './components/views/HepaticView.tsx';
import { TrendsView } from './components/views/TrendsView.tsx';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('general');
  const [showInputForm, setShowInputForm] = useState(false);

  const {
    newData,
    analysis,
    historicalData,
    uploadMode,
    isProcessing,
    extractedData,
    baseline,
    currentData,
    setNewData,
    setUploadMode,
    handleFileUpload,
    addNewAnalytics,
    resetForm
  } = useMetabolicAnalyzer();

  const handleToggleForm = (mode: UploadMode) => {
    setUploadMode(mode);
    setShowInputForm(!showInputForm);
  };

  const handleFileUploadWrapper = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await handleFileUpload(file);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Error al procesar el archivo');
      }
    }
  };

  const handleSubmit = () => {
    try {
      addNewAnalytics();
      setShowInputForm(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al procesar los datos');
    }
  };

  const handleCancel = () => {
    setShowInputForm(false);
    resetForm();
  };

  const renderMainContent = () => {
    if (!analysis) return null;

    switch (selectedCategory) {
      case 'general':
        return <GeneralView analysis={analysis} historicalDataLength={historicalData.length} />;
      case 'hemato':
        return <HematologyView baseline={currentData} />;
      case 'bioquim':
        return <BiochemistryView baseline={currentData} />;
      case 'hepatico':
        return <HepaticView baseline={currentData} analysis={analysis} />;
      case 'tendencias':
        return <TrendsView historicalData={historicalData} />;
      default:
        return <GeneralView analysis={analysis} historicalDataLength={historicalData.length} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        patientName="Santiago Mateos"
        age={baseline.edad}
        gender={baseline.sexo === 'M' ? 'Varón' : 'Mujer'}
      />

      <Navigation
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onToggleForm={handleToggleForm}
      />

      {showInputForm && (
        <DataInputForm
          uploadMode={uploadMode}
          newData={newData}
          extractedData={extractedData}
          isProcessing={isProcessing}
          onDataChange={setNewData}
          onFileUpload={handleFileUploadWrapper}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="p-4">
        {renderMainContent()}
      </div>

      <div className="bg-white border-t p-3 text-center">
        <p className="text-xs text-gray-600">
          🔄 Última actualización: {currentData.fecha} |
          🤖 Análisis IA personalizado |
          📱 Optimizado para móvil
        </p>
      </div>
    </div>
  );
}

export default App;