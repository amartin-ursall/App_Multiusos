import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud } from 'lucide-react';

interface DropzoneProps {
  onFileSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

export function Dropzone({ onFileSelect, accept = '.pdf', multiple = true }: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      onFileSelect(droppedFiles);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      onFileSelect(Array.from(selectedFiles));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card
      className={`border-2 border-dashed transition-colors ${
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-muted-foreground/50 bg-muted/20 hover:border-primary hover:bg-muted/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
        <div className="rounded-full border border-dashed p-4">
          <UploadCloud className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">Arrastra y suelta archivos aquí</p>
          <p className="text-sm text-muted-foreground">o si lo prefieres</p>
        </div>
        <Button onClick={handleButtonClick} variant="outline">
          Selecciona un Archivo
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
}