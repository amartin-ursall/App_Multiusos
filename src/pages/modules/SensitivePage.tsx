import { ExternalAppFrame } from '@/components/templates/ExternalAppFrame';
import { MODULES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { containerVariants, headerVariants } from '@/lib/animations';

export function SensitivePage() {
  const moduleInfo = MODULES.find((m) => m.path === '/sensibles');
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
      <div className="h-full w-full">
        <ExternalAppFrame height="80vh" allowUrlChange={false} defaultUrl="http://localhost:3030/" />
      </div>
    </motion.div>
  );
}

export default SensitivePage;