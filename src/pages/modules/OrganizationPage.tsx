import { useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { MODULES } from '@/lib/constants';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
// import { DocumentUploader, FilePreview } from '@/components/organization/DocumentUploader';
// import { ApplicationSelector } from '@/components/organization/ApplicationSelector';
// import { UploadChat } from '@/components/organization/UploadChat';
import { MockFile } from '@/hooks/useMockFileUpload';
import { Message, UploadApplication } from '@/types';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Construction, Workflow, FileUp, MessageSquare } from 'lucide-react';

type WorkflowStage = 'upload' | 'selectApp' | 'chat' | 'complete';

/*
  TODO: MÓDULO ORGANIZACIÓN - EN DESARROLLO

  Este módulo implementa un flujo conversacional inteligente para organizar documentos
  automáticamente en servicios de almacenamiento en la nube.

  Funcionalidades pendientes de implementación:

  1. Backend API conversacional (/api/organization/chat)
     - Procesamiento de lenguaje natural para entender intenciones del usuario
     - Validación de nombres de proyectos y rutas
     - Interacción con APIs de Dropbox/SharePoint
     - Creación automática de carpetas y subcarpetas

  2. Integración con servicios de almacenamiento:
     - Dropbox API (autenticación, creación de carpetas, subida de archivos)
     - Microsoft SharePoint API (conexión, gestión de sitios, subida)

  3. Sistema de validación y confirmación:
     - Verificar existencia de rutas
     - Crear estructura de carpetas si no existe
     - Confirmar operaciones antes de ejecutar

  4. Mejoras de UX:
     - Preview de archivos antes de subir
     - Progreso de subida en tiempo real
     - Historial de organizaciones recientes

  Stack tecnológico sugerido:
  - Backend: Node.js + Express
  - NLP: Librería natural o simple-nlp para procesamiento de texto
  - APIs: dropbox SDK, @microsoft/microsoft-graph-client
  - Base de datos: SQLite/PostgreSQL para historial
*/

export function OrganizationPage() {
  const moduleInfo = MODULES.find((m) => m.path === '/organizacion');

  // CÓDIGO COMENTADO TEMPORALMENTE - Funcionalidad en desarrollo
  /*
  const [stage, setStage] = useState<WorkflowStage>('upload');
  const [file, setFile] = useState<MockFile | null>(null);
  const [selectedApp, setSelectedApp] = useState<UploadApplication>('dropbox');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (selectedFile: MockFile) => {
    setFile(selectedFile);
  };

  const handleSendMessage = async (content: string, messageList?: Message[]) => {
    const currentMessages = messageList || messages;
    const updatedMessages = content
      ? [...currentMessages, { id: uuidv4(), role: 'user' as const, content }]
      : [...currentMessages];
    if (content) {
      setMessages(updatedMessages);
    }
    setIsLoading(true);
    try {
      const res = await api.post('/organization/chat', {
        messages: updatedMessages,
        application: selectedApp,
      });
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: res.data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      if (res.data.reply.includes('Confirmado')) {
        setStage('complete');
      }
    } catch (error) {
      console.error('Chat API error:', error);
      toast.error('Error de Conexión', {
        description: 'No se pudo obtener una respuesta del asistente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartChat = () => {
    if (!file) return;
    const initialMessages: Message[] = [
      { id: uuidv4(), role: 'user' as const, content: file.name },
      {
        id: uuidv4(),
        role: 'assistant' as const,
        content: `¡Hola! Vamos a organizar el documento "${file.name}". He seleccionado ${
          selectedApp === 'dropbox' ? 'Dropbox' : 'SharePoint'
        } como destino.`,
      },
    ];
    setMessages(initialMessages);
    setStage('chat');
    handleSendMessage('', initialMessages);
  };

  const resetWorkflow = () => {
    setStage('upload');
    setFile(null);
    setMessages([]);
    setSelectedApp('dropbox');
  };

  const renderStage = () => {
    switch (stage) {
      case 'upload':
        return file ? (
          <FilePreview file={file} onNext={() => setStage('selectApp')} onReset={resetWorkflow} />
        ) : (
          <DocumentUploader onFileSelect={handleFileSelect} />
        );
      case 'selectApp':
        return (
          <ApplicationSelector
            selectedApp={selectedApp}
            setSelectedApp={setSelectedApp}
            onNext={handleStartChat}
            onBack={() => setStage('upload')}
          />
        );
      case 'chat':
      case 'complete':
        return (
          <div className="h-[calc(100vh-15rem)]">
            <UploadChat
              messages={messages}
              isLoading={isLoading}
              isComplete={stage === 'complete'}
              onSendMessage={(content) => handleSendMessage(content, messages)}
              onBack={() => setStage('selectApp')}
              onReset={resetWorkflow}
            />
          </div>
        );
      default:
        return null;
    }
  };
  */

  if (!moduleInfo) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-4xl space-y-8"
    >
      <motion.div variants={headerVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{moduleInfo.name}</h1>
        <p className="text-muted-foreground">{moduleInfo.description}</p>
      </motion.div>

      {/* Alerta de módulo en desarrollo */}
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <Construction className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-700 dark:text-amber-400">Módulo en Desarrollo</AlertTitle>
        <AlertDescription className="text-amber-600 dark:text-amber-300">
          Este módulo está actualmente en desarrollo. La funcionalidad de organización conversacional
          de documentos en Dropbox y SharePoint estará disponible próximamente.
        </AlertDescription>
      </Alert>

      {/* Mockup visual del flujo de trabajo */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3">
        <Card className="border-2 border-dashed opacity-60">
          <CardContent className="flex flex-col items-center justify-center space-y-3 p-8 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <FileUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold">1. Subir Documento</h3>
            <p className="text-sm text-muted-foreground">
              Selecciona o arrastra el documento que deseas organizar
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed opacity-60">
          <CardContent className="flex flex-col items-center justify-center space-y-3 p-8 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Workflow className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold">2. Seleccionar Destino</h3>
            <p className="text-sm text-muted-foreground">
              Elige entre Dropbox, SharePoint u otros servicios
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed opacity-60">
          <CardContent className="flex flex-col items-center justify-center space-y-3 p-8 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold">3. Asistente IA</h3>
            <p className="text-sm text-muted-foreground">
              Conversación guiada para organizar automáticamente
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Información adicional */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h3 className="mb-3 font-semibold">Características Planificadas:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2 mt-0.5">•</span>
              <span>Asistente conversacional con IA para organización inteligente de archivos</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5">•</span>
              <span>Integración con Dropbox, SharePoint, Google Drive y otros servicios</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5">•</span>
              <span>Creación automática de estructura de carpetas basada en contexto</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5">•</span>
              <span>Validación de rutas y confirmación antes de subir archivos</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5">•</span>
              <span>Historial de organizaciones recientes para acceso rápido</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* CÓDIGO FUNCIONAL COMENTADO - Descomentar cuando el backend esté listo
      <motion.div variants={itemVariants} className="min-h-[300px]">
        {renderStage()}
      </motion.div>
      */}
    </motion.div>
  );
}