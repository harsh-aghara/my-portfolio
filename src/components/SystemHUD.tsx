import React, { useEffect, useState } from 'react';

const logs = [
  "[INFO] Initialize core_kernel...",
  "[OK] Memory allocation stable",
  "[SYS] Buffer optimized (0.02ms)",
  "[DEBUG] Cache hit ratio: 98.2%",
  "[INFO] Socket connection: established",
  "[SEC] RSA-4096 handshake verified",
  "[SYS] P95 latency within threshold",
  "[OK] Distributed lock acquired",
  "[INFO] Scraping metrics node_01",
  "[DEBUG] Redis Lua script executed",
  "[SYS] Background sync: complete",
  "[INFO] Telemetry stream: active",
  "[OK] Health check: 200 OK",
  "[WARN] High traffic detected (yoink!)",
  "[INFO] Auto-scaling nodes...",
  "[OK] Instances balanced",
];

const SystemHUD: React.FC = () => {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex(prev => (prev + 1) % logs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Left Edge Log Stream - Kept for vertical fill without clutter */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 h-[60vh] w-32 hidden xl:flex flex-col justify-end pointer-events-none z-[500] overflow-hidden">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 12 }).map((_, i) => {
            const index = (logIndex + i) % logs.length;
            return (
              <div 
                key={i} 
                className="text-[9px] font-mono text-t3 uppercase tracking-tighter transition-opacity duration-1000"
                style={{ opacity: (i + 1) / 12 * 0.3 }}
              >
                {logs[index]}
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-[10px] font-mono text-blue font-bold tracking-[0.2em] [writing-mode:vertical-lr] self-start opacity-40">
          TELEMETRY_FEED
        </div>
      </div>
    </>
  );
};

export default SystemHUD;
