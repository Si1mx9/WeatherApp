import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles } from 'lucide-react';
import type { CurrentWeather } from '../types/weather';
import { getWeatherIconUrl } from '../services/weatherApi';

interface CurrentWeatherProps {
  weather: CurrentWeather;
  locationName: string;
  temperature: number;
  feelsLike: number;
  unitSymbol: string;
}

export function CurrentWeatherDisplay({ 
  weather, 
  locationName, 
  temperature, 
  feelsLike, 
  unitSymbol 
}: CurrentWeatherProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="glass-strong rounded-3xl p-8 mb-6 relative overflow-hidden group"
    >
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating particles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"
      />

      {/* Location Info with sparkle icon */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="mb-6 relative z-10"
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold text-white text-shadow">
            {locationName}
          </h2>
        </div>
        <p className="text-white/80 text-sm md:text-base">{formatDate()}</p>
      </motion.div>

      {/* Main Weather Display */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6 relative z-10">
        {/* Temperature with glow effect */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.4, type: 'spring', bounce: 0.5 }}
          className="flex items-start relative"
        >
          <motion.span 
            className="text-7xl md:text-8xl font-bold gradient-text relative"
            whileHover={{ scale: 1.05 }}
          >
            {Math.round(temperature)}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 blur-2xl bg-gradient-to-r from-yellow-400 to-red-500 -z-10"
            />
          </motion.span>
          <span className="text-3xl md:text-4xl font-semibold text-white/90 mt-2">
            {unitSymbol}
          </span>
        </motion.div>

        {/* Weather Icon with interactive animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.6, type: 'spring' }}
          className="w-32 h-32 md:w-40 md:h-40 relative"
        >
          <motion.img
            src={getWeatherIconUrl(weather.icon)}
            alt={weather.conditions}
            className="w-full h-full object-contain drop-shadow-2xl cursor-pointer"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            whileHover={{ 
              scale: 1.2, 
              rotate: 360,
              transition: { duration: 0.6 }
            }}
          />
          {/* Glow effect behind icon */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full blur-2xl -z-10"
          />
        </motion.div>
      </div>

      {/* Weather Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="space-y-2 relative z-10"
      >
        <p className="text-xl md:text-2xl font-semibold text-white capitalize">
          {weather.conditions}
        </p>
        <motion.p 
          className="text-white/80"
          whileHover={{ x: 5 }}
        >
          Feels like <span className="font-semibold text-yellow-200">{Math.round(feelsLike)}{unitSymbol}</span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
