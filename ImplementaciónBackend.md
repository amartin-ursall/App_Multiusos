# Guía de Implementacición para Desarrolladores - Ursall Multiusos
## 1. Introducción
Bienvenido al equipo de desarrollo de **Ursall Multiusos**. Este documento sirve como guía para implementar la lógica de negocio y las funcionalidades backend sobre la base de la aplicación existente.
El estado actual del proyecto es una **aplicación shell completa y funcional**. Esto incluye:
- Una interfaz de usuario (UI) pulida y totalmente responsiva para todos los módulos y herramientas.
- Navegación completa y enrutamiento entre todas las páginas.
- Gestión de estado global de la UI (tema, estado de la barra lateral) con Zustand.
- Componentes interactivos para simular flujos de usuario (carga de archivos, selección de opciones, etc.).
- Endpoints de API mock en el backend de Cloudflare Workers para soportar la UI del chatbot.
El siguiente paso es reemplazar los mocks y las simulaciones con lógica de negocio real.
## 2. Arquitectura General
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, shadcn/ui, Zustand, React Router.
- **Backend**: Recomendacion.
- **Comunicación**: API REST a través de endpoints en `/api/*`.
### Flujo de Trabajo General para una Herramienta
1.  **Frontend (UI)**: El usuario interactúa con la UI (ej. sube un archivo, selecciona opciones).
2.  **Frontend (API Call)**: Se realiza una llamada a la API correspondiente (ej. `POST /api/pdf/merge`) con los datos necesarios (archivos, opciones) en el cuerpo de la petición. Se recomienda usar `FormData` para la subida de archivos.
3.  **Backend (Worker)**: El endpoint de Hono recibe la petición.
4.  **Backend (Procesamiento)**: El worker utiliza librerías o APIs de terceros para procesar la solicitud (ej. unir PDFs, comprimir una imagen).
5.  **Backend (Respuesta)**: El worker devuelve el archivo procesado o una respuesta JSON con el resultado.
6.  **Frontend (Respuesta)**: El frontend gestiona la respuesta, permitiendo al usuario descargar el archivo resultante o mostrando un mensaje de éxito/error.
## 3. Implementación por Módulo
A continuación se detallan los pasos recomendados para implementar la lógica de cada módulo.
### 3.1. Módulo PDF (`/pdf`)
Para el procesamiento de PDFs en Cloudflare Workers, la librería **`pdf-lib`** es una excelente opción, ya que se ejecuta en un entorno JavaScript.
- **Unir PDF (`/pdf/unir`)**
    - **Frontend**: Modificar `PdfMergePage.tsx` para gestionar subidas de archivos reales. Enviar los archivos como `FormData` al backend.
    - **Backend**: Crear el endpoint `POST /api/pdf/merge`. Recibir múltiples archivos PDF. Usar `pdf-lib` para crear un nuevo documento, copiar las páginas de cada PDF de entrada y unirlas. Devolver el PDF resultante.
- **Dividir PDF (`/pdf/dividir`)**
    - **Frontend**: En `PdfSplitPage.tsx`, al subir un archivo, se podría usar `pdf-lib` en el frontend para leer el número de páginas y mostrarlas. Enviar el PDF y un array de números de página seleccionados al backend.
    - **Backend**: Crear `POST /api/pdf/split`. Recibir un PDF y las páginas a extraer. Usar `pdf-lib` para crear un nuevo documento y copiar solo las páginas seleccionadas.
- **Comprimir PDF (`/pdf/comprimir`)**
    - **Nota**: La compresión de PDF es compleja y consume muchos recursos. Se recomienda usar una API de terceros (ej. Adobe PDF Services, PDFTron) o ejecutar una herramienta CLI como Ghostscript a través de un servicio externo si es necesario.
    - **Backend**: Crear `POST /api/pdf/compress`. Recibir el PDF y el nivel de compresión. Enviar el archivo a la API externa y devolver el resultado.
- **PDF a Office (`/pdf/a-word`, etc.)**
    - Similar a la compresión, la conversión de formatos es un proceso complejo. Se recomienda encarecidamente el uso de una API de terceros.
    - **Backend**: Crear endpoints como `POST /api/pdf/to-word`. Enviar el PDF a la API de conversión y devolver el archivo `.docx`, `.pptx`, o `.xlsx`.
- **Firmar PDF (`/pdf/firmar`)**
    - **Frontend**: En `PdfSignPage.tsx`, enviar el PDF original y la firma como una imagen en formato Data URL (`image/png`).
    - **Backend**: Crear `POST /api/pdf/sign`. Usar `pdf-lib` para cargar el PDF, incrustar la imagen de la firma (`embedPng`) y colocarla en las coordenadas deseadas en una o varias páginas.
- **Redactar PDF (`/pdf/redactar`)**
    - **Frontend**: En `PdfRedactPage.tsx`, capturar las coordenadas y dimensiones de los rectángulos de redacción dibujados por el usuario. Enviar el PDF y un array de estas coordenadas.
    - **Backend**: Crear `POST /api/pdf/redact`. Usar `pdf-lib` para dibujar rectángulos negros opacos (`drawRectangle`) sobre las áreas especificadas.
### 3.2. Módulo Imágenes (`/imagenes`)
Para el procesamiento de imágenes en Workers, se puede usar una librería como **`@cloudflare/images`** si se utiliza Cloudflare Images, o integrar una API de terceros.
- **Comprimir, Redimensionar, Recortar**
    - **Frontend**: Enviar la imagen y las opciones (calidad, dimensiones, coordenadas de recorte) al backend.
    - **Backend**: Crear endpoints (`POST /api/images/compress`, etc.). Usar una API o librería para realizar la transformación. Devolver la imagen procesada.
- **Convertir a JPG/GIF**
    - **Backend**: Similar a las otras herramientas, crear endpoints que acepten una imagen de entrada y devuelvan la imagen en el formato de salida deseado.
- **Eliminar Fondo**
    - Esta funcionalidad requiere modelos de IA. La solución más viable es integrar una API de terceros como **Cloudflare Workers AI (Background Removal)**, remove.bg, o similar.
    - **Backend**: Crear `POST /api/images/remove-bg`. Enviar la imagen a la API de IA y devolver la imagen resultante con fondo transparente.
### 3.3. Módulo Plantillas (`/plantillas`)
Esta funcionalidad requiere una base de datos (ej. Cloudflare D1, KV Store) para almacenar las plantillas.
- **Modelo de Datos**: Definir una estructura JSON para las plantillas. Podría incluir metadatos (nombre, categoría) y un array de elementos (tipo: 'encabezado', 'texto', 'imagen'; contenido; posición).
- **Backend**:
    - `GET /api/templates`: Obtener todas las plantillas de la galería.
    - `GET /api/users/:userId/templates`: Obtener las plantillas de un usuario.
    - `POST /api/templates`: Guardar una nueva plantilla (enviar la estructura JSON).
- **Frontend**:
    - `TemplateBuilderPage.tsx`: Implementar la lógica de arrastrar y soltar para construir la estructura JSON de la plantilla.
    - `TemplateGalleryPage.tsx` y `TemplateManagePage.tsx`: Hacer llamadas a la API para obtener y mostrar las plantillas.
### 3.4. Módulo Conector (`/conector`)
Este es el módulo más complejo y dependiente del backend.
- **Autenticación**: Implementar flujos OAuth2 para conectar con servicios externos (Google Drive, Salesforce, etc.). Almacenar los tokens de forma segura (ej. encriptados en D1).
- **Backend**:
    - Crear endpoints para cada servicio (`POST /api/connectors/googledrive/sync`).
    - Implementar la lógica para interactuar con las APIs de terceros usando los tokens almacenados.
    - Usar **Cloudflare Cron Triggers** para implementar la sincronización de datos programada.
- **Frontend**: Guiar al usuario a través de los flujos de autenticación y mostrar el estado de las conexiones.
### 3.5. Módulo Consultar (`/consultar`)
- **Backend**: El endpoint `POST /api/query/chat` debe ser conectado a una base de datos real (ej. Cloudflare D1).
- **Seguridad**: ¡**CRÍTICO**! Nunca ejecutar consultas SQL directamente desde la entrada del usuario. Usar un ORM, un constructor de consultas, o un sistema de Procesamiento de Lenguaje Natural (PLN) para convertir la pregunta del usuario en una consulta SQL segura. Para empezar, se pueden definir un conjunto de preguntas predefinidas que el backend pueda interpretar.
### 3.6. Módulo Documentos (`/documentos`)
- **Escanear con OCR**: Usar **Cloudflare Workers AI (Text Recognition)** o una API de terceros como Google Vision AI.
    - **Backend**: `POST /api/documents/ocr`. Recibir una imagen y devolver el texto extraído.
- **Comparar Documentos**:
    - **Backend**: `POST /api/documents/compare`. Recibir dos archivos de texto. Usar una librería de "diff" (ej. `diff`) para encontrar las diferencias y devolver un resultado estructurado.
- **Firma Electrónica y Proteger Documento**: La lógica es muy similar a "Firmar PDF" y requerirá una base de datos para gestionar las solicitudes de firma y el estado.
### 3.7. Módulo Organización (`/organizacion`)
- **Backend**: El endpoint `POST /api/organization/chat` ya tiene una lógica conversacional básica. Esta debe ser expandida para:
    1.  Validar las entradas del usuario (ej. que el nombre del proyecto sea válido).
    2.  Interactuar con las APIs de los conectores (Dropbox, SharePoint) para verificar rutas o crear carpetas si es necesario.
    3.  Finalmente, realizar la subida del archivo al destino final.
## 4. Pasos Siguientes Recomendados
1.  **Configurar la Base de Datos**: Empezar configurando Cloudflare D1 para los módulos que lo necesitan (Plantillas, Conector, Documentos).
2.  **Implementar un Módulo Sencillo**: Comenzar con el módulo PDF, implementando "Unir PDF" y "Dividir PDF" con `pdf-lib` para familiarizarse con el flujo de trabajo.
3.  **Integrar una API de IA**: Implementar "Escanear con OCR" o "Eliminar Fondo" usando Cloudflare Workers AI para ganar experiencia con integraciones de IA.
4.  **Abordar Módulos Complejos**: Dejar los módulos de Conector y Plantillas para el final, ya que requieren una mayor infraestructura de backend.
Esta guía proporciona un camino claro para transformar **Ursall Multiusos** de un prototipo de UI a una aplicación completamente funcional. ¡Éxito en el desarrollo!
