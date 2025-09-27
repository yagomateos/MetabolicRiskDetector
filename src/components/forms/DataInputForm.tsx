import React from 'react';
import { BloodAnalysis, UploadMode, ExtractedData } from '../../types';
import { FileText, Smartphone, Upload, Camera } from 'lucide-react';
import { Button } from '../ui/Button.tsx';

interface DataInputFormProps {
  uploadMode: UploadMode;
  newData: Partial<BloodAnalysis>;
  extractedData: ExtractedData | null;
  isProcessing: boolean;
  onDataChange: (data: Partial<BloodAnalysis>) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const DataInputForm: React.FC<DataInputFormProps> = ({
  uploadMode,
  newData,
  extractedData,
  isProcessing,
  onDataChange,
  onFileUpload,
  onSubmit,
  onCancel
}) => {
  const handleInputChange = (field: keyof BloodAnalysis, value: string) => {
    const numericValue = parseFloat(value) || '';
    onDataChange({ ...newData, [field]: numericValue });
  };

  return (
    <div className="bg-white border-b p-4">
      {uploadMode === 'manual' && (
        <div>
          <h3 className="text-sm font-semibold mb-3">Introducir Manualmente</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Glucosa</label>
              <input
                type="number"
                value={newData.glucosa || ''}
                onChange={(e) => handleInputChange('glucosa', e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded"
                placeholder="157"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">ALT</label>
              <input
                type="number"
                value={newData.alt || ''}
                onChange={(e) => handleInputChange('alt', e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded"
                placeholder="86"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">AST</label>
              <input
                type="number"
                value={newData.ast || ''}
                onChange={(e) => handleInputChange('ast', e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded"
                placeholder="51"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Leucocitos</label>
              <input
                type="number"
                step="0.1"
                value={newData.leucocitos || ''}
                onChange={(e) => handleInputChange('leucocitos', e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded"
                placeholder="9.56"
              />
            </div>
          </div>
        </div>
      )}

      {uploadMode === 'pdf' && (
        <div className="text-center">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold mb-2">Subir Informe PDF</h3>
            <p className="text-xs text-gray-600 mb-4">La IA extraerá automáticamente todos los valores</p>
            <input
              type="file"
              accept=".pdf"
              onChange={onFileUpload}
              className="hidden"
              id="pdf-upload"
            />
            <label
              htmlFor="pdf-upload"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
            >
              Seleccionar PDF
            </label>
          </div>

          {isProcessing && (
            <div className="mt-4 text-center">
              <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Extrayendo datos con IA...</p>
            </div>
          )}

          {extractedData && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="text-sm font-semibold text-green-800 mb-2">
                Datos Extraídos ✓ ({Object.keys(extractedData).filter(key => key !== 'fecha' && key !== 'confidence' && extractedData[key] != null).length} valores)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs max-h-32 overflow-y-auto">
                {Object.entries(extractedData)
                  .filter(([key, value]) => key !== 'fecha' && key !== 'confidence' && value != null)
                  .map(([key, value]) => {
                    // Formatear nombres de parámetros para mostrar
                    const displayNames: {[key: string]: string} = {
                      glucosa: 'Glucosa',
                      alt: 'ALT',
                      ast: 'AST',
                      leucocitos: 'Leucocitos',
                      hemoglobina: 'Hemoglobina',
                      creatinina: 'Creatinina',
                      eritrocitos: 'Eritrocitos',
                      hematocrito: 'Hematocrito',
                      neutrofilos: 'Neutrófilos',
                      linfocitos: 'Linfocitos',
                      plaquetas: 'Plaquetas',
                      urea: 'Urea',
                      bilirrubina: 'Bilirrubina',
                      sodio: 'Sodio',
                      potasio: 'Potasio',
                      calcio: 'Calcio',
                      hba1c: 'HbA1c',
                      colesterol: 'Colesterol',
                      trigliceridos: 'Triglicéridos',
                      hdl: 'HDL',
                      ldl: 'LDL',
                      acido_urico: 'Ácido úrico',
                      albumina: 'Albúmina',
                      proteinas: 'Proteínas'
                    };

                    const displayName = displayNames[key] || key;
                    const displayValue = typeof value === 'number'
                      ? (value % 1 === 0 ? value.toString() : value.toFixed(2))
                      : value;

                    return (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-700">{displayName}:</span>
                        <span className="font-semibold">{displayValue}</span>
                      </div>
                    );
                  })}
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-green-200">
                <p className="text-xs text-green-600">
                  Confianza: {extractedData.confidence ? (extractedData.confidence * 100).toFixed(0) : 0}%
                </p>
                <p className="text-xs text-gray-500">
                  {extractedData.fecha}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {uploadMode === 'camera' && (
        <div className="text-center">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold mb-2">Tomar Foto del Informe</h3>
            <p className="text-xs text-gray-600 mb-4">Fotografía tu analítica y la IA leerá los valores</p>
            <input
              type="file"
              accept="image/*"
              capture
              onChange={onFileUpload}
              className="hidden"
              id="camera-upload"
            />
            <label
              htmlFor="camera-upload"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
            >
              Abrir Cámara
            </label>
          </div>
        </div>
      )}

      <div className="flex space-x-2 mt-4">
        <Button
          onClick={onSubmit}
          disabled={isProcessing}
          className="flex-1"
        >
          Analizar con IA
        </Button>
        <Button
          onClick={onCancel}
          variant="secondary"
          className="flex-1"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};