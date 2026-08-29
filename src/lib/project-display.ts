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
    hook: "Flash-sale engine rebuilt 4 times to kill race conditions under 1,000+ concurrent users.",
    metricValue: "7.6ms",
    metricLabel: "p95 latency",
  },
  oceanwatch: {
    name: "OceanWatch",
    hook: "Replaced full-table scans with GIST-indexed PostGIS queries as report volume scaled.",
    metricValue: "O(n) to sub-linear",
    metricLabel: "query improvement",
  },
  spms: {
    name: "SPMS",
    hook: "Cut a production dashboard's p95 latency 57% by parallelizing 20+ sequential queries.",
    metricValue: "57%",
    metricLabel: "p95 reduction",
  },
  checkmate: {
    name: "Checkmate",
    hook: "Two merged PRs on a 10k+ star monitoring tool: job-queue sync and status-resolution edge cases.",
    metricValue: "10k+",
    metricLabel: "stars",
  },
};

/** Slugs to feature on the home page, in display order. */
export const featuredSlugs = ["yoink", "checkmate", "spms"] as const;
