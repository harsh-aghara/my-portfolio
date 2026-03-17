export interface Skill {
  name: string;
  category: 'Backend' | 'Frontend' | 'Database' | 'DevOps & Infra' | 'Languages' | 'Tools';
}

export const skills: Skill[] = [
  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
  
  // Databases
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Redis', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },

  // DevOps & Infra
  { name: 'Docker', category: 'DevOps & Infra' },
  { name: 'Prometheus', category: 'DevOps & Infra' },
  { name: 'Grafana', category: 'DevOps & Infra' },
  { name: 'k6', category: 'DevOps & Infra' },
  { name: 'BullMQ', category: 'DevOps & Infra' },

  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },

  // Languages
  { name: 'JavaScript', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'C', category: 'Languages' },
  { name: 'C++', category: 'Languages' },
  { name: 'Python', category: 'Languages' },

  // Tools
  { name: 'Git', category: 'Tools' },
  { name: 'Linux', category: 'Tools' },
];
