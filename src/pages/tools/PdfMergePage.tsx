import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Combine, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { useMockFileUpload } from '@/hooks/useMockFileUpload';
import { Dropzone } from '@/components/dnd/Dropzone';
import { SortableFileList } from '@/components/dnd/SortableFileList';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import axios from 'axios';

export function PdfMergePage() {
  const { files, addFile, removeFile, reorderFiles, resetFiles } = useMockFileUpload();
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      addFile(filesArray);
    }
  };

  const handleAddMoreFiles = () => {
    fileInputRef.current?.click();
  };

  const handleMergePDFs = async () => {
    if (files.length < 2) {
      toast.error('Error', {
        description: 'Se requieren al menos 2 archivos PDF para unir',
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Crear FormData con los archivos
      const formData = new FormData();
      files.forEach((fileItem) => {
        if (fileItem.file) {
          formData.append('pdfs', fileItem.file);
        }
      });

      // Llamar al backend
      const response = await axios.post('http://localhost:5000/api/pdf/merge', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Crear un enlace de descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `merged-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('¡Éxito!', {
        description: 'Los PDFs se han unido correctamente',
      });

      resetFiles();
    } catch (error) {
      console.error('Error al unir PDFs:', error);
      toast.error('Error', {
        description: error.response?.data?.error || 'No se pudieron unir los PDFs. Por favor, intenta de nuevo.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-4xl space-y-8"
    >
      <motion.div variants={headerVariants}>
        <Button asChild variant="ghost" className="-ml-4">
          <Link to="/pdf">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Herramientas PDF
          </Link>
        </Button>
        <div className="mt-4 flex items-center space-x-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <Combine className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Unir PDF</h1>
            <p className="text-muted-foreground">Combina varios archivos PDF en un único documento.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants}>
        {files.length === 0 ? (
          <Dropzone onFileSelect={addFile} />
        ) : (
          <div className="space-y-6">
            <Alert>
              <AlertTitle className="font-semibold">¡Archivos listos para unir!</AlertTitle>
              <AlertDescription>
                Arrastra los archivos para reordenarlos. Cuando estés listo, haz clic en "Unir PDF".
              </AlertDescription>
            </Alert>
            <SortableFileList files={files} onReorder={reorderFiles} onRemove={removeFile} />
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
              <Button onClick={handleAddMoreFiles} variant="outline">
                Añadir más archivos
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
              />
              <div className="flex w-full flex-col-reverse gap-4 sm:w-auto sm:flex-row">
                <Button onClick={resetFiles} variant="destructive" className="w-full sm:w-auto" disabled={isProcessing}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Limpiar todo
                </Button>
                <Button onClick={handleMergePDFs} className="w-full sm:w-auto" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Combine className="mr-2 h-4 w-4" />
                      Unir PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}