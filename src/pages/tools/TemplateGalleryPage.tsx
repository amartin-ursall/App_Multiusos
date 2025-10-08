import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, GalleryVertical, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { containerVariants, headerVariants } from '@/lib/animations';
import { TemplateCard } from '@/components/templates/TemplateCard';
const MOCK_TEMPLATES = [
  { title: 'Informe de Ventas Mensual', category: 'Informes' },
  { title: 'Propuesta de Proyecto', category: 'Negocios' },
  { title: 'Factura de Servicios', category: 'Finanzas' },
  { title: 'Presentación de Marketing', category: 'Marketing' },
  { title: 'Boletín Informativo Interno', category: 'Comunicación' },
  { title: 'Plan de Negocios', category: 'Negocios' },
  { title: 'Certificado de Finalización', category: 'Educación' },
  { title: 'Folleto de Evento', category: 'Marketing' },
];
export function TemplateGalleryPage() {
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
        <div className="mt-4 flex items-center space-x-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <GalleryVertical className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Explorar Galería</h1>
            <p className="text-muted-foreground">Encuentra la plantilla perfecta para empezar tu proyecto.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={headerVariants} className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Buscar plantillas..." className="pl-10" />
        </div>
        {/* Placeholder for category filters */}
        <Button variant="outline">Filtrar por Categoría</Button>
      </motion.div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {MOCK_TEMPLATES.map((template, index) => (
          <TemplateCard key={index} title={template.title} category={template.category} />
        ))}
      </div>
    </motion.div>
  );
}