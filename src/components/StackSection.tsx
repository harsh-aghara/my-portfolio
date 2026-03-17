import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Cloud, Terminal, Code2, Layers, Binary } from 'lucide-react';
import { skills } from '../data/skills';

const StackSection: React.FC = () => {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  const getIcon = (cat: string) => {
    switch(cat) {
      case 'Backend': return <Code2 size={20} />;
      case 'Database': return <Database size={20} />;
      case 'DevOps & Infra': return <Cloud size={20} />;
      case 'Frontend': return <Layers size={20} />;
      case 'Languages': return <Binary size={20} />;
      case 'Tools': return <Terminal size={20} />;
      default: return <Cpu size={20} />;
    }
  };

  return (
    <section id="stack" className="px-6 lg:px-14 relative z-10 max-w-7xl mx-auto space-y-16 py-20">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-cyan font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
          <Cpu size={14} />
          Technical Stack
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          The <span className="text-t3 italic font-serif">Engine Room.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div 
            key={cat} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-cyan/20 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-t3 group-hover:text-cyan transition-colors">
                  {getIcon(cat)}
               </div>
               <div className="text-[10px] text-t3 uppercase tracking-[0.2em] font-mono font-bold">
                 {cat}
               </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {skills.filter(s => s.category === cat).map((skill, j) => (
                <div key={skill.name} className="flex items-center justify-between group/tool">
                  <span className="text-t1 text-sm font-medium tracking-tight group-hover/tool:text-white transition-colors">{skill.name}</span>
                  <div className="h-px flex-1 mx-4 bg-white/5 group-hover/tool:bg-cyan/10 transition-colors" />
                  <div className="w-1.5 h-1.5 rounded-full bg-t3 group-hover/tool:bg-cyan transition-colors" />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StackSection;