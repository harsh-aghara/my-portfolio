"use client";

import { useEffect, useRef } from "react";

export default function PeekingTux() {
  const leftEyeRef = useRef<SVGCircleElement>(null);
  const rightEyeRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const moveEye = (eye: SVGCircleElement | null, r: number) => {
        if (!eye) return;
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const dist = Math.min(r, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 40);
        
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        
        eye.style.transform = `translate(${x}px, ${y}px)`;
      };

      moveEye(leftEyeRef.current, 6);
      moveEye(rightEyeRef.current, 6);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 z-50 pointer-events-none">
      <svg
        width="216"
        height="162"
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
        aria-label="Peeking Linux Penguin"
        role="img"
      >
        {/* Head/Body */}
        <path d="M 40 180 C 30 60, 80 15, 120 15 C 160 15, 210 60, 200 180 Z" fill="#111" stroke="#222" strokeWidth="3" />
        
        {/* White Face/Cheeks */}
        <path d="M 70 180 C 70 90, 90 70, 120 70 C 150 70, 170 90, 170 180 Z" fill="#EEEEF0" />
        <path d="M 60 115 C 45 60, 120 50, 120 95 C 120 50, 195 60, 180 115 Z" fill="#EEEEF0" />

        {/* Big Cute Eyes */}
        <ellipse cx="96" cy="85" rx="14" ry="22" fill="#FFFFFF" stroke="#111" strokeWidth="2" />
        <ellipse cx="144" cy="85" rx="14" ry="22" fill="#FFFFFF" stroke="#111" strokeWidth="2" />

        {/* Pupils */}
        <circle ref={leftEyeRef} cx="96" cy="85" r="7" fill="#111" />
        <circle ref={rightEyeRef} cx="144" cy="85" r="7" fill="#111" />

        {/* Beak */}
        <path d="M 98 108 Q 120 95 142 108 Q 120 130 98 108 Z" fill="#FFA116" stroke="#D29922" strokeLinejoin="round" strokeWidth="3" />
        
        {/* Feet (Orange/Yellow) holding the edge */}
        <path d="M 15 170 C 15 140, 75 140, 75 170 Z" fill="#FFA116" stroke="#D29922" strokeWidth="2" />
        {/* Webbed lines for left foot */}
        <path d="M 35 155 L 35 170 M 55 155 L 55 170" stroke="#D29922" strokeWidth="2" strokeLinecap="round" />

        <path d="M 165 170 C 165 140, 225 140, 225 170 Z" fill="#FFA116" stroke="#D29922" strokeWidth="2" />
        {/* Webbed lines for right foot */}
        <path d="M 185 155 L 185 170 M 205 155 L 205 170" stroke="#D29922" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
