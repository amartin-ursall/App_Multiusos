import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants } from '@/lib/animations';
import { ExternalAppFrame } from '@/components/templates/ExternalAppFrame';

export function ExternalAppLoaderPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-7xl space-y-8 h-full"
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
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Cargar Aplicación Externa</h1>
            <p className="text-muted-foreground">Integra aplicaciones externas alojadas en otros puertos de localhost.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <div className="flex-1 h-[calc(100vh-250px)]">
        <ExternalAppFrame height="100%" />
      </div>
    </motion.div>
  );
}