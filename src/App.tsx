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
    patientInfo,
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
    <div className="min-h-screen gradient-bg-soft max-w-full overflow-x-hidden">
      <Header
        patientName={patientInfo.nombre}
        age={patientInfo.edad}
        gender={patientInfo.sexo}
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

      <div className="p-3 sm:p-5 max-w-full space-y-4">
        {renderMainContent()}
      </div>

      <div className="gradient-bg-card border-t border-gray-100 p-4 text-center shadow-lg">
        <p className="text-sm text-gray-600 break-words mobile-caption font-medium">
          🔄 Actualizado: {currentData.fecha?.slice(0, 10)} |
          🤖 Análisis IA |
          📱 Diseño Optimizado
        </p>
      </div>
    </div>
  );
}

export default App;