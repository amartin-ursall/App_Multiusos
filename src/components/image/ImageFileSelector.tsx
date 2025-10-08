import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImageUp } from 'lucide-react';
interface ImageFileSelectorProps {
  onFileSelect: () => void;
}
export function ImageFileSelector({ onFileSelect }: ImageFileSelectorProps) {
  return (
    <Card className="border-2 border-dashed border-muted-foreground/50 bg-muted/20 transition-colors hover:border-primary hover:bg-muted/50">
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
        <div className="rounded-full border border-dashed p-4">
          <ImageUp className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">Selecciona un archivo de imagen</p>
          <p className="text-sm text-muted-foreground">
            Elige la imagen que quieres comprimir.
          </p>
        </div>
        <Button onClick={onFileSelect} variant="outline">
          Seleccionar Imagen
        </Button>
      </CardContent>
    </Card>
  );
}