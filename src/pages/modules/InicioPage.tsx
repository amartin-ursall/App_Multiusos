import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME, MODULES } from '@/lib/constants';
import { containerVariants, headerVariants, itemVariants } from '@/lib/animations';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
export function InicioPage() {
  const welcomeModule = MODULES.find((m) => m.path === '/inicio');
  const featureModules = MODULES.filter(m => m.path !== '/inicio').slice(0, 6);
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-12"
    >
      <motion.div variants={headerVariants} className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Bienvenido a <span className="text-primary">{APP_NAME}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {welcomeModule?.description} Tu centro de productividad todo en uno, diseñado para simplificar tus flujos de trabajo.
        </p>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Explora los M��dulos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featureModules.map((mod) => (
                <Link to={mod.path} key={mod.path}>
                  <div className="group rounded-lg border p-6 transition-all hover:border-primary hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <mod.Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">{mod.name}</h3>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{mod.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}