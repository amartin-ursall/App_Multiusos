import { useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { MODULES } from '@/lib/constants';
import { containerVariants, headerVariants } from '@/lib/animations';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { ChatInput } from '@/components/chat/ChatInput';
import { Message } from '@/types';
import { api } from '@/lib/api';
import { toast } from 'sonner';
export function QueryPage() {
  const moduleInfo = MODULES.find((m) => m.path === '/consultar');
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
      // Optional: remove the user's message if the API call fails
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };
  if (!moduleInfo) return null;
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex h-[calc(100vh-7rem)] flex-col"
    >
      <motion.div variants={headerVariants} className="flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{moduleInfo.name}</h1>
        <p className="text-muted-foreground">Interactúa con la base de datos de SegElevia.</p>
      </motion.div>
      <div className="mt-4 flex-grow overflow-hidden rounded-lg border bg-card">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </div>
      <div className="mt-4 flex-shrink-0">
        <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
      </div>
    </motion.div>
  );
}