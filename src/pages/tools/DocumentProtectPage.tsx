import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { FileSelector } from '@/components/pdf/FileSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
type ProtectStage = 'selecting' | 'options' | 'complete';
export function DocumentProtectPage() {
  const [stage, setStage] = useState<ProtectStage>('selecting');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleFileSelect = () => {
    setStage('options');
  };
  const handleProtect = () => {
    setStage('complete');
  };
  const handleReset = () => {
    setStage('selecting');
    setPassword('');
  };
  const renderContent = () => {
    switch (stage) {
      case 'selecting':
        return <FileSelector onFileSelect={handleFileSelect} />;
      case 'options':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Establecer Contraseña</CardTitle>
              <CardDescription>
                Introduce una contraseña para cifrar tu documento.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-1 right-1 h-7 w-7"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button onClick={handleProtect} disabled={!password} className="w-full">
                <Lock className="mr-2 h-4 w-4" />
                Proteger Documento
              </Button>
            </CardContent>
          </Card>
        );
      case 'complete':
        return (
          <Card className="flex flex-col items-center justify-center p-8 text-center">
            <CardContent>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
              >
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                <h2 className="mt-4 text-2xl font-bold">¡Documento protegido!</h2>
                <p className="mb-6 mt-2 text-muted-foreground">
                  Tu documento ha sido cifrado con contraseña.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Descargar
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Proteger otro
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        );
    }
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-2xl space-y-8"
    >
      <motion.div variants={headerVariants}>
        <Button asChild variant="ghost" className="-ml-4">
          <Link to="/documentos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Herramientas de Documentos
          </Link>
        </Button>
        <div className="mt-4 flex items-center space-x-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Proteger Documento</h1>
            <p className="text-muted-foreground">Añade una contraseña para proteger tu archivo.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants} className="min-h-[300px]">
        {renderContent()}
      </motion.div>
    </motion.div>
  );
}