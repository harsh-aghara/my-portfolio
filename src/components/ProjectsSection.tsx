import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { Github, Activity, Layers, ChevronRight } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="px-6 lg:px-14 relative z-10 max-w-7xl mx-auto space-y-16 py-20">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-cyan font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
          <Layers size={14} />
          Selected Works
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Featured <span className="text-t3 italic font-serif">Projects.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative grid grid-cols-1 lg:grid-cols-12 bg-white/[0.01] border border-white/10 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.03] hover:border-cyan/30 transition-all duration-500 shadow-2xl"
          >
            <div className="lg:col-span-8 p-8 md:p-12 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{project.name}</h3>
                  <div className="px-3 py-1 rounded-full border border-cyan/20 bg-cyan/5 text-cyan text-[10px] font-bold uppercase tracking-wider">
                    {project.name === 'Yoink!' ? 'Iterative Engineering' : 'Stable'}
                  </div>
                </div>
                <div className="text-cyan font-mono text-xs uppercase tracking-widest font-bold">
                  {project.subtitle}
                </div>
                <p className="text-t1 text-lg leading-relaxed max-w-[650px] font-light">
                  {project.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full text-t2 text-[10px] font-bold uppercase tracking-widest group-hover:text-cyan group-hover:border-cyan/20 transition-all">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 pt-4">
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-6 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 group/link"
                >
                  <Github size={18} />
                  View Source
                  <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/10 p-8 md:p-12 flex flex-col justify-center gap-8 relative overflow-hidden group-hover:bg-cyan/[0.02] transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity size={120} className="text-cyan" />
              </div>
              
              <div className="space-y-1 relative z-10">
                <div className="text-[10px] text-t3 uppercase tracking-[0.2em] font-mono font-bold mb-8 flex items-center gap-2">
                  <Activity size={14} className="text-cyan" />
                  Engineering Metrics
                </div>
                <div className="space-y-8">
                  {project.metrics.map(metric => (
                    <div key={metric.label} className="space-y-1">
                      <div className="text-3xl font-bold text-white tracking-tighter leading-none">{metric.val}</div>
                      <div className="text-[10px] text-t3 uppercase tracking-widest font-mono font-bold">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;