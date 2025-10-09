import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar rutas
import pdfRoutes from './modulo_pdf/routes/pdfRoutes.js';

// Importar middleware
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Configuración de ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Configuración del puerto
const PORT = process.env.PORT || 5000;

// Crear directorios necesarios si no existen
const uploadDir = path.join(__dirname, 'uploads');
const tempDir = path.join(__dirname, 'temp');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ Directorio de uploads creado');
}

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
  console.log('✅ Directorio temporal creado');
}

// Middleware de seguridad
app.use(helmet());

// Middleware de compresión
app.use(compression());

// Middleware de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting - limitar peticiones por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por ventana
  message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Bienvenido a Ursall Multiusos Backend API',
    version: '1.0.0',
    endpoints: {
      pdf: '/api/pdf',
      images: '/api/images',
      documents: '/api/documents',
      templates: '/api/templates',
      query: '/api/query',
      organization: '/api/organization',
      connector: '/api/connector',
    },
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Rutas de la API
app.use('/api/pdf', pdfRoutes);

// TODO: Añadir más rutas de módulos aquí
// app.use('/api/images', imageRoutes);
// app.use('/api/documents', documentRoutes);
// app.use('/api/templates', templateRoutes);
// app.use('/api/query', queryRoutes);
// app.use('/api/organization', organizationRoutes);
// app.use('/api/connector', connectorRoutes);

// Middleware para rutas no encontradas
app.use(notFound);

// Middleware de manejo de errores (debe ser el último)
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('=================================================');
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📦 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS habilitado para: ${corsOptions.origin}`);
  console.log('=================================================');
  console.log('\n📋 Endpoints disponibles:');
  console.log(`   - PDF: http://localhost:${PORT}/api/pdf`);
  console.log(`   - Health: http://localhost:${PORT}/health`);
  console.log('=================================================\n');
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Excepción no capturada:', err);
  process.exit(1);
});

export default app;
