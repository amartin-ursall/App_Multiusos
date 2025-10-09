import { FeatureCard } from '@/components/FeatureCard';
import { MODULES, CONNECTOR_TOOLS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { containerVariants, headerVariants } from '@/lib/animations';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Construction } from 'lucide-react';

export function ConnectorPage() {
  const moduleInfo = MODULES.find((m) => m.path === '/conector');
  if (!moduleInfo) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.div variants={headerVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{moduleInfo.name} Herramientas</h1>
        <p className="text-muted-foreground">{moduleInfo.description}</p>
      </motion.div>

      {/* Alerta de módulo en desarrollo */}
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <Construction className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-700 dark:text-amber-400">Módulo en Desarrollo</AlertTitle>
        <AlertDescription className="text-amber-600 dark:text-amber-300">
          Este módulo está actualmente en desarrollo. Las funcionalidades de integración con APIs externas
          (Google Drive, Salesforce, Dropbox, SharePoint) estarán disponibles próximamente.
        </AlertDescription>
      </Alert>

      {/*
        TODO: MÓDULO CONECTOR - EN DESARROLLO

        Funcionalidades pendientes de implementación:

        1. Sistema de autenticación OAuth2 para servicios externos
        2. Gestión de tokens de acceso encriptados
        3. Sincronización automática de datos (Cron Jobs)
        4. Webhooks para notificaciones en tiempo real
        5. Conectores para:
           - Google Drive API
           - Salesforce API
           - Dropbox API
           - Microsoft SharePoint API

        Stack tecnológico sugerido:
        - OAuth2: Implementación manual o librería passport-oauth2
        - Base de datos: SQLite/PostgreSQL para almacenar tokens
        - Encriptación: crypto (Node.js nativo) para proteger tokens
        - Cron: node-cron para sincronización programada
      */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 opacity-50 pointer-events-none">
        {CONNECTOR_TOOLS.map((tool) => (
          <FeatureCard key={tool.title} tool={tool} />
        ))}
      </div>
    </motion.div>
  );
}