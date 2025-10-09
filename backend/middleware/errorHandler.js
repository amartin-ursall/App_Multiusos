import fs from 'fs/promises';

// Middleware para manejo de errores
export const errorHandler = async (err, req, res, next) => {
  console.error('Error:', err);

  // Limpiar archivos subidos en caso de error
  if (req.files) {
    const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
    for (const file of files) {
      try {
        await fs.unlink(file.path);
      } catch (unlinkError) {
        console.error('Error al eliminar archivo temporal:', unlinkError);
      }
    }
  }

  if (req.file) {
    try {
      await fs.unlink(req.file.path);
    } catch (unlinkError) {
      console.error('Error al eliminar archivo temporal:', unlinkError);
    }
  }

  // Errores de Multer
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'El archivo es demasiado grande',
        message: 'El tamaño máximo permitido es 50MB',
      });
    }
    return res.status(400).json({
      error: 'Error al subir archivo',
      message: err.message,
    });
  }

  // Errores personalizados
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Middleware para rutas no encontradas
export const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
