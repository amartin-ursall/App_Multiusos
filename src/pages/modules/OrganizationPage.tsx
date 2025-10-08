import { useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { MODULES } from '@/lib/constants';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { DocumentUploader, FilePreview } from '@/components/organization/DocumentUploader';
import { ApplicationSelector } from '@/components/organization/ApplicationSelector';
import { UploadChat } from '@/components/organization/UploadChat';
import { MockFile } from '@/hooks/useMockFileUpload';
import { Message, UploadApplication } from '@/types';
import { api } from '@/lib/api';
import { toast } from 'sonner';
type WorkflowStage = 'upload' | 'selectApp' | 'chat' | 'complete';
export function OrganizationPage() {
  const moduleInfo = MODULES.find((m) => m.path === '/organizacion');
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
    // Trigger first question from assistant, passing the initial messages directly
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
      <motion.div variants={itemVariants} className="min-h-[300px]">
        {renderStage()}
      </motion.div>
    </motion.div>
  );
}