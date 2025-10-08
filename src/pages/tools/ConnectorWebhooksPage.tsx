import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Webhook, Plus, MoreHorizontal, Pencil, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
const MOCK_WEBHOOKS = [
  { id: 'wh_1', url: 'https://api.myapp.com/hooks/salesforce', event: 'deal.updated', status: 'active' },
  { id: 'wh_2', url: 'https://api.myapp.com/hooks/stripe', event: 'payment.succeeded', status: 'active' },
  { id: 'wh_3', url: 'https://api.myapp.com/hooks/github', event: 'push', status: 'paused' },
];
export function ConnectorWebhooksPage() {
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL del webhook copiada');
  };
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
        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-primary/10 p-3">
              <Webhook className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Webhooks</h1>
              <p className="text-muted-foreground">Configura notificaciones de datos en tiempo real.</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Crear Webhook
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nuevo Webhook</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="url">URL del Endpoint</Label>
                  <Input id="url" placeholder="https://your-app.com/webhook" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event">Evento a Escuchar</Label>
                  <Input id="event" placeholder="ej. object.created" />
                </div>
                <Button className="w-full">Crear Webhook</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Webhooks Configurados</CardTitle>
            <CardDescription>Gestiona los endpoints que reciben eventos de tu cuenta.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL del Endpoint</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_WEBHOOKS.map((wh) => (
                  <TableRow key={wh.id}>
                    <TableCell className="font-mono text-sm">
                      {wh.url}
                      <Button variant="ghost" size="icon" className="ml-2 h-6 w-6" onClick={() => handleCopy(wh.url)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{wh.event}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={wh.status === 'active' ? 'default' : 'outline'}>
                        {wh.status === 'active' ? 'Activo' : 'Pausado'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}