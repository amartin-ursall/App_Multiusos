import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { itemVariants } from '@/lib/animations';
import { Plug } from 'lucide-react';
interface DataSourceCardProps {
  name: string;
  logo: string;
}
export function DataSourceCard({ name, logo }: DataSourceCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="group overflow-hidden text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <img src={logo} alt={`${name} logo`} className="h-16 w-16" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">{name}</h3>
          <Button className="mt-4 w-full" variant="outline">
            <Plug className="mr-2 h-4 w-4" />
            Conectar
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}