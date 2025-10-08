import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, ArrowRight, RefreshCw } from 'lucide-react';
import { MockFile } from '@/hooks/useMockFileUpload';
interface DocumentUploaderProps {
  onFileSelect: (file: MockFile) => void;
}
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
export function DocumentUploader({ onFileSelect }: DocumentUploaderProps) {
  const handleSelect = () => {
    const mockFile: MockFile = {
      id: 'org-doc-1',
      name: 'Informe_Resultados_Q3.pdf',
      size: 1258291, // ~1.2 MB
    };
    onFileSelect(mockFile);
  };
  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-muted-foreground/50 bg-muted/20 transition-colors hover:border-primary hover:bg-muted/50">
        <CardContent className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
          <div className="rounded-full border border-dashed p-4">
            <UploadCloud className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">Arrastra y suelta un documento</p>
            <p className="text-sm text-muted-foreground">o si lo prefieres</p>
          </div>
          <Button onClick={handleSelect} variant="outline">
            Selecciona un Archivo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
export function FilePreview({ file, onNext, onReset }: { file: MockFile; onNext: () => void; onReset: () => void; }) {
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
      <div className="flex justify-between">
        <Button onClick={onReset} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Cambiar Archivo
        </Button>
        <Button onClick={onNext}>
          Siguiente
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}