import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UploadApplication } from '@/types';
import { cn } from '@/lib/utils';
interface ApplicationSelectorProps {
  selectedApp: UploadApplication;
  setSelectedApp: (app: UploadApplication) => void;
  onNext: () => void;
  onBack: () => void;
}
const apps = [
  { id: 'dropbox' as UploadApplication, name: 'Dropbox', logo: '/dropbox.svg' },
  { id: 'sharepoint' as UploadApplication, name: 'SharePoint', logo: '/sharepoint.svg' },
];
export function ApplicationSelector({ selectedApp, setSelectedApp, onNext, onBack }: ApplicationSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seleccionar Aplicación de Destino</CardTitle>
        <CardDescription>Elige dónde quieres subir tu documento.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedApp} onValueChange={(value) => setSelectedApp(value as UploadApplication)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {apps.map((app) => (
              <Label
                key={app.id}
                htmlFor={app.id}
                className={cn(
                  'block cursor-pointer rounded-lg border bg-card p-4 transition-all hover:border-primary',
                  selectedApp === app.id && 'border-2 border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                )}
              >
                <div className="flex items-center">
                  <RadioGroupItem value={app.id} id={app.id} className="mr-4" />
                  <img src={app.logo} alt={`${app.name} logo`} className="mr-4 h-8 w-8" />
                  <span className="font-semibold">{app.name}</span>
                </div>
              </Label>
            ))}
          </div>
        </RadioGroup>
        <div className="flex justify-between">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Atrás
          </Button>
          <Button onClick={onNext}>
            Siguiente
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}