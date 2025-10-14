import { MODULES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { containerVariants, headerVariants } from '@/lib/animations';
import { ExternalAppFrame } from '@/components/templates/ExternalAppFrame';

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

      {/* Contenido del Conector: iframe integrado */}

      <div className="rounded-md border border-border/40">
        <ExternalAppFrame height="70vh" allowUrlChange={false} defaultUrl="http://localhost:3034/" />
      </div>

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

      {/* Se han removido las cards de herramientas para mostrar solo el iframe */}
    </motion.div>
  );
}