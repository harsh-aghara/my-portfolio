import React from 'react';
import { archNodes } from '../data/archNodes';
import { motion } from 'framer-motion';

const ArchDiagram: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl mx-auto px-4">
        {archNodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <div className="group relative flex flex-col items-center gap-4">
              {/* Tooltip */}
              <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-48 bg-zinc-900 border border-white/10 p-4 rounded-2xl text-[11px] leading-relaxed text-t1 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-2xl">
                <div className="text-white font-bold mb-1 uppercase tracking-wider">{node.name}</div>
                {node.tooltip}
              </div>

              {/* Node Box */}
              <div className="w-full aspect-square bg-white/[0.02] border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all group-hover:-translate-y-1 group-hover:border-blue/50 shadow-xl group-hover:bg-white/[0.04]">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                  className={`w-2 h-2 rounded-full mb-1 ${node.dotColor === 'green' ? 'bg-green' : 'bg-blue'}`} 
                />
                <div className="text-sm font-bold text-white tracking-tight">{node.name}</div>
                <div className="text-[10px] text-t2 font-medium uppercase tracking-widest">{node.sub}</div>
              </div>

              {/* Label */}
              <div className="text-[10px] text-t2 font-mono uppercase tracking-[0.2em] text-center h-4 font-bold">
                {node.label}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      
      {/* Background Grid for the diagram area */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
    </div>
  );
};

export default ArchDiagram;