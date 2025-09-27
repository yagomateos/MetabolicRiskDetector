import { BloodAnalysis, Analysis, Insight, SystemAlert, Trend } from '../types';

export const performAdvancedAnalysis = (
  dataToAnalyze: Partial<BloodAnalysis>,
  baseline: BloodAnalysis,
  historicalData: BloodAnalysis[]
): Analysis => {
  const current = { ...baseline, ...dataToAnalyze };

  let riskScore = 0;
  let alerts: string[] = [];
  let recommendations: string[] = [];
  let insights: Insight[] = [];
  let systemAlerts: Analysis['systemAlerts'] = {
    cardiovascular: { risk: 'BAJO' },
    metabolico: { risk: 'NORMAL' },
    hepatico: { risk: 'NORMAL' }
  };
  let trends: { [key: string]: Trend } = {};

  // Análisis de tendencias
  if (historicalData.length > 1) {
    const previous = historicalData[historicalData.length - 2];
    trends = {
      glucosa: calculateTrend(current.glucosa, previous.glucosa),
      alt: calculateTrend(current.alt, previous.alt),
      leucocitos: calculateTrend(current.leucocitos, previous.leucocitos)
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
  if (current.alt > 56) metabolicSyndrome++; // Criterio hepático para síndrome metabólico

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

  return {
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
  };
};

const calculateTrend = (current: number, previous: number): Trend => {
  const change = current - previous;
  const percentage = ((change / previous) * 100).toFixed(1);
  const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';

  return { change, percentage, trend };
};