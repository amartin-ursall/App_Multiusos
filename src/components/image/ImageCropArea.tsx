import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Crop } from 'lucide-react';
interface ImageCropAreaProps {
  onCrop: () => void;
  onBack: () => void;
}
export function ImageCropArea({ onCrop, onBack }: ImageCropAreaProps) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg border">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070"
          alt="Imagen para recortar"
          className="select-none"
        />
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className="absolute left-1/4 top-1/4 h-1/2 w-1/2 cursor-move"
          style={{ touchAction: 'none' }}
        >
          <div className="relative h-full w-full border-2 border-dashed border-white bg-black/30 shadow-lg">
            {/* Resize handles */}
            <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 cursor-se-resize rounded-full border border-background bg-white" />
            <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 cursor-sw-resize rounded-full border border-background bg-white" />
            <div className="absolute -top-1.5 -right-1.5 h-3 w-3 cursor-ne-resize rounded-full border border-background bg-white" />
            <div className="absolute -top-1.5 -left-1.5 h-3 w-3 cursor-nw-resize rounded-full border border-background bg-white" />
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <Button onClick={onCrop}>
          <Crop className="mr-2 h-4 w-4" />
          Recortar Imagen
        </Button>
      </div>
    </div>
  );
}