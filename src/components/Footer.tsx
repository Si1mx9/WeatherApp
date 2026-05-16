import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Twitter, Linkedin, Mail, Heart, Cloud } from 'lucide-react';

export function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const footerLinks = [
    { title: 'About', href: '#' },
    { title: 'Privacy', href: '#' },
    { title: 'Terms', href: '#' },
    { title: 'Contact', href: '#' },
  ];

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="mt-12 glass-strong rounded-3xl p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Cloud className="w-8 h-8 text-yellow-500 dark:text-yellow-300" />
            <h3 className="text-2xl font-bold text-theme-text">Weather Forecast</h3>
          </div>
          <p className="text-theme-secondary text-sm">
            Your trusted source for accurate weather forecasts and real-time updates.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-lg font-semibold text-theme-text mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {footerLinks.map((link, index) => (
              <motion.li
                key={link.title}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + index * 0.08 }}
              >
                <a
                  href={link.href}
                  className="text-theme-secondary hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors inline-block"
                >
                  {link.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-lg font-semibold text-theme-text mb-4">Follow Us</h4>
          <div className="flex gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.45 + index * 0.08, type: 'spring' }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 glass rounded-full flex items-center justify-center text-theme-secondary hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-theme-secondary"
      >
        <p className="flex items-center gap-2">
          Made with <Heart className="w-4 h-4 text-red-500 dark:text-red-400" /> by Weather Team
        </p>
        <p>&copy; 2026 Weather Forecast. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  );
}
