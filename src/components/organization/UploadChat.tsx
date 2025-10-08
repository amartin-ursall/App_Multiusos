import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { ChatInput } from '@/components/chat/ChatInput';
import { Message } from '@/types';
interface UploadChatProps {
  messages: Message[];
  isLoading: boolean;
  isComplete: boolean;
  onSendMessage: (message: string) => void;
  onBack: () => void;
  onReset: () => void;
}
export function UploadChat({ messages, isLoading, isComplete, onSendMessage, onBack, onReset }: UploadChatProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Asistente de Carga</CardTitle>
        <CardDescription>
          Responde a las preguntas para generar la ruta de carga correcta.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col overflow-hidden">
        {isComplete ? (
          <div className="flex flex-grow flex-col items-center justify-center text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h3 className="mt-4 text-xl font-bold">Carga Simulada Completa</h3>
            <p className="mt-2 text-muted-foreground">
              El documento ha sido "subido" a la ruta especificada.
            </p>
            <Button onClick={onReset} className="mt-6">
              <RefreshCw className="mr-2 h-4 w-4" />
              Iniciar Nuevo Proceso
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-hidden rounded-lg border bg-muted/50">
              <ChatMessages messages={messages} isLoading={isLoading} />
            </div>
            <div className="mt-4 flex-shrink-0">
              <ChatInput onSubmit={onSendMessage} isLoading={isLoading} />
            </div>
          </>
        )}
      </CardContent>
      {!isComplete && (
        <div className="border-t p-4">
          <Button onClick={onBack} variant="outline" disabled={isLoading}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Atrás
          </Button>
        </div>
      )}
    </Card>
  );
}