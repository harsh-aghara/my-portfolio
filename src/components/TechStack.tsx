"use client";

import { motion } from "motion/react";
import { Queue } from "@phosphor-icons/react/dist/ssr";

const stack = [
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Redis", slug: "redis" },
  { name: "BullMQ", slug: "bullmq" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Docker", slug: "docker" },
  { name: "Prometheus", slug: "prometheus" },
  { name: "Grafana", slug: "grafana" },
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "Linux", slug: "linux" },
  { name: "Hyprland", slug: "hyprland" },
  { name: "C++", slug: "cplusplus" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Python", slug: "python" }
];

export default function TechStack() {
  return (
    <div className="w-full overflow-hidden border-y border-border-default bg-bg-elevated/30 py-8 relative">
      <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-bg-primary to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-bg-primary to-transparent" />
      
      <div className="flex">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
          className="flex w-max items-center"
        >
          {/* We use 2 identical blocks to achieve a perfect 50% translation loop */}
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex items-center gap-8 px-4">
              {stack.map((tech, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-3.5 rounded-full border border-border-default bg-bg-surface px-6 py-2.5 transition-colors hover:border-accent hover:text-accent font-mono text-[15px] text-text-secondary whitespace-nowrap"
                >
                  {tech.slug === "bullmq" ? (
                    <Queue weight="duotone" size={20} className="text-accent opacity-80 group-hover:opacity-100 transition-opacity shrink-0" />
                  ) : (
                    <img 
                      src={`https://cdn.simpleicons.org/${tech.slug}${tech.slug === 'nextdotjs' ? '/white' : ''}`} 
                      alt={tech.name}
                      className="h-5 w-5 opacity-80 transition-opacity hover:opacity-100 shrink-0"
                    />
                  )}
                  <span className="leading-relaxed mb-[2px]">{tech.name}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
