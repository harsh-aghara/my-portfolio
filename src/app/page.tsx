import Link from "next/link";
import { ArrowRight, TerminalWindow, Database, Network } from "@phosphor-icons/react/dist/ssr";
import ProjectRow from "@/components/ProjectRow";
import ScrollReveal from "@/components/ScrollReveal";
import AsciiHero from "@/components/AsciiHero";
import LiveStats from "@/components/LiveStats";
import TechStack from "@/components/TechStack";
import { projectDisplay, featuredSlugs } from "@/lib/project-display";

const featuredProjects = featuredSlugs.map((slug) => ({
  ...projectDisplay[slug],
  href: `/work/${slug}`,
}));


export default function HomePage() {
  return (
    <>
      {/* ── 100vh Interactive ASCII Landing (No text overlay) ── */}
      <section className="relative -mt-16 h-[100dvh] w-full">
        <AsciiHero />
      </section>

      {/* ── Page Content Container ───────────────────────────── */}
      <div className="relative z-10 bg-bg-primary">
        
        {/* ── Creative Introduction (Taste-Skill Typography) ───── */}
        <section className="mx-auto max-w-[1120px] px-6 py-32 sm:px-8 lg:px-12 lg:py-48">
          <ScrollReveal>
            <div className="max-w-[900px] break-words">
              <h1 className="text-[11vw] sm:text-[120px] lg:text-[160px] font-black leading-[0.85] tracking-[-0.04em] uppercase text-text-primary">
                HARSH<br />AGHARA
              </h1>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="mt-16 grid grid-cols-1 gap-12 border-t border-border-default pt-12 md:grid-cols-[1fr_2fr]">
              <div>
                <span className="font-mono text-[15px] tracking-[0.1em] font-semibold text-accent uppercase">
                  [ BACKEND & INFRASTRUCTURE ]
                </span>
              </div>
              <div>
                <p className="text-[24px] font-medium leading-[1.4] tracking-tight text-text-primary sm:text-[32px] md:leading-[1.3]">
                  I build systems that don't break under load. Focused on concurrency, failure modes, and keeping Linux servers happy when traffic spikes.
                </p>
                <div className="mt-12 flex items-center gap-6">
                  <Link
                    href="/work"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-border-default bg-bg-surface px-8 py-4 transition-all duration-300 hover:border-accent hover:bg-accent/5"
                  >
                    <span className="font-mono text-sm tracking-wide text-text-primary group-hover:text-accent transition-colors">
                      EXECUTE / WORK
                    </span>
                    <ArrowRight size={16} className="text-text-primary group-hover:text-accent transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── Infrastructure & Core (Niche) ────────────────────── */}
        <section className="mx-auto max-w-[1120px] px-6 py-24 sm:px-8 lg:px-12">
          <ScrollReveal>
              <h2 className="mb-12 font-mono text-[15px] tracking-[0.1em] font-semibold text-accent uppercase">
                [01] System Primitives
              </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { 
                icon: <Database size={24} />, 
                title: "Data & State", 
                points: [
                  "Relational & in-memory DBs (PostgreSQL, Redis)",
                  "Ensuring data integrity with complex transactions",
                  "Optimizing database performance at scale"
                ] 
              },
              { 
                icon: <Network size={24} />, 
                title: "Concurrency", 
                points: [
                  "Managing distributed background jobs (BullMQ)",
                  "Preventing race conditions under heavy load",
                  "Synchronizing state across multiple servers"
                ] 
              },
              { 
                icon: <TerminalWindow size={24} />, 
                title: "Systems", 
                points: [
                  "Containerizing services with Docker",
                  "Application observability (Prometheus, Grafana)",
                  "Linux environment configuration & CI/CD"
                ] 
              }
            ].map((skill, i) => (
              <ScrollReveal key={skill.title} delay={i * 0.1}>
                <div className="group relative overflow-hidden border border-border-default bg-bg-elevated p-10 transition-colors duration-300 hover:border-accent">
                  {/* Subtle top border accent on hover */}
                  <div className="absolute left-0 top-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  
                  <div className="mb-8 inline-flex text-text-secondary transition-colors group-hover:text-accent">
                    {skill.icon}
                  </div>
                  <h3 className="mb-4 text-xl font-bold tracking-tight text-text-primary">{skill.title}</h3>
                  <ul className="mt-6 space-y-3">
                    {skill.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[15px] leading-relaxed text-text-secondary">
                        <span className="font-mono text-accent text-sm leading-relaxed shrink-0">{">"}</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── Tech Stack Marquee ───────────────────────────────── */}
        <TechStack />

        {/* ── Live Telemetry ───────────────────────────────────── */}
        <section className="relative mx-auto max-w-[1120px] px-6 py-32 sm:px-8 lg:px-12">
          {/* Subtle grid map in background */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#27272F_1px,transparent_1px),linear-gradient(to_bottom,#27272F_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
          
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="font-mono text-[15px] tracking-[0.1em] font-semibold text-accent uppercase">
                [02] Runtime Diagnostics
              </h2>
            </div>
          </ScrollReveal>
          
          <LiveStats />
        </section>

        {/* ── Featured Work ────────────────────────────────────── */}
        <section className="mx-auto max-w-[1120px] px-6 py-24 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="mb-16">
              <h2 className="font-mono text-[15px] tracking-[0.1em] font-semibold text-accent uppercase">
                [03] Featured Systems
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-0 border-t border-border-default">
            {featuredProjects.map((project, i) => (
              <ProjectRow key={project.name} {...project} delay={i * 0.05} />
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-sm tracking-wide text-text-secondary transition-colors hover:text-text-primary"
            >
              [ VIEW_ALL_PROJECTS ]
            </Link>
          </div>
        </section>

        {/* ── Latest Writing ───────────────────────────────────── */}
        <section className="mx-auto max-w-[1120px] px-6 pb-32 pt-12 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="font-mono text-[15px] tracking-[0.1em] font-semibold text-accent uppercase">
                [04] Post-Mortems
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <Link
              href="/writing/building-yoink"
              className="group relative block overflow-hidden border border-border-default bg-bg-elevated p-10 md:p-12 rounded-2xl transition-all duration-300 hover:border-border-hover"
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
                <div className="max-w-3xl">
                  <h3 className="text-[28px] font-bold leading-[1.15] tracking-tight text-text-primary md:text-[32px] group-hover:text-accent transition-colors duration-300">
                    Building Yoink: four iterations of a flash-sale engine
                  </h3>
                  <p className="mt-4 text-[16px] leading-[1.7] text-text-secondary">
                    The baseline system produced 28,486 over-orders against 5,000
                    units of stock. That's a 469% inventory breach.
                  </p>
                  <div className="mt-6 font-mono text-sm text-text-tertiary">
                    Apr 2026 / 12 min read / systems, redis, concurrency
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
