import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}
export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input);
    setInput('');
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Escribe tu consulta aquí..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
        className="flex-grow"
        autoComplete="off"
      />
      <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
        <SendHorizonal className="h-4 w-4" />
        <span className="sr-only">Enviar</span>
      </Button>
    </form>
  );
}