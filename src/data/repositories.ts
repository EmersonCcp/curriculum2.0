export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number | null;
  forks: number | null;
  watchers?: number;
  fullDescription: string;
  features: string[];
  topics: string[];
  githubUrl?: string;
}

export const repositories: Repository[] = [
  {
    id: "1",
    name: "authentication_nodejs",
    description: "API de autenticación segura con Node.js, Sequelize y JWT",
    language: "TypeScript",
    stars: null,
    forks: null,
    watchers: 32,
    fullDescription:
      "Servicio backend diseñado para la gestión segura de usuarios y sesiones mediante JWT. ",
    features: [
      "Registro y autenticación de usuarios con JWT",
      "Hashing seguro de contraseñas con bcrypt",
      "Integración con Sequelize y PostgreSQL",
    ],
    topics: [
      "nodejs",
      "typescript",
      "authentication",
      "jwt",
      "sequelize",
      "rest-api",
      "security",
    ],
    githubUrl: "https://github.com/EmersonCcp/authentication_nodejs",
  },

  {
    id: "2",
    name: "google-map-vercel",
    description: "Mapa interactivo para visualización de loteamientos",
    language: "TypeScript",
    stars: null,
    forks: null,
    watchers: 32,
    fullDescription:
      "Aplicación en Angular que utiliza Leaflet (OpenStreetMap) para mostrar ubicaciones dentro del mapa. Permite visualizar puntos marcados, hacer zoom sobre áreas específicas e interactuar con la información geográfica de forma dinámica.",
    features: [
      "Visualización de mapas con Leaflet (OpenStreetMap)",
      "Marcadores dinámicos para lotes o puntos de interés",
      "Zoom y navegación interactiva",
      "Diseño responsive para web y mobile",
      "Posibilidad de trazar rutas y mostrar distancia (extensible)",
    ],
    topics: [
      "angular",
      "typescript",
      "leaflet",
      "openstreetmap",
      "maps",
      "geolocation",
      "frontend",
    ],
    githubUrl: "https://github.com/EmersonCcp/google-map-vercel",
  },

  {
    id: "3",
    name: "nest-auth",
    description: "Sistema de autenticación y autorización con NestJS + JWT",
    language: "TypeScript",
    stars: null,
    forks: null,
    watchers: 28,
    fullDescription:
      "Módulo de autenticación desarrollado con NestJS que implementa JWT.",
    features: [
      "Registro e inicio de sesión con JWT",
      "Hashing seguro de contraseñas con bcrypt",
    ],
    topics: [
      "nestjs",
      "jwt",
      "auth",
      "typescript",
      "security",
      "guards",
      "backend",
    ],
    githubUrl: "https://github.com/EmersonCcp/nest-auth",
  },
  {
    id: "4",
    name: "angular-auth",
    description: "Módulo de autenticación en Angular con JWT y Guards",
    language: "TypeScript",
    stars: null,
    forks: null,
    watchers: 20,
    fullDescription:
      "Implementación frontend de un sistema de autenticación en Angular utilizando JWT, interceptores HTTP y Guards para proteger rutas. Incluye manejo de sesiones, almacenamiento seguro de tokens y comunicación con API backend basada en mejores prácticas. Ideal como plantilla base para aplicaciones Angular con control de acceso.",
    features: [
      "Inicio de sesión con JWT e integración con backend",
      "Route Guards para proteger módulos y vistas privadas",
      "Persistencia de sesión mediante LocalStorage/SecureStorage",
      "Cierre de sesión seguro y limpieza de credenciales",
    ],
    topics: [
      "angular",
      "jwt",
      "auth",
      "frontend",
      "http-interceptors",
      "guards",
      "typescript",
    ],
    githubUrl: "https://github.com/EmersonCcp/angular-auth",
  },
];
