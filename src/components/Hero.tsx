import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ChevronRight, Activity,
  FolderGit2, GitCommitHorizontal, Calendar, Briefcase, Code2
} from 'lucide-react';

const Hero: React.FC = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [stats, setStats] = useState({ repos: 0, commits: 0, stars: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  const taglines = [
    "I architect high-throughput infrastructure.",
    "I build distributed systems that don't break.",
    "I solve real-world engineering problems at scale."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchGithubStats = async () => {
      const CACHE_KEY = 'github_engineer_stats';
      const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours
      
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            setStats(data);
            setLoadingStats(false);
            return;
          }
        }
      } catch (e) {}

      try {
        const [userRes, reposRes, commitsRes] = await Promise.all([
          fetch('https://api.github.com/users/harsh-aghara'),
          fetch('https://api.github.com/users/harsh-aghara/repos?per_page=100'),
          fetch('https://api.github.com/search/commits?q=author:harsh-aghara', {
            headers: { 'Accept': 'application/vnd.github.cloak-preview' }
          })
        ]);

        let repos = 0;
        let stars = 0;
        let commits = 0;

        if (userRes.ok) {
          const userData = await userRes.json();
          repos = userData.public_repos || 0;
        }

        if (reposRes.ok) {
          const reposData = await reposRes.json();
          stars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
        }

        if (commitsRes.ok) {
          const commitsData = await commitsRes.json();
          commits = commitsData.total_count || 0;
        }

        const newStats = { repos, stars, commits };
        setStats(newStats);
        setLoadingStats(false);

        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: newStats,
            timestamp: Date.now()
          }));
        } catch (e) {}
      } catch (error) {
        console.error("Failed to fetch Github stats:", error);
        setLoadingStats(false);
      }
    };

    fetchGithubStats();
  }, []);

  const startDate = new Date('2024-08-01');
  const currentDate = new Date();
  const monthsBuilding = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-20 pb-24">
      <div className="relative z-10 px-6 lg:px-14 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-8"
        >
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
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-2xl md:text-4xl text-white font-bold tracking-tight leading-tight max-w-[15ch] sm:max-w-none"
                >
                  {taglines[taglineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            
            <p className="text-t1 text-lg md:text-xl max-w-[550px] leading-relaxed font-light">
              Backend & Infrastructure Engineer focusing on <span className="text-cyan font-medium">high-throughput systems</span>, 
              distributed architecture, and performance-tuned microservices.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <a 
              href="https://github.com/harsh-aghara"
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-8 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 group shadow-xl"
            >
              <Github size={20} />
              GitHub
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://www.linkedin.com/in/harsh-aghara-2aa223323/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-8 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-all flex items-center gap-2 group shadow-xl"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a 
              href="#contact"
              className="h-14 w-14 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-cyan/10 hover:border-cyan/30 hover:text-cyan transition-all shadow-xl"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="lg:col-span-5 relative group"
        >
          <div className="aspect-square bg-white/[0.03] border border-white/[0.06] rounded-[2.5rem] overflow-hidden backdrop-blur-[12px] p-10 flex flex-col justify-between shadow-2xl">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="text-[10px] text-t3 uppercase tracking-widest font-mono font-bold">Engineer Stats</div>
                  <div className="text-4xl font-bold text-white tracking-tighter">
                    {loadingStats ? <span className="animate-pulse">--</span> : stats.commits.toLocaleString()} <span className="text-sm font-normal text-t3">commits</span>
                  </div>
                </div>
                <div className="w-24 h-8 flex items-end gap-1">
                  {[40, 70, 45, 90, 65, 80, 50, 60, 30, 85].map((h, i) => (
                    <motion.div 
                      key={i} 
                      className="flex-1 bg-cyan/30 rounded-t-[2px]" 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.8 + i * 0.05, duration: 1 }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative h-40 flex items-center justify-center">
                 <div className="relative grid grid-cols-3 gap-4 w-full">
                    {[
                      { icon: <Briefcase />, val: '3', label: 'Projects' },
                      { icon: <FolderGit2 />, val: loadingStats ? '--' : stats.repos, label: 'Repos' },
                      { icon: <Code2 />, val: '15', label: 'Techs' },
                      { icon: <GitCommitHorizontal />, val: loadingStats ? '--' : stats.commits, label: 'Commits' },
                      { icon: <Activity />, val: '1,459', label: 'Peak Req/s' },
                      { icon: <Calendar />, val: monthsBuilding.toString(), label: 'Months' },
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="py-3 px-2 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex flex-col items-center justify-center gap-1 shadow-lg backdrop-blur-md hover:border-cyan/30 transition-colors"
                      >
                        <div className="text-cyan mb-0.5">
                          {React.cloneElement(item.icon, { size: 18 })}
                        </div>
                        <div className="text-white font-bold text-sm sm:text-base leading-none tracking-tight">{item.val}</div>
                        <div className="text-[8px] text-t3 font-mono font-bold uppercase tracking-widest leading-none">{item.label}</div>
                      </motion.div>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'GitHub Stars', val: loadingStats ? '--' : stats.stars.toString(), status: 'Live', live: true },
                  { label: 'Stack Ready', val: 'Full-Stack', status: 'Ready', live: false },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/[0.05] border border-white/[0.08] space-y-1 backdrop-blur-md">
                    <div className="text-[9px] text-t3 uppercase tracking-widest font-mono font-bold">{item.label}</div>
                    <div className="text-lg font-bold text-white">{item.val}</div>
                    <div className={`text-[9px] font-bold uppercase tracking-widest ${item.live ? 'text-green animate-pulse' : 'text-cyan'}`}>{item.status}</div>
                  </div>
                ))}
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;