import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, PenSquare, Plus, Send, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { FileSelector } from '@/components/pdf/FileSelector';
import { DocumentPreview } from '@/components/pdf/DocumentPreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
interface Signer {
  id: number;
  email: string;
}
export function DocumentSignatureRequestPage() {
  const [fileSelected, setFileSelected] = useState(false);
  const [signers, setSigners] = useState<Signer[]>([]);
  const [signerEmail, setSignerEmail] = useState('');
  const handleAddSigner = () => {
    if (signerEmail && !signers.some(s => s.email === signerEmail)) {
      setSigners([...signers, { id: Date.now(), email: signerEmail }]);
      setSignerEmail('');
    }
  };
  const handleRemoveSigner = (id: number) => {
    setSigners(signers.filter(s => s.id !== id));
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
          <Link to="/documentos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Herramientas de Documentos
          </Link>
        </Button>
        <div className="mt-4 flex items-center space-x-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <PenSquare className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Firma Electrónica</h1>
            <p className="text-muted-foreground">Envía documentos para que sean firmados electrónicamente.</p>
          </div>
        </div>
      </motion.div>
      <Separator />
      <motion.div variants={itemVariants}>
        {!fileSelected ? (
          <div className="mx-auto max-w-4xl">
            <FileSelector onFileSelect={() => setFileSelected(true)} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <DocumentPreview />
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Añadir Firmantes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="email@ejemplo.com"
                      value={signerEmail}
                      onChange={(e) => setSignerEmail(e.target.value)}
                    />
                    <Button size="icon" onClick={handleAddSigner} disabled={!signerEmail}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {signers.map(signer => (
                      <Badge key={signer.id} variant="secondary" className="flex justify-between p-2">
                        <span className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {signer.email}
                        </span>
                        <button onClick={() => handleRemoveSigner(signer.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Button size="lg" className="w-full" disabled={signers.length === 0}>
                <Send className="mr-2 h-4 w-4" />
                Enviar para Firmar
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}