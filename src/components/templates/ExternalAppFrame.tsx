import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

interface ExternalAppFrameProps {
  defaultUrl?: string;
  height?: string | number;
  allowUrlChange?: boolean;
}

export function ExternalAppFrame({ 
  defaultUrl = 'http://localhost:8080', 
  height = '600px',
  allowUrlChange = true 
}: ExternalAppFrameProps) {
  const [url, setUrl] = useState(defaultUrl);
  const [inputUrl, setInputUrl] = useState(defaultUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(`No se pudo cargar la aplicación en ${url}. Verifica que la URL sea correcta y que la aplicación esté en ejecución.`);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setError(null);
    // Forzar recarga del iframe cambiando temporalmente la URL
    setUrl('about:blank');
    setTimeout(() => setUrl(inputUrl), 100);
  };

  const handleUrlChange = () => {
    setIsLoading(true);
    setError(null);
    setUrl(inputUrl);
  };

  useEffect(() => {
    // Inicializar
    setInputUrl(defaultUrl);
    setUrl(defaultUrl);
  }, [defaultUrl]);

  return (
    <div className="w-full h-full">
      {allowUrlChange && (
        <div className="flex items-center gap-2 p-2 border-b">
          <Input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="URL de la aplicación (ej: http://localhost:3000)"
            className="flex-grow"
          />
          <Button onClick={handleUrlChange} variant="outline" size="sm">
            Cargar
          </Button>
          <Button onClick={handleRefresh} variant="ghost" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-10">
            <div className="max-w-md p-4 text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reintentar
              </Button>
            </div>
          </div>
        )}
        <iframe
          src={url}
          style={{ height, width: '100%', border: 'none' }}
          onLoad={handleLoad}
          onError={handleError}
          title="Aplicación Externa"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      </div>
    </div>
  );
}