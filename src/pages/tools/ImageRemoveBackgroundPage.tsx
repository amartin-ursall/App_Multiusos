import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eraser, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { ImageFileSelector } from '@/components/image/ImageFileSelector';
import { Card, CardContent } from '@/components/ui/card';
export function ImageRemoveBackgroundPage() {
  const [fileSelected, setFileSelected] = useState(false);
  const handleReset = () => {
    setFileSelected(false);
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
          <Link to="/imagenes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Herramientas de Imagen
          </Link>
        </Button>
        <div className="mt-4 flex items-center space-x-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <Eraser className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Eliminar Fondo</h1>
            <p className="text-muted-foreground">Elimina automáticamente el fondo de cualquier imagen.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants}>
        {!fileSelected ? (
          <ImageFileSelector onFileSelect={() => setFileSelected(true)} />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-center font-semibold">Original</h3>
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961"
                    alt="Imagen original"
                    className="aspect-square w-full rounded-md object-cover"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-center font-semibold">Sin Fondo</h3>
                  <div className="relative aspect-square w-full rounded-md" style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\'%3e%3cpath d=\'M0 0h16v16H0z\' fill=\'%23f0f0f0\'/%3e%3cpath d=\'M16 16h16v16H16z\' fill=\'%23f0f0f0\'/%3e%3c/svg%3e")' }}>
                    <img
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961"
                      alt="Imagen sin fondo"
                      className="absolute inset-0 h-full w-full object-contain"
                      style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
              <Button onClick={handleReset} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Procesar otra
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Descargar
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}