import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "@/components/ScrollReveal";

interface ProjectRowProps {
  name: string;
  hook: string;
  metricValue: string;
  metricLabel: string;
  href: string;
  delay?: number;
  techStack?: string;
}

export default function ProjectRow({
  name,
  hook,
  metricValue,
  metricLabel,
  href,
  delay = 0,
  techStack,
}: ProjectRowProps) {
  return (
    <ScrollReveal delay={delay}>
      <Link
        href={href}
        className="group flex flex-col gap-4 border-b border-border-default py-8 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl transition-all duration-300 hover:bg-bg-elevated hover:border-transparent md:flex-row md:items-start md:justify-between"
      >
        <div className="max-w-[70%] space-y-2 md:max-w-[65%]">
          <h3 className="text-[22px] font-bold tracking-tight text-text-primary">
            {name}
          </h3>
          <p className="text-sm leading-relaxed text-text-secondary">
            {hook}
          </p>
          {techStack && (
            <p className="font-mono text-[13px] text-text-tertiary">
              {techStack}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-1 md:text-right">
          <span className="text-[28px] font-bold leading-none tracking-tight text-text-primary transition-colors duration-200 group-hover:text-accent">
            {metricValue}
          </span>
          <span className="text-[13px] font-medium text-text-tertiary">
            {metricLabel}
          </span>
        </div>
      </Link>
    </ScrollReveal>
  );
}
