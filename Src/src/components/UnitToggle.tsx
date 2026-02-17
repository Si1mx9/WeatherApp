import { motion } from 'framer-motion';
import type { TemperatureUnit } from '../types/weather';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export function UnitToggle({ unit, onToggle }: UnitToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-2 glass rounded-full p-1.5 relative overflow-hidden"
    >
      {/* Animated background slider */}
      <motion.div
        className="absolute top-1.5 bottom-1.5 w-[calc(50%-4px)] bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"
        animate={{
          left: unit === 'celsius' ? '6px' : 'calc(50% + 2px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      />

      <motion.button
        onClick={() => unit !== 'celsius' && onToggle()}
        className={`relative z-10 px-5 py-2.5 rounded-full font-semibold transition-all ${
          unit === 'celsius'
            ? 'text-white'
            : 'text-white/70 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        °C
      </motion.button>
      
      <motion.button
        onClick={() => unit !== 'fahrenheit' && onToggle()}
        className={`relative z-10 px-5 py-2.5 rounded-full font-semibold transition-all ${
          unit === 'fahrenheit'
            ? 'text-white'
            : 'text-white/70 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        °F
      </motion.button>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-50"
        animate={{
          boxShadow: [
            '0 0 20px rgba(251, 146, 60, 0.3)',
            '0 0 30px rgba(251, 146, 60, 0.5)',
            '0 0 20px rgba(251, 146, 60, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
