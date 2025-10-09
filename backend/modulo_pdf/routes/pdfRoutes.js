import express from 'express';
import { upload } from '../../config/multer.js';
import pdfController from '../controllers/pdfController.js';

const router = express.Router();

/**
 * Rutas para el módulo PDF
 * Base URL: /api/pdf
 */

// POST /api/pdf/merge - Unir múltiples PDFs
router.post('/merge', upload.array('pdfs', 10), pdfController.mergePDFs);

// POST /api/pdf/split - Dividir PDF extrayendo páginas específicas
router.post('/split', upload.single('pdf'), pdfController.splitPDF);

// POST /api/pdf/compress - Comprimir PDF
router.post('/compress', upload.single('pdf'), pdfController.compressPDF);

// POST /api/pdf/previews - Generar vistas previas de las páginas de un PDF
router.post('/previews', upload.single('pdf'), pdfController.generatePreviews);

// POST /api/pdf/sign - Firmar PDF con imagen
router.post(
  '/sign',
  upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'signature', maxCount: 1 }
  ]),
  pdfController.signPDF
);

// POST /api/pdf/redact - Redactar áreas de un PDF
router.post('/redact', upload.single('pdf'), pdfController.redactPDF);

// POST /api/pdf/info - Obtener información de un PDF
router.post('/info', upload.single('pdf'), pdfController.getPDFInfo);

// POST /api/pdf/previews - Generar previews de páginas de un PDF
router.post('/previews', upload.single('pdf'), pdfController.generatePreviews);

export default router;
