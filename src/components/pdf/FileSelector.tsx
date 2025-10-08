import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileSearch } from 'lucide-react';
interface FileSelectorProps {
  onFileSelect: () => void;
}
export function FileSelector({ onFileSelect }: FileSelectorProps) {
  return (
    <Card className="border-2 border-dashed border-muted-foreground/50 bg-muted/20 transition-colors hover:border-primary hover:bg-muted/50">
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
        <div className="rounded-full border border-dashed p-4">
          <FileSearch className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">Selecciona un archivo PDF</p>
          <p className="text-sm text-muted-foreground">
            Elige el documento del que quieres extraer páginas.
          </p>
        </div>
        <Button onClick={onFileSelect} variant="outline">
          Seleccionar PDF
        </Button>
      </CardContent>
    </Card>
  );
}