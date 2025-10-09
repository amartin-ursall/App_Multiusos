import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Split, Trash2, CheckSquare, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { FileSelector } from '@/components/pdf/FileSelector';
import { PdfPreview } from '@/components/pdf/PdfPreview';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import axios from 'axios';
import { toast } from 'sonner';
export function PdfSplitPage() {
  const [fileSelected, setFileSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [pageCount, setPageCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pagePreviews, setPagePreviews] = useState<Record<number, string>>({});
  
  const handleFileSelect = async (file?: File) => {
    if (file) {
      setSelectedFile(file);
      setFileSelected(true);
      setPagePreviews({});

      try {
        // Obtener el número real de páginas del PDF desde el backend
        const formData = new FormData();
        formData.append('pdf', file);

        const response = await axios.post('http://localhost:5000/api/pdf/info', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const pdfPageCount = response.data.pageCount;
        setPageCount(pdfPageCount);

        toast.success('PDF cargado correctamente', {
          description: `El documento tiene ${pdfPageCount} página(s)`,
        });
        
        // Cargar las vistas previas de las páginas
        loadPagePreviews(file, pdfPageCount);
      } catch (error) {
        console.error('Error al obtener información del PDF:', error);
        toast.error('Error', {
          description: 'No se pudo procesar el archivo PDF',
        });
        // Usar un valor por defecto en caso de error
        setPageCount(10);
      }
    }
  };
  
  const loadPagePreviews = async (file: File, pages: number) => {
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      
      const response = await axios.post('http://localhost:5000/api/pdf/previews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data && response.data.previews) {
        setPagePreviews(response.data.previews);
      }
    } catch (error) {
      console.error('Error al cargar las vistas previas:', error);
      // No mostrar error al usuario, simplemente continuamos sin vistas previas
    }
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
    const allPages = new Set(Array.from({ length: pageCount }, (_, i) => i + 1));
    setSelectedPages(allPages);
  };
  
  const handleDeselectAll = () => {
    setSelectedPages(new Set());
  };
  
  const handleReset = () => {
    setFileSelected(false);
    setSelectedFile(null);
    setSelectedPages(new Set());
  };
  
  const handleSplitPDF = async () => {
    if (!selectedFile || selectedPages.size === 0) {
      toast.error('Error', {
        description: 'Debes seleccionar al menos una página para extraer',
      });
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('pdf', selectedFile);

      // Convertir Set a Array y enviarlo como múltiples campos
      const pagesArray = Array.from(selectedPages).sort((a, b) => a - b);
      pagesArray.forEach(page => {
        formData.append('pages[]', page.toString());
      });

      const response = await axios.post('http://localhost:5000/api/pdf/split', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `split-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('¡Éxito!', {
        description: `PDF dividido correctamente. ${selectedPages.size} página(s) extraída(s).`,
      });

      handleReset();
    } catch (error) {
      console.error('Error al dividir el PDF:', error);
      toast.error('Error', {
        description: error.response?.data?.error || 'No se pudo dividir el PDF. Por favor, intenta de nuevo.',
      });
    } finally {
      setIsProcessing(false);
    }
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
                {selectedPages.size} de {pageCount} páginas seleccionadas
              </p>
            </div>
            <PdfPreview
              pageCount={pageCount}
              selectedPages={selectedPages}
              onPageToggle={handlePageToggle}
              pagePreviews={pagePreviews}
            />
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
              <Button onClick={handleReset} variant="destructive" className="w-full sm:w-auto" disabled={isProcessing}>
                <Trash2 className="mr-2 h-4 w-4" />
                Empezar de nuevo
              </Button>
              <Button 
                onClick={handleSplitPDF} 
                className="w-full sm:w-auto" 
                disabled={selectedPages.size === 0 || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Split className="mr-2 h-4 w-4" />
                    Extraer {selectedPages.size > 0 ? `${selectedPages.size} página(s)` : ''}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}