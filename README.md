# Detector de Riesgo Metabólico

Una aplicación React moderna para el análisis de riesgo metabólico con inteligencia artificial.

## Características

- 📊 Análisis completo de biomarcadores
- 🤖 Insights generados por IA
- 📱 Diseño optimizado para móvil
- 🔄 Seguimiento de tendencias temporales
- 📄 Extracción automática de datos desde PDFs
- 📸 Captura de imágenes para análisis

## Estructura del Proyecto

```
src/
├── components/
│   ├── ui/                 # Componentes de interfaz reutilizables
│   ├── forms/             # Formularios
│   ├── analysis/          # Componentes de análisis
│   └── views/             # Vistas principales
├── hooks/                 # React hooks personalizados
├── services/              # Servicios para APIs y procesamiento
├── types/                 # Definiciones de TypeScript
└── utils/                 # Utilidades y lógica de negocio
```

## Instalación

```bash
npm install
npm start
```

## Uso

1. **Análisis Manual**: Introduce valores manualmente
2. **Subir PDF**: Extrae datos automáticamente desde informes médicos
3. **Captura de Imagen**: Fotografía tu analítica para procesamiento con IA

## Tecnologías

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (iconos)

## Funcionalidades

### Análisis por Sistemas
- 🫀 Cardiovascular
- 🩸 Hematológico
- ⚡ Bioquímico
- 🛡️ Hepático

### Métricas de Riesgo
- Riesgo cardiovascular (10 años)
- Probabilidad de diabetes
- Riesgo hepático
- Score global integrado

### Seguimiento Temporal
- Comparación con análisis anteriores
- Alertas de cambios críticos
- Tendencias visuales