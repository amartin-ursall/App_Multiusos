import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { itemVariants } from '@/lib/animations';
interface TemplateCardProps {
  title: string;
  category: string;
  isUserTemplate?: boolean;
}
export function TemplateCard({ title, category, isUserTemplate = false }: TemplateCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="group overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Skeleton className="h-full w-full" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="secondary" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Vista Previa
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4">
          <p className="text-xs font-semibold uppercase text-primary">{category}</p>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <Button className="mt-3 w-full" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {isUserTemplate ? 'Editar Plantilla' : 'Usar Plantilla'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}