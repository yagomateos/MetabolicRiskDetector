import { BloodAnalysis, Analysis, Insight, Trend } from '../types';

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
  else if (current.glucosa >= 90) cvRisk += 1;
  if (current.alt > 80) cvRisk += 2;
  else if (current.alt > 56) cvRisk += 1;
  if (current.leucocitos > 10) cvRisk += 2;
  else if (current.leucocitos > 8.5) cvRisk += 1;

  systemAlerts.cardiovascular = {
    risk: cvRisk >= 4 ? 'ALTO' : cvRisk >= 2 ? 'MODERADO' : 'BAJO',
    score: cvRisk,
    details: cvRisk >= 4 ? 'Múltiples factores de riesgo' :
             cvRisk >= 2 ? 'Factores de riesgo moderados' : 'Parámetros normales'
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

  // Recomendaciones dinámicas específicas por valores
  const urgentActions: string[] = [];
  const mediumActions: string[] = [];
  const longActions: string[] = [];

  // Análisis de glucosa
  if (current.glucosa >= 140) {
    urgentActions.push('🎯 Análisis de diabetes completo URGENTE');
    urgentActions.push('📊 Control de azúcar 2 veces al día');
    urgentActions.push('💊 Consulta con endocrinólogo inmediata');
  } else if (current.glucosa >= 100) {
    mediumActions.push('🎯 Análisis de diabetes para confirmar prediabetes');
    mediumActions.push('🥗 Dieta baja en azúcares y carbohidratos');
    mediumActions.push('🏃 Ejercicio aeróbico 150 minutos por semana');
  } else if (current.glucosa >= 90) {
    longActions.push('📊 Control de azúcar periódico');
    longActions.push('🥗 Mantener dieta equilibrada');
  }

  // Análisis de leucocitos
  if (current.leucocitos > 10) {
    urgentActions.push('🔬 Análisis de infección (PCR, VSG, hemocultivo)');
    urgentActions.push('🚨 Evaluación de infección o inflamación');
    urgentActions.push('🌡️ Control de temperatura corporal');
  } else if (current.leucocitos > 8.5) {
    mediumActions.push('🔬 Análisis de inflamación (PCR, VSG)');
    mediumActions.push('🥗 Dieta antiinflamatoria');
    mediumActions.push('🧘 Técnicas de manejo del estrés');
  }

  // Análisis hepático
  if (current.alt > 80) {
    urgentActions.push('🛡️ Ecografía del hígado urgente');
    urgentActions.push('🍺 Suspender alcohol completamente');
    urgentActions.push('💊 Revisar medicamentos que dañan el hígado');
  } else if (current.alt > 56) {
    mediumActions.push('🛡️ Control del hígado en 2-4 semanas');
    mediumActions.push('🚫 Reducir alcohol y medicamentos hepatotóxicos');
    mediumActions.push('🥗 Dieta protectora del hígado');
  }

  // Análisis de creatinina
  if (current.creatinina > 1.2) {
    urgentActions.push('🫘 Evaluación de los riñones urgente');
    urgentActions.push('💧 Control estricto de hidratación');
  } else if (current.creatinina > 1.0) {
    mediumActions.push('🫘 Control de función renal en 1 mes');
    mediumActions.push('💧 Mantener hidratación adecuada');
  }

  // Análisis de hemoglobina
  if (current.hemoglobina < 12) {
    mediumActions.push('🩸 Evaluación de anemia');
    mediumActions.push('🍖 Suplementación de hierro si es necesario');
  } else if (current.hemoglobina > 16) {
    mediumActions.push('🩸 Evaluación de exceso de glóbulos rojos');
    mediumActions.push('💧 Hidratación aumentada');
  }

  // Análisis de colesterol
  if (current.colesterol > 240) {
    mediumActions.push('❤️ Evaluación cardiovascular');
    mediumActions.push('🥗 Dieta para bajar el colesterol');
    mediumActions.push('🏃 Ejercicio cardiovascular');
  }

  // Combinar todas las recomendaciones
  recommendations.push(...urgentActions, ...mediumActions, ...longActions);

  // Insights dinámicos
  if (current.leucocitos > 10) {
    insights.push({
      title: 'Leucocitosis Significativa',
      description: `Leucocitos ${current.leucocitos}: Posible infección aguda o inflamación sistémica. Requiere evaluación urgente.`,
      severity: 'high'
    });
  } else if (current.leucocitos > 8.5) {
    insights.push({
      title: 'Patrón Inflamatorio',
      description: `Leucocitos ${current.leucocitos}: Inflamación subclínica, frecuente en síndrome metabólico.`,
      severity: 'medium'
    });
  }

  if (current.glucosa >= 126) {
    insights.push({
      title: 'Diabetes Mellitus',
      description: `Glucosa ${current.glucosa} mg/dL: Criterio diagnóstico de diabetes. Iniciar tratamiento.`,
      severity: 'high'
    });
  } else if (current.glucosa >= 100) {
    insights.push({
      title: 'Prediabetes',
      description: `Glucosa ${current.glucosa} mg/dL: Alteración metabólica. Riesgo de progresión a diabetes.`,
      severity: 'medium'
    });
  }

  const cvRiskPercentage = Math.min(cvRisk * 8 + 5, 85); // Más preciso y limitado a 85%
  insights.push({
    title: 'Riesgo Cardiovascular',
    description: `Riesgo estimado evento CV en 10 años: ${cvRiskPercentage.toFixed(1)}%`,
    severity: cvRiskPercentage > 20 ? 'high' : cvRiskPercentage > 10 ? 'medium' : 'low'
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
      cardiovascular: cvRiskPercentage.toFixed(1),
      diabetes: current.glucosa >= 126 ? 95 : current.glucosa >= 100 ? 65 : current.glucosa >= 90 ? 25 : 5,
      hepatico: Math.min(hepaticRisk * 20, 80)
    }
  };
};

const calculateTrend = (current: number, previous: number): Trend => {
  const change = current - previous;
  const percentage = previous !== 0 ? ((change / previous) * 100).toFixed(1) : '0.0';
  const trend = Math.abs(change) < 0.01 ? 'stable' : change > 0 ? 'up' : 'down';

  return { change: Number(change.toFixed(2)), percentage, trend };
};