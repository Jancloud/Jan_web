import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

export default function MotionReveal({
  children,
  className = '',
  delay = 0,
  distance = 14
}: MotionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
