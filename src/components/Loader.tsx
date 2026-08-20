import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 800); // Wait for exit animation
        }, 500);
      }
      setProgress(Math.min(current, 100));
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-oculis-navy text-oculis-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Minimal Iris Animation */}
            <div className="relative h-24 w-24 mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-oculis-cyan/20 border-t-oculis-cyan/80"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border border-oculis-blue/20 border-b-oculis-blue/80"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-10 rounded-full bg-oculis-cyan/30 blur-sm"
              />
            </div>
            
            <div className="font-serif text-5xl tracking-wide font-light mb-4 text-oculis-white">
              {Math.floor(progress)}%
            </div>
            
            <div className="text-sm uppercase tracking-[0.2em] text-oculis-silver animate-pulse">
              Focusing your experience
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
