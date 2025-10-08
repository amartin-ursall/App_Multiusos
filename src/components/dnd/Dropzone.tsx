import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud } from 'lucide-react';
interface DropzoneProps {
  onFileSelect: () => void;
}
export function Dropzone({ onFileSelect }: DropzoneProps) {
  return (
    <Card className="border-2 border-dashed border-muted-foreground/50 bg-muted/20 transition-colors hover:border-primary hover:bg-muted/50">
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
        <div className="rounded-full border border-dashed p-4">
          <UploadCloud className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">Arrastra y suelta archivos aquí</p>
          <p className="text-sm text-muted-foreground">o si lo prefieres</p>
        </div>
        <Button onClick={onFileSelect} variant="outline">
          Selecciona un Archivo
        </Button>
      </CardContent>
    </Card>
  );
}