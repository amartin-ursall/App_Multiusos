import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { FileSelector } from '@/components/pdf/FileSelector';
import { CompressionOptions } from '@/components/pdf/CompressionOptions';
import { ProcessingView } from '@/components/pdf/ProcessingView';
import { MockFile } from '@/hooks/useMockFileUpload';
type CompressionStage = 'selecting' | 'options' | 'processing' | 'complete';
export type CompressionLevel = 'low' | 'recommended' | 'extreme';
export function PdfCompressPage() {
  const [stage, setStage] = useState<CompressionStage>('selecting');
  const [mockFile, setMockFile] = useState<MockFile | null>(null);
  const [finalSize, setFinalSize] = useState(0);
  const handleFileSelect = () => {
    const newFile: MockFile = {
      id: 'mock-compress-file',
      name: 'documento_a_comprimir.pdf',
      size: 4832019, // ~4.8 MB
    };
    setMockFile(newFile);
    setStage('options');
  };
  const handleCompress = (level: CompressionLevel) => {
    if (!mockFile) return;
    const reductionFactors = {
      low: 0.7,
      recommended: 0.4,
      extreme: 0.15,
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
        return <FileSelector onFileSelect={handleFileSelect} />;
      case 'options':
        return mockFile && <CompressionOptions file={mockFile} onCompress={handleCompress} onBack={handleReset} />;
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
          <Link to="/pdf">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Herramientas PDF
          </Link>
        </Button>
        <div className="mt-4 flex items-center space-x-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <Minimize2 className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Comprimir PDF</h1>
            <p className="text-muted-foreground">Reduce el tamaño de tu archivo PDF manteniendo la calidad.</p>
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