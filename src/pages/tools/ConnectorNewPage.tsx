import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plug, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { containerVariants, headerVariants } from '@/lib/animations';
import { DataSourceCard } from '@/components/connectors/DataSourceCard';
const DATA_SOURCES = [
  { name: 'Google Drive', logo: '/google-drive.svg' },
  { name: 'Salesforce', logo: '/salesforce.svg' },
  { name: 'Slack', logo: '/slack.svg' },
  { name: 'GitHub', logo: '/github.svg' },
  { name: 'HubSpot', logo: '/hubspot.svg' },
  { name: 'Zendesk', logo: '/zendesk.svg' },
  { name: 'Jira', logo: '/jira.svg' },
  { name: 'Trello', logo: '/trello.svg' },
];
export function ConnectorNewPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-7xl space-y-8"
    >
      <motion.div variants={headerVariants}>
        <Button asChild variant="ghost" className="-ml-4">
          <Link to="/conector">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Herramientas de Conector
          </Link>
        </Button>
        <div className="mt-4 flex items-center space-x-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <Plug className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Nueva Conexión</h1>
            <p className="text-muted-foreground">Selecciona una fuente de datos para conectar.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={headerVariants} className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Buscar fuente de datos..." className="pl-10" />
      </motion.div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {DATA_SOURCES.map((source) => (
          <DataSourceCard key={source.name} name={source.name} logo={source.logo} />
        ))}
      </div>
    </motion.div>
  );
}