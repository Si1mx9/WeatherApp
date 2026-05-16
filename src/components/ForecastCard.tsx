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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const formatDay = (dateString: string) => {
    if (index === 0) return 'Today';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: 0.08 * index, duration: 0.5, type: 'spring', bounce: 0.4 }}
      whileHover={{ scale: 1.08, y: -8, transition: { type: 'spring', stiffness: 300 } }}
      whileTap={{ scale: 0.95 }}
      className="glass rounded-2xl p-4 text-center cursor-pointer relative overflow-hidden group"
      style={{ perspective: '1000px' }}
    >
      <p className="font-semibold text-theme-text mb-3 text-sm md:text-base">
        {formatDay(day.datetime)}
      </p>

      <div className="relative">
        <img
          src={getWeatherIconUrl(day.icon)}
          alt={day.conditions}
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3"
        />
      </div>

      <div className="flex justify-center gap-2 text-sm md:text-base">
        <span className="font-bold text-yellow-600 dark:text-yellow-200">
          {Math.round(tempHigh)}{unitSymbol}
        </span>
        <span className="text-theme-secondary">
          {Math.round(tempLow)}{unitSymbol}
        </span>
      </div>
    </motion.div>
  );
}
