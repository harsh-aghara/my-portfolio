export interface ProjectDisplay {
  name: string;
  hook: string;
  metricValue: string;
  metricLabel: string;
}

/** Canonical display data for all projects. Single source of truth. */
export const projectDisplay: Record<string, ProjectDisplay> = {
  yoink: {
    name: "Yoink",
    hook: "E-commerce backend that handles flash-sale inventory under 1,000+ concurrent users without overselling. Rebuilt 4 times.",
    metricValue: "7.6ms",
    metricLabel: "p95 latency",
  },
  oceanwatch: {
    name: "OceanWatch",
    hook: "Full-stack geospatial platform for reporting coastal hazards in real time, built on Next.js, Express, and PostGIS.",
    metricValue: "O(n) to sub-linear",
    metricLabel: "query improvement",
  },
  spms: {
    name: "SPMS",
    hook: "Internal tool at IIIT Pune for managing student projects. Took it to production and cut the dashboard p95 by 57%.",
    metricValue: "57%",
    metricLabel: "p95 reduction",
  },
  checkmate: {
    name: "Checkmate",
    hook: "Open-source contributor to a 10k+ star monitoring tool. Shipped bulk monitor management and custom status-code support.",
    metricValue: "10k+",
    metricLabel: "stars",
  },
  "vault-bomb": {
    name: "Vault Bomb",
    hook: "Decentralized dead-man's switch for evidence release, built on Arbitrum Stylus, Irys/Arweave, and Lit Protocol.",
    metricValue: "3 layers",
    metricLabel: "decentralized trust",
  },
};

/** Slugs to feature on the home page, in display order. */
export const featuredSlugs = ["yoink", "checkmate", "spms"] as const;
