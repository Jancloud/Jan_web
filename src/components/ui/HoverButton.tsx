import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface HoverButtonProps {
  href: string;
  children: ReactNode;
}

export default function HoverButton({ href, children }: HoverButtonProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02, y: -1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-full bg-surface px-5 py-3 text-sm transition-all duration-200 hover:bg-[#F3F4F6] hover:text-accent hover:shadow-[0_6px_16px_rgba(26,26,26,0.07)]"
    >
      {children}
    </motion.a>
  );
}
