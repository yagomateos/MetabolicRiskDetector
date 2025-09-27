export interface BloodAnalysis {
  eritrocitos: number;
  hemoglobina: number;
  hematocrito: number;
  vcm: number;
  hcm: number;
  ccmh: number;
  rdw: number;
  leucocitos: number;
  neutrofilos: number;
  linfocitos: number;
  monocitos: number;
  eosinofilos: number;
  basofilos: number;
  plaquetas: number;
  creatinina: number;
  urea: number;
  bilirrubina: number;
  ph: number;
  pO2: number;
  pCO2: number;
  lactato: number;
  calcio: number;
  glucosa: number;
  sodio: number;
  potasio: number;
  hco3: number;
  co2Total: number;
  excesoBase: number;
  saturacionO2: number;
  alt: number;
  ast: number;
  edad: number;
  sexo: string;
  fecha: string;
}

export interface Trend {
  change: number;
  percentage: string;
  trend: 'up' | 'down' | 'stable';
}

export interface SystemAlert {
  risk: string;
  score?: number;
  details?: string;
  ratio?: string;
  interpretation?: string;
}

export interface Insight {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface Analysis {
  riskScore: number;
  systemAlerts: {
    cardiovascular: SystemAlert;
    metabolico: SystemAlert;
    hepatico: SystemAlert;
  };
  recommendations: string[];
  insights: Insight[];
  trends: { [key: string]: Trend };
  alerts: string[];
  current: BloodAnalysis;
  calculatedRisks: {
    cardiovascular: string;
    diabetes: number;
    hepatico: number;
  };
}

export interface ExtractedData {
  // Datos del paciente
  nombre_paciente?: string;
  edad_paciente?: number;
  sexo_paciente?: string;
  nhc_paciente?: string;
  referencia_paciente?: string;
  
  // Hematología
  eritrocitos?: number;
  hemoglobina?: number;
  hematocrito?: number;
  vcm?: number;
  hcm?: number;
  ccmh?: number;
  rdw?: number;
  leucocitos?: number;
  neutrofilos?: number;
  linfocitos?: number;
  monocitos?: number;
  eosinofilos?: number;
  basofilos?: number;
  plaquetas?: number;

  // Bioquímica básica
  glucosa?: number;
  creatinina?: number;
  urea?: number;
  alt?: number;
  ast?: number;
  bilirrubina?: number;

  // Electrolitos
  sodio?: number;
  potasio?: number;
  calcio?: number;

  // Panel metabólico/diabetes
  hba1c?: number;
  insulina?: number;
  colesterol?: number;
  trigliceridos?: number;
  hdl?: number;
  ldl?: number;

  // Panel renal
  acido_urico?: number;
  albumina?: number;
  proteinas?: number;

  // Metadatos
  fecha?: string;
  confidence?: number;

  // Permite otros campos dinámicos
  [key: string]: any;
}

export type UploadMode = 'manual' | 'pdf' | 'camera';
export type Category = 'general' | 'hemato' | 'bioquim' | 'hepatico' | 'tendencias';