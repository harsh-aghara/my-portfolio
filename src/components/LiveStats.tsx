import { Suspense } from "react";
import LiveStatsClient from "./LiveStatsClient";

async function getStats() {
  try {
    const [ghRes, lcRes, lcContestRes] = await Promise.all([
      fetch("https://api.github.com/users/harsh-aghara", { next: { revalidate: 3600 } }),
      fetch("https://alfa-leetcode-api.onrender.com/userProfile/h4rsh01", { next: { revalidate: 3600 } }),
      fetch("https://alfa-leetcode-api.onrender.com/h4rsh01/contest", { next: { revalidate: 3600 } }),
    ]);

    const ghData = ghRes.ok ? await ghRes.json() : null;
    const lcData = lcRes.ok ? await lcRes.json() : null;
    const lcContestData = lcContestRes.ok ? await lcContestRes.json() : null;

    return {
      githubRepos: ghData?.public_repos ?? null,
      githubFollowers: ghData?.followers ?? null,
      leetcodeTotal: lcData?.totalSolved ?? null,
      leetcodeRating: lcContestData?.contestRating !== undefined && lcContestData?.contestRating !== null 
        ? Math.round(lcContestData.contestRating) 
        : null,
    };
  } catch (error) {
    return {
      githubRepos: null,
      githubFollowers: null,
      leetcodeTotal: null,
      leetcodeRating: null,
    };
  }
}

export default async function LiveStats() {
  const stats = await getStats();

  const statsData = [
    {
      label: "GitHub Repos",
      value: stats.githubRepos,
      delay: 0.1,
      fallbackKey: "gh_repos",
      fallbackMessage: "Too many to count!!",
    },
    {
      label: "GH Followers",
      value: stats.githubFollowers,
      delay: 0.2,
      fallbackKey: "gh_followers",
      fallbackMessage: "Lost in the void",
    },
    {
      label: "LeetCode Solved",
      value: stats.leetcodeTotal,
      delay: 0.3,
      fallbackKey: "lc_solved",
      fallbackMessage: "Trapped in DP",
    },
    {
      label: "LC Rating",
      value: stats.leetcodeRating,
      delay: 0.4,
      fallbackKey: "lc_rating",
      fallbackMessage: "Error 429: Too smart",
    },
  ];

  return <LiveStatsClient stats={statsData} />;
}
