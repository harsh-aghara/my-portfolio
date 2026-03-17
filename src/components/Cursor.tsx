import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center mix-blend-screen"
      style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        animate={{
          width: isHovered ? 40 : 12,
          height: isHovered ? 40 : 12,
          backgroundColor: isHovered ? 'rgba(56, 189, 248, 0.1)' : 'rgba(56, 189, 248, 1)',
          border: isHovered ? '1px solid rgba(56, 189, 248, 0.8)' : '0px solid transparent',
          borderRadius: isHovered ? '50%' : '2px'
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="shadow-[0_0_15px_rgba(56,189,248,0.4)]"
      />
    </motion.div>
  );
};

export default Cursor;
