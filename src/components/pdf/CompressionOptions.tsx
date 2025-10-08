import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FileText, ArrowLeft, Minimize2 } from 'lucide-react';
import { MockFile } from '@/hooks/useMockFileUpload';
import { CompressionLevel } from '@/pages/tools/PdfCompressPage';
import { cn } from '@/lib/utils';
interface CompressionOptionsProps {
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
export function CompressionOptions({ file, onCompress, onBack }: CompressionOptionsProps) {
  const [selectedLevel, setSelectedLevel] = useState<CompressionLevel>('recommended');
  const options = [
    {
      level: 'low' as CompressionLevel,
      title: 'Compresión Baja',
      description: 'Menor reducción, mayor calidad de imagen.',
      reduction: 0.7,
    },
    {
      level: 'recommended' as CompressionLevel,
      title: 'Compresión Recomendada',
      description: 'Buen equilibrio entre tamaño y calidad.',
      reduction: 0.4,
    },
    {
      level: 'extreme' as CompressionLevel,
      title: 'Compresión Extrema',
      description: 'Mayor reducción, menor calidad de imagen.',
      reduction: 0.15,
    },
  ];
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex items-center p-4">
          <FileText className="h-8 w-8 flex-shrink-0 text-primary" />
          <div className="ml-3 flex-grow overflow-hidden">
            <p className="truncate font-medium text-sm">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
          </div>
        </CardContent>
      </Card>
      <RadioGroup value={selectedLevel} onValueChange={(value) => setSelectedLevel(value as CompressionLevel)}>
        <div className="grid gap-4 md:grid-cols-3">
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
        </div>
      </RadioGroup>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <Button onClick={() => onCompress(selectedLevel)}>
          <Minimize2 className="mr-2 h-4 w-4" />
          Comprimir PDF
        </Button>
      </div>
    </div>
  );
}