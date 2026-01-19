export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  tags: string[];
  fullDescription: string;
  features: string[];
  technologies: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  year: string;
}

import lescell1 from "../assets/lescell-1.png";
import lescell2 from "../assets/lescell-2.png";
import lescell3 from "../assets/lescell-3.png";

import ensystem1 from "../assets/ensystem-1.png";
import ensystem2 from "../assets/ensystem-2.png";
import ensystem3 from "../assets/ensystem-3.png";

import bibliotecapp1 from "../assets/bibiotecapp-1.png";
import bibliotecapp2 from "../assets/bibiotecapp-2.png";

import paraqvaria1 from "../assets/paraqvaria-1.png";

import aero1 from "../assets/aero-1.png";

import cumbres1 from "../assets/cumbres-1.png";

import mapa1 from "../assets/mapa-1.png";

import ims1 from "../assets/ims-1.png";
import ims2 from "../assets/ims-2.png";
import ims3 from "../assets/ims-3.png";

import capilla1 from "../assets/capilla-1.png";
import capilla2 from "../assets/capilla-2.png";
import capilla3 from "../assets/capilla-3.png";
import capilla4 from "../assets/capilla-4.png";
import capilla5 from "../assets/capilla-5.png";

import viviendapro1 from "../assets/viviendapro.png";
import ensystem20 from "../assets/ensystem2.0.png";
import ensystem201 from "../assets/ensystem2.0-1.png";

export const projects: Project[] = [
  {
    id: "155",
    title: "Sistema de Gestión para Fábrica de Sofás",
    description:
      "Plataforma integral para la gestión operativa y administrativa de una fábrica de sofás, centralizando productos, stock, compras, ventas y pedidos en un solo sistema.",
    image: ensystem20,
    images: [ensystem20, ensystem201],
    tags: ["NestJS", "PostgreSQL", "TypeORM", "RBAC", "Angular"],
    fullDescription:
      "Sistema ERP modular diseñado para una fábrica de sofás, enfocado en optimizar los procesos productivos y comerciales. La plataforma permite administrar productos y variantes, controlar el stock en tiempo real, gestionar compras a proveedores, registrar ventas, y hacer seguimiento completo de pedidos desde su creación hasta la entrega final. Incluye control de accesos basado en roles (RBAC) para garantizar la seguridad y segmentación de funcionalidades según el perfil del usuario.",
    features: [
      "Gestión de productos y variantes (modelos, tamaños, materiales, colores)",
      "Control de stock en tiempo real con movimientos de entrada y salida",
      "Registro y gestión de compras a proveedores",
      "Gestión de ventas y facturación",
      "Gestión de pedidos con estados (pendiente, en producción, terminado, entregado, cancelado)",
      "Seguimiento del proceso productivo de cada pedido",
      "Sistema de roles y permisos (RBAC)",
      "Panel administrativo con métricas clave",
    ],
    technologies: [
      "Angular",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "JWT",
      "Role-Based Access Control (RBAC)",
    ],
    liveUrl: null,
    githubUrl: null,
    year: "2025",
  },
  {
    id: "15",
    title: "ViviendaPro",
    description:
      "Sistema de gestión y plataforma digital para administración de materiales de construcción y servicios, con backend robusto y control de accesos avanzado.",
    image: viviendapro1,
    images: [viviendapro1],
    tags: ["NestJS", "PostgreSQL", "TypeORM", "RBAC"],
    fullDescription:
      "ViviendaPro es una plataforma desarrollada con un backend escalable en NestJS, orientada a la gestión integral de materiales de construcción, usuarios y servicios. El sistema cuenta con una arquitectura modular y un sistema de roles y permisos completamente personalizado, permitiendo controlar con precisión qué acciones puede realizar cada tipo de usuario dentro de la aplicación.",
    features: [
      "Backend desarrollado en NestJS con arquitectura modular",
      "Sistema completo de roles y permisos (RBAC) configurable",
      "Autenticación y autorización segura",
      "Gestión de usuarios y control de accesos por rol",
      "Persistencia de datos con PostgreSQL y TypeORM",
      "Preparado para escalar a múltiples empresas o unidades habitacionales",
    ],
    technologies: [
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "JWT",
      "Role-Based Access Control (RBAC)",
    ],
    liveUrl: "https://vivienda.pro",
    githubUrl: null,
    year: "2025",
  },
  {
    id: "1",
    title: "Lescell",
    description:
      "Plataforma de comercio electrónico completa con carrito de compras",
    image: lescell1,
    images: [lescell1, lescell2, lescell3],
    tags: ["Angular", "Node.js", "PostgreSQL"],
    fullDescription:
      "Una plataforma de comercio electrónico moderna y escalable que permite a los usuarios navegar productos, gestionar su carrito de compras y realizar pagos seguros. Incluye panel de administración para gestión de inventario y pedidos.",
    features: [
      "Sistema de autenticación de usuarios",
      "Carrito de compras en tiempo real",
      "Panel de administración completo",
      "Sistema de búsqueda y filtros avanzados",
    ],
    technologies: [
      "Angular",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    liveUrl: "https://lescell.com",
    githubUrl: null,
    year: "2024",
  },
  {
    id: "2",
    title: "ENSystem",
    description: "Sistema integral de gestión empresarial",
    image: ensystem1,
    images: [ensystem1, ensystem2, ensystem3],
    tags: ["Node.js", "Angular", "Chart.js"],
    fullDescription:
      "ENSystem es una plataforma integral de gestión pensada para pequeñas y medianas empresas como peluquerías, clínicas, lavaderos y comercios en general. Permite centralizar la administración de clientes, servicios, stock, cobranzas y reportes en un entorno moderno, intuitivo y completamente responsive.",
    features: [
      "Gestión completa de clientes, proveedores y funcionarios",
      "Agenda y registro de servicios realizados por cliente",
      "Control de stock y movimientos de inventario en tiempo real",
      "Panel administrativo con métricas y estadísticas dinámicas",
      "Generación y exportación de reportes en PDF y Excel",
      "Soporte multi-dispositivo (mobile / desktop)",
      "Actualizaciones en tiempo real con WebSocket",
    ],
    technologies: [
      "TypeScript",
      "Angular",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Chart.js",
      "WebSocket",
    ],
    liveUrl: "https://ensystem.vercel.app/",
    githubUrl: null,
    year: "2024",
  },
  {
    id: "3",
    title: "BibliotecApp",
    description: "Plataforma digital de gestión y lectura de libros",
    image: bibliotecapp1,
    images: [bibliotecapp1, bibliotecapp2],
    tags: ["Angular", "Firebase", "PostgreSQL"],
    fullDescription:
      "BibliotecApp es una biblioteca digital que permite a los usuarios almacenar, organizar y consultar libros en formato PDF. Pensada tanto para uso académico como personal, facilita el acceso centralizado a contenidos digitales y proporciona una experiencia intuitiva para la lectura y administración del catálogo.",
    features: [
      "Carga y almacenamiento de libros en PDF",
      "Gestión de categorías y etiquetas para fácil organización",
      "Búsqueda y filtrado avanzado por nombre, categoría o autor",
      "Vista previa y apertura rápida de documentos",
      "Panel de administración para agregar y actualizar títulos",
      "Persistencia y sincronización en la nube con Firebase",
      "Interfaz responsive optimizada para dispositivos móviles y escritorio",
    ],
    technologies: ["Angular", "Firebase", "Node.js", "PostgreSQL"],
    liveUrl: "https://bibliotecapp.vercel.app/books",
    githubUrl: "https://github.com/EmersonCcp/bibliotecapp",
    year: "2024",
  },

  {
    id: "4",
    title: "GMA-Agroconsultora",
    description: "Sistema de seguimiento y control de vencimientos",
    image: "https://emersongabriel.netlify.app/assets/img/proyectos/gma.png",
    images: ["https://emersongabriel.netlify.app/assets/img/proyectos/gma.png"],
    tags: ["Angular", "Firebase", "PostgreSQL"],
    fullDescription:
      "Plataforma desarrollada para una consultora agroambiental que requiere gestionar proyectos con fechas de vencimiento y documentación asociada. El sistema permite registrar proyectos, adjuntar archivos PDF y emitir notificaciones automáticas cuando se aproxima la fecha límite, evitando retrasos y proporcionando trazabilidad en los procesos.",
    features: [
      "Registro y gestión de proyectos con fecha de vencimiento",
      "Carga y almacenamiento de documentos en formato PDF",
      "Sistema de alertas y notificaciones automáticas previas a los vencimientos",
    ],
    technologies: ["Angular", "Firebase", "Node.js", "PostgreSQL", "Railway"],
    liveUrl: null,
    githubUrl: null,
    year: "2024",
  },

  {
    id: "5",
    title: "Paraqvaria Landing Page",
    description:
      "Landing corporativa para desarrolladora inmobiliaria y financiera",
    image: paraqvaria1,
    images: [paraqvaria1],
    tags: ["Angular", "TailwindCss"],
    fullDescription:
      "Landing page desarrollada para Paraqvaria, una empresa desarrolladora inmobiliaria y financiera con más de 30 años de trayectoria en el mercado paraguayo. El sitio comunica la identidad y propuesta de valor de la marca, destacando su experiencia en proyectos inmobiliarios y el respaldo profesional en el ámbito financiero, asegurador y tecnológico.",
    features: [
      "Diseño corporativo moderno y orientado a experiencia de marca",
      "Optimización para dispositivos móviles y performance",
      "Carga rápida y SEO básico para posicionamiento web",
    ],
    technologies: ["Angular", "TailwindCss"],
    liveUrl: "https://paraqvariapage.web.app/",
    githubUrl: null,
    year: "2023",
  },

  {
    id: "6",
    title: "Paraqvaria Aero & Marina",
    description: "Landing corporativa y sistema integral de loteamientos",
    image: aero1,
    images: [aero1],
    tags: ["Angular", "Node.js"],
    fullDescription:
      "Plataforma inmobiliaria que combina una landing corporativa orientada a inversores con un sistema interno de gestión de loteamientos. El proyecto permite administrar lotes, controlar el proceso de venta, gestionar usuarios vendedores y actualizar el contenido público de la web en tiempo real sin intervención técnica, fortaleciendo la presencia digital de la marca y optimizando la operación comercial.",
    features: [
      "Gestión integral de loteamientos (disponibles, reservados y vendidos)",
      "Administración de usuarios y perfiles de vendedores",
      "Carga y actualización de contenido dinámico desde el panel administrativo",
      "Dashboard con métricas clave para seguimiento comercial",
      "Landing page corporativa con enfoque en inversión y valor de marca",
      "Autenticación y seguridad mediante Firebase",
    ],
    technologies: ["Angular", "TailwindCss", "Firebase", "Node.js"],
    liveUrl: "https://aero-marina.web.app/",
    githubUrl: null,
    year: "2023",
  },
  {
    id: "7",
    title: "Cumbres de San Bernardino",
    description: "Landing corporativa y sistema integral de loteamientos",
    image: cumbres1,
    images: [cumbres1],
    tags: ["Angular", "Node.js"],
    fullDescription:
      "Plataforma inmobiliaria que combina una landing corporativa orientada a inversores con un sistema interno de gestión de loteamientos. El proyecto permite administrar lotes, controlar el proceso de venta, gestionar usuarios vendedores y actualizar el contenido público de la web en tiempo real sin intervención técnica, fortaleciendo la presencia digital de la marca y optimizando la operación comercial.",
    features: [
      "Gestión integral de loteamientos (disponibles, reservados y vendidos)",
      "Administración de usuarios y perfiles de vendedores",
      "Carga y actualización de contenido dinámico desde el panel administrativo",
      "Dashboard con métricas clave para seguimiento comercial",
      "Landing page corporativa con enfoque en inversión y valor de marca",
      "Autenticación y seguridad mediante Firebase",
    ],
    technologies: ["Angular", "TailwindCss", "Firebase", "Node.js"],
    liveUrl: "https://cumbres-eee4d.web.app/",
    githubUrl: null,
    year: "2023",
  },

  {
    id: "8",
    title: "Loteamiento y Geolocalización en Mapa",
    description:
      "Mapa interactivo con búsqueda y trazado de rutas en tiempo real",
    image: mapa1,
    images: [mapa1],
    tags: ["Angular", "Leaflet"],
    fullDescription:
      "Proyecto enfocado en geolocalización y visualización de lotes mediante mapas interactivos basados en OpenStreetMap. Permite buscar ubicaciones específicas, identificar puntos de interés y generar el trazado de ruta desde la posición actual del usuario hasta el punto seleccionado en el mapa. Ideal para desarrollos inmobiliarios donde se desea mostrar la ubicación exacta y el acceso al proyecto en tiempo real.",
    features: [
      "Integración con OpenStreetMap para mapas interactivos",
      "Ubicación en tiempo real basada en geolocalización del navegador",
      "Búsqueda y selección de puntos de interés",
      "Trazado de ruta desde la ubicación del usuario hasta el objetivo",
    ],
    technologies: ["Angular", "Leaflet (OpenStreetMap)"],
    liveUrl: "https://angular-mapas2000.netlify.app/",
    githubUrl: null,
    year: "2023",
  },

  {
    id: "9",
    title: "Landing Page y Sistema de Vizaciones",
    description:
      "Landing corporativa con sistema interno para gestión de vizaciones médicas",
    image: ims1,
    images: [ims1, ims2, ims3],
    tags: ["Angular", "Ionic", "Nestjs"],
    fullDescription:
      "Proyecto híbrido que combina una landing page corporativa orientada a la captación de clientes con un sistema de gestión de vizaciones médicas para una empresa aseguradora. Permite registrar solicitudes, validar documentos y localizar prestadores médicos mediante filtros facilitando la búsqueda y trazabilidad de las atenciones médicas.",
    features: [
      "Landing corporativa orientada a servicios y contacto",
      "Registro y gestión de vizaciones médicas",
      "Validación y seguimiento del estado de las solicitudes",
      "Búsqueda de prestadores",
      "Interfaz responsive y optimizada para uso móvil",
    ],
    technologies: ["Angular", "Nestjs", "TailwindCss", "Ionic"],
    liveUrl: "https://ims.org.py/",
    githubUrl: null,
    year: "2025",
  },

  {
    id: "10",
    title: "CapillaApp",
    description:
      "Sistema de gestión de alumnos, grupos y asistencia catequética",
    image: capilla1,
    images: [capilla1, capilla2, capilla3, capilla4, capilla5],
    tags: ["Angular", "NestJS", "PostgreSQL"],
    fullDescription:
      "Sistema desarrollado para la administración de alumnos y catequizandos dentro de una parroquia. Permite gestionar la documentación requerida para cada etapa de formación sacramental, organizar grupos pastorales y registrar la asistencia a clases de forma digital. Optimiza la labor administrativa de catequistas y coordinadores, facilitando el seguimiento del proceso formativo.",
    features: [
      "Registro completo de alumnos y documentación requerida",
      "Gestión de grupos y etapas catequéticas",
      "Control y seguimiento de asistencia a clases",
      "Historial por alumno (progreso y observaciones)",
      "Búsqueda y filtrado de alumnos por grupo o estado documental",
    ],
    technologies: [
      "Angular",
      "NestJS",
      "PostgreSQL",
      "TailwindCss",
      "Firebase",
    ],
    liveUrl: null,
    githubUrl: null,
    year: "2025",
  },
];
