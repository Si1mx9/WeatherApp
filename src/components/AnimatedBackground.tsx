import { motion, useScroll, useTransform, type Easing } from 'framer-motion';

const easing: Easing = 'easeInOut';
const linear: Easing = 'linear';

const orbs = [
  {
    animate: { scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15], x: [0, 100, 0], y: [0, -50, 0] },
    transition: { duration: 12, repeat: Infinity, ease: easing },
    className: 'absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-3xl',
    style: { backgroundColor: 'var(--orb-1)' },
  },
  {
    animate: { scale: [1.2, 1, 1.2], opacity: [0.2, 0.35, 0.2], x: [0, -80, 0], y: [0, 60, 0] },
    transition: { duration: 15, repeat: Infinity, ease: easing },
    className: 'absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full blur-3xl',
    style: { backgroundColor: 'var(--orb-2)' },
  },
  {
    animate: { scale: [1, 1.4, 1], opacity: [0.12, 0.25, 0.12], rotate: [0, 180, 360] },
    transition: { duration: 20, repeat: Infinity, ease: linear },
    className: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl',
    style: { backgroundColor: 'var(--orb-3)' },
  },
];

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden pointer-events-none will-change-transform"
      style={{ y: backgroundY }}
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={orb.animate}
          transition={orb.transition}
          className={orb.className}
          style={orb.style}
        />
      ))}
    </motion.div>
  );
}
