import React from 'react';
import ArchDiagram from './ArchDiagram';
import { Activity, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const MetricsSection: React.FC = () => {
  return (
    <section id="metrics" className="px-6 lg:px-14 relative z-10 max-w-7xl mx-auto space-y-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
            <Activity size={14} />
            Performance & Reliability
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Engineering for <br />
            <span className="text-t2">High Availability.</span>
          </h2>
        </div>
        <p className="text-t1 max-w-[400px] text-lg leading-relaxed">
          Measuring success through system throughput, low latency, and consistent uptime across distributed nodes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Peak Load Handling', val: '1,459 req/s', sub: 'Yoink! Flash-sale engine', icon: <Zap size={20} className="text-amber-400"/> },
          { label: 'Academic Excellence', val: '98.9 %ile', sub: 'JEE Main Rank', icon: <BarChart3 size={20} className="text-blue"/> },
          { label: 'Technical Proficiency', val: '8.73 / 10', sub: 'CGPA @ IIIT Pune', icon: <ShieldCheck size={20} className="text-green"/> },
          { label: 'Infrastructure', val: 'Dist-KV', status: 'Optimal', icon: <Activity size={20} className="text-purple-400"/> }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 hover:bg-white/[0.04] transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-t2 group-hover:text-white transition-colors">
              {stat.icon}
            </div>
            <div>
              <div className="text-[10px] text-t2 uppercase tracking-widest font-mono mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-white tracking-tight">{stat.val}</div>
              <div className="text-[11px] text-t2 mt-1">{stat.sub || stat.status}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] overflow-hidden group">
        <div className="absolute inset-0 bg-blue/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="relative bg-zinc-950 rounded-[1.8rem] p-8 md:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-6 relative z-10">
              <h3 className="text-2xl font-bold text-white tracking-tight">System Architecture</h3>
              <p className="text-t1 text-sm leading-relaxed">
                Visualization of a high-performance distributed KV cluster optimized for sub-millisecond lookups and high write availability.
              </p>
              <div className="space-y-3">
                {[
                  "Multi-node consistency",
                  "Auto-scaling compute",
                  "Layer-7 load balancing",
                  "Prometheus observability"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-t2">
                    <div className="w-1 h-1 rounded-full bg-blue" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8 relative aspect-video md:aspect-auto h-[400px] bg-black/40 rounded-2xl border border-white/5 overflow-hidden">
               <ArchDiagram />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;