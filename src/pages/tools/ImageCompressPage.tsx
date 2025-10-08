import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shrink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { ImageFileSelector } from '@/components/image/ImageFileSelector';
import { ImageCompressionOptions } from '@/components/image/ImageCompressionOptions';
import { ProcessingView } from '@/components/pdf/ProcessingView';
import { MockFile } from '@/hooks/useMockFileUpload';
type CompressionStage = 'selecting' | 'options' | 'processing' | 'complete';
export type CompressionLevel = 'low' | 'recommended' | 'extreme';
export function ImageCompressPage() {
  const [stage, setStage] = useState<CompressionStage>('selecting');
  const [mockFile, setMockFile] = useState<MockFile | null>(null);
  const [finalSize, setFinalSize] = useState(0);
  const handleFileSelect = () => {
    const newFile: MockFile = {
      id: 'mock-compress-image',
      name: 'paisaje_montañoso.jpg',
      size: 3145728, // ~3.1 MB
    };
    setMockFile(newFile);
    setStage('options');
  };
  const handleCompress = (level: CompressionLevel) => {
    if (!mockFile) return;
    const reductionFactors = {
      low: 0.6,
      recommended: 0.3,
      extreme: 0.1,
    };
    setFinalSize(mockFile.size * reductionFactors[level]);
    setStage('processing');
  };
  const handleReset = () => {
    setStage('selecting');
    setMockFile(null);
    setFinalSize(0);
  };
  const renderContent = () => {
    switch (stage) {
      case 'selecting':
        return <ImageFileSelector onFileSelect={handleFileSelect} />;
      case 'options':
        return mockFile && <ImageCompressionOptions file={mockFile} onCompress={handleCompress} onBack={handleReset} />;
      case 'processing':
      case 'complete':
        return mockFile && <ProcessingView originalSize={mockFile.size} finalSize={finalSize} onReset={handleReset} />;
      default:
        return null;
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
          <Link to="/imagenes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Herramientas de Imagen
          </Link>
        </Button>
        <div className="mt-4 flex items-center space-x-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <Shrink className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Comprimir Imagen</h1>
            <p className="text-muted-foreground">Reduce el tamaño de tu archivo de imagen manteniendo la calidad.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants} className="min-h-[300px]">
        {renderContent()}
      </motion.div>
    </motion.div>
  );
}