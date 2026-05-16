import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const sponsors = [
  { name: 'WeatherTech', logo: '🌤️', description: 'Advanced Weather Solutions' },
  { name: 'CloudData', logo: '☁️', description: 'Real-time Data Analytics' },
  { name: 'MeteoSys', logo: '🌡️', description: 'Meteorological Systems' },
  { name: 'SkyWatch', logo: '🛰️', description: 'Satellite Monitoring' },
];

export function Sponsors() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="glass-strong rounded-3xl p-8"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-bold text-theme-text mb-6 text-center"
      >
        Our Sponsors
      </motion.h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 + index * 0.08 }}
            whileHover={{ scale: 1.05, y: -5, transition: { type: 'spring', stiffness: 300 } }}
            className="glass rounded-2xl p-6 text-center cursor-pointer relative overflow-hidden group"
          >
            <div className="text-5xl mb-3">{sponsor.logo}</div>
            <h4 className="font-bold text-theme-text mb-1">{sponsor.name}</h4>
            <p className="text-sm text-theme-secondary">{sponsor.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
