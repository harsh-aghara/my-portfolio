import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bootLines } from '../data/bootLines';

interface Props {
  onComplete: () => void;
}

const Boot: React.FC<Props> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect to follow the text
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  useEffect(() => {
    const skip = () => onComplete();
    window.addEventListener('keydown', (e) => e.key === 'Escape' && skip());
    window.addEventListener('click', skip);

    // Shortened to ~2 seconds total (approx 100ms per line for 20 lines)
    if (visibleLines < bootLines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 80); 
      return () => {
        clearTimeout(timeout);
        window.removeEventListener('keydown', skip);
        window.removeEventListener('click', skip);
      };
    } else {
      const finalTimeout = setTimeout(onComplete, 400);
      return () => clearTimeout(finalTimeout);
    }
  }, [visibleLines, onComplete]);

  const progress = (visibleLines / bootLines.length) * 100;

  return (
    <div className="fixed inset-0 bg-bg z-[1000] flex flex-col items-center justify-center font-mono p-6 cursor-pointer overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-t0 text-5xl font-bold mb-12 tracking-tight"
      >
        Harsh.
      </motion.h1>

      <div className="w-full max-w-2xl bg-bg1 border border-white/[0.07] p-6 rounded-lg shadow-2xl relative">
        <div 
          ref={logContainerRef}
          className="h-64 overflow-y-auto mb-6 text-[13px] leading-relaxed scroll-smooth pr-2 no-scrollbar"
        >
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-t3 shrink-0">{new Date().toLocaleTimeString()}</span>
              <span className={`
                ${line.cls === 'dim' ? 'text-t2' : ''}
                ${line.cls === 'ok' ? 'text-green' : ''}
                ${line.cls === 'warn' ? 'text-amber' : ''}
              `}>
                {line.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-1 bg-bg3 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green shadow-[0_0_8px_#22c55e]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <span className="text-green text-xs min-w-[3rem] text-right">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 text-t3 text-[10px] uppercase tracking-widest font-mono animate-pulse">
        Press ESC or Click to skip
      </div>
    </div>
  );
};

export default Boot;
