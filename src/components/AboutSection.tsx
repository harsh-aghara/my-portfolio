import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Code, Award } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="px-6 lg:px-14 relative z-10 max-w-7xl mx-auto space-y-16 py-20">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-cyan font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
          <GraduationCap size={14} />
          Education & Background
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Academic <span className="text-t3 italic font-serif">Foundation.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8 text-lg text-t1 leading-relaxed font-light">
          <p>
            I am a 2nd-year B.Tech student in Computer Science & Engineering at <span className="text-white font-medium">Indian Institute of Information Technology, Pune (IIIT Pune)</span>. My academic journey is driven by a fascination with high-performance systems and the invisible infrastructure that powers modern applications.
          </p>
          <p>
            With a <span className="text-white font-medium">CGPA of 8.73</span> and a foundation built on competitive excellence (98.9 percentile in JEE Main), I focus on building resilient backend architectures that solve real-world engineering constraints.
          </p>
          <div className="p-6 rounded-2xl bg-cyan/5 border border-cyan/10 text-sm italic text-cyan/80 leading-relaxed">
            "I prioritize first-principles engineering over generic solutions, focusing on how systems handle failure modes under extreme concurrent load."
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan/20 to-cyan/10 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative bg-[#12121a] border border-white/10 rounded-[2rem] p-8 md:p-10 space-y-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-cyan">
                  <GraduationCap size={24} />
               </div>
               <div>
                 <div className="text-[10px] text-t3 uppercase tracking-widest font-mono font-bold">Institution</div>
                 <div className="text-white font-bold text-lg leading-tight">IIIT Pune</div>
                 <div className="text-[11px] text-t2 font-medium">B.Tech in CSE (2024 – 2028)</div>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { label: 'CGPA', val: '8.73 / 10.0', icon: <Award size={14}/> },
                { label: 'JEE Main', val: '98.9 Percentile', icon: <TargetIcon /> },
                { label: 'Location', val: 'Pune, Maharashtra', icon: <MapPin size={14}/> },
                { label: 'Focus', val: 'Systems & Infrastructure', icon: <Code size={14}/> },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between group/item">
                  <div className="flex items-center gap-3 text-t3 group-hover/item:text-cyan transition-colors">
                    {item.icon}
                    <span className="text-[10px] uppercase tracking-widest font-mono font-bold">{item.label}</span>
                  </div>
                  <span className="text-white font-medium text-sm">{item.val}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5">
               <div className="flex justify-between items-end mb-4">
                  <div className="text-[10px] text-t3 uppercase tracking-widest font-mono font-bold">Academic Standing</div>
                  <div className="text-xl font-bold text-white tracking-tight">Top Percentile</div>
               </div>
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '98.9%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-cyan" 
                  />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TargetIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

export default AboutSection;