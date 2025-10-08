import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Crop, CheckCircle2, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { ImageFileSelector } from '@/components/image/ImageFileSelector';
import { ImageCropArea } from '@/components/image/ImageCropArea';
import { Card, CardContent } from '@/components/ui/card';
type CropStage = 'selecting' | 'cropping' | 'complete';
export function ImageCropPage() {
  const [stage, setStage] = useState<CropStage>('selecting');
  const handleFileSelect = () => {
    setStage('cropping');
  };
  const handleCrop = () => {
    setStage('complete');
  };
  const handleReset = () => {
    setStage('selecting');
  };
  const renderContent = () => {
    switch (stage) {
      case 'selecting':
        return <ImageFileSelector onFileSelect={handleFileSelect} />;
      case 'cropping':
        return <ImageCropArea onCrop={handleCrop} onBack={handleReset} />;
      case 'complete':
        return (
          <Card className="flex flex-col items-center justify-center p-8 text-center">
            <CardContent>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
              >
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                <h2 className="mt-4 text-2xl font-bold">¡Imagen recortada!</h2>
                <p className="mb-6 mt-2 text-muted-foreground">
                  Tu imagen ha sido recortada con éxito.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Descargar Imagen
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Recortar otra
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-5xl space-y-8"
    >
      <motion.div variants={headerVariants}>
        <Button asChild variant="ghost" className="-ml-4">
          <Link to="/imagenes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Herramientas de Imagen
          </Link>
        </Button>
        <div className="mt-4 flex items-center space-x-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <Crop className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Recortar Imagen</h1>
            <p className="text-muted-foreground">Selecciona un área de la imagen para recortar.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants} className="min-h-[400px]">
        {renderContent()}
      </motion.div>
    </motion.div>
  );
}