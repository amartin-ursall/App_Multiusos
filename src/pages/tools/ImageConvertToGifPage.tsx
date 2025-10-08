import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Replace, Download, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { ImageFileSelector } from '@/components/image/ImageFileSelector';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400",
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=400",
];
export function ImageConvertToGifPage() {
  const [files, setFiles] = useState<string[]>([]);
  const [frameRate, setFrameRate] = useState(10);
  const handleFileSelect = () => {
    setFiles(MOCK_IMAGES);
  };
  const handleReset = () => {
    setFiles([]);
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
            <Replace className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Convertir a GIF</h1>
            <p className="text-muted-foreground">Crea un GIF animado a partir de una secuencia de imágenes.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants}>
        {files.length === 0 ? (
          <ImageFileSelector onFileSelect={handleFileSelect} />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {files.map((src, index) => (
                  <div key={index} className="relative">
                    <img src={src} alt={`Frame ${index + 1}`} className="aspect-square w-full rounded-md object-cover" />
                    <Button size="icon" variant="destructive" className="absolute -right-2 -top-2 h-6 w-6">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="flex aspect-square w-full flex-col items-center justify-center border-2 border-dashed">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                  <span>Añadir Imagen</span>
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Opciones de GIF</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="framerate">Velocidad (FPS)</Label>
                      <span className="text-sm font-medium text-primary">{frameRate}</span>
                    </div>
                    <Slider id="framerate" min={1} max={30} step={1} value={[frameRate]} onValueChange={(v) => setFrameRate(v[0])} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="loop">Repetir en bucle</Label>
                    <Switch id="loop" defaultChecked />
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col gap-4">
                <Button size="lg">
                  <Replace className="mr-2 h-4 w-4" />
                  Crear GIF
                </Button>
                <Button onClick={handleReset} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Empezar de nuevo
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}