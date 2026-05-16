import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Droplets, Wind, Gauge, Eye, Sun, Sunrise, Sunset, Thermometer } from 'lucide-react';
import type { CurrentWeather } from '../types/weather';

interface WeatherDetailsProps {
  weather: CurrentWeather;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', bounce: 0.4 },
  },
};

function getWindDirection(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

export function WeatherDetails({ weather }: WeatherDetailsProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const details = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${weather.humidity}%`,
      iconColor: 'text-cyan-600 dark:text-cyan-300',
    },
    {
      icon: Wind,
      label: 'Wind',
      value: `${Math.round(weather.windspeed)} km/h ${getWindDirection(weather.winddir)}`,
      iconColor: 'text-emerald-600 dark:text-emerald-300',
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${Math.round(weather.pressure)} mb`,
      iconColor: 'text-pink-600 dark:text-pink-300',
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${weather.visibility} km`,
      iconColor: 'text-orange-600 dark:text-orange-300',
    },
    {
      icon: Sun,
      label: 'UV Index',
      value: `${weather.uvindex}`,
      iconColor: 'text-yellow-600 dark:text-yellow-300',
    },
    {
      icon: Sunrise,
      label: 'Sunrise',
      value: weather.sunrise,
      iconColor: 'text-orange-600 dark:text-orange-300',
    },
    {
      icon: Sunset,
      label: 'Sunset',
      value: weather.sunset,
      iconColor: 'text-pink-600 dark:text-pink-300',
    },
    {
      icon: Thermometer,
      label: 'Precip. Prob.',
      value: `${weather.precipprob}%`,
      iconColor: 'text-sky-600 dark:text-sky-300',
    },
  ];

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
    >
      {details.map((detail, index) => {
        const Icon = detail.icon;
        return (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.05, y: -4, transition: { type: 'spring', stiffness: 300 } }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer relative overflow-hidden group"
          >
            <div className={`${detail.iconColor} relative z-10`}>
              <Icon className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div className="text-center relative z-10">
              <p className="text-xs text-theme-secondary mb-1 uppercase tracking-wider">{detail.label}</p>
              <p className="text-base md:text-lg font-bold text-theme-text">{detail.value}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
