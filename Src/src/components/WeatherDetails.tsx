import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Droplets, Wind, Gauge, Eye } from 'lucide-react';
import type { CurrentWeather } from '../types/weather';

interface WeatherDetailsProps {
  weather: CurrentWeather;
}

import type { Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
    }
  },
};

export function WeatherDetails({ weather }: WeatherDetailsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const details = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${weather.humidity}%`,
      color: 'from-blue-400 to-cyan-400',
      iconColor: 'text-cyan-300',
      bgGlow: 'bg-cyan-500/20',
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${Math.round(weather.windspeed)} km/h`,
      color: 'from-teal-400 to-emerald-400',
      iconColor: 'text-emerald-300',
      bgGlow: 'bg-emerald-500/20',
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${Math.round(weather.pressure)} mb`,
      color: 'from-purple-400 to-pink-400',
      iconColor: 'text-pink-300',
      bgGlow: 'bg-pink-500/20',
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${weather.visibility} km`,
      color: 'from-amber-400 to-orange-400',
      iconColor: 'text-orange-300',
      bgGlow: 'bg-orange-500/20',
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
            whileHover={{ 
              scale: 1.08, 
              y: -8,
              transition: { type: 'spring', stiffness: 300 }
            }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer relative overflow-hidden group"
          >
            {/* Animated background glow */}
            <motion.div
              className={`absolute inset-0 ${detail.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            
            {/* Icon with rotation on hover */}
            <motion.div
              className={`${detail.iconColor} relative z-10`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-10 h-10" />
            </motion.div>
            
            {/* Content */}
            <div className="text-center relative z-10">
              <p className="text-xs text-white/70 mb-1 uppercase tracking-wider">{detail.label}</p>
              <motion.p 
                className={`text-lg md:text-xl font-bold bg-gradient-to-r ${detail.color} bg-clip-text text-transparent`}
                whileHover={{ scale: 1.1 }}
              >
                {detail.value}
              </motion.p>
            </div>

            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
