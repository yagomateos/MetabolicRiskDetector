import { ExtractedData } from '../types';

// Simulador de diferentes tipos de informes médicos
const generateMockAnalysis = (fileName: string) => {
  const today = new Date().toISOString().split('T')[0];

  // Detectar tipo de informe por nombre del archivo
  const fileNameLower = fileName.toLowerCase();

  if (fileNameLower.includes('completo') || fileNameLower.includes('general') || fileNameLower.includes('anual')) {
    // Informe completo - todos los valores
    return {
      // Hematología completa
      eritrocitos: 4.2 + Math.random() * 1.0,
      hemoglobina: 13.5 + Math.random() * 3.0,
      hematocrito: 40.0 + Math.random() * 10.0,
      vcm: 85.0 + Math.random() * 15.0,
      hcm: 28.0 + Math.random() * 6.0,
      ccmh: 32.0 + Math.random() * 4.0,
      rdw: 11.5 + Math.random() * 3.0,
      leucocitos: 4.0 + Math.random() * 6.0,
      neutrofilos: 50.0 + Math.random() * 25.0,
      linfocitos: 20.0 + Math.random() * 15.0,
      monocitos: 4.0 + Math.random() * 6.0,
      eosinofilos: 1.0 + Math.random() * 3.0,
      basofilos: 0.5 + Math.random() * 1.0,
      plaquetas: 150 + Math.random() * 200,

      // Bioquímica completa
      glucosa: 80 + Math.random() * 80,
      creatinina: 0.6 + Math.random() * 0.6,
      urea: 20 + Math.random() * 40,
      alt: 15 + Math.random() * 60,
      ast: 15 + Math.random() * 45,
      bilirrubina: 0.3 + Math.random() * 1.0,

      // Electrolitos
      sodio: 135 + Math.random() * 10,
      potasio: 3.5 + Math.random() * 1.5,
      calcio: 9.0 + Math.random() * 2.0,

      fecha: today,
      confidence: 0.92 + Math.random() * 0.07
    };
  }

  if (fileNameLower.includes('hepatic') || fileNameLower.includes('higado') || fileNameLower.includes('liver')) {
    // Panel hepático específico
    return {
      alt: 20 + Math.random() * 80,
      ast: 18 + Math.random() * 60,
      bilirrubina: 0.3 + Math.random() * 1.2,
      albumina: 3.5 + Math.random() * 1.5,
      proteinas: 6.0 + Math.random() * 2.0,
      fecha: today,
      confidence: 0.88 + Math.random() * 0.10
    };
  }

  if (fileNameLower.includes('diabetes') || fileNameLower.includes('glucosa') || fileNameLower.includes('metabol')) {
    // Panel metabólico/diabetes
    return {
      glucosa: 70 + Math.random() * 100,
      hba1c: 5.0 + Math.random() * 3.0,
      insulina: 5.0 + Math.random() * 15.0,
      colesterol: 150 + Math.random() * 100,
      trigliceridos: 80 + Math.random() * 150,
      hdl: 35 + Math.random() * 30,
      ldl: 80 + Math.random() * 80,
      fecha: today,
      confidence: 0.90 + Math.random() * 0.08
    };
  }

  if (fileNameLower.includes('hemato') || fileNameLower.includes('sangre') || fileNameLower.includes('blood')) {
    // Panel hematológico
    return {
      eritrocitos: 4.0 + Math.random() * 1.2,
      hemoglobina: 12.0 + Math.random() * 4.0,
      hematocrito: 35.0 + Math.random() * 15.0,
      leucocitos: 4.0 + Math.random() * 7.0,
      neutrofilos: 45.0 + Math.random() * 30.0,
      linfocitos: 15.0 + Math.random() * 20.0,
      plaquetas: 150 + Math.random() * 250,
      fecha: today,
      confidence: 0.85 + Math.random() * 0.12
    };
  }

  if (fileNameLower.includes('renal') || fileNameLower.includes('riñon') || fileNameLower.includes('kidney')) {
    // Panel renal
    return {
      creatinina: 0.5 + Math.random() * 1.0,
      urea: 15 + Math.random() * 45,
      acido_urico: 3.0 + Math.random() * 4.0,
      albumina: 3.5 + Math.random() * 1.5,
      proteinas: 6.0 + Math.random() * 2.0,
      fecha: today,
      confidence: 0.87 + Math.random() * 0.10
    };
  }

  // Informe básico por defecto
  return {
    glucosa: 80 + Math.random() * 60,
    alt: 20 + Math.random() * 50,
    ast: 18 + Math.random() * 40,
    leucocitos: 4.5 + Math.random() * 5.0,
    hemoglobina: 13.0 + Math.random() * 3.0,
    creatinina: 0.7 + Math.random() * 0.4,
    fecha: today,
    confidence: 0.82 + Math.random() * 0.15
  };
};

export const extractDataFromFile = async (file: File): Promise<ExtractedData> => {
  // Simular procesamiento de archivo
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generar datos basados en el nombre del archivo
  const mockData = generateMockAnalysis(file.name);

  // Redondear valores para que se vean realistas
  const extracted: ExtractedData = {};

  Object.entries(mockData).forEach(([key, value]) => {
    if (typeof value === 'number' && key !== 'confidence') {
      // Redondear a 1-2 decimales según el tipo de valor
      if (key.includes('leucocitos') || key.includes('eritrocitos') || key.includes('creatinina')) {
        extracted[key] = Math.round(value * 100) / 100; // 2 decimales
      } else if (key.includes('porcentaje') || key.includes('neutrofilos') || key.includes('linfocitos')) {
        extracted[key] = Math.round(value * 10) / 10; // 1 decimal
      } else {
        extracted[key] = Math.round(value); // Sin decimales para la mayoría
      }
    } else {
      extracted[key] = value;
    }
  });

  return extracted;
};