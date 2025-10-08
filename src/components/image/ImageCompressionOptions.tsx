import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Minimize2 } from 'lucide-react';
import { MockFile } from '@/hooks/useMockFileUpload';
import { CompressionLevel } from '@/pages/tools/ImageCompressPage';
import { cn } from '@/lib/utils';
interface ImageCompressionOptionsProps {
  file: MockFile;
  onCompress: (level: CompressionLevel) => void;
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
export function ImageCompressionOptions({ file, onCompress, onBack }: ImageCompressionOptionsProps) {
  const [selectedLevel, setSelectedLevel] = useState<CompressionLevel>('recommended');
  const options = [
    {
      level: 'low' as CompressionLevel,
      title: 'Compresión Baja',
      description: 'Menor reducción, mayor calidad.',
      reduction: 0.6,
    },
    {
      level: 'recommended' as CompressionLevel,
      title: 'Compresión Recomendada',
      description: 'Buen equilibrio entre tamaño y calidad.',
      reduction: 0.3,
    },
    {
      level: 'extreme' as CompressionLevel,
      title: 'Compresión Extrema',
      description: 'Mayor reducción, menor calidad.',
      reduction: 0.1,
    },
  ];
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col space-y-4">
        <div className="overflow-hidden rounded-lg border">
          <img
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000"
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
        <RadioGroup value={selectedLevel} onValueChange={(value) => setSelectedLevel(value as CompressionLevel)} className="space-y-4">
          {options.map((opt) => (
            <Label
              key={opt.level}
              htmlFor={opt.level}
              className={cn(
                'block cursor-pointer rounded-lg border bg-card p-4 transition-all hover:border-primary',
                selectedLevel === opt.level && 'border-2 border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
              )}
            >
              <div className="flex items-start">
                <RadioGroupItem value={opt.level} id={opt.level} className="mr-4 mt-1" />
                <div className="flex flex-col">
                  <span className="font-semibold">{opt.title}</span>
                  <span className="text-sm text-muted-foreground">{opt.description}</span>
                  <span className="mt-2 text-sm font-bold text-primary">
                    ~ {formatBytes(file.size * opt.reduction)}
                  </span>
                </div>
              </div>
            </Label>
          ))}
        </RadioGroup>
        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <Button onClick={() => onCompress(selectedLevel)}>
            <Minimize2 className="mr-2 h-4 w-4" />
            Comprimir Imagen
          </Button>
        </div>
      </div>
    </div>
  );
}