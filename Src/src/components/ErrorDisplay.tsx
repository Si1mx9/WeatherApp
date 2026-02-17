import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-strong rounded-3xl p-8 text-center max-w-md mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.1 }}
        className="mb-4 flex justify-center"
      >
        <AlertCircle className="w-16 h-16 text-red-300" />
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-white mb-6"
      >
        {message}
      </motion.p>
      
      {onRetry && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full font-semibold transition-colors"
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
}
