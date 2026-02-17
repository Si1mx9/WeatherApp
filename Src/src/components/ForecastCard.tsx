import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { ForecastDay } from '../types/weather';
import { getWeatherIconUrl } from '../services/weatherApi';

interface ForecastCardProps {
  day: ForecastDay;
  index: number;
  tempHigh: number;
  tempLow: number;
  unitSymbol: string;
}

export function ForecastCard({ day, index, tempHigh, tempLow, unitSymbol }: ForecastCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formatDay = (dateString: string) => {
    if (index === 0) return 'Today';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0 
      } : {}}
      transition={{ 
        delay: 0.1 * index,
        duration: 0.6,
        type: 'spring',
        bounce: 0.4
      }}
      whileHover={{ 
        scale: 1.1, 
        y: -10,
        rotateY: 5,
        transition: { type: 'spring', stiffness: 300 }
      }}
      whileTap={{ scale: 0.95 }}
      className="glass rounded-2xl p-4 text-center cursor-pointer relative overflow-hidden group"
      style={{ perspective: '1000px' }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-yellow-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          boxShadow: [
            '0 0 20px rgba(251, 146, 60, 0.3)',
            '0 0 40px rgba(251, 146, 60, 0.6)',
            '0 0 20px rgba(251, 146, 60, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Day name with shimmer */}
      <motion.p 
        className="font-semibold text-white mb-3 text-sm md:text-base relative z-10"
        whileHover={{ scale: 1.05 }}
      >
        {formatDay(day.datetime)}
      </motion.p>
      
      {/* Weather icon with complex animation */}
      <motion.div className="relative z-10">
        <motion.img
          src={getWeatherIconUrl(day.icon)}
          alt={day.conditions}
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3"
          whileHover={{ 
            rotate: [0, -15, 15, -15, 0],
            scale: [1, 1.2, 1.2, 1.2, 1],
          }}
          transition={{ duration: 0.6 }}
        />
        {/* Icon glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 -z-10"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>
      
      {/* Temperature with gradient */}
      <div className="flex justify-center gap-2 text-sm md:text-base relative z-10">
        <motion.span 
          className="font-bold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent"
          whileHover={{ scale: 1.1 }}
        >
          {Math.round(tempHigh)}{unitSymbol}
        </motion.span>
        <motion.span 
          className="text-white/60"
          whileHover={{ scale: 1.1 }}
        >
          {Math.round(tempLow)}{unitSymbol}
        </motion.span>
      </div>

      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
