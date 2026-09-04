import type { Metadata } from "next";
import Link from "next/link";
import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Pre-final year CSE undergrad at IIIT Pune, focused on backend systems, concurrency, and failure modes.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-[720px] px-6 py-24 sm:px-8">
      <ScrollReveal>
        <h1 className="text-[48px] font-bold leading-[1.1] tracking-tight text-text-primary">
          About
        </h1>
      </ScrollReveal>

      <div className="mt-10 space-y-6 text-[17px] leading-[1.75] text-text-secondary">
        <ScrollReveal>
          <p>
            I'm Harsh Aghara, a pre-final year CSE undergrad at IIIT Pune
            (batch 2024-2028, CGPA 8.72). I keep ending up working on the same
            kind of problem: what happens to a system when a thousand users do
            the same thing at the same time?
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <p>
            Yoink started as a flash-sale checkout engine and turned into four
            separate rebuilds. Each iteration broke under load in a new way. The
            version that held uses Redis Lua scripts for atomic stock
            reservation and BullMQ workers to drain writes asynchronously. The
            P95 went from 1,390ms to 7.6ms. I{" "}
            <Link href="/writing/building-yoink" className="text-accent underline underline-offset-[3px] hover:text-accent-hover transition-colors duration-150">
              wrote about the whole process
            </Link>
            .
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <p>
            At IIIT Pune, I interned on the Student Project Management System
            and cut the dashboard's P95 latency 57% by parallelizing 20+
            sequential database queries. It also involved fixing production
            outages (CORS failures, broken OTP auth) under deadline pressure,
            which turns out to be good training.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.18}>
          <p>
            More recently I've been contributing to Checkmate, an open-source
            monitoring tool with 10,000+ stars. Two merged PRs so far: one for
            bulk pause/resume of monitor fleets with BullMQ orchestration across
            partial-failure states, and one for custom HTTP status-code
            resolution so monitors can handle non-2xx responses correctly.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.24}>
          <p>
            Right now I'm exploring Kubernetes-ecosystem open source alongside
            continuing work on Checkmate.
          </p>
        </ScrollReveal>
      </div>

      {/* Credentials */}
      <ScrollReveal delay={0.3}>
        <div className="mt-12 space-y-3">
          <p className="text-sm text-text-tertiary">
            98.9 percentile, JEE Main 2024 (1.5M+ candidates)
          </p>
          <p className="text-sm text-text-tertiary">
            400+ DSA problems, 1,770+ LeetCode contest rating
          </p>
          <p className="text-sm text-text-tertiary">
            2nd prize, Arbitrum Builder Pods (Lampros DAO x Arbitrum)
          </p>
        </div>
      </ScrollReveal>

    </section>
  );
}
