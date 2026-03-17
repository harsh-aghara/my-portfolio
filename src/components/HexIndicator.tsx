import React, { useState, useEffect } from 'react';

const HexIndicator: React.FC = () => {
  const [scrollPerc, setScrollPerc] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPerc(height > 0 ? scrolled / height : 0);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hexVal = Math.round(scrollPerc * 255).toString(16).toUpperCase().padStart(2, '0');

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-[600] pointer-events-none">
      <div className="text-[10px] font-mono text-t2 uppercase tracking-[0.2em] [writing-mode:vertical-lr] opacity-80">
        MEM_ADDR_BUS
      </div>
      <div className="h-40 w-px bg-white/[0.15] relative">
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue rounded-full shadow-[0_0_12px_#3b82f6]"
          style={{ top: `${scrollPerc * 100}%` }}
        />
      </div>
      <div className="text-blue font-mono text-[13px] font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
        0x{hexVal}
      </div>
    </div>
  );
};

export default HexIndicator;
