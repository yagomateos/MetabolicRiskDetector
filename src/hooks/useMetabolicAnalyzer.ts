import { useState, useEffect, useCallback } from 'react';
import { BloodAnalysis, Analysis, ExtractedData, UploadMode } from '../types';
import { performAdvancedAnalysis } from '../utils/analysisEngine.ts';
import { extractDataFromFile } from '../services/fileExtraction.ts';

const baseline: BloodAnalysis = {
  eritrocitos: 4.99,
  hemoglobina: 15.2,
  hematocrito: 45.6,
  vcm: 91.3,
  hcm: 30.5,
  ccmh: 33.4,
  rdw: 12.7,
  leucocitos: 9.56,
  neutrofilos: 82.10,
  linfocitos: 8.55,
  monocitos: 8.10,
  eosinofilos: 0.75,
  basofilos: 0.50,
  plaquetas: 200,
  creatinina: 0.78,
  urea: 51,
  bilirrubina: 1.00,
  ph: 7.4,
  pO2: 44.4,
  pCO2: 36.1,
  lactato: 2.18,
  calcio: 1.1,
  glucosa: 157,
  sodio: 139.0,
  potasio: 3.90,
  hco3: 22.3,
  co2Total: 23.4,
  excesoBase: -2.0,
  saturacionO2: 80.3,
  alt: 86,
  ast: 51,
  edad: 45,
  sexo: 'M',
  fecha: "2025-05-04"
};

export const useMetabolicAnalyzer = () => {
  const [newData, setNewData] = useState<Partial<BloodAnalysis>>({});
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [historicalData, setHistoricalData] = useState<BloodAnalysis[]>([baseline]);
  const [uploadMode, setUploadMode] = useState<UploadMode>('manual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [currentData, setCurrentData] = useState<BloodAnalysis>(baseline);

  const runAnalysis = useCallback((dataToAnalyze: Partial<BloodAnalysis> = baseline) => {
    const result = performAdvancedAnalysis(dataToAnalyze, baseline, historicalData);
    setAnalysis(result);
  }, [historicalData]);

  const handleFileUpload = async (file: File) => {
    if (!file.type.includes('pdf') && !file.type.startsWith('image/')) {
      throw new Error('Solo se permiten archivos PDF o imágenes');
    }

    setIsProcessing(true);
    try {
      const extracted = await extractDataFromFile(file);
      setExtractedData(extracted);
      setNewData(extracted);

      // Crear nueva entrada con datos extraídos
      const newEntry: BloodAnalysis = {
        ...baseline,
        ...extracted,
        fecha: extracted.fecha || new Date().toISOString().split('T')[0]
      } as BloodAnalysis;

      // Actualizar datos actuales y historial
      setCurrentData(newEntry);
      const updatedHistory = [...historicalData, newEntry];
      setHistoricalData(updatedHistory);
      
      console.log('🎯 ACTUALIZANDO currentData con datos reales:', newEntry);

      // Ejecutar análisis con el historial actualizado
      const result = performAdvancedAnalysis(newEntry, baseline, updatedHistory);
      setAnalysis(result);
    } catch (error) {
      throw new Error('Error procesando el archivo. Inténtalo de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const addNewAnalytics = () => {
    if (Object.keys(newData).length === 0) {
      throw new Error('Por favor, introduce datos o sube un informe');
    }

    // Si ya hay datos extraídos, solo resetear el formulario
    if (extractedData) {
      resetForm();
      return;
    }

    const newEntry: BloodAnalysis = {
      ...baseline,
      ...Object.fromEntries(
        Object.entries(newData).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
      ),
      fecha: newData.fecha || new Date().toISOString().split('T')[0]
    } as BloodAnalysis;

    const updatedHistory = [...historicalData, newEntry];
    setHistoricalData(updatedHistory);
    setCurrentData(newEntry);

    // Ejecutar análisis con el historial actualizado
    const result = performAdvancedAnalysis(newEntry, baseline, updatedHistory);
    setAnalysis(result);

    resetForm();
  };

  const resetForm = () => {
    setNewData({});
    setExtractedData(null);
    setUploadMode('manual');
    // No resetear currentData ni análisis cuando solo se cierra el formulario
  };

  useEffect(() => {
    // Solo ejecutar análisis inicial una vez al montar el componente
    const result = performAdvancedAnalysis(baseline, baseline, [baseline]);
    setAnalysis(result);
  }, []); // Array vacío para ejecutar solo una vez

  return {
    // State
    newData,
    analysis,
    historicalData,
    uploadMode,
    isProcessing,
    extractedData,
    baseline,
    currentData,

    // Actions
    setNewData,
    setUploadMode,
    handleFileUpload,
    addNewAnalytics,
    resetForm,
    runAnalysis
  };
};