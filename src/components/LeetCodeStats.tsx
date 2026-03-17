import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Trophy, 
  BarChart3, 
  Globe2, 
  Activity, 
  TrendingUp,
  Target
} from 'lucide-react';

interface Stats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  contestRating: number;
  contestGlobalRanking: number;
  contestAttend: number;
}

const LeetCodeStats: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const fetchStats = async () => {
      const username = "h4rsh01";
      const CACHE_KEY = `leetcode_stats_${username}`;
      const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            setStats(data);
            setLoading(false);
            return; // Use the cache and skip the fetch completely
          }
        }
      } catch (e) {
        console.warn("Cache read error:", e);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      try {
        // High-resiliency fetching: try multiple sources
        let profileData = null;
        let contestData = { rating: 0, globalRanking: 0, attendedContestsCount: 0 };

        // Source 1: Alfa LeetCode API (Render)
        try {
          const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, { signal: controller.signal });
          if (res.ok) profileData = await res.json();
        } catch (e) { console.warn("Alfa API Failed"); }

        // Source 2: Heroku Proxy (Fallback for profile)
        if (!profileData || profileData.error) {
          try {
            const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, { signal: controller.signal });
            if (res.ok) {
              const data = await res.json();
              if (data.status === 'success') {
                profileData = {
                  totalSolved: data.totalSolved,
                  easySolved: data.easySolved,
                  mediumSolved: data.mediumSolved,
                  hardSolved: data.hardSolved,
                  ranking: data.ranking
                };
              }
            }
          } catch (e) { console.warn("Heroku Proxy Failed"); }
        }

        // Enhancement: Fetch Contest Data (Non-critical)
        try {
          const res = await fetch(`https://alfa-leetcode-api.onrender.com/userContestRanking/${username}`, { signal: controller.signal });
          if (res.ok) {
            const data = await res.json();
            if (data && (data.contestRating || data.rating)) {
              contestData = {
                rating: data.contestRating || data.rating || 0,
                globalRanking: data.contestGlobalRanking || data.globalRanking || 0,
                attendedContestsCount: data.contestAttend || data.attendedContestsCount || 0
              };
            }
          }
        } catch (e) { console.warn("Contest Data Failed"); }

        if (profileData && profileData.totalSolved !== undefined) {
          const newStats = {
            totalSolved: profileData.totalSolved,
            easySolved: profileData.easySolved,
            mediumSolved: profileData.mediumSolved,
            hardSolved: profileData.hardSolved,
            ranking: profileData.ranking,
            contestRating: contestData.rating,
            contestGlobalRanking: contestData.globalRanking,
            contestAttend: contestData.attendedContestsCount
          };
          
          setStats(newStats);
          setError(false);
          
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              data: newStats,
              timestamp: Date.now()
            }));
          } catch (e) {
            console.warn("Cache save error:", e);
          }
        } else {
          throw new Error('All telemetry sources failed');
        }
      } catch (err) {
        console.error("Telemetry Error:", err);
        setError(true);
      } finally {
        setLoading(false);
        clearTimeout(timeoutId);
      }
    };

    fetchStats();
  }, []);

  if (loading) return (
    <section id="leetcode" className="px-6 lg:px-14 py-32 max-w-7xl mx-auto" ref={ref}>
      <div className="flex flex-col gap-8 animate-pulse">
        <div className="h-10 w-64 bg-white/5 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-48 bg-white/5 rounded-3xl border border-white/5" />
          ))}
        </div>
      </div>
    </section>
  );

  if (error || !stats) return (
    <section id="leetcode" className="px-6 lg:px-14 py-32 max-w-7xl mx-auto text-center" ref={ref}>
      <div className="p-12 rounded-[2.5rem] bg-[#12121a] border border-white/10 flex flex-col items-center text-center space-y-4">
        <Activity className="text-cyan/40" size={40} />
        <div className="space-y-2">
          <h3 className="text-white font-bold text-xl uppercase tracking-tight">Telemetry Synchronizing</h3>
          <p className="text-t2 text-sm font-mono max-w-md">API rate-limits detected. Please check back in a few moments or view the profile directly.</p>
        </div>
        <a href="https://leetcode.com/h4rsh01" target="_blank" rel="noopener noreferrer" className="text-cyan font-bold text-xs uppercase tracking-widest hover:underline pt-4">Manual Override: View Profile ↗</a>
      </div>
    </section>
  );

  return (
    <section id="leetcode" className="px-6 lg:px-14 py-32 max-w-7xl mx-auto overflow-hidden" ref={ref}>
      <div className="space-y-4 mb-20">
        <div className="flex items-center gap-2 text-cyan font-mono text-[10px] uppercase tracking-[0.3em] font-black">
          <Target size={14} />
          LeetCode Statistics
        </div>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none">
          Algorithmic <span className="text-t3 italic font-serif">Problem Solving.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <DashboardCard 
          icon={<Trophy size={22} />}
          label="Cumulative Resolved"
          value={stats.totalSolved}
          sub={`Ranking: #${stats.ranking.toLocaleString()}`}
          inView={inView}
        />

        <DashboardCard 
          icon={<TrendingUp size={22} />}
          label="Contest Efficiency"
          value={Math.round(stats.contestRating)}
          sub={stats.contestAttend > 0 ? `${stats.contestAttend} Contests Attended` : "Ranking Pending"}
          inView={inView}
          accent={stats.contestRating > 0}
        />

        <DashboardCard 
          icon={<Globe2 size={22} />}
          label="Network Standing"
          value={stats.contestGlobalRanking || stats.ranking}
          sub={stats.contestGlobalRanking > 0 ? "Contest Percentile" : "Global User Rank"}
          inView={inView}
          isRank
        />

        <div className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/10 flex flex-col justify-between group hover:border-cyan/30 transition-all duration-500">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                 <BarChart3 size={18} className="text-cyan" />
                 <span className="text-[10px] uppercase tracking-[0.2em] font-black text-t3">Breakdown</span>
              </div>
           </div>
           
           <div className="space-y-6">
              <ProgressItem label="Easy" count={stats.easySolved} total={stats.totalSolved} color="bg-cyan" delay={0} />
              <ProgressItem label="Medium" count={stats.mediumSolved} total={stats.totalSolved} color="bg-cyan/60" delay={0.1} />
              <ProgressItem label="Hard" count={stats.hardSolved} total={stats.totalSolved} color="bg-cyan/30" delay={0.2} />
           </div>
        </div>
      </div>
    </section>
  );
};

const DashboardCard = ({ icon, label, value, sub, inView, isRank, accent }: any) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView && value > 0) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = end / steps;

      let timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, stepTime);
      return () => clearInterval(timer);
    } else if (inView && value === 0) {
      setDisplayValue(0);
    }
  }, [inView, value]);

  return (
    <div className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/10 flex flex-col justify-between group hover:border-cyan/30 transition-all duration-500 hover:bg-white/[0.02]">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${accent ? 'bg-cyan/10 text-cyan border border-cyan/20' : 'bg-white/5 text-t3 border border-white/5 group-hover:text-cyan group-hover:bg-cyan/5 group-hover:border-cyan/10'}`}>
        {icon}
      </div>
      
      <div className="mt-12 space-y-1">
        <div className="text-[10px] text-t3 uppercase tracking-[0.2em] font-black">{label}</div>
        <div className="text-4xl font-black text-white tracking-tighter tabular-nums">
          {isRank && displayValue > 0 ? '#' : ''}{displayValue === 0 ? '--' : displayValue.toLocaleString()}
        </div>
        <div className="text-[11px] text-t2 uppercase tracking-widest font-bold">{sub}</div>
      </div>
    </div>
  );
};

const ProgressItem = ({ label, count, total, color, delay }: any) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-t3">{label}</span>
        <span className="text-sm font-bold text-white tabular-nums">{count}</span>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden flex">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
};

export default LeetCodeStats;