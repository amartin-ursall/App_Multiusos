import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Scaling, Lock, Unlock } from 'lucide-react';
import { MockFile } from '@/hooks/useMockFileUpload';
interface ImageResizeOptionsProps {
  file: MockFile;
  onResize: () => void;
  onBack: () => void;
}
const ORIGINAL_WIDTH = 1920;
const ORIGINAL_HEIGHT = 1080;
const ASPECT_RATIO = ORIGINAL_WIDTH / ORIGINAL_HEIGHT;
export function ImageResizeOptions({ file, onResize, onBack }: ImageResizeOptionsProps) {
  const [width, setWidth] = useState(ORIGINAL_WIDTH);
  const [height, setHeight] = useState(ORIGINAL_HEIGHT);
  const [percentage, setPercentage] = useState(100);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (lockAspectRatio) {
      setHeight(Math.round(newWidth / ASPECT_RATIO));
    }
  };
  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (lockAspectRatio) {
      setWidth(Math.round(newHeight * ASPECT_RATIO));
    }
  };
  const handlePercentageChange = (newPercentage: number) => {
    setPercentage(newPercentage);
    const factor = newPercentage / 100;
    setWidth(Math.round(ORIGINAL_WIDTH * factor));
    setHeight(Math.round(ORIGINAL_HEIGHT * factor));
  };
  useEffect(() => {
    if (width !== ORIGINAL_WIDTH || height !== ORIGINAL_HEIGHT) {
      const widthRatio = (width / ORIGINAL_WIDTH) * 100;
      const heightRatio = (height / ORIGINAL_HEIGHT) * 100;
      setPercentage(Math.round((widthRatio + heightRatio) / 2));
    }
  }, [width, height]);
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col space-y-4">
        <div className="overflow-hidden rounded-lg border">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964"
            alt="Vista previa de la imagen"
            className="aspect-video w-full object-cover"
          />
        </div>
        <div className="text-center">
          <p className="truncate font-medium">{file.name}</p>
          <p className="text-sm text-muted-foreground">
            Dimensiones originales: {ORIGINAL_WIDTH} x {ORIGINAL_HEIGHT}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-6">
        <Tabs defaultValue="pixels" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pixels">Por Píxeles</TabsTrigger>
            <TabsTrigger value="percentage">Por Porcentaje</TabsTrigger>
          </TabsList>
          <TabsContent value="pixels" className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="width">Ancho (px)</Label>
                <Input id="width" type="number" value={width} onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 0)} />
              </div>
              <div className="self-end pb-2 text-muted-foreground">x</div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="height">Alto (px)</Label>
                <Input id="height" type="number" value={height} onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 0)} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="percentage" className="mt-6 space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="percentage">Porcentaje (%)</Label>
              <Input id="percentage" type="number" value={percentage} onChange={(e) => handlePercentageChange(parseInt(e.target.value, 10) || 0)} />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Nuevas dimensiones: {width} x {height} px
            </p>
          </TabsContent>
        </Tabs>
        <div className="flex items-center space-x-2">
          <Switch id="aspect-ratio" checked={lockAspectRatio} onCheckedChange={setLockAspectRatio} />
          <Label htmlFor="aspect-ratio" className="flex items-center">
            {lockAspectRatio ? <Lock className="mr-2 h-4 w-4" /> : <Unlock className="mr-2 h-4 w-4" />}
            Mantener relación de aspecto
          </Label>
        </div>
        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <Button onClick={onResize}>
            <Scaling className="mr-2 h-4 w-4" />
            Redimensionar Imagen
          </Button>
        </div>
      </div>
    </div>
  );
}