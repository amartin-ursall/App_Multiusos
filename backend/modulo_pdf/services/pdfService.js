import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import { pdf } from 'pdf-to-img';

/**
 * Servicio para procesar PDFs usando pdf-lib
 */
class PDFService {
  /**
   * Une múltiples archivos PDF en uno solo
   * @param {Array<string>} filePaths - Array de rutas de archivos PDF
   * @returns {Promise<Uint8Array>} - PDF resultante como Uint8Array
   */
  async mergePDFs(filePaths) {
    try {
      // Crear un nuevo documento PDF
      const mergedPdf = await PDFDocument.create();

      // Iterar sobre cada archivo PDF
      for (const filePath of filePaths) {
        // Leer el archivo PDF
        const pdfBuffer = await fs.readFile(filePath);

        // Cargar el PDF
        const pdf = await PDFDocument.load(pdfBuffer);

        // Obtener todas las páginas del PDF
        const pageIndices = pdf.getPageIndices();

        // Copiar las páginas al nuevo documento
        const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);

        // Añadir cada página copiada al documento final
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      // Guardar el PDF resultante
      const mergedPdfBytes = await mergedPdf.save();

      return mergedPdfBytes;
    } catch (error) {
      console.error('Error al unir PDFs:', error);
      throw new Error('Error al procesar los archivos PDF: ' + error.message);
    }
  }

  /**
   * Divide un PDF extrayendo páginas específicas
   * @param {string} filePath - Ruta del archivo PDF
   * @param {Array<number>} pageNumbers - Array de números de página (1-indexed)
   * @returns {Promise<Uint8Array>} - PDF resultante con las páginas seleccionadas
   */
  async splitPDF(filePath, pageNumbers) {
    try {
      // Leer el archivo PDF
      const pdfBuffer = await fs.readFile(filePath);

      // Cargar el PDF original
      const originalPdf = await PDFDocument.load(pdfBuffer);

      // Crear un nuevo documento PDF
      const newPdf = await PDFDocument.create();

      // Convertir números de página de 1-indexed a 0-indexed
      const pageIndices = pageNumbers.map(num => num - 1);

      // Validar que los números de página sean válidos
      const totalPages = originalPdf.getPageCount();
      const invalidPages = pageIndices.filter(idx => idx < 0 || idx >= totalPages);

      if (invalidPages.length > 0) {
        throw new Error(`Números de página inválidos. El PDF tiene ${totalPages} páginas.`);
      }

      // Copiar las páginas seleccionadas
      const copiedPages = await newPdf.copyPages(originalPdf, pageIndices);

      // Añadir cada página copiada al nuevo documento
      copiedPages.forEach((page) => {
        newPdf.addPage(page);
      });

      // Guardar el PDF resultante
      const newPdfBytes = await newPdf.save();

      return newPdfBytes;
    } catch (error) {
      console.error('Error al dividir PDF:', error);
      throw new Error('Error al dividir el archivo PDF: ' + error.message);
    }
  }

  /**
   * Comprime un PDF reduciendo su tamaño
   * @param {string} filePath - Ruta del archivo PDF
   * @returns {Promise<Uint8Array>} - PDF comprimido
   */
  async compressPDF(filePath) {
    try {
      // Leer el archivo PDF
      const pdfBuffer = await fs.readFile(filePath);

      // Cargar el PDF
      const pdf = await PDFDocument.load(pdfBuffer);

      // Guardar con opciones de compresión
      // pdf-lib automáticamente comprime streams cuando se guarda
      const compressedPdfBytes = await pdf.save({
        useObjectStreams: false, // Mejor compatibilidad
        addDefaultPage: false,
      });

      return compressedPdfBytes;
    } catch (error) {
      console.error('Error al comprimir PDF:', error);
      throw new Error('Error al comprimir el archivo PDF: ' + error.message);
    }
  }

  /**
   * Añade una firma (imagen) a un PDF
   * @param {string} filePath - Ruta del archivo PDF
   * @param {string} signatureImagePath - Ruta de la imagen de la firma
   * @param {Object} options - Opciones de posicionamiento
   * @returns {Promise<Uint8Array>} - PDF firmado
   */
  async signPDF(filePath, signatureImagePath, options = {}) {
    try {
      const {
        pageNumber = 1, // Página donde añadir la firma (1-indexed)
        x = 50,
        y = 50,
        width = 150,
        height = 75,
      } = options;

      // Leer el archivo PDF
      const pdfBuffer = await fs.readFile(filePath);
      const pdf = await PDFDocument.load(pdfBuffer);

      // Leer la imagen de la firma
      const signatureBuffer = await fs.readFile(signatureImagePath);

      // Determinar el tipo de imagen y embedirla
      let signatureImage;
      const ext = path.extname(signatureImagePath).toLowerCase();

      if (ext === '.png') {
        signatureImage = await pdf.embedPng(signatureBuffer);
      } else if (ext === '.jpg' || ext === '.jpeg') {
        signatureImage = await pdf.embedJpg(signatureBuffer);
      } else {
        throw new Error('Formato de imagen no soportado. Use PNG o JPG.');
      }

      // Obtener la página donde se añadirá la firma
      const pageIndex = pageNumber - 1;
      const page = pdf.getPage(pageIndex);

      // Dibujar la imagen de la firma
      page.drawImage(signatureImage, {
        x,
        y,
        width,
        height,
      });

      // Guardar el PDF firmado
      const signedPdfBytes = await pdf.save();

      return signedPdfBytes;
    } catch (error) {
      console.error('Error al firmar PDF:', error);
      throw new Error('Error al firmar el archivo PDF: ' + error.message);
    }
  }

  /**
   * Redacta (oculta) áreas específicas de un PDF
   * @param {string} filePath - Ruta del archivo PDF
   * @param {Array<Object>} redactions - Array de áreas a redactar
   * @returns {Promise<Uint8Array>} - PDF redactado
   */
  async redactPDF(filePath, redactions) {
    try {
      // Leer el archivo PDF
      const pdfBuffer = await fs.readFile(filePath);
      const pdf = await PDFDocument.load(pdfBuffer);

      // Procesar cada redacción
      for (const redaction of redactions) {
        const { pageNumber, x, y, width, height } = redaction;

        // Obtener la página (1-indexed)
        const pageIndex = pageNumber - 1;
        const page = pdf.getPage(pageIndex);

        // Dibujar un rectángulo negro opaco sobre el área
        page.drawRectangle({
          x,
          y,
          width,
          height,
          color: { type: 'RGB', red: 0, green: 0, blue: 0 },
          opacity: 1,
        });
      }

      // Guardar el PDF redactado
      const redactedPdfBytes = await pdf.save();

      return redactedPdfBytes;
    } catch (error) {
      console.error('Error al redactar PDF:', error);
      throw new Error('Error al redactar el archivo PDF: ' + error.message);
    }
  }

  /**
   * Obtiene información de un PDF (número de páginas, tamaño, etc.)
   * @param {string} filePath - Ruta del archivo PDF
   * @returns {Promise<Object>} - Información del PDF
   */
  async getPDFInfo(filePath) {
    try {
      const pdfBuffer = await fs.readFile(filePath);
      const pdf = await PDFDocument.load(pdfBuffer);

      const pageCount = pdf.getPageCount();
      const pages = [];

      for (let i = 0; i < pageCount; i++) {
        const page = pdf.getPage(i);
        const { width, height } = page.getSize();
        pages.push({
          pageNumber: i + 1,
          width,
          height,
        });
      }

      const stats = await fs.stat(filePath);

      return {
        pageCount,
        pages,
        fileSize: stats.size,
        fileSizeFormatted: this.formatFileSize(stats.size),
      };
    } catch (error) {
      console.error('Error al obtener información del PDF:', error);
      throw new Error('Error al leer el archivo PDF: ' + error.message);
    }
  }

  /**
   * Genera previews (thumbnails) de todas las páginas de un PDF
   * @param {string} filePath - Ruta del archivo PDF
   * @param {Object} options - Opciones de generación
   * @returns {Promise<Object>} - Objeto con previews en base64
   */
  async generatePreviews(filePath, options = {}) {
    try {
      const {
        maxPages = 50, // Máximo número de páginas a procesar
      } = options;

      const scale = 0.5; // Escala para las vistas previas (más pequeñas)
      
      // Leer el archivo PDF con pdf-lib para obtener el número total de páginas
      const pdfBytes = await fs.readFile(filePath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pageCount = pdfDoc.getPageCount();
      
      const previews = {};
      let pageNum = 1;

      // Convertir PDF a imágenes usando pdf-to-img
      const document = await pdf(filePath, { scale });

      for await (const image of document) {
        if (pageNum > maxPages) break;

        // Convertir el buffer a base64
        const base64Image = `data:image/png;base64,${image.toString('base64')}`;
        previews[pageNum] = base64Image;

        pageNum++;
      }

      return { previews, totalPages: Math.min(pageCount, maxPages) };
    } catch (error) {
      console.error('Error al generar previews:', error);
      throw new Error('Error al generar vistas previas del PDF: ' + error.message);
    }
  }

  /**
   * Formatea el tamaño de archivo a un formato legible
   * @param {number} bytes - Tamaño en bytes
   * @returns {string} - Tamaño formateado
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
}

export default new PDFService();
