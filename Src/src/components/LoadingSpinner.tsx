import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="mb-6"
      >
        <Loader2 className="w-16 h-16 text-white" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-white/80 font-medium"
      >
        Fetching weather data...
      </motion.p>
    </motion.div>
  );
}
