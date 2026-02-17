import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formsubmit.co/ajax/issaadiseifelislammahfoud@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'New Weather App Contact Form Submission',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="glass-strong rounded-3xl p-8 relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/10 to-red-500/10"
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
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-white mb-2"
        >
          Get in Touch
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-white/80 mb-6"
        >
          Have questions or feedback? We'd love to hear from you!
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-300" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>
          </motion.div>

          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-300" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>
          </motion.div>

          {/* Message Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-yellow-300" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={4}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-yellow-400 transition-all resize-none"
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 relative overflow-hidden group"
          >
            <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </span>
            <Send className="w-5 h-5 relative z-10" />
          </motion.button>

          {/* Status Messages */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-300 bg-green-500/20 p-3 rounded-xl"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Message sent successfully!</span>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-300 bg-red-500/20 p-3 rounded-xl"
            >
              <AlertCircle className="w-5 h-5" />
              <span>Failed to send message. Please try again.</span>
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
}
