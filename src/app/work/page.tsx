import type { Metadata } from "next";
import { getAllWork } from "@/lib/content";
import { projectDisplay } from "@/lib/project-display";
import ProjectRow from "@/components/ProjectRow";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Systems I've built, broken, and rebuilt. Case studies on concurrency, failure modes, and performance.",
};

export default function WorkPage() {
  const projects = getAllWork();

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-24 sm:px-8 lg:px-12">
      <ScrollReveal>
        <h1 className="text-[48px] font-bold leading-[1.1] tracking-tight text-text-primary sm:text-[48px]">
          Work
        </h1>
        <p className="mt-3 text-[17px] text-text-secondary">
          Systems I've built, broken, and rebuilt.
        </p>
      </ScrollReveal>

      <div className="mt-12">
        {projects.map((project, i) => {
          const display = projectDisplay[project.slug] || {
            hook: project.frontmatter.excerpt,
            metricValue: project.frontmatter.metrics?.[0]?.value || "",
            metricLabel: project.frontmatter.metrics?.[0]?.label || "",
          };
          return (
            <ProjectRow
              key={project.slug}
              name={project.frontmatter.title}
              hook={display.hook}
              metricValue={display.metricValue}
              metricLabel={display.metricLabel}
              href={`/work/${project.slug}`}
              techStack={project.frontmatter.stack.join(" / ")}
              delay={i * 0.06}
            />
          );
        })}
      </div>
    </section>
  );
}
