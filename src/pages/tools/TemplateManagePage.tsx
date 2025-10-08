import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Folder, PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants } from '@/lib/animations';
import { TemplateCard } from '@/components/templates/TemplateCard';
const USER_TEMPLATES = [
  { title: 'Mi Informe Personalizado', category: 'Informes' },
  { title: 'Plantilla de Factura para Cliente X', category: 'Finanzas' },
  { title: 'Presentación de Equipo Q3', category: 'Negocios' },
];
export function TemplateManagePage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-7xl space-y-8"
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
              <Folder className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Mis Plantillas</h1>
              <p className="text-muted-foreground">Accede y gestiona tus plantillas guardadas.</p>
            </div>
          </div>
          <Button asChild>
            <Link to="/plantillas/crear">
              <PlusSquare className="mr-2 h-4 w-4" />
              Crear Nueva Plantilla
            </Link>
          </Button>
        </div>
      </motion.div>
      <Separator />
      {USER_TEMPLATES.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {USER_TEMPLATES.map((template, index) => (
            <TemplateCard key={index} title={template.title} category={template.category} isUserTemplate />
          ))}
        </div>
      ) : (
        <motion.div
          variants={headerVariants}
          className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center"
        >
          <Folder className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">No tienes plantillas guardadas</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Crea tu primera plantilla para empezar.
          </p>
          <Button asChild>
            <Link to="/plantillas/crear">
              <PlusSquare className="mr-2 h-4 w-4" />
              Crear Plantilla
            </Link>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}