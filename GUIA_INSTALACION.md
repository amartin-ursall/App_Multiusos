# 🚀 Guía de Instalación - Ursall Multiusos

Esta guía te ayudará a instalar y ejecutar tanto el frontend como el backend de la aplicación Ursall Multiusos.

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** o **bun** (gestor de paquetes)
- Un navegador web moderno (Chrome, Firefox, Edge, etc.)

## 🔧 Instalación del Backend

### 1. Navegar a la carpeta del backend

```bash
cd backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

El archivo `.env` ya está creado con los valores por defecto. Si necesitas modificarlo:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=52428800
```

### 4. Iniciar el servidor backend

**Modo desarrollo (con auto-reload):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará ejecutándose en `http://localhost:5000`

### 5. Verificar que el backend funciona

Abre tu navegador y visita:
- `http://localhost:5000` - Página de bienvenida
- `http://localhost:5000/health` - Health check

Deberías ver un mensaje JSON confirmando que el servidor está funcionando.

## 🎨 Instalación del Frontend

### 1. Abrir una nueva terminal (mantén el backend ejecutándose)

### 2. Navegar a la raíz del proyecto (si estás en /backend)

```bash
cd ..
```

### 3. Instalar dependencias del frontend

```bash
npm install
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

## ✅ Verificar la Instalación

### Probar el módulo PDF - Unir PDFs

1. Abre tu navegador en `http://localhost:3000`
2. Navega a **PDF** > **Unir PDF**
3. Arrastra y suelta 2 o más archivos PDF (o haz clic en "Selecciona un Archivo")
4. Haz clic en **Unir PDF**
5. El archivo unificado se descargará automáticamente

Si todo funciona correctamente, ¡felicidades! 🎉

## 🐛 Solución de Problemas

### Error: "Cannot find module"

```bash
# En la carpeta del backend
cd backend
npm install

# En la raíz del proyecto (frontend)
cd ..
npm install
```

### Error: "Port 5000 already in use"

El puerto 5000 está ocupado. Puedes:

**Opción 1:** Cambiar el puerto en `backend/.env`:
```env
PORT=5001
```

**Opción 2:** Detener el proceso que está usando el puerto:

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -ti:5000 | xargs kill -9
```

### Error: "CORS policy"

Verifica que el backend esté ejecutándose en `http://localhost:5000` y que la variable `FRONTEND_URL` en `backend/.env` sea correcta.

### Los archivos no se suben

1. Verifica que la carpeta `backend/uploads/` exista (se crea automáticamente)
2. Verifica que los archivos sean PDFs válidos
3. Verifica que los archivos no superen 50MB

## 📁 Estructura del Proyecto

```
App_Multiusos/
├── backend/                    # Backend API (Node.js + Express)
│   ├── config/                 # Configuración (multer)
│   ├── middleware/             # Middleware (errores, etc.)
│   ├── modulo_pdf/             # Módulo de procesamiento PDF
│   │   ├── controllers/        # Controladores
│   │   ├── services/           # Lógica de negocio
│   │   └── routes/             # Rutas de la API
│   ├── uploads/                # Archivos temporales
│   ├── server.js               # Servidor principal
│   ├── package.json            # Dependencias del backend
│   └── .env                    # Variables de entorno
├── src/                        # Frontend React
│   ├── components/             # Componentes reutilizables
│   ├── pages/                  # Páginas de la aplicación
│   ├── lib/                    # Utilidades
│   └── ...
├── package.json                # Dependencias del frontend
└── GUIA_INSTALACION.md         # Este archivo
```

## 🚀 Próximos Pasos

Una vez que tengas el módulo PDF funcionando, puedes:

1. **Explorar otras funcionalidades del módulo PDF:**
   - Dividir PDF
   - Comprimir PDF
   - Firmar PDF
   - Redactar PDF

2. **Implementar otros módulos:**
   - Módulo de Imágenes
   - Módulo de Documentos
   - Módulo de Plantillas
   - Etc.

## 📚 Documentación Adicional

- **Backend README:** `backend/README.md` - Documentación completa de la API
- **Implementación Backend:** `ImplementaciónBackend.md` - Guía para desarrolladores

## 💡 Consejos

- **Desarrollo:** Mantén ambos servidores (frontend y backend) ejecutándose simultáneamente
- **Logs:** Revisa la consola del backend para ver logs de procesamiento
- **Archivos temporales:** Los archivos en `backend/uploads/` se eliminan automáticamente después del procesamiento

## 📞 Soporte

Si encuentras algún problema que no está cubierto en esta guía, revisa:
- Los logs de la consola (tanto frontend como backend)
- El archivo `backend/README.md` para documentación de la API
- La documentación de Node.js y React

---

**¡Disfruta usando Ursall Multiusos!** 🎉
