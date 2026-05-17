"use client";

import { motion } from 'framer-motion';

export function CelebrationBurst() {
  const particles = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
      {particles.map((_, i) => {
        const angle = (i * 360) / particles.length;
        const x = Math.cos((angle * Math.PI) / 180) * 80;
        const y = Math.sin((angle * Math.PI) / 180) * 80;
        return (
          <motion.div
            key={i} className="absolute w-2 h-2 rounded-full bg-[#3730a3]"
            initial={{ scale: 0.2, opacity: 1, x: 0, y: 0 }}
            animate={{ scale: [0.2, 1, 0], opacity: [1, 0.8, 0], x, y }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}
