import { motion } from 'framer-motion';
const dotVariants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: '100%',
  },
};
const containerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};
export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 justify-start">
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted flex-shrink-0">
        {/* Placeholder for avatar if needed */}
      </div>
      <div className="max-w-md rounded-lg p-3 text-sm bg-muted">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="flex h-5 w-12 items-end justify-center gap-1.5"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              variants={dotVariants}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className="h-2 w-2 rounded-full bg-foreground/50"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}