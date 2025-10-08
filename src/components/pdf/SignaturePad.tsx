import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eraser } from 'lucide-react';
import { cn } from '@/lib/utils';
interface SignaturePadProps {
  onSignatureChange: (dataUrl: string | null) => void;
}
export function SignaturePad({ onSignatureChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000'); // Black
  const [isEmpty, setIsEmpty] = useState(true);
  const colors = [
    { name: 'Negro', value: '#000000' },
    { name: 'Azul', value: '#0000FF' },
    { name: 'Rojo', value: '#FF0000' },
  ];
  const getContext = () => canvasRef.current?.getContext('2d');
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Set canvas size based on its container
    const resizeCanvas = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const ctx = getContext();
    if (!ctx) return;
    const pos = getPosition(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const ctx = getContext();
    if (!ctx) return;
    const pos = getPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    setIsEmpty(false);
  };
  const stopDrawing = () => {
    const ctx = getContext();
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
    if (canvasRef.current && !isEmpty) {
        onSignatureChange(canvasRef.current.toDataURL());
    }
  };
  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e.nativeEvent) {
      return {
        x: e.nativeEvent.touches[0].clientX - rect.left,
        y: e.nativeEvent.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    onSignatureChange(null);
  };
  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex-grow p-2">
        <canvas
          ref={canvasRef}
          className="h-full w-full touch-none rounded-md bg-muted/50"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Color:</span>
          {colors.map((c) => (
            <button
              key={c.value}
              aria-label={`Seleccionar color ${c.name}`}
              onClick={() => setColor(c.value)}
              className={cn(
                'h-6 w-6 rounded-full border-2 transition-all',
                color === c.value ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-transparent'
              )}
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>
        <Button onClick={clearCanvas} variant="outline" size="sm" disabled={isEmpty}>
          <Eraser className="mr-2 h-4 w-4" />
          Limpiar
        </Button>
      </CardFooter>
    </Card>
  );
}