# Ursall Multiusos - Backend API

Backend API para la aplicación Ursall Multiusos, construido con Node.js y Express.

## 🚀 Características

- **Módulo PDF**: Unir, dividir, comprimir, firmar y redactar PDFs
- **Arquitectura modular**: Código organizado por módulos
- **Seguridad**: Helmet, CORS, Rate Limiting
- **Procesamiento de archivos**: Multer para uploads, pdf-lib para procesamiento
- **Sin APIs de pago**: Todas las funcionalidades implementadas con librerías de código abierto

## 📁 Estructura del Proyecto

```
backend/
├── config/              # Configuración (multer, etc.)
├── middleware/          # Middleware personalizado
├── modulo_pdf/          # Módulo de procesamiento PDF
│   ├── controllers/     # Controladores de rutas
│   ├── services/        # Lógica de negocio
│   └── routes/          # Definición de rutas
├── uploads/             # Archivos temporales subidos
├── temp/                # Archivos temporales de procesamiento
├── server.js            # Archivo principal del servidor
├── package.json         # Dependencias del proyecto
└── .env                 # Variables de entorno
```

## 🛠️ Instalación

1. Instalar dependencias:

```bash
cd backend
npm install
```

2. Configurar variables de entorno:

Edita el archivo `.env` según tus necesidades:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=52428800
```

3. Iniciar el servidor:

```bash
# Desarrollo con auto-reload
npm run dev

# Producción
npm start
```

## 📡 API Endpoints

### Módulo PDF

**Base URL**: `/api/pdf`

#### 1. Unir PDFs
- **Endpoint**: `POST /api/pdf/merge`
- **Body**: `multipart/form-data`
- **Campos**:
  - `pdfs` (array de archivos PDF, mínimo 2)
- **Respuesta**: PDF unificado (archivo descargable)

**Ejemplo con cURL**:
```bash
curl -X POST http://localhost:5000/api/pdf/merge \
  -F "pdfs=@file1.pdf" \
  -F "pdfs=@file2.pdf" \
  -o merged.pdf
```

#### 2. Dividir PDF
- **Endpoint**: `POST /api/pdf/split`
- **Body**: `multipart/form-data`
- **Campos**:
  - `pdf` (archivo PDF)
  - `pages` (array de números de página, ej: `[1, 3, 5]`)
- **Respuesta**: PDF con páginas seleccionadas

**Ejemplo con cURL**:
```bash
curl -X POST http://localhost:5000/api/pdf/split \
  -F "pdf=@document.pdf" \
  -F "pages=[1,2,3]" \
  -o split.pdf
```

#### 3. Comprimir PDF
- **Endpoint**: `POST /api/pdf/compress`
- **Body**: `multipart/form-data`
- **Campos**:
  - `pdf` (archivo PDF)
- **Respuesta**: PDF comprimido

**Ejemplo con cURL**:
```bash
curl -X POST http://localhost:5000/api/pdf/compress \
  -F "pdf=@large-file.pdf" \
  -o compressed.pdf
```

#### 4. Firmar PDF
- **Endpoint**: `POST /api/pdf/sign`
- **Body**: `multipart/form-data`
- **Campos**:
  - `pdf` (archivo PDF)
  - `signature` (imagen PNG o JPG de la firma)
  - `pageNumber` (opcional, número de página, default: 1)
  - `x` (opcional, posición X, default: 50)
  - `y` (opcional, posición Y, default: 50)
  - `width` (opcional, ancho de firma, default: 150)
  - `height` (opcional, alto de firma, default: 75)
- **Respuesta**: PDF firmado

**Ejemplo con cURL**:
```bash
curl -X POST http://localhost:5000/api/pdf/sign \
  -F "pdf=@document.pdf" \
  -F "signature=@signature.png" \
  -F "pageNumber=1" \
  -F "x=400" \
  -F "y=100" \
  -o signed.pdf
```

#### 5. Redactar PDF
- **Endpoint**: `POST /api/pdf/redact`
- **Body**: `multipart/form-data`
- **Campos**:
  - `pdf` (archivo PDF)
  - `redactions` (array de objetos con: `pageNumber`, `x`, `y`, `width`, `height`)
- **Respuesta**: PDF con áreas redactadas

**Ejemplo con cURL**:
```bash
curl -X POST http://localhost:5000/api/pdf/redact \
  -F "pdf=@sensitive.pdf" \
  -F 'redactions=[{"pageNumber":1,"x":100,"y":200,"width":300,"height":50}]' \
  -o redacted.pdf
```

#### 6. Información de PDF
- **Endpoint**: `POST /api/pdf/info`
- **Body**: `multipart/form-data`
- **Campos**:
  - `pdf` (archivo PDF)
- **Respuesta**: JSON con información del PDF

**Ejemplo con cURL**:
```bash
curl -X POST http://localhost:5000/api/pdf/info \
  -F "pdf=@document.pdf"
```

**Respuesta**:
```json
{
  "pageCount": 10,
  "pages": [
    {
      "pageNumber": 1,
      "width": 612,
      "height": 792
    }
  ],
  "fileSize": 245678,
  "fileSizeFormatted": "239.92 KB"
}
```

## 🔧 Tecnologías Utilizadas

- **Express.js**: Framework web
- **pdf-lib**: Procesamiento de PDFs sin APIs externas
- **Multer**: Manejo de uploads de archivos
- **Helmet**: Seguridad HTTP headers
- **CORS**: Control de acceso entre dominios
- **express-rate-limit**: Protección contra ataques de fuerza bruta
- **dotenv**: Gestión de variables de entorno

## 📝 Notas de Desarrollo

### Límites y Consideraciones

- **Tamaño máximo de archivo**: 50MB (configurable en `.env`)
- **Rate limiting**: 100 peticiones por IP cada 15 minutos
- **Archivos temporales**: Se eliminan automáticamente después del procesamiento

### Próximos Módulos a Implementar

1. **Módulo de Imágenes** (`modulo_imagenes/`)
2. **Módulo de Documentos** (`modulo_documentos/`)
3. **Módulo de Plantillas** (`modulo_plantillas/`)
4. **Módulo de Consultas** (`modulo_consultar/`)
5. **Módulo de Organización** (`modulo_organizacion/`)
6. **Módulo de Conectores** (`modulo_conector/`)

## 🐛 Debugging

Para ver logs detallados durante el desarrollo:

```bash
NODE_ENV=development npm run dev
```

## 📄 Licencia

MIT
