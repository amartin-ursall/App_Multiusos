import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FeatureTool } from '@/lib/constants';
import { itemVariants } from '@/lib/animations';
interface FeatureCardProps {
  tool: FeatureTool;
}
export function FeatureCard({ tool }: FeatureCardProps) {
  const { Icon, title, description, path } = tool;
  const cardContent = (
    <motion.div variants={itemVariants} className="h-full">
      <Card className="group h-full cursor-pointer overflow-hidden text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
        <CardContent className="flex h-full flex-col items-center justify-center p-6">
          <div className="mb-4 rounded-full bg-primary/10 p-4 transition-colors duration-300 group-hover:bg-primary">
            <Icon className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
  if (path) {
    return <Link to={path}>{cardContent}</Link>;
  }
  return cardContent;
}