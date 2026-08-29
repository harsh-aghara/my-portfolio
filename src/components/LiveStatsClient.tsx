"use client";

import { useEffect, useState } from "react";
import AnimatedCounter from "./AnimatedCounter";

interface StatData {
  value: number | null;
  label: string;
  delay: number;
  fallbackKey: string;
  fallbackMessage: string;
}

export default function LiveStatsClient({ stats }: { stats: StatData[] }) {
  const [cachedStats, setCachedStats] = useState<Record<string, number>>({});

  useEffect(() => {
    const CACHE_KEY = "portfolio_stats_cache";
    const CACHE_EXPIRY = 12 * 60 * 60 * 1000; // 12 hours

    try {
      const stored = localStorage.getItem(CACHE_KEY);
      let cache = stored ? JSON.parse(stored) : null;

      const now = Date.now();
      
      // If cache is expired or missing, create a new one
      if (!cache || !cache.timestamp || now - cache.timestamp > CACHE_EXPIRY) {
        cache = { timestamp: now, data: {} };
      }

      const newData = { ...cache.data };
      let hasUpdates = false;

      // Update cache with new valid server values
      stats.forEach((stat) => {
        if (stat.value !== null) {
          newData[stat.fallbackKey] = stat.value;
          hasUpdates = true;
        }
      });

      if (hasUpdates) {
        cache.data = newData;
        cache.timestamp = now;
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      }

      setCachedStats(cache.data);
    } catch (e) {
      console.error("Failed to read/write stats cache", e);
    }
  }, [stats]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat) => {
        // Use server value, or cached value, or fallback to null (which triggers funny message)
        const finalValue = stat.value !== null ? stat.value : (cachedStats[stat.fallbackKey] ?? null);

        return (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={finalValue !== null ? finalValue : stat.fallbackMessage}
            delay={stat.delay}
          />
        );
      })}
    </div>
  );
}

function StatCard({ label, value, delay }: { label: string; value: number | string; delay: number }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border-default bg-bg-elevated p-6 transition-colors duration-300 hover:border-accent group">
      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex flex-col gap-2 relative z-10">
        <span className="font-mono text-3xl font-bold text-text-primary">
          {typeof value === 'number' ? (
            <AnimatedCounter from={0} to={value} delay={delay} />
          ) : (
            <span className="text-base font-sans font-medium text-text-secondary tracking-normal">{value}</span>
          )}
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
          {label}
        </span>
      </div>
      {/* Live indicator dot */}
      <div className="absolute right-3 top-3 flex h-2 w-2">
        {typeof value === 'number' ? (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
          </>
        ) : (
          <span className="relative inline-flex h-2 w-2 rounded-full bg-error"></span>
        )}
      </div>
    </div>
  );
}
