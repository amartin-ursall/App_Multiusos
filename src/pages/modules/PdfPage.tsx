import { FeatureCard } from '@/components/FeatureCard';
import { MODULES, PDF_TOOLS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { containerVariants, headerVariants } from '@/lib/animations';
export function PdfPage() {
  const moduleInfo = MODULES.find((m) => m.path === '/pdf');
  if (!moduleInfo) return null;
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.div variants={headerVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{moduleInfo.name} Herramientas</h1>
        <p className="text-muted-foreground">{moduleInfo.description}</p>
      </motion.div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {PDF_TOOLS.map((tool) => (
          <FeatureCard key={tool.title} tool={tool} />
        ))}
      </div>
    </motion.div>
  );
}