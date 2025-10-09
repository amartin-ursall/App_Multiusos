import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileSearch, UploadCloud } from 'lucide-react';

interface FileSelectorProps {
  onFileSelect: (file?: File) => void;
}

export function FileSelector({ onFileSelect }: FileSelectorProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        onFileSelect(file);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
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
          <p className="text-lg font-semibold text-foreground">Arrastra y suelta un archivo PDF</p>
          <p className="text-sm text-muted-foreground">
            o si lo prefieres
          </p>
        </div>
        <Button onClick={handleButtonClick} variant="outline">
          Seleccionar PDF
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
}