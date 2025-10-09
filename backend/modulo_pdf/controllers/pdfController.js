import pdfService from '../services/pdfService.js';
import pdfPreviewService from '../services/pdfPreviewService.js';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * Controlador para operaciones de PDF
 */
class PDFController {
  /**
   * Genera vistas previas de las páginas de un PDF
   */
  async generatePreviews(req, res, next) {
    try {
      // Verificar que se haya subido un archivo
      if (!req.file) {
        return res.status(400).json({
          error: 'Se requiere un archivo PDF',
        });
      }

      // Generar vistas previas
      const previews = await pdfPreviewService.generatePreviews(req.file.path);

      // Enviar las vistas previas
      res.json({ previews });
    } catch (error) {
      next(error);
    }
  }
  /**
   * Une múltiples archivos PDF
   */
  async mergePDFs(req, res, next) {
    let uploadedFiles = [];

    try {
      // Verificar que se hayan subido archivos
      if (!req.files || req.files.length < 2) {
        return res.status(400).json({
          error: 'Se requieren al menos 2 archivos PDF para unir',
        });
      }

      uploadedFiles = req.files;
      const filePaths = uploadedFiles.map(file => file.path);

      // Unir los PDFs
      const mergedPdfBytes = await pdfService.mergePDFs(filePaths);

      // Generar nombre de archivo para el resultado
      const outputFileName = `merged-${uuidv4()}.pdf`;

      // Establecer headers para la descarga
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);
      res.setHeader('Content-Length', mergedPdfBytes.length);

      // Enviar el PDF
      res.send(Buffer.from(mergedPdfBytes));

      // Limpiar archivos temporales después de enviar la respuesta
      setImmediate(async () => {
        for (const file of uploadedFiles) {
          try {
            await fs.unlink(file.path);
          } catch (err) {
            console.error('Error al eliminar archivo temporal:', err);
          }
        }
      });
    } catch (error) {
      // Limpiar archivos en caso de error
      for (const file of uploadedFiles) {
        try {
          await fs.unlink(file.path);
        } catch (err) {
          console.error('Error al eliminar archivo temporal:', err);
        }
      }
      next(error);
    }
  }

  /**
   * Divide un PDF extrayendo páginas específicas
   */
  async splitPDF(req, res, next) {
    let uploadedFile = null;

    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'Se requiere un archivo PDF',
        });
      }

      uploadedFile = req.file;

      // Obtener los números de página desde el body
      // El frontend envía pages[] como múltiples campos
      let pages = req.body['pages[]'];

      // Si pages es undefined, intentar con 'pages'
      if (!pages) {
        pages = req.body.pages;
      }

      // Si pages es un string, convertirlo a array
      if (typeof pages === 'string') {
        pages = [pages];
      }

      if (!pages || !Array.isArray(pages) || pages.length === 0) {
        return res.status(400).json({
          error: 'Se requiere un array de números de página',
        });
      }

      // Convertir a números
      const pageNumbers = pages.map(p => parseInt(p, 10));

      // Dividir el PDF
      const splitPdfBytes = await pdfService.splitPDF(uploadedFile.path, pageNumbers);

      // Generar nombre de archivo para el resultado
      const outputFileName = `split-${uuidv4()}.pdf`;

      // Establecer headers para la descarga
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);
      res.setHeader('Content-Length', splitPdfBytes.length);

      // Enviar el PDF
      res.send(Buffer.from(splitPdfBytes));

      // Limpiar archivos temporales
      setImmediate(async () => {
        try {
          await fs.unlink(uploadedFile.path);
        } catch (err) {
          console.error('Error al eliminar archivo temporal:', err);
        }
      });
    } catch (error) {
      if (uploadedFile) {
        try {
          await fs.unlink(uploadedFile.path);
        } catch (err) {
          console.error('Error al eliminar archivo temporal:', err);
        }
      }
      next(error);
    }
  }

  /**
   * Comprime un PDF
   */
  async compressPDF(req, res, next) {
    let uploadedFile = null;

    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'Se requiere un archivo PDF',
        });
      }

      uploadedFile = req.file;

      // Comprimir el PDF
      const compressedPdfBytes = await pdfService.compressPDF(uploadedFile.path);

      // Generar nombre de archivo para el resultado
      const outputFileName = `compressed-${uuidv4()}.pdf`;

      // Establecer headers para la descarga
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);
      res.setHeader('Content-Length', compressedPdfBytes.length);

      // Enviar el PDF
      res.send(Buffer.from(compressedPdfBytes));

      // Limpiar archivos temporales
      setImmediate(async () => {
        try {
          await fs.unlink(uploadedFile.path);
        } catch (err) {
          console.error('Error al eliminar archivo temporal:', err);
        }
      });
    } catch (error) {
      if (uploadedFile) {
        try {
          await fs.unlink(uploadedFile.path);
        } catch (err) {
          console.error('Error al eliminar archivo temporal:', err);
        }
      }
      next(error);
    }
  }

  /**
   * Firma un PDF con una imagen
   */
  async signPDF(req, res, next) {
    let uploadedFiles = [];

    try {
      if (!req.files || !req.files.pdf || !req.files.signature) {
        return res.status(400).json({
          error: 'Se requieren el archivo PDF y la imagen de firma',
        });
      }

      const pdfFile = req.files.pdf[0];
      const signatureFile = req.files.signature[0];
      uploadedFiles = [pdfFile, signatureFile];

      // Obtener opciones de posicionamiento
      const options = {
        pageNumber: parseInt(req.body.pageNumber || '1', 10),
        x: parseFloat(req.body.x || '50'),
        y: parseFloat(req.body.y || '50'),
        width: parseFloat(req.body.width || '150'),
        height: parseFloat(req.body.height || '75'),
      };

      // Firmar el PDF
      const signedPdfBytes = await pdfService.signPDF(
        pdfFile.path,
        signatureFile.path,
        options
      );

      // Generar nombre de archivo para el resultado
      const outputFileName = `signed-${uuidv4()}.pdf`;

      // Establecer headers para la descarga
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);
      res.setHeader('Content-Length', signedPdfBytes.length);

      // Enviar el PDF
      res.send(Buffer.from(signedPdfBytes));

      // Limpiar archivos temporales
      setImmediate(async () => {
        for (const file of uploadedFiles) {
          try {
            await fs.unlink(file.path);
          } catch (err) {
            console.error('Error al eliminar archivo temporal:', err);
          }
        }
      });
    } catch (error) {
      for (const file of uploadedFiles) {
        try {
          await fs.unlink(file.path);
        } catch (err) {
          console.error('Error al eliminar archivo temporal:', err);
        }
      }
      next(error);
    }
  }

  /**
   * Redacta áreas específicas de un PDF
   */
  async redactPDF(req, res, next) {
    let uploadedFile = null;

    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'Se requiere un archivo PDF',
        });
      }

      uploadedFile = req.file;

      // Obtener las áreas a redactar desde el body
      const { redactions } = req.body;

      if (!redactions || !Array.isArray(redactions) || redactions.length === 0) {
        return res.status(400).json({
          error: 'Se requiere un array de áreas a redactar',
        });
      }

      // Validar y parsear redactions
      const parsedRedactions = redactions.map(r => ({
        pageNumber: parseInt(r.pageNumber, 10),
        x: parseFloat(r.x),
        y: parseFloat(r.y),
        width: parseFloat(r.width),
        height: parseFloat(r.height),
      }));

      // Redactar el PDF
      const redactedPdfBytes = await pdfService.redactPDF(uploadedFile.path, parsedRedactions);

      // Generar nombre de archivo para el resultado
      const outputFileName = `redacted-${uuidv4()}.pdf`;

      // Establecer headers para la descarga
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);
      res.setHeader('Content-Length', redactedPdfBytes.length);

      // Enviar el PDF
      res.send(Buffer.from(redactedPdfBytes));

      // Limpiar archivos temporales
      setImmediate(async () => {
        try {
          await fs.unlink(uploadedFile.path);
        } catch (err) {
          console.error('Error al eliminar archivo temporal:', err);
        }
      });
    } catch (error) {
      if (uploadedFile) {
        try {
          await fs.unlink(uploadedFile.path);
        } catch (err) {
          console.error('Error al eliminar archivo temporal:', err);
        }
      }
      next(error);
    }
  }

  /**
   * Obtiene información de un PDF
   */
  async getPDFInfo(req, res, next) {
    let uploadedFile = null;

    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'Se requiere un archivo PDF',
        });
      }

      uploadedFile = req.file;

      // Obtener información del PDF
      const pdfInfo = await pdfService.getPDFInfo(uploadedFile.path);

      // Enviar la información como JSON
      res.json(pdfInfo);

      // Limpiar archivos temporales
      setImmediate(async () => {
        try {
          await fs.unlink(uploadedFile.path);
        } catch (err) {
          console.error('Error al eliminar archivo temporal:', err);
        }
      });
    } catch (error) {
      if (uploadedFile) {
        try {
          await fs.unlink(uploadedFile.path);
        } catch (err) {
          console.error('Error al eliminar archivo temporal:', err);
        }
      }
      next(error);
    }
  }

  /**
   * Genera previews de las páginas de un PDF
   */
  async generatePreviews(req, res, next) {
    let uploadedFile = null;

    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'Se requiere un archivo PDF',
        });
      }

      uploadedFile = req.file;

      // Generar previews del PDF
      const previewData = await pdfService.generatePreviews(uploadedFile.path, {
        scale: 0.25, // 25% del tamaño original para thumbnails más pequeños
        maxPages: 100, // Máximo 100 páginas
      });

      // Enviar los previews como JSON
      res.json(previewData);

      // Limpiar archivos temporales
      setImmediate(async () => {
        try {
          await fs.unlink(uploadedFile.path);
        } catch (err) {
          console.error('Error al eliminar archivo temporal:', err);
        }
      });
    } catch (error) {
      if (uploadedFile) {
        try {
          await fs.unlink(uploadedFile.path);
        } catch (err) {
          console.error('Error al eliminar archivo temporal:', err);
        }
      }
      next(error);
    }
  }
}

export default new PDFController();
