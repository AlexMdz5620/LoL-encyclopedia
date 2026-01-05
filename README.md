# 🏆 La Enciclopedia del Invocador - Enciclopedia de League of Legends

Una enciclopedia moderna e interactiva de League of Legends construida con Next.js 14, TypeScript y Tailwind CSS. Ofrece información actualizada automáticamente sobre campeones, ítems y runas del universo de LoL.

## ✨ Características Principales

### 📊 Datos Dinámicos y Actualizados

- ✅ Sincronización automática con la API oficial de Riot Games (Data Dragon)
- ✅ Sistema de versión inteligente que detecta nuevos parches automáticamente
- ✅ Cache optimizado con ISR (Incremental Static Regeneration)
- ✅ Datos en español con traducciones contextuales

### 🎮 Campeones

- 📖 Páginas de detalle completas con información de lore, habilidades y estadísticas
- 🎨 Visualización de aspectos con carrusel interactivo de skins
- 📈 Calculadora de stats que muestra crecimiento por nivel
- ⚔️ Análisis táctico con fortalezas y debilidades
- 🔍 Búsqueda avanzada por nombre, título y roles

### 🛡️ Ítems

- 🏷️ Catálogo completo de ítems del juego
- 🔗 Relaciones de construcción (se construye a/de)
- 📊 Stats traducidos al español
- 💰 Información de costos y precios de venta
- 🎯 Filtrado inteligente por tipo y estadísticas

### 🎨 Interfaz de Usuario

- 🎯 Diseño inspirado en LoL con tipografías oficiales (BeaufortforLOL y Spiegel)
- 🌓 Modo oscuro con paleta de colores temática
- 📱 Totalmente responsive para móvil, tablet y desktop
- ⚡ Performance optimizada con imágenes lazy loading
- 🎭 Efectos visuales y transiciones suaves

## 🚀 Tecnologías Utilizadas

| Tecnología   |          Propósito          | Versión |
| ------------ | :-------------------------: | ------: |
| Next.js      | Framework React con SSR/SSG |    14.x |
| TypeScript   | Tipado estático y seguridad |     5.x |
| Tailwind CSS |    Estilos utility-first    |     3.x |
| Zod          |   Validación de esquemas    |     3.x |
| shadcn/ui    |  Componentes UI accesibles  |  Última |
| Zustand      |  Gestión de estado global   |     4.x |
| next/font    |   Optimización de fuentes   |    14.x |
| Lucide React |   Iconografía consistente   |  Última |

## 📁 Estructura del Proyecto

```
text
lol-encyclopedia/
├── app/ # Rutas de Next.js App Router
│ ├── champions/ # Páginas de campeones
│ │ └── [id]/ # Página dinámica por campeón
│ ├── items/ # Páginas de ítems
│ ├── runes/ # Páginas de runas
│ ├── layout.tsx # Layout principal
│ └── page.tsx # Página de inicio
│
├── components/ # Componentes React
│ ├── champion/ # Componentes específicos de campeones
│ ├── item/ # Componentes específicos de ítems
│ ├── layout/ # Componentes de layout
│ └── ui/ # Componentes UI reutilizables
│
├── services/ # Lógica de negocio y APIs
│ ├── champions.ts # Servicio de campeones
│ ├── items.ts # Servicio de ítems
│ └── runes.ts # Servicio de runas
│
├── schemas/ # Esquemas Zod para validación
│ ├── champions.ts # Esquema de campeones
│ ├── items.ts # Esquema de ítems
│ └── runes.ts # Esquema de runas
│
├── lib/ # Utilidades y configuraciones
│ ├── ddragon.ts # Cliente de Data Dragon API
│ └── translations.ts # Sistema de traducciones
│
├── stores/ # Estado global con Zustand
│ └── index.ts # Store principal
│
├── public/ # Assets estáticos
│ └── fonts/ # Fuentes personalizadas
│
└── utils/ # Funciones utilitarias
└── spellFormatter.ts # Formateador de tooltips
```

## 🛠️ Instalación y Configuración

### Requisitos Previos

- Node.js 18.x o superior
- npm o yarn
- Conexión a internet para fetch de datos

### Pasos de Instalación

1. Clonar el repositorio

```
# bash
git clone https://github.com/tuusuario/lol-encyclopedia.git
cd lol-encyclopedia
```

2. Instalar dependencias

```
# bash
npm install
# o
yarn install
```

3. Ejecutar en desarrollo

```
# bash
npm run dev

# o

yarn dev
```

4. Abrir en navegador

```
text
http://localhost:3000
```

## 🔧 Scripts Disponibles

|            Comando |                   Descripción |
| -----------------: | ----------------------------: |
|        npm run dev | Inicia servidor de desarrollo |
|      npm run build |     Construye para producción |
|      npm run start | Inicia servidor de producción |
|       npm run lint |                Ejecuta ESLint |
| npm run type-check |     Verifica tipos TypeScript |

## 🌐 Integración con Data Dragon API

El proyecto utiliza la API oficial de Riot Games de forma inteligente:

### 🔄 Sistema de Versión Dinámica

```
typescript
// Automáticamente detecta la última versión
const latestVersion = await getLatestVersion();
// Devuelve: "15.24.1" (siempre actualizado)
```

### 📦 Estructura de URLs

```
typescript
// Base URL para todas las peticiones
const DDRAGON_BASE_URL = "https://ddragon.leagueoflegends.com/cdn";

// Ejemplo de endpoint de campeones
`${DDRAGON_BASE_URL}/${latestVersion}/data/es_MX/champion.json`
```

### 🛡️ Seguridad y Performance

- No requiere API Key para datos públicos
- Cache ISR de 1 hora para datos que cambian poco
- Validación Zod para garantizar integridad de datos
- Traducciones integradas para términos del juego

### 🎨 Sistema de Diseño

#### Tipografías

- BeaufortforLOL: Títulos y encabezados (fuente oficial de LoL)
- Spiegel: Texto del cuerpo (fuente oficial de LoL)

#### Paleta de Colores

```
css
:root {
--primary: #C89B3C; /_ Oro de LoL _/
--secondary: #1E2328; /_ Fondo oscuro _/
--accent: #0AC8B9; /_ Turquesa _/
--destructive: #C41E3A; /_ Rojo _/
}
```

#### Componentes UI

- Sistema modular basado en shadcn/ui
- Accesibilidad integrada por defecto
- Dark mode como tema predeterminado

### 📱 Responsive Design

|   Breakpoint | Dispositivo |                                   Características |
| -----------: | ----------: | ------------------------------------------------: |
|      < 640px |       Móvil |      Layout de 1 columna, navegación simplificada |
| 640px-1024px |      Tablet |                 2 columnas, más detalles visibles |
|     ≥ 1024px |     Desktop | Layout completo, sidebar fija, todas las features |

### 🔮 Roadmap y Mejoras Futuras

#### Fase 2 (Próximamente)

- Calculadora de builds con items y runas
<!-- * Comparador de campeones side-by-side
- Guías de usuario generadas por comunidad
- Historial de parches y cambios -->

#### Fase 3 (Futuro)

- Sistema de favoritos y builds guardadas
<!-- * API propia para estadísticas avanzadas
- Modo offline con cache PWA
- Aplicación móvil nativa -->

### 🤝 Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. Fork el proyecto
1. Crea una rama feature (git checkout -b feature/AmazingFeature)
1. Commit cambios (git commit -m 'Add AmazingFeature')
1. Push a la rama (git push origin feature/AmazingFeature)
1. Abre un Pull Request

### Guía de Estilo

- TypeScript estricto con eslint configurado
- Commits convencionales (feat:, fix:, docs:, etc.)
- Componentes funcionales con hooks
- Código comentado en inglés

### 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles.

### 🙏 Agradecimientos

- Riot Games por la API Data Dragon
- Comunidad de LoL por feedback constante
- Contribuidores de open source por las librerías utilizadas

---

## Nota: Este proyecto no está afiliado con ni respaldado por Riot Games. League of Legends y Riot Games son marcas registradas de Riot Games, Inc.

✨ Hecho con ❤️ para la comunidad de League of Legends ✨
