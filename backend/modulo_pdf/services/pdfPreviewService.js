import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs/promises';

/**
 * Servicio para generar previews de páginas PDF usando SVG
 */
class PDFPreviewService {
  /**
   * Genera previews SVG de las páginas de un PDF
   * @param {string} filePath - Ruta del archivo PDF
   * @param {Object} options - Opciones de generación
   * @returns {Promise<Object>} - Objeto con previews en base64
   */
  async generatePreviews(filePath, options = {}) {
    try {
      const { maxPages = 100 } = options;

      // Leer el archivo PDF
      const pdfBytes = await fs.readFile(filePath);

      // Cargar el PDF con pdf-lib
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Obtener el número de páginas
      const pageCount = pdfDoc.getPageCount();

      const previews = {};

      // Generar preview SVG para cada página
      for (let pageNum = 1; pageNum <= Math.min(pageCount, maxPages); pageNum++) {
        const pageIndex = pageNum - 1;
        const page = pdfDoc.getPage(pageIndex);
        const { width, height } = page.getSize();

        // Crear un SVG representativo de la página
        const svg = this.createPagePreviewSVG(pageNum, width, height, pageCount);

        // Convertir a base64
        const base64 = Buffer.from(svg).toString('base64');
        previews[pageNum] = `data:image/svg+xml;base64,${base64}`;
      }

      return { previews, totalPages: pageCount };
    } catch (error) {
      console.error('Error al generar previews:', error);
      throw new Error('Error al generar vistas previas del PDF: ' + error.message);
    }
  }

  /**
   * Crea un SVG representativo de una página PDF
   * @param {number} pageNumber - Número de página
   * @param {number} width - Ancho de la página
   * @param {number} height - Alto de la página
   * @param {number} totalPages - Total de páginas del documento
   * @returns {string} - SVG como string
   */
  createPagePreviewSVG(pageNumber, width, height, totalPages) {
    // Calcular aspect ratio
    const aspectRatio = height / width;
    const svgWidth = 200;
    const svgHeight = svgWidth * aspectRatio;

    // Crear gradiente basado en el número de página
    const hue = (pageNumber * 137.5) % 360; // Golden angle para distribución uniforme
    const lightColor = `hsl(${hue}, 60%, 95%)`;
    const darkColor = `hsl(${hue}, 50%, 85%)`;
    const accentColor = `hsl(${hue}, 60%, 70%)`;

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <!-- Fondo degradado -->
  <defs>
    <linearGradient id="grad${pageNumber}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${lightColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darkColor};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Fondo de página -->
  <rect width="${svgWidth}" height="${svgHeight}" fill="url(#grad${pageNumber})" rx="4" />

  <!-- Borde -->
  <rect width="${svgWidth}" height="${svgHeight}" fill="none" stroke="${accentColor}" stroke-width="2" rx="4" />

  <!-- Líneas decorativas simulando texto -->
  ${this.generateTextLines(svgWidth, svgHeight, accentColor)}

  <!-- Número de página -->
  <rect x="${svgWidth - 45}" y="${svgHeight - 35}" width="40" height="30" fill="${accentColor}" rx="3" />
  <text x="${svgWidth - 25}" y="${svgHeight - 13}"
        font-family="Arial, sans-serif"
        font-size="16"
        font-weight="bold"
        text-anchor="middle"
        fill="white">${pageNumber}</text>

  <!-- Indicador de documento -->
  <circle cx="15" cy="15" r="8" fill="${accentColor}" opacity="0.8" />
  <text x="15" y="19"
        font-family="Arial, sans-serif"
        font-size="10"
        font-weight="bold"
        text-anchor="middle"
        fill="white">P</text>
</svg>`;
  }

  /**
   * Genera líneas decorativas que simulan texto
   * @param {number} width - Ancho del SVG
   * @param {number} height - Alto del SVG
   * @param {string} color - Color de las líneas
   * @returns {string} - Elementos SVG de líneas
   */
  generateTextLines(width, height, color) {
    const lines = [];
    const lineHeight = 12;
    const margin = 20;
    const startY = 35;
    const maxLines = Math.min(Math.floor((height - startY - margin) / lineHeight), 10);

    for (let i = 0; i < maxLines; i++) {
      const y = startY + (i * lineHeight);
      const lineWidth = width - (2 * margin) - (Math.random() * 40);

      lines.push(`<rect x="${margin}" y="${y}" width="${lineWidth}" height="3" fill="${color}" opacity="0.4" rx="1" />`);
    }

    return lines.join('\n  ');
  }
}

export default new PDFPreviewService();