import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Text, Image as ImageIcon, Heading1, Columns, Divide } from 'lucide-react';
const DraggableItem = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex cursor-grab items-center space-x-3 rounded-md border p-3 transition-colors hover:bg-accent active:cursor-grabbing">
    <Icon className="h-5 w-5 text-muted-foreground" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);
export function TemplateBuilder() {
  return (
    <div className="flex h-full min-h-[600px] gap-6">
      <Card className="w-64 flex-shrink-0">
        <CardHeader>
          <CardTitle className="text-lg">Elementos</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-4">
          <div className="space-y-3">
            <DraggableItem icon={Heading1} label="Encabezado" />
            <DraggableItem icon={Text} label="Bloque de Texto" />
            <DraggableItem icon={ImageIcon} label="Imagen" />
            <DraggableItem icon={Columns} label="Dos Columnas" />
            <DraggableItem icon={Divide} label="Separador" />
          </div>
        </CardContent>
      </Card>
      <div className="flex-grow rounded-lg border-2 border-dashed bg-muted/50 p-8">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold text-muted-foreground">Área de Plantilla</p>
            <p className="text-sm text-muted-foreground">Arrastra elementos aquí para construir tu plantilla.</p>
          </div>
        </div>
      </div>
    </div>
  );
}