import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, FileSignature, Presentation, FileSpreadsheet, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { FileSelector } from '@/components/pdf/FileSelector';
import { ProcessingView } from '@/components/pdf/ProcessingView';
import { MockFile } from '@/hooks/useMockFileUpload';
type ConversionType = 'word' | 'powerpoint' | 'excel';
const conversionConfig: Record<ConversionType, { title: string; description: string; Icon: LucideIcon; fileExtension: string }> = {
  word: {
    title: 'PDF a Word',
    description: 'Convierte tu PDF a un documento de Word editable.',
    Icon: FileSignature,
    fileExtension: 'DOCX',
  },
  powerpoint: {
    title: 'PDF a PowerPoint',
    description: 'Convierte tu PDF en una presentación de PowerPoint editable.',
    Icon: Presentation,
    fileExtension: 'PPTX',
  },
  excel: {
    title: 'PDF a Excel',
    description: 'Extrae tablas de tu PDF a una hoja de cálculo de Excel.',
    Icon: FileSpreadsheet,
    fileExtension: 'XLSX',
  },
};
export function PdfToOfficePage() {
  const location = useLocation();
  const conversionType = location.pathname.split('/').pop()?.replace('a-', '') as ConversionType;
  const config = conversionConfig[conversionType] || conversionConfig.word;
  const [stage, setStage] = useState<'selecting' | 'processing' | 'complete'>('selecting');
  const [mockFile, setMockFile] = useState<MockFile | null>(null);
  const handleFileSelect = () => {
    const newFile: MockFile = {
      id: `mock-convert-${conversionType}`,
      name: `documento_a_convertir.pdf`,
      size: 2097152, // ~2.1 MB
    };
    setMockFile(newFile);
    setStage('processing');
  };
  const handleReset = () => {
    setStage('selecting');
    setMockFile(null);
  };
  const renderContent = () => {
    switch (stage) {
      case 'selecting':
        return <FileSelector onFileSelect={handleFileSelect} />;
      case 'processing':
      case 'complete':
        return mockFile && (
          <ProcessingView
            originalSize={mockFile.size}
            finalSize={mockFile.size * 1.2} // Office files can be larger
            onReset={handleReset}
          />
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
            <config.Icon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{config.title}</h1>
            <p className="text-muted-foreground">{config.description}</p>
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