import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, RefreshCw } from 'lucide-react';
interface ProcessingViewProps {
  originalSize: number;
  finalSize: number;
  onReset: () => void;
}
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
export function ProcessingView({ originalSize, finalSize, onReset }: ProcessingViewProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress((prev) => Math.min(prev + 33, 100)), 500);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => setIsComplete(true), 300);
      return () => clearTimeout(completeTimer);
    }
  }, [progress]);
  const sizeReductionPercent = Math.round(((originalSize - finalSize) / originalSize) * 100);
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            <h2 className="text-xl font-semibold">Comprimiendo tu archivo...</h2>
            <p className="mb-6 mt-2 text-muted-foreground">
              Por favor, espera un momento. Estamos optimizando tu PDF.
            </p>
            <Progress value={progress} className="w-full" />
            <p className="mt-2 text-sm font-medium text-primary">{progress}%</p>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold">¡Compresión completada!</h2>
            <p className="mb-6 mt-2 text-muted-foreground">
              Tu archivo ha sido reducido en un <span className="font-bold text-primary">{sizeReductionPercent}%</span>.
            </p>
            <div className="mb-6 rounded-md border bg-muted p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tamaño original:</span>
                <span className="font-medium">{formatBytes(originalSize)}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="text-muted-foreground">Nuevo tamaño:</span>
                <span className="font-medium text-primary">{formatBytes(finalSize)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg">
                <Download className="mr-2 h-5 w-5" />
                Descargar PDF
              </Button>
              <Button size="lg" variant="outline" onClick={onReset}>
                <RefreshCw className="mr-2 h-5 w-5" />
                Comprimir otro
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}