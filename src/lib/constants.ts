import {
  FileText,
  ImageIcon,
  LayoutTemplate,
  Plug,
  Search,
  FileStack,
  Users,
  LucideIcon,
  Combine,
  Split,
  Minimize2,
  FileSignature,
  Presentation,
  FileSpreadsheet,
  PenSquare,
  ShieldOff,
  Crop,
  Scaling,
  Replace,
  Eraser,
  PlusSquare,
  GalleryVertical,
  Folder,
  FileEdit,
  Code,
  RefreshCw,
  Webhook,
  Database,
  Blocks,
  Star,
  BarChart,
  ScanLine,
  GitCompareArrows,
  Lock,
  UserPlus,
  Settings,
  Activity,
  Shrink,
  FileImage,
  Home,
  Globe,
} from 'lucide-react';
export type Module = {
  name: string;
  path: string;
  description: string;
  Icon: LucideIcon;
};
export const APP_NAME = 'Ursall Multiusos';
export const MODULES: Module[] = [
  {
    name: 'Inicio',
    path: '/inicio',
    description: 'P��gina principal y resumen de la aplicación.',
    Icon: Home,
  },
  {
    name: 'PDF',
    path: '/pdf',
    description: 'Una vista para gestionar documentos PDF.',
    Icon: FileText,
  },
  {
    name: 'Imágenes',
    path: '/imagenes',
    description: 'Una vista para gestionar recursos de imagen.',
    Icon: ImageIcon,
  },
  {
    name: 'Plantillas',
    path: '/plantillas',
    description: 'Una vista para crear y gestionar plantillas.',
    Icon: LayoutTemplate,
  },
  {
    name: 'Conector',
    path: '/conector',
    description: 'Una vista para configurar conectores de datos.',
    Icon: Plug,
  },
  {
    name: 'Consultar',
    path: '/consultar',
    description: 'Una vista para consultar fuentes de datos.',
    Icon: Search,
  },
  {
    name: 'Documentos',
    path: '/documentos',
    description: 'Una vista para la gestión general de documentos.',
    Icon: FileStack,
  },
  {
    name: 'Organización',
    path: '/organizacion',
    description: 'Una vista para gestionar la configuración de la organización.',
    Icon: Users,
  },
];
export type FeatureTool = {
  title: string;
  description: string;
  Icon: LucideIcon;
  path?: string;
};
export const PDF_TOOLS: FeatureTool[] = [
  { title: 'Unir PDF', description: 'Combina varios PDF en uno.', Icon: Combine, path: '/pdf/unir' },
  { title: 'Dividir PDF', description: 'Extrae páginas de un PDF.', Icon: Split, path: '/pdf/dividir' },
  { title: 'Comprimir PDF', description: 'Reduce el tamaño del archivo de tu PDF.', Icon: Minimize2, path: '/pdf/comprimir' },
  { title: 'PDF a Word', description: 'Convierte PDF a documentos de Word editables.', Icon: FileSignature, path: '/pdf/a-word' },
  { title: 'PDF a PowerPoint', description: 'Convierte tu PDF en una presentación.', Icon: Presentation, path: '/pdf/a-powerpoint' },
  { title: 'PDF a Excel', description: 'Convierte tablas de PDF a hojas de cálculo.', Icon: FileSpreadsheet, path: '/pdf/a-excel' },
  { title: 'Firmar PDF', description: 'Añade tu firma a un documento.', Icon: PenSquare, path: '/pdf/firmar' },
  { title: 'Redactar PDF', description: 'Elimina datos sensibles permanentemente.', Icon: ShieldOff, path: '/pdf/redactar' },
];
export const IMAGE_TOOLS: FeatureTool[] = [
  { title: 'Comprimir Img', description: 'Reduce el tamaño del archivo de tus imágenes.', Icon: Shrink, path: '/imagenes/comprimir' },
  { title: 'Redimensionar Img', description: 'Ajusta las dimensiones de la imagen fácilmente.', Icon: Scaling, path: '/imagenes/redimensionar' },
  { title: 'Recortar Img', description: 'Corta y recorta imágenes a la perfección.', Icon: Crop, path: '/imagenes/recortar' },
  { title: 'Convertir a Jpg', description: 'Cambia el formato de imagen a JPG.', Icon: FileImage, path: '/imagenes/convertir-jpg' },
  { title: 'Convertir Jpg a Gif', description: 'Crea un GIF animado desde un JPG.', Icon: Replace, path: '/imagenes/convertir-gif' },
  { title: 'Eliminar fondo', description: 'Borra automáticamente el fondo.', Icon: Eraser, path: '/imagenes/eliminar-fondo' },
];
export const TEMPLATE_TOOLS: FeatureTool[] = [
  { title: 'Crear Plantilla', description: 'Construye una nueva plantilla reutilizable.', Icon: PlusSquare, path: '/plantillas/crear' },
  { title: 'Explorar Galería', description: 'Explora una biblioteca de plantillas pre-hechas.', Icon: GalleryVertical, path: '/plantillas/explorar' },
  { title: 'Mis Plantillas', description: 'Accede y gestiona tus plantillas guardadas.', Icon: Folder, path: '/plantillas/mis-plantillas' },
  { title: 'Editar Plantilla', description: 'Modifica y actualiza plantillas existentes.', Icon: FileEdit, path: '/plantillas/crear' },
  { title: 'Cargar Aplicación', description: 'Carga aplicaciones externas en tus plantillas.', Icon: Globe, path: '/plantillas/cargar-app' },
];
export const CONNECTOR_TOOLS: FeatureTool[] = [
  { title: 'Nueva Conexión', description: 'Conéctate a una nueva fuente de datos o API.', Icon: Plug, path: '/conector/nueva' },
  { title: 'Gestionar APIs', description: 'Configura y monitorea tus claves de API.', Icon: Code, path: '/conector/gestionar' },
  { title: 'Sincronización de Datos', description: 'Programa la sincronización automática de datos.', Icon: RefreshCw, path: '/conector/sincronizacion' },
  { title: 'Webhooks', description: 'Configura notificaciones de datos en tiempo real.', Icon: Webhook, path: '/conector/webhooks' },
];
export const QUERY_TOOLS: FeatureTool[] = [
  { title: 'Editor SQL', description: 'Escribe y ejecuta consultas SQL personalizadas.', Icon: Database },
  { title: 'Constructor de Consultas', description: 'Construye consultas complejas visualmente.', Icon: Blocks },
  { title: 'Consultas Guardadas', description: 'Guarda y reutiliza tus consultas frecuentes.', Icon: Star },
  { title: 'Visualización de Datos', description: 'Crea gráficos a partir de tus resultados.', Icon: BarChart },
];
export const DOCUMENT_TOOLS: FeatureTool[] = [
  { title: 'Escanear con OCR', description: 'Extrae texto de documentos escaneados.', Icon: ScanLine, path: '/documentos/ocr' },
  { title: 'Comparar Documentos', description: 'Encuentra diferencias entre dos documentos.', Icon: GitCompareArrows, path: '/documentos/comparar' },
  { title: 'Firma Electrónica', description: 'Solicita y añade firmas electrónicas.', Icon: PenSquare, path: '/documentos/firma-electronica' },
  { title: 'Proteger Documento', description: 'Cifra y protege archivos con contraseña.', Icon: Lock, path: '/documentos/proteger' },
];