import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, GitCompareArrows, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { FileSelector } from '@/components/pdf/FileSelector';
import { DocumentCompareView } from '@/components/documents/DocumentCompareView';
export function DocumentComparePage() {
  const [docA, setDocA] = useState(false);
  const [docB, setDocB] = useState(false);
  const handleReset = () => {
    setDocA(false);
    setDocB(false);
  };
  const bothSelected = docA && docB;
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-7xl space-y-8"
    >
      <motion.div variants={headerVariants}>
        <Button asChild variant="ghost" className="-ml-4">
          <Link to="/documentos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Herramientas de Documentos
          </Link>
        </Button>
        <div className="mt-4 flex items-center space-x-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <GitCompareArrows className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Comparar Documentos</h1>
            <p className="text-muted-foreground">Encuentra diferencias entre dos versiones de un documento.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants}>
        {!bothSelected ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-center text-lg font-semibold">Documento Original (A)</h2>
              {docA ? (
                <div className="flex h-full min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-green-500 bg-green-500/10">
                  <p className="font-semibold text-green-500">Documento A cargado</p>
                </div>
              ) : (
                <FileSelector onFileSelect={() => setDocA(true)} />
              )}
            </div>
            <div className="space-y-2">
              <h2 className="text-center text-lg font-semibold">Documento Revisado (B)</h2>
              {docB ? (
                <div className="flex h-full min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-green-500 bg-green-500/10">
                  <p className="font-semibold text-green-500">Documento B cargado</p>
                </div>
              ) : (
                <FileSelector onFileSelect={() => setDocB(true)} />
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <DocumentCompareView />
            <div className="flex justify-end">
              <Button onClick={handleReset} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Comparar otros
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}