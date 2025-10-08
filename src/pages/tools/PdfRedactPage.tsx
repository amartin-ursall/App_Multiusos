import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldOff, MousePointer, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { FileSelector } from '@/components/pdf/FileSelector';
import { DocumentPreview } from '@/components/pdf/DocumentPreview';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
export function PdfRedactPage() {
  const [fileSelected, setFileSelected] = useState(false);
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-7xl space-y-8"
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
            <ShieldOff className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Redactar PDF</h1>
            <p className="text-muted-foreground">Elimina permanentemente información sensible de tu documento.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants}>
        {!fileSelected ? (
          <div className="mx-auto max-w-4xl">
            <FileSelector onFileSelect={() => setFileSelected(true)} />
          </div>
        ) : (
          <div className="space-y-6">
            <Alert>
              <AlertTitle className="font-semibold">Dibuja para redactar</AlertTitle>
              <AlertDescription>
                Haz clic y arrastra sobre el texto o las áreas que deseas eliminar permanentemente. Esta acción no se puede deshacer.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="relative">
                  <DocumentPreview />
                  <div className="absolute left-[15%] top-[20%] h-5 w-3/4 cursor-crosshair bg-black/80" />
                  <div className="absolute left-[30%] top-[60%] h-12 w-1/2 cursor-crosshair bg-black/80" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Herramientas</h3>
                <Button variant="secondary" className="w-full justify-start">
                  <MousePointer className="mr-2 h-4 w-4" />
                  Redactar Área
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Limpiar Redacciones
                </Button>
                <Separator />
                <Button size="lg" className="w-full">
                  Aplicar y Descargar
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}