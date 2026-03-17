export interface Project {
  name: string;
  subtitle: string;
  desc: string;
  tags: string[];
  metrics: { val: string; label: string }[];
  github: string;
  deployed?: string;
  pinned?: boolean;
}

export const projects: Project[] = [
  {
    name: 'Yoink!',
    subtitle: 'High-Concurrency Flash Sale Engine',
    pinned: true,
    desc: 'A production-grade backend system handling extreme concurrent load during flash sales. Implemented Redis Lua scripting for atomic stock reservation and BullMQ for reliable job orchestration with self-healing rollbacks. Optimized through 4 architectural iterations based on Prometheus metrics and k6 load testing.',
    tags: ['Node.js', 'Redis', 'PostgreSQL', 'BullMQ', 'Prometheus', 'Grafana', 'Docker', 'k6'],
    github: 'https://github.com/harsh-aghara/Yoink',
    metrics: [
      { val: '~1459', label: 'REQ/S PEAK' },
      { val: '0%', label: 'ERROR RATE' },
      { val: '2.4ms', label: 'P95 LATENCY' },
    ],
  },
  {
    name: 'OceanWatch',
    subtitle: 'Real-Time Geospatial Ocean Monitoring Platform',
    desc: 'Geospatial web platform for monitoring ocean health. Engineered with PostGIS and GIST spatial indexing for efficient querying. Features transactional bulk deletions across 7 tables with audit logging to ensure data integrity, and an interactive Leaflet.js map interface.',
    tags: ['Next.js', 'Express.js', 'PostgreSQL', 'PostGIS', 'JWT', 'Leaflet.js'],
    github: 'https://github.com/harsh-aghara/OceanWatch',
    metrics: [
      { val: 'GIST', label: 'SPATIAL INDEX' },
      { val: 'BULK', label: 'TRANS-DELETE' },
      { val: 'PostGIS', label: 'ENGINE' },
    ],
  },
  {
    name: 'SPMS',
    subtitle: 'Internal Project Management Tool for IIIT Pune',
    desc: 'A full-stack project management system developed for internal use at IIIT Pune to manage student projects. Streamlines coordination between faculty and students with a robust management interface.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/harsh-aghara/Student-Project-Management-System-IIITP',
    metrics: [
      { val: 'IIITP', label: 'DEPLOYED' },
      { val: 'Internal', label: 'TOOL' },
      { val: 'FullStack', label: 'SYSTEM' },
    ],
  },
];
