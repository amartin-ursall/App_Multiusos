import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Combine, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { useMockFileUpload } from '@/hooks/useMockFileUpload';
import { Dropzone } from '@/components/dnd/Dropzone';
import { SortableFileList } from '@/components/dnd/SortableFileList';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
export function PdfMergePage() {
  const { files, addFile, removeFile, reorderFiles, resetFiles } = useMockFileUpload();
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
              <Button onClick={addFile} variant="outline">
                Añadir más archivos
              </Button>
              <div className="flex w-full flex-col-reverse gap-4 sm:w-auto sm:flex-row">
                <Button onClick={resetFiles} variant="destructive" className="w-full sm:w-auto">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Limpiar todo
                </Button>
                <Button className="w-full sm:w-auto">
                  <Combine className="mr-2 h-4 w-4" />
                  Unir PDF
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}