"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

interface AnimatedCounterProps {
  from: number;
  to: number;
  delay?: number;
}

export default function AnimatedCounter({ from, to, delay = 0 }: AnimatedCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const spring = useSpring(from, {
    mass: 1,
    stiffness: 75,
    damping: 15,
  });
  
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    const timer = setTimeout(() => {
      spring.set(to);
      setHasAnimated(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [spring, to, delay]);

  return <motion.span>{display}</motion.span>;
}
