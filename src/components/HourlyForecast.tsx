import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock } from 'lucide-react';
import type { HourlyForecast } from '../types/weather';
import { getWeatherIconUrl } from '../services/weatherApi';

interface HourlyForecastProps {
  hourly: HourlyForecast[];
  convertTemperature: (c: number) => number;
  getUnitSymbol: () => string;
}

function formatHour(datetime: string, index: number): string {
  if (index === 0) return 'Now';
  const hour = parseInt(datetime.split(':')[0], 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 || 12;
  return `${h12}${ampm}`;
}

export function HourlyForecast({ hourly, convertTemperature, getUnitSymbol }: HourlyForecastProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!hourly.length) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="glass-strong rounded-2xl md:rounded-3xl p-4 md:p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-6 h-6 md:w-8 md:h-8 text-amber-500 dark:text-amber-300" />
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-text">Hourly Forecast</h3>
      </div>

      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex gap-3 min-w-max">
          {hourly.map((hour, index) => (
            <motion.div
              key={hour.datetime}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.03 * index, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass rounded-xl p-3 flex flex-col items-center gap-2 min-w-[80px] cursor-pointer relative overflow-hidden group"
            >
              <p className="text-xs text-theme-secondary font-medium">{formatHour(hour.datetime, index)}</p>
              <img
                src={getWeatherIconUrl(hour.icon)}
                alt={hour.conditions}
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <p className="text-sm font-bold text-theme-text">
                {Math.round(convertTemperature(hour.temp))}{getUnitSymbol()}
              </p>
              {hour.precipprob > 0 && (
                <p className="text-[10px] text-blue-500 dark:text-blue-300">{hour.precipprob}%</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
