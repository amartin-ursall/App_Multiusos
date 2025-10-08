import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ScanLine, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { ImageFileSelector } from '@/components/image/ImageFileSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
const MOCK_OCR_TEXT = `Zenith Suite - Informe Trimestral
Resumen Ejecutivo
El tercer trimestre ha mostrado un crecimiento constante en la adquisición de usuarios, con un aumento del 15% en comparación con el Q2. La participación en los módulos de PDF e Imágenes sigue siendo la más alta.
Métricas Clave:
- Usuarios Activos Mensuales (MAU): 12,450 (+8%)
- Tasa de Retención: 65%
- Nuevas Suscripciones: 1,230
Próximos Pasos:
Se planea lanzar el módulo de Conector en el Q4 para impulsar la integración de datos empresariales. Se asignará un presupuesto de marketing adicional para promocionar las nuevas funcionalidades.`;
export function DocumentOcrPage() {
  const [fileSelected, setFileSelected] = useState(false);
  const handleFileSelect = () => {
    setFileSelected(true);
  };
  const handleReset = () => {
    setFileSelected(false);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_OCR_TEXT);
    toast.success('Texto copiado al portapapeles');
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
          <Link to="/documentos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Herramientas de Documentos
          </Link>
        </Button>
        <div className="mt-4 flex items-center space-x-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <ScanLine className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Escanear con OCR</h1>
            <p className="text-muted-foreground">Extrae texto de imágenes o documentos escaneados.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants}>
        {!fileSelected ? (
          <ImageFileSelector onFileSelect={handleFileSelect} />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Imagen Original</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-lg border">
                    <img
                      src="https://images.unsplash.com/photo-1521575107035-8db5b7581551?q=80&w=2070"
                      alt="Documento escaneado"
                      className="aspect-[3/4] w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Texto Extraído</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Textarea
                    readOnly
                    value={MOCK_OCR_TEXT}
                    className="h-full min-h-[300px] resize-none"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
              <Button onClick={handleReset} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Escanear otro
              </Button>
              <Button onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copiar Texto
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}