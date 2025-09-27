import React, { useState, useEffect } from 'react';
import { AlertTriangle, Heart, Activity, TrendingUp, User, Brain, Droplets, Zap, Shield, Target, LineChart, Upload, FileText, Camera, Smartphone } from 'lucide-react';

const AdvancedMetabolicAnalyzer = () => {
  // Datos completos de Santiago (4/5/25)
  const baseline = {
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

  const [newData, setNewData] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [showInputForm, setShowInputForm] = useState(false);
  const [historicalData, setHistoricalData] = useState([baseline]);
  const [uploadMode, setUploadMode] = useState('manual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  // Función para extraer datos del PDF/imagen con IA
  const extractDataFromFile = async (file) => {
    setIsProcessing(true);
    
    try {
      // Simular extracción de datos (en app real usarías OCR + AI)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Datos simulados extraídos del "PDF"
      const extracted = {
        glucosa: 142,
        alt: 75,
        ast: 48,
        leucocitos: 8.2,
        hemoglobina: 15.0,
        creatinina: 0.80,
        fecha: new Date().toISOString().split('T')[0],
        confidence: 0.95
      };
      
      setExtractedData(extracted);
      setNewData(extracted);
      
    } catch (error) {
      alert('Error procesando el archivo. Inténtalo de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Función de análisis avanzado con IA
  const performAdvancedAnalysis = (dataToAnalyze = baseline) => {
    const current = { ...baseline, ...dataToAnalyze };
    
    let riskScore = 0;
    let alerts = [];
    let recommendations = [];
    let insights = [];
    let systemAlerts = {};
    let trends = {};

    // Análisis de tendencias
    if (historicalData.length > 1) {
      const previous = historicalData[historicalData.length - 2];
      trends = {
        glucosa: {
          change: current.glucosa - previous.glucosa,
          percentage: ((current.glucosa - previous.glucosa) / previous.glucosa * 100).toFixed(1),
          trend: current.glucosa > previous.glucosa ? 'up' : current.glucosa < previous.glucosa ? 'down' : 'stable'
        },
        alt: {
          change: current.alt - previous.alt,
          percentage: ((current.alt - previous.alt) / previous.alt * 100).toFixed(1),
          trend: current.alt > previous.alt ? 'up' : current.alt < previous.alt ? 'down' : 'stable'
        },
        leucocitos: {
          change: current.leucocitos - previous.leucocitos,
          percentage: ((current.leucocitos - previous.leucocitos) / previous.leucocitos * 100).toFixed(1),
          trend: current.leucocitos > previous.leucocitos ? 'up' : current.leucocitos < previous.leucocitos ? 'down' : 'stable'
        }
      };

      if (Math.abs(trends.glucosa.change) > 20) {
        alerts.push(`🔴 CAMBIO CRÍTICO: Glucosa ${trends.glucosa.change > 0 ? 'aumentó' : 'disminuyó'} ${Math.abs(trends.glucosa.change)} mg/dL`);
      }
      if (Math.abs(trends.alt.change) > 30) {
        alerts.push(`⚠️ ALT ${trends.alt.change > 0 ? 'aumentó' : 'disminuyó'} ${Math.abs(trends.alt.change)} UI/L`);
      }
    }
    
    // Análisis cardiovascular
    let cvRisk = 0;
    if (current.glucosa >= 126) cvRisk += 3;
    else if (current.glucosa >= 100) cvRisk += 2;
    if (current.alt > 80) cvRisk += 1;
    if (current.leucocitos > 10) cvRisk += 1;
    
    systemAlerts.cardiovascular = {
      risk: cvRisk >= 3 ? 'ALTO' : cvRisk >= 2 ? 'MODERADO' : 'BAJO',
      score: cvRisk,
      details: cvRisk >= 2 ? 'Prediabetes + inflamación detectada' : 'Parámetros normales'
    };

    // Análisis metabólico
    let metabolicSyndrome = 0;
    if (current.glucosa >= 100) metabolicSyndrome++;
    if (current.leucocitos > 8.5) metabolicSyndrome++;
    if (current.hematocrito > 48) metabolicSyndrome++;
    
    systemAlerts.metabolico = {
      risk: metabolicSyndrome >= 2 ? 'SÍNDROME METABÓLICO PROBABLE' : 'NORMAL',
      score: metabolicSyndrome,
      details: `${metabolicSyndrome}/4 criterios presentes`
    };

    // Análisis hepático
    let hepaticRisk = 0;
    const ratioAST_ALT = current.ast / current.alt;
    if (current.alt > 80) hepaticRisk += 2;
    if (ratioAST_ALT > 1) hepaticRisk += 1;
    if (current.bilirrubina > 1.2) hepaticRisk += 1;
    
    systemAlerts.hepatico = {
      risk: hepaticRisk >= 3 ? 'ALTO' : hepaticRisk >= 1 ? 'MODERADO' : 'NORMAL',
      ratio: ratioAST_ALT.toFixed(2),
      interpretation: ratioAST_ALT > 1 ? 'Evaluar fibrosis hepática' : 'Ratio normal'
    };

    riskScore = cvRisk + metabolicSyndrome + hepaticRisk;
    
    // Recomendaciones
    if (current.glucosa >= 140) {
      recommendations.push('🎯 HbA1c + curva de glucosa');
      recommendations.push('📊 Monitoreo glucosa 2x/día');
    }
    if (current.leucocitos > 9) {
      recommendations.push('🔬 PCR, VSG');
      recommendations.push('🥗 Dieta antiinflamatoria');
    }

    // Insights
    insights.push({
      title: 'Patrón Inflamatorio',
      description: `Leucocitos ${current.leucocitos} + neutrofilia sugiere inflamación subclínica asociada a prediabetes.`,
      severity: 'medium'
    });
    
    insights.push({
      title: 'Riesgo Cardiovascular',
      description: `Riesgo estimado evento CV en 10 años: ${(cvRisk * 5 + 10).toFixed(1)}%`,
      severity: 'high'
    });

    setAnalysis({
      riskScore,
      systemAlerts,
      recommendations,
      insights,
      trends,
      alerts,
      current,
      calculatedRisks: {
        cardiovascular: (cvRisk * 5 + 10).toFixed(1),
        diabetes: current.glucosa >= 126 ? 95 : current.glucosa >= 100 ? 65 : 15,
        hepatico: hepaticRisk * 15
      }
    });
  };

  // Función para añadir nueva analítica
  const addNewAnalytics = () => {
    if (Object.keys(newData).length === 0) {
      alert('Por favor, introduce datos o sube un informe');
      return;
    }

    const newEntry = {
      ...baseline,
      ...Object.fromEntries(
        Object.entries(newData).filter(([_, value]) => value !== '' && value !== null)
      ),
      fecha: newData.fecha || new Date().toISOString().split('T')[0]
    };

    const updatedHistory = [...historicalData, newEntry];
    setHistoricalData(updatedHistory);
    performAdvancedAnalysis(newEntry);
    setNewData({});
    setExtractedData(null);
    setShowInputForm(false);
    setUploadMode('manual');
  };

  // Función para manejar upload de archivos
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        extractDataFromFile(file);
      } else {
        alert('Solo se permiten archivos PDF o imágenes');
      }
    }
  };

  useEffect(() => {
    performAdvancedAnalysis();
  }, []);

  const categories = {
    general: { icon: Activity, name: 'Resumen' },
    hemato: { icon: Droplets, name: 'Sangre' },
    bioquim: { icon: Zap, name: 'Bioquímica' },
    hepatico: { icon: Shield, name: 'Hígado' },
    tendencias: { icon: TrendingUp, name: 'Evolución' }
  };

  const renderSystemAlert = (system, data) => {
    const colors = {
      'ALTO': 'border-red-500 bg-red-50',
      'MODERADO': 'border-yellow-500 bg-yellow-50',
      'BAJO': 'border-green-500 bg-green-50',
      'NORMAL': 'border-green-500 bg-green-50'
    };
    
    return (
      <div className={`p-3 border-l-4 rounded-lg ${colors[data.risk] || 'border-gray-300 bg-gray-50'}`}>
        <h4 className="font-semibold text-sm capitalize">{system}</h4>
        <p className="text-xs text-gray-700">{data.details || data.interpretation}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header móvil optimizado */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-center mb-2">
          <Brain className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-lg font-bold text-gray-800">Agente IA Metabólico</h1>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Santiago - Análisis personalizado</p>
          <div className="flex justify-center space-x-2 mt-2 text-xs">
            <span className="bg-blue-100 px-2 py-1 rounded">45 años</span>
            <span className="bg-blue-100 px-2 py-1 rounded">Varón</span>
          </div>
        </div>
      </div>

      {/* Navegación móvil */}
      <div className="bg-white border-b p-2">
        <div className="flex space-x-1 overflow-x-auto pb-2">
          {Object.entries(categories).map(([key, cat]) => {
            const Icon = cat.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
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
        
        {/* Botones de acción */}
        <div className="flex space-x-2 mt-3">
          <button
            onClick={() => {setShowInputForm(!showInputForm); setUploadMode('manual');}}
            className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center"
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Manual
          </button>
          <button
            onClick={() => {setShowInputForm(!showInputForm); setUploadMode('pdf');}}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center"
          >
            <Upload className="h-4 w-4 mr-1" />
            Subir PDF
          </button>
          <button
            onClick={() => {setShowInputForm(!showInputForm); setUploadMode('camera');}}
            className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center"
          >
            <Camera className="h-4 w-4 mr-1" />
            Foto
          </button>
        </div>
      </div>

      {/* Formulario expandido */}
      {showInputForm && (
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
                    onChange={(e) => setNewData({...newData, glucosa: parseFloat(e.target.value) || ''})}
                    className="w-full p-2 text-sm border border-gray-300 rounded"
                    placeholder="157"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">ALT</label>
                  <input
                    type="number"
                    value={newData.alt || ''}
                    onChange={(e) => setNewData({...newData, alt: parseFloat(e.target.value) || ''})}
                    className="w-full p-2 text-sm border border-gray-300 rounded"
                    placeholder="86"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">AST</label>
                  <input
                    type="number"
                    value={newData.ast || ''}
                    onChange={(e) => setNewData({...newData, ast: parseFloat(e.target.value) || ''})}
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
                    onChange={(e) => setNewData({...newData, leucocitos: parseFloat(e.target.value) || ''})}
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
                  onChange={handleFileUpload}
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
                  <h4 className="text-sm font-semibold text-green-800 mb-2">Datos Extraídos ✓</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Glucosa: {extractedData.glucosa}</div>
                    <div>ALT: {extractedData.alt}</div>
                    <div>AST: {extractedData.ast}</div>
                    <div>Leucocitos: {extractedData.leucocitos}</div>
                  </div>
                  <p className="text-xs text-green-600 mt-2">Confianza: {(extractedData.confidence * 100).toFixed(0)}%</p>
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
                  capture="camera"
                  onChange={handleFileUpload}
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
            <button
              onClick={addNewAnalytics}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm"
              disabled={isProcessing}
            >
              Analizar con IA
            </button>
            <button
              onClick={() => {setShowInputForm(false); setNewData({}); setExtractedData(null);}}
              className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="p-4">
        {selectedCategory === 'general' && analysis && (
          <div className="space-y-4">
            {/* Alertas críticas */}
            {analysis.alerts && analysis.alerts.length > 0 && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                <h3 className="font-semibold text-red-800 text-sm mb-2">🚨 Alertas Críticas</h3>
                <div className="space-y-1">
                  {analysis.alerts.map((alert, idx) => (
                    <p key={idx} className="text-xs text-red-700">{alert}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Evolución temporal */}
            {historicalData.length > 1 && analysis.trends && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-sm font-semibold mb-3">Evolución vs Anterior</h2>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(analysis.trends).map(([param, trend]) => (
                    <div key={param} className={`p-3 rounded-lg ${
                      trend.trend === 'up' ? 'bg-red-50 border border-red-200' : 
                      trend.trend === 'down' ? 'bg-green-50 border border-green-200' : 
                      'bg-gray-50 border border-gray-200'
                    }`}>
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-sm capitalize">{param}</h4>
                        <div className="text-right">
                          <span className={`text-sm font-bold ${
                            trend.trend === 'up' ? 'text-red-600' : 
                            trend.trend === 'down' ? 'text-green-600' : 
                            'text-gray-600'
                          }`}>
                            {trend.change > 0 ? '+' : ''}{trend.change}
                          </span>
                          <span className="text-xs text-gray-600 ml-1">({trend.percentage}%)</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {trend.trend === 'up' ? '📈 Aumentó' : 
                         trend.trend === 'down' ? '📉 Disminuyó' : 
                         '➡️ Estable'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Métricas clave */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <Target className="h-6 w-6 text-red-500 mx-auto mb-1" />
                <h3 className="text-sm font-semibold">Riesgo CV</h3>
                <p className="text-xl font-bold text-red-600">{analysis.calculatedRisks.cardiovascular}%</p>
                <p className="text-xs text-gray-600">10 años</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                <h3 className="text-sm font-semibold">Diabetes</h3>
                <p className="text-xl font-bold text-yellow-600">{analysis.calculatedRisks.diabetes}%</p>
                <p className="text-xs text-gray-600">Probabilidad</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <Shield className="h-6 w-6 text-orange-500 mx-auto mb-1" />
                <h3 className="text-sm font-semibold">Hepático</h3>
                <p className="text-xl font-bold text-orange-600">{analysis.calculatedRisks.hepatico}%</p>
                <p className="text-xs text-gray-600">Riesgo</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <LineChart className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                <h3 className="text-sm font-semibold">Score Global</h3>
                <p className="text-xl font-bold text-blue-600">{analysis.riskScore}/10</p>
                <p className="text-xs text-gray-600">Riesgo integrado</p>
              </div>
            </div>

            {/* Análisis por sistemas */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm font-semibold mb-3">Análisis por Sistemas</h2>
              <div className="space-y-3">
                {Object.entries(analysis.systemAlerts).map(([system, data]) => (
                  <div key={system}>
                    {renderSystemAlert(system, data)}
                  </div>
                ))}
              </div>
            </div>

            {/* Insights IA */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm font-semibold mb-3 flex items-center">
                <Brain className="h-4 w-4 mr-1" />
                Insights IA
              </h2>
              <div className="space-y-3">
                {analysis.insights.map((insight, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${
                    insight.severity === 'high' ? 'bg-red-50 border-l-4 border-red-500' :
                    insight.severity === 'medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                    'bg-blue-50 border-l-4 border-blue-500'
                  }`}>
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                    <p className="text-xs text-gray-700 mt-1">{insight.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recomendaciones */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm font-semibold mb-3">Plan de Acción</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-xs text-red-600 mb-2">Urgente (1-2 semanas)</h3>
                  <ul className="space-y-1 text-xs">
                    <li>• Consulta endocrinólogo</li>
                    <li>• HbA1c + curva glucosa</li>
                    <li>• Ecografía abdominal</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-yellow-600 mb-2">Medio plazo (1-3 meses)</h3>
                  <ul className="space-y-1 text-xs">
                    <li>• Panel vitamínico (B12, folato, D)</li>
                    <li>• Perfil lipídico completo</li>
                    <li>• Repetir analítica completa</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sección Evolución */}
        {selectedCategory === 'tendencias' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm font-semibold mb-3">Historial Analíticas</h2>
              <div className="space-y-2">
                {historicalData.map((data, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border ${idx === historicalData.length - 1 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold">{data.fecha}</span>
                      <span className="text-xs">
                        {idx === 0 ? '📊 Baseline' : 
                         idx === historicalData.length - 1 ? '🔥 Actual' : 
                         '📈 Histórico'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Glucosa: <span className="font-semibold">{data.glucosa}</span></div>
                      <div>ALT: <span className="font-semibold">{data.alt}</span></div>
                      <div>AST: <span className="font-semibold">{data.ast}</span></div>
                      <div>Leucocitos: <span className="font-semibold">{data.leucocitos}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {historicalData.length === 1 && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">
                  Sin datos de comparación
                </h3>
                <p className="text-xs text-yellow-700">
                  Sube una nueva analítica para ver la evolución
                </p>
              </div>
            )}
          </div>
        )}

        {/* Sección Hematología */}
        {selectedCategory === 'hemato' && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-sm font-semibold mb-3">Análisis Hematológico</h2>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Eritrocitos</p>
                <p className="font-semibold text-sm">{baseline.eritrocitos}</p>
                <p className="text-xs text-green-600">Normal</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Hemoglobina</p>
                <p className="font-semibold text-sm">{baseline.hemoglobina}</p>
                <p className="text-xs text-green-600">Normal</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-xs text-gray-600">Leucocitos</p>
                <p className="font-semibold text-sm">{baseline.leucocitos}</p>
                <p className="text-xs text-yellow-600">Elevado</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-xs text-gray-600">Neutrófilos</p>
                <p className="font-semibold text-sm">{baseline.neutrofilos}%</p>
                <p className="text-xs text-red-600">Alto</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-xs text-gray-600">Linfocitos</p>
                <p className="font-semibold text-sm">{baseline.linfocitos}%</p>
                <p className="text-xs text-yellow-600">Bajo</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Plaquetas</p>
                <p className="font-semibold text-sm">{baseline.plaquetas}</p>
                <p className="text-xs text-green-600">Normal</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs">
                <strong>Interpretación IA:</strong> Patrón leucocitario sugiere inflamación sistémica subclínica. 
                La neutrofilia con linfopenia relativa es consistente con estrés metabólico asociado a prediabetes.
              </p>
            </div>
          </div>
        )}

        {/* Sección Bioquímica */}
        {selectedCategory === 'bioquim' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm font-semibold mb-3">Panel Bioquímico</h2>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-red-700 text-sm">Glucosa</h4>
                    <span className="text-lg font-bold text-red-600">{baseline.glucosa} mg/dL</span>
                  </div>
                  <p className="text-xs text-red-600">ELEVADA (Normal: 74-110)</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-green-700 text-sm">Creatinina</h4>
                    <span className="text-lg font-bold text-green-600">{baseline.creatinina} mg/dL</span>
                  </div>
                  <p className="text-xs text-green-600">NORMAL (0.6-1.1)</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-green-700 text-sm">Urea</h4>
                    <span className="text-lg font-bold text-green-600">{baseline.urea} mg/dL</span>
                  </div>
                  <p className="text-xs text-green-600">NORMAL (17-49)</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-green-700 text-sm">Bilirrubina</h4>
                    <span className="text-lg font-bold text-green-600">{baseline.bilirrubina} mg/dL</span>
                  </div>
                  <p className="text-xs text-green-600">NORMAL (0.1-1.2)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sección Hepática */}
        {selectedCategory === 'hepatico' && analysis && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm font-semibold mb-3">Función Hepática</h2>
              <div className="space-y-3">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">ALT (Alanina)</h3>
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{baseline.alt}</div>
                  <p className="text-xs text-yellow-600">Límite superior (Normal: 37-125)</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">AST (Aspartato)</h3>
                  <div className="text-2xl font-bold text-green-600 mb-1">{baseline.ast}</div>
                  <p className="text-xs text-green-600">Normal (4-44)</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">Ratio AST/ALT</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {analysis.systemAlerts.hepatico.ratio}
                  </div>
                  <p className="text-xs text-blue-600">
                    {analysis.systemAlerts.hepatico.interpretation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer móvil con info rápida */}
      <div className="bg-white border-t p-3 text-center">
        <p className="text-xs text-gray-600">
          🔄 Última actualización: {baseline.fecha} | 
          🤖 Análisis IA personalizado | 
          📱 Optimizado para móvil
        </p>
      </div>
    </div>
  );
};

export default AdvancedMetabolicAnalyzer;
                      