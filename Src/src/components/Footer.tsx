import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Twitter, Linkedin, Mail, Heart, Cloud } from 'lucide-react';

export function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-purple-300' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-300' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-cyan-300' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:text-yellow-300' },
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
      className="mt-12 glass-strong rounded-3xl p-8 relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className="relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Cloud className="w-8 h-8 text-yellow-300" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">Weather Forecast</h3>
            </div>
            <p className="text-white/70 text-sm">
              Your trusted source for accurate weather forecasts and real-time updates.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-yellow-300 transition-colors inline-block"
                  >
                    <motion.span whileHover={{ x: 5 }}>
                      {link.title}
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
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
                    transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 glass rounded-full flex items-center justify-center text-white/70 ${social.color} transition-colors relative overflow-hidden group`}
                  >
                    <Icon className="w-5 h-5 relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70"
        >
          <p className="flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-400 animate-pulse" /> by Weather Team
          </p>
          <p>© 2026 Weather Forecast. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
