# 🧬 Metabolic Risk Detector

> Una aplicación React moderna para el análisis profesional de riesgo metabólico con inteligencia artificial y procesamiento automático de analíticas médicas.

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Vista Previa](#-vista-previa)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Guía de Uso](#-guía-de-uso)
- [Tecnologías](#-tecnologías)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Métricas y Análisis](#-métricas-y-análisis)
- [Desarrollo](#-desarrollo)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características Principales

### 🎯 Análisis Inteligente
- **Motor de IA avanzado**: Análisis completo de biomarcadores con algoritmos especializados
- **Detección de patrones**: Identificación automática de anomalías y tendencias de riesgo
- **Alertas críticas**: Sistema de notificaciones para valores fuera de rango

### 📊 Procesamiento Automático
- **Extracción de PDFs**: Procesamiento automático de informes médicos
- **Análisis de imágenes**: Captura y reconocimiento de analíticas físicas
- **Validación de datos**: Verificación automática de coherencia de valores

### 📱 Experiencia de Usuario
- **Diseño responsive**: Optimizado para desktop, tablet y móvil
- **Interfaz intuitiva**: Navegación simple y clara
- **Visualización avanzada**: Gráficos y métricas fáciles de interpretar

### 🔄 Seguimiento Temporal
- **Historial completo**: Almacenamiento de análisis anteriores
- **Comparativas**: Evolución temporal de biomarcadores
- **Predicciones**: Tendencias proyectadas basadas en datos históricos

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Git

### Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/yagomateos/MetabolicRiskDetector.git

# Navegar al directorio
cd MetabolicRiskDetector

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### Scripts Disponibles

```bash
npm start          # Servidor de desarrollo (http://localhost:3000)
npm run build      # Build de producción
npm test           # Ejecutar tests
npm run eject      # Exponer configuración (irreversible)
```

## 📖 Guía de Uso

### 1. Análisis Manual
Introduce valores de laboratorio manualmente a través del formulario intuitivo:
- Selecciona el tipo de análisis (Bioquímico, Hematológico, Hepático)
- Completa los campos relevantes
- Obtén análisis instantáneo con recomendaciones

### 2. Carga de Documentos PDF
Sube informes médicos en formato PDF para extracción automática:
- Formatos soportados: PDF de laboratorios estándar
- Reconocimiento automático de valores
- Validación y corrección manual disponible

### 3. Captura de Imágenes
Fotografía analíticas físicas para procesamiento con IA:
- Captura directa desde la cámara
- Subida de imágenes existentes
- Procesamiento OCR avanzado

## 🛠 Tecnologías

### Frontend
- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **CSS3** - Estilos modernos
- **Lucide React** - Iconografía

### Herramientas de Desarrollo
- **Create React App** - Configuración base
- **ESLint** - Linting de código
- **Jest** - Testing framework

### Arquitectura
- **Hooks personalizados** - Lógica reutilizable
- **Context API** - Gestión de estado
- **Componentes modulares** - Diseño escalable

## 🏗 Arquitectura del Proyecto

```
src/
├── components/
│   ├── ui/                    # Componentes base reutilizables
│   │   ├── Button.tsx        # Botones estandarizados
│   │   └── Card.tsx          # Contenedores de información
│   ├── forms/                # Formularios de entrada
│   │   └── DataInputForm.tsx # Formulario principal de datos
│   ├── analysis/             # Componentes de análisis
│   │   ├── RiskMetrics.tsx   # Métricas de riesgo
│   │   ├── CriticalAlerts.tsx # Alertas críticas
│   │   ├── InsightsPanel.tsx # Panel de insights
│   │   ├── TrendAnalysis.tsx # Análisis de tendencias
│   │   └── SystemAlert.tsx   # Alertas del sistema
│   └── views/                # Vistas principales
│       ├── GeneralView.tsx   # Vista general
│       ├── BiochemistryView.tsx # Vista bioquímica
│       ├── HematologyView.tsx   # Vista hematológica
│       ├── HepaticView.tsx      # Vista hepática
│       └── TrendsView.tsx       # Vista de tendencias
├── hooks/
│   └── useMetabolicAnalyzer.ts  # Hook principal de análisis
├── services/
│   └── fileExtraction.ts        # Servicios de extracción
├── types/
│   └── index.ts                 # Definiciones TypeScript
└── utils/
    └── analysisEngine.ts        # Motor de análisis
```

## 📈 Métricas y Análisis

### Sistemas de Análisis

#### 🫀 Sistema Cardiovascular
- **Perfil lipídico**: Colesterol total, HDL, LDL, triglicéridos
- **Riesgo cardiovascular**: Cálculo del riesgo a 10 años
- **Marcadores inflamatorios**: PCR, homocisteína

#### 🩸 Sistema Hematológico
- **Hemograma completo**: Eritrocitos, leucocitos, plaquetas
- **Índices eritrocitarios**: VCM, HCM, CHCM
- **Coagulación**: TP, TTPA, INR

#### ⚡ Análisis Bioquímico
- **Metabolismo glucídico**: Glucosa, HbA1c, insulina
- **Función renal**: Creatinina, urea, filtrado glomerular
- **Electrolitos**: Sodio, potasio, cloro

#### 🛡️ Función Hepática
- **Enzimas hepáticas**: ALT, AST, GGT, fosfatasa alcalina
- **Función sintética**: Albúmina, tiempo de protrombina
- **Metabolismo**: Bilirrubina total y directa

### Scores de Riesgo

| Score | Descripción | Rango |
|-------|-------------|-------|
| **Cardiovascular** | Riesgo de evento cardiovascular a 10 años | 0-100% |
| **Diabetes** | Probabilidad de desarrollo de diabetes tipo 2 | Bajo/Medio/Alto |
| **Hepático** | Riesgo de disfunción hepática | Normal/Elevado/Crítico |
| **Global** | Score integrado de riesgo metabólico | 0-10 |

## 💻 Desarrollo

### Configuración del Entorno

```bash
# Variables de entorno (crear .env.local)
REACT_APP_API_URL=your_api_url
REACT_APP_VERSION=1.0.0
```

### Estructura de Desarrollo

```bash
# Iniciar con hot reload
npm start

# Build para producción
npm run build

# Analizar bundle
npm run analyze
```

### Testing

```bash
# Ejecutar todos los tests
npm test

# Test con coverage
npm test -- --coverage

# Test en modo watch
npm test -- --watch
```

## 🤝 Contribución

### Proceso de Contribución

1. **Fork** el repositorio
2. **Crear** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abrir** un Pull Request

### Convenciones de Código

- Utilizar TypeScript para todas las nuevas funcionalidades
- Seguir las convenciones de ESLint
- Documentar componentes con JSDoc
- Mantener cobertura de tests > 80%

### Reportar Issues

Por favor incluye:
- Descripción detallada del problema
- Pasos para reproducir
- Capturas de pantalla si aplica
- Información del navegador/sistema

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

### 👨‍💻 Desarrollado por

**Yago Mateos** - [@yagomateos](https://github.com/yagomateos)

### 🙏 Agradecimientos

- Comunidad de React por las herramientas increíbles
- Profesionales médicos por sus inputs en validación
- Beta testers por su feedback valioso

---

<div align="center">
  <strong>🧬 Metabolic Risk Detector - Análisis inteligente para una salud óptima 🧬</strong>
</div>