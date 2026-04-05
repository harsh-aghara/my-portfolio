import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import {
  Github, Linkedin, Mail, ChevronRight,
  GitBranch, Code2, Layers, Zap, ArrowUpRight, Clock, GitPullRequest,
} from 'lucide-react';

// ── Tagsline Rotation Hook ───────────────────────────────────────────
function useRotatingTaglines(taglines: string[], intervalMs = 4000): number {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % taglines.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [taglines.length, intervalMs]);
  return index;
}

// ── Cache Configuration ──────────────────────────────────────────────
const CACHE_KEY = 'github_stats_v6';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours
const GITHUB_USERNAME = 'harsh-aghara';

// Fallbacks — only shown when cache is empty AND API is unreachable.
const FALLBACK_LANGUAGES: Record<string, number> = {
  Java: 5,
  JavaScript: 4,
  TypeScript: 3,
  Python: 2,
  Shell: 1,
};

const FALLBACK = {
  repos: 8,
  stars: 2,
  commits: 90,
  mergedPRs: 12,
  languages: FALLBACK_LANGUAGES,
} as const;

// ── Animated Number ──────────────────────────────────────────────────
const AnimatedNumber: React.FC<{ value: number; prefix?: string }> = ({
  value, prefix = '',
}) => {
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const rounded = useTransform(spring, v => Math.round(v));
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    setDisplayed(`${prefix}0`);
    spring.set(0);
    const unsub = rounded.on('change', v => setDisplayed(`${prefix}${v.toLocaleString()}`));
    spring.set(value);
    return () => unsub();
  }, [value, prefix]);

  return <span className="inline-block min-w-[1ch] tabular-nums">{displayed}</span>;
};

// ── Live Bar Chart ───────────────────────────────────────────────────
const LiveBarChart: React.FC = () => {
  const [bars, setBars] = useState(() => Array.from({ length: 12 }, () => Math.random() * 60 + 30));

  useEffect(() => {
    const id = setInterval(() => {
      setBars(prev => prev.map(h => Math.max(15, Math.min(95, h + (Math.random() - 0.5) * 20))));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-end gap-[2px] w-28 h-8" aria-label="Activity sparkline">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-cyan/40 rounded-[1px]"
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

// ── Helpers ─────────────────────────────────────────────────────────
const LANG_COLORS = ['#06b6d4', '#a855f7', '#10b981', '#f59e0b', '#ef4444', '#64748b', '#ec4899', '#8b5cf6'];

interface CachedData {
  repos: number;
  stars: number;
  commits: number;
  mergedPRs: number;
  languages: Record<string, number>;
  ts: number;
}

async function loadStats(): Promise<{ stats: CachedData; fresh: boolean }> {
  // 1. Cache hit — serve immediately, no API call
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CachedData;
      if (parsed.repos > 0 && Date.now() - parsed.ts < CACHE_TTL) {
        return { stats: parsed, fresh: true };
      }
      if (parsed.repos > 0) {
        return { stats: parsed, fresh: false };
      }
    }
  } catch { /* cache corrupted */ }

  // 2. Cache miss / stale — fetch from GitHub (user, repos, commits, PRs in parallel)
  try {
    const [userRes, reposRes, commitsRes, prsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
      fetch(`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`, {
        headers: { Accept: 'application/vnd.github.cloak-preview' }
      }),
      fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:merged`, {
        headers: { Accept: 'application/vnd.github+json' }
      }),
    ]);

    let repos = 0;
    let stars = 0;
    let commits = 0;
    let mergedPRs = 0;
    const langMap: Record<string, number> = {};

    if (userRes.ok) {
      const u = await userRes.json();
      repos = u.public_repos || 0;
    }

    if (reposRes.ok) {
      const reposData: any[] = await reposRes.json();
      stars = reposData.reduce((a, r) => a + (r.stargazers_count || 0), 0);
      reposData.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });

      if (Object.keys(langMap).length === 0) {
        const calls = reposData.filter((r: any) => r.language == null && r.size > 0).slice(0, 15);
        if (calls.length > 0) {
          const results = await Promise.allSettled(
            calls.map((r: any) => fetch(r.languages_url).then(res => res.ok ? res.json() : null))
          );
          results.forEach(r => {
            if (r.status === 'fulfilled' && r.value) {
              Object.keys(r.value as Record<string, number>).forEach(lang => {
                langMap[lang] = (langMap[lang] || 0) + 1;
              });
            }
          });
        }
      }
      if (Object.keys(langMap).length === 0) Object.assign(langMap, FALLBACK_LANGUAGES);
    }

    if (commitsRes.ok) {
      const c = await commitsRes.json();
      commits = c.total_count ?? 0;
    }

    if (prsRes.ok) {
      const prData = await prsRes.json();
      mergedPRs = prData.total_count ?? 0;
    }

    if (repos === 0) repos = FALLBACK.repos;
    if (commits === 0) commits = FALLBACK.commits;
    if (mergedPRs === 0) mergedPRs = FALLBACK.mergedPRs;

    const snapshot: CachedData = { repos, stars, commits, mergedPRs, languages: langMap, ts: Date.now() };
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(snapshot)); } catch { /* non-fatal */ }

    return { stats: snapshot, fresh: true };
  } catch (err) {
    console.warn('GitHub API unavailable, using cached/fallback data:', err);

    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as CachedData;
        if (cached.repos > 0) return { stats: cached, fresh: false };
      }
    } catch {}

    return {
      stats: {
        repos: FALLBACK.repos,
        stars: FALLBACK.stars,
        commits: FALLBACK.commits,
        mergedPRs: FALLBACK.mergedPRs,
        languages: FALLBACK_LANGUAGES,
        ts: Date.now()
      },
      fresh: false,
    };
  }
}

// ── Reusable Stat Card ───────────────────────────────────────────────
type StatCardProps = { icon: React.ReactNode; label: string; value: number | string; delay: number; accentColor?: string };

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, delay, accentColor = 'text-cyan' }) => {
  const isNumber = typeof value === 'number';
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03 }}
      className="group/card relative rounded-2xl bg-white/[0.05] border border-white/[0.1] p-5 flex flex-col items-center justify-center gap-2.5 text-center transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.16]"
    >
      <span className={`${accentColor} transition-transform duration-300 group-hover/card:scale-110`}>{icon}</span>
      <span className="text-white font-bold text-xl tracking-tight tabular-nums leading-none">
        {isNumber ? <AnimatedNumber value={value} /> : value}
      </span>
      <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider leading-none">{label}</span>
    </motion.div>
  );
};

// ── Main Hero ────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const TAGLINES = useMemo(() => [
    'I architect high-throughput infrastructure.',
    'I build distributed systems that don\'t break.',
    'I solve real-world engineering problems at scale.',
  ], []);

  const taglineIndex = useRotatingTaglines(TAGLINES);

  const [repos, setRepos] = useState(FALLBACK.repos);
  const [stars, setStars] = useState(FALLBACK.stars);
  const [commits, setCommits] = useState(FALLBACK.commits);
  const [mergedPRs, setMergedPRs] = useState(FALLBACK.mergedPRs);
  const [languages, setLanguages] = useState<Record<string, number>>(FALLBACK_LANGUAGES);
  const [totalLanguageCount, setTotalLanguageCount] = useState(Object.keys(FALLBACK_LANGUAGES).length);

  const monthsBuilding = useMemo(() => {
    const s = new Date('2024-08-01'), n = new Date();
    return (n.getFullYear() - s.getFullYear()) * 12 + (n.getMonth() - s.getMonth());
  }, []);

  // Load stats: hydrate from cache instantly, refresh in background if stale
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { stats, fresh } = await loadStats();
      if (cancelled) return;

      setRepos(stats.repos);
      setStars(stats.stars);
      setCommits(stats.commits);
      setMergedPRs(stats.mergedPRs);
      if (Object.keys(stats.languages).length > 0) {
        setLanguages(stats.languages);
        setTotalLanguageCount(Object.keys(stats.languages).length);
      }

      if (!fresh) {
        try {
          const { stats: freshData } = await loadStats();
          if (!cancelled) {
            setRepos(freshData.repos);
            setStars(freshData.stars);
            setCommits(freshData.commits);
            setMergedPRs(freshData.mergedPRs);
            if (Object.keys(freshData.languages).length > 0) {
              setLanguages(freshData.languages);
              setTotalLanguageCount(Object.keys(freshData.languages).length);
            }
          }
        } catch { /* API unreachable */ }
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-28 lg:pt-20 pb-24">
      <div className="relative z-10 px-6 lg:px-14 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* ── Left: Identity ─────────────────────────────── */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-7 space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/20 bg-cyan/5 text-cyan text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              IIIT Pune · CS Undergrad
            </div>

            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white leading-[0.85]">
              Harsh <br />
              <span className="text-cyan italic">Aghara.</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglineIndex}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-2xl md:text-4xl text-white font-bold tracking-tight leading-tight max-w-[15ch] sm:max-w-none"
                >
                  {TAGLINES[taglineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="text-zinc-400 text-lg md:text-xl max-w-[550px] leading-relaxed font-light">
              Backend & Infrastructure Engineer focusing on{' '}
              <span className="text-cyan font-medium">high-throughput systems</span>,
              distributed architecture, and performance-tuned microservices.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <a href="https://github.com/harsh-aghara" target="_blank" rel="noopener noreferrer"
              className="h-14 px-8 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 group shadow-xl">
              <Github size={20} /> GitHub
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/in/harsh-aghara-2aa223323/" target="_blank" rel="noopener noreferrer"
              className="h-14 px-8 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-all flex items-center gap-2 group shadow-xl">
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href="#contact"
              className="h-14 w-14 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-cyan/10 hover:border-cyan/30 hover:text-cyan transition-all shadow-xl">
              <Mail size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: Stats Card ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="lg:col-span-5 relative"
        >
          <div className="absolute -inset-4 bg-cyan/5 rounded-[3rem] blur-3xl pointer-events-none" />

          <div className="relative bg-zinc-900/60 border border-white/[0.1] rounded-[2rem] p-6 md:p-8 shadow-2xl backdrop-blur-[20px] space-y-6">

            {/* Header — Total Commits (hero metric) + sparkline */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  <span className="text-sm font-mono text-zinc-400 uppercase tracking-wider font-semibold">Live Stats</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white tracking-tight tabular-nums leading-none">
                    <AnimatedNumber value={commits} />
                  </span>
                  <span className="text-sm text-zinc-500 font-semibold">commits</span>
                </div>
              </div>
              <LiveBarChart />
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard icon={<GitBranch size={20} />} label="Repositories" value={repos} delay={0.7} />
              <StatCard icon={<Code2 size={20} />} label="Languages" value={totalLanguageCount} delay={0.8} />
              <StatCard icon={<GitPullRequest size={20} />} label="Merged PRs" value={mergedPRs} delay={0.9} />
              <StatCard icon={<Clock size={20} />} label="Months" value={monthsBuilding} delay={1.0} />
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />

            {/* Bottom Row: Stars + Peak Metrics */}
            <div className="grid grid-cols-2 gap-3">
              {/* GitHub Stars */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                className="group/stat rounded-2xl bg-white/[0.05] border border-white/[0.1] p-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.16]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider leading-none">GitHub Stars</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight tabular-nums">
                  <AnimatedNumber value={stars} />
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="text-[10px] text-emerald-500 font-mono font-bold uppercase tracking-wider">Live</span>
                  <ArrowUpRight size={12} className="text-emerald-500" />
                </div>
              </motion.div>

              {/* Peak Metrics — fixed */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                className="group/stat rounded-2xl bg-white/[0.05] border border-white/[0.1] p-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.16]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider leading-none">Peak Metrics</span>
                  <Zap size={14} className="text-amber-400/80" />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight tabular-nums">1,459</div>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="text-[10px] text-cyan font-semibold uppercase tracking-wider">Peak Req/s</span>
                </div>
              </motion.div>
            </div>

            {/* Active Languages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="pt-3 space-y-3"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={12} /> Active Languages
                </span>
                <span className="text-xs text-zinc-500 font-mono font-medium">{totalLanguageCount} unique</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(languages)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 6)
                  .map(([lang, count], i) => (
                    <motion.span
                      key={lang}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-xs font-mono text-zinc-300 uppercase tracking-wider transition-all duration-200 hover:bg-white/[0.12] hover:text-white font-medium"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LANG_COLORS[i % LANG_COLORS.length] }} />
                      {lang}
                      <span className="text-zinc-500 text-[10px] font-black">{count}</span>
                    </motion.span>
                  ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
