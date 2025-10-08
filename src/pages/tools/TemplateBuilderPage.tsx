import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, PlusSquare, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { TemplateBuilder } from '@/components/templates/TemplateBuilder';
export function TemplateBuilderPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex h-[calc(100vh-7rem)] flex-col space-y-8"
    >
      <motion.div variants={headerVariants}>
        <Button asChild variant="ghost" className="-ml-4">
          <Link to="/plantillas">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Herramientas de Plantillas
          </Link>
        </Button>
        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-primary/10 p-3">
              <PlusSquare className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Constructor de Plantillas</h1>
              <p className="text-muted-foreground">Crea o edita tu plantilla personalizada.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Vista Previa
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Guardar Plantilla
            </Button>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants} className="flex-grow">
        <div className="flex h-full flex-col space-y-6">
          <div>
            <label htmlFor="template-name" className="text-sm font-medium">
              Nombre de la Plantilla
            </label>
            <Input id="template-name" placeholder="Ej: Informe Trimestral de Marketing" className="mt-2 max-w-md" />
          </div>
          <div className="flex-grow">
            <TemplateBuilder />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}