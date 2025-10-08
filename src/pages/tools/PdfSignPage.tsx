import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, PenSquare, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { FileSelector } from '@/components/pdf/FileSelector';
import { DocumentPreview } from '@/components/pdf/DocumentPreview';
import { SignaturePad } from '@/components/pdf/SignaturePad';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
export function PdfSignPage() {
  const [fileSelected, setFileSelected] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const handleFileSelect = () => {
    setFileSelected(true);
  };
  const handleSignatureChange = (dataUrl: string | null) => {
    setSignatureDataUrl(dataUrl);
  };
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
            <PenSquare className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Firmar PDF</h1>
            <p className="text-muted-foreground">Dibuja tu firma y aplícala a tu documento.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants}>
        {!fileSelected ? (
          <div className="mx-auto max-w-4xl">
            <FileSelector onFileSelect={handleFileSelect} />
          </div>
        ) : (
          <div className="space-y-6">
            <Alert>
              <AlertTitle className="font-semibold">Dibuja tu firma</AlertTitle>
              <AlertDescription>
                Usa el panel de abajo para crear tu firma. Luego, haz clic en "Aplicar Firma" para completar el proceso.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="aspect-[3/4] max-h-[70vh]">
                <DocumentPreview />
              </div>
              <div className="aspect-[3/4] max-h-[70vh] lg:aspect-auto">
                <SignaturePad onSignatureChange={handleSignatureChange} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="lg" disabled={!signatureDataUrl}>
                <Check className="mr-2 h-5 w-5" />
                Aplicar Firma
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}