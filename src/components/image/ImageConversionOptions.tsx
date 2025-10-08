import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ArrowLeft, FileImage } from 'lucide-react';
import { MockFile } from '@/hooks/useMockFileUpload';
interface ImageConversionOptionsProps {
  file: MockFile;
  onConvert: () => void;
  onBack: () => void;
}
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
export function ImageConversionOptions({ file, onConvert, onBack }: ImageConversionOptionsProps) {
  const [quality, setQuality] = useState(80);
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col space-y-4">
        <div className="overflow-hidden rounded-lg border">
          <img
            src="https://images.unsplash.com/photo-1611162617213-6d22e7f2c9b4?q=80&w=1974"
            alt="Vista previa de la imagen"
            className="aspect-video w-full object-cover"
          />
        </div>
        <div className="text-center">
          <p className="truncate font-medium">{file.name}</p>
          <p className="text-sm text-muted-foreground">{formatBytes(file.size)}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Opciones de Conversión</h3>
          <div className="grid w-full items-center gap-3">
            <div className="flex justify-between">
              <Label htmlFor="quality">Calidad de imagen</Label>
              <span className="text-sm font-medium text-primary">{quality}%</span>
            </div>
            <Slider
              id="quality"
              min={0}
              max={100}
              step={1}
              value={[quality]}
              onValueChange={(value) => setQuality(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Una calidad más baja resulta en un tamaño de archivo más pequeño.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <Button onClick={onConvert}>
            <FileImage className="mr-2 h-4 w-4" />
            Convertir a JPG
          </Button>
        </div>
      </div>
    </div>
  );
}