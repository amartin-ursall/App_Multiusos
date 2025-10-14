import { ExternalAppFrame } from '@/components/templates/ExternalAppFrame';

// Página de Asana que muestra un iframe a pantalla completa,
// exactamente igual que en la sección de Plantillas.
export default function AsanaPage() {
  return (
    <div className="h-full w-full">
      <ExternalAppFrame height="100vh" allowUrlChange={false} defaultUrl="http://localhost:3000/" />
    </div>
  );
}