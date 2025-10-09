import { useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { MODULES } from '@/lib/constants';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
// import { ChatMessages } from '@/components/chat/ChatMessages';
// import { ChatInput } from '@/components/chat/ChatInput';
import { Message } from '@/types';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction, Database, Brain, Shield, Code, Table } from 'lucide-react';

/*
  TODO: MÓDULO CONSULTAR - EN DESARROLLO

  Este módulo implementa un asistente conversacional con IA para consultar bases de datos
  mediante lenguaje natural, sin necesidad de escribir SQL directamente.

  Funcionalidades pendientes de implementación:

  1. Backend API de consultas (/api/query/chat)
     - Sistema NLP para convertir preguntas en lenguaje natural a consultas SQL
     - Validación y sanitización de consultas (prevención de SQL Injection)
     - Ejecución segura de consultas en base de datos
     - Formateo de resultados para presentación

  2. Seguridad CRÍTICA:
     - NUNCA ejecutar SQL directo desde entrada del usuario
     - Usar ORM (Drizzle, Prisma) o Query Builder
     - Implementar whitelist de consultas predefinidas
     - Validación estricta con Zod o similar
     - Rate limiting para prevenir abusos

  3. Procesamiento de lenguaje natural:
     - Opción 1: Modelo de IA local (transformers.js)
     - Opción 2: API de IA (sin costo): Hugging Face Inference API
     - Opción 3: Consultas predefinidas con pattern matching
     - Opción 4: LLM local (Ollama con llama3)

  4. Base de datos:
     - Configurar conexión a base de datos (SQLite/PostgreSQL)
     - Definir esquema de la base de datos de SegElevia
     - Crear vistas o consultas predefinidas seguras
     - Implementar sistema de caché para consultas frecuentes

  5. Mejoras de UX:
     - Sugerencias de preguntas comunes
     - Visualización de resultados en tablas/gráficos
     - Exportar resultados a CSV/Excel
     - Historial de consultas recientes

  Stack tecnológico sugerido:
  - Backend: Node.js + Express
  - ORM: Drizzle ORM o Prisma (seguridad contra SQL injection)
  - NLP: natural.js, compromise.js o Hugging Face API
  - Base de datos: PostgreSQL o SQLite
  - Validación: Zod
  - Caché: Redis (opcional)

  Ejemplos de consultas seguras predefinidas:
  - "Muestra los últimos 10 pedidos"
  - "¿Cuántos usuarios tenemos registrados?"
  - "Lista las ventas del último mes"
  - "Muestra los productos más vendidos"
*/

export function QueryPage() {
  const moduleInfo = MODULES.find((m) => m.path === '/consultar');

  // CÓDIGO COMENTADO TEMPORALMENTE - Funcionalidad en desarrollo
  /*
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      role: 'assistant',
      content: 'Hola, soy el asistente de la base de datos de SegElevia. ¿Qué te gustaría consultar hoy?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    try {
      const response = await api.post('/query/chat', { message: content });
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response.data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get chat response:', error);
      toast.error('Error de Conexión', {
        description: 'No se pudo obtener una respuesta del asistente. Por favor, inténtalo de nuevo.',
      });
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };
  */

  if (!moduleInfo) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.div variants={headerVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{moduleInfo.name}</h1>
        <p className="text-muted-foreground">Interactúa con la base de datos de SegElevia mediante lenguaje natural.</p>
      </motion.div>

      {/* Alerta de módulo en desarrollo */}
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <Construction className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-700 dark:text-amber-400">Módulo en Desarrollo</AlertTitle>
        <AlertDescription className="text-amber-600 dark:text-amber-300">
          Este módulo está actualmente en desarrollo. La funcionalidad de consultas conversacionales a base de datos
          con procesamiento de lenguaje natural estará disponible próximamente.
        </AlertDescription>
      </Alert>

      {/* Características del módulo */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
        <Card className="border-2">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Lenguaje Natural</CardTitle>
            </div>
            <CardDescription>
              Haz preguntas en español sin necesidad de conocer SQL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">Ejemplos de preguntas:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>"¿Cuántos pedidos tenemos hoy?"</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>"Muestra las ventas del último mes"</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>"¿Quiénes son nuestros mejores clientes?"</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Seguridad Garantizada</CardTitle>
            </div>
            <CardDescription>
              Consultas seguras con prevención de SQL Injection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">Medidas de seguridad:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Validación estricta de entradas</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Uso de ORM con queries parametrizadas</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Whitelist de consultas predefinidas</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Base de Datos SegElevia</CardTitle>
            </div>
            <CardDescription>
              Acceso a toda la información empresarial centralizada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">Datos disponibles:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Clientes y contactos</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Pedidos y facturas</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Inventario y productos</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Table className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Resultados Visuales</CardTitle>
            </div>
            <CardDescription>
              Visualización clara de los datos consultados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">Formatos de visualización:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Tablas interactivas ordenables</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Gráficos y estadísticas</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Exportación a CSV/Excel</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Advertencia de seguridad */}
      <Alert className="border-red-500/50 bg-red-500/10">
        <Shield className="h-4 w-4 text-red-500" />
        <AlertTitle className="text-red-700 dark:text-red-400">Nota Importante de Seguridad</AlertTitle>
        <AlertDescription className="text-red-600 dark:text-red-300">
          Este módulo NUNCA ejecutará consultas SQL directamente desde la entrada del usuario.
          Todas las consultas pasarán por un sistema de validación estricto y procesamiento
          de lenguaje natural para garantizar la máxima seguridad.
        </AlertDescription>
      </Alert>

      {/* CÓDIGO FUNCIONAL COMENTADO - Descomentar cuando el backend esté listo
      <div className="flex h-[calc(100vh-25rem)] flex-col">
        <div className="flex-grow overflow-hidden rounded-lg border bg-card">
          <ChatMessages messages={messages} isLoading={isLoading} />
        </div>
        <div className="mt-4 flex-shrink-0">
          <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
      */}
    </motion.div>
  );
}