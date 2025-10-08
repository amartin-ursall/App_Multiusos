import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Split, Trash2, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { FileSelector } from '@/components/pdf/FileSelector';
import { PdfPreview } from '@/components/pdf/PdfPreview';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
const MOCK_PAGE_COUNT = 24;
export function PdfSplitPage() {
  const [fileSelected, setFileSelected] = useState(false);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const handleFileSelect = () => {
    setFileSelected(true);
  };
  const handlePageToggle = (pageNumber: number) => {
    setSelectedPages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(pageNumber)) {
        newSet.delete(pageNumber);
      } else {
        newSet.add(pageNumber);
      }
      return newSet;
    });
  };
  const handleSelectAll = () => {
    const allPages = new Set(Array.from({ length: MOCK_PAGE_COUNT }, (_, i) => i + 1));
    setSelectedPages(allPages);
  };
  const handleDeselectAll = () => {
    setSelectedPages(new Set());
  };
  const handleReset = () => {
    setFileSelected(false);
    setSelectedPages(new Set());
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-6xl space-y-8"
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
            <Split className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dividir PDF</h1>
            <p className="text-muted-foreground">Extrae una o varias páginas de un archivo PDF.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants}>
        {!fileSelected ? (
          <FileSelector onFileSelect={handleFileSelect} />
        ) : (
          <div className="space-y-6">
            <Alert>
              <AlertTitle className="font-semibold">Selecciona las páginas a extraer</AlertTitle>
              <AlertDescription>
                Haz clic en las páginas que deseas incluir en tu nuevo archivo PDF.
              </AlertDescription>
            </Alert>
            <div className="flex flex-wrap items-center gap-4">
              <Button onClick={handleSelectAll} variant="outline" size="sm">
                <CheckSquare className="mr-2 h-4 w-4" />
                Seleccionar todo
              </Button>
              <Button onClick={handleDeselectAll} variant="outline" size="sm">
                <Square className="mr-2 h-4 w-4" />
                Deseleccionar todo
              </Button>
              <p className="text-sm text-muted-foreground">
                {selectedPages.size} de {MOCK_PAGE_COUNT} páginas seleccionadas
              </p>
            </div>
            <PdfPreview
              pageCount={MOCK_PAGE_COUNT}
              selectedPages={selectedPages}
              onPageToggle={handlePageToggle}
            />
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
              <Button onClick={handleReset} variant="destructive" className="w-full sm:w-auto">
                <Trash2 className="mr-2 h-4 w-4" />
                Empezar de nuevo
              </Button>
              <Button className="w-full sm:w-auto" disabled={selectedPages.size === 0}>
                <Split className="mr-2 h-4 w-4" />
                Extraer {selectedPages.size > 0 ? `${selectedPages.size} página(s)` : ''}
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}