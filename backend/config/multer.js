import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configuración de almacenamiento temporal
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  // Aceptar solo PDFs para el módulo PDF
  if (req.baseUrl.includes('/pdf')) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF'), false);
    }
  }
  // Aceptar imágenes para el módulo de imágenes
  else if (req.baseUrl.includes('/images')) {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen (JPEG, PNG, GIF, WebP)'), false);
    }
  } else {
    cb(null, true);
  }
};

// Configuración de multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800'), // 50MB por defecto
  },
});
