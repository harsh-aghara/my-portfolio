import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllWork, getWorkBySlug } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";

export async function generateStaticParams() {
  const projects = getAllWork();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.excerpt,
  };
}

export default async function WorkCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) notFound();

  const { frontmatter, content } = project;

  return (
    <article className="mx-auto max-w-[720px] px-6 py-24 sm:px-8">
      <ScrollReveal>
        <Link
          href="/work"
          className="mb-12 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
        >
          <ArrowLeft size={16} />
          Work
        </Link>
      </ScrollReveal>

      <ScrollReveal>
        <header className="mb-8 space-y-3">
          <h1 className="text-[48px] font-bold leading-[1.1] tracking-tight text-text-primary">
            {frontmatter.title}
          </h1>
          <p className="text-[17px] text-text-secondary">
            {frontmatter.subtitle}
          </p>
          <p className="font-mono text-[13px] text-text-tertiary">
            {frontmatter.stack.join(" / ")}
          </p>
          {frontmatter.github && (
            <a
              href={frontmatter.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors duration-150 hover:text-white"
            >
              <GithubLogo size={24} />
              Source
            </a>
          )}
        </header>
      </ScrollReveal>

      {/* Results strip */}
      {frontmatter.metrics && frontmatter.metrics.length > 0 && (
        <ScrollReveal>
          <div className="mb-12 grid grid-cols-2 gap-6 rounded-lg bg-bg-elevated p-6 sm:flex sm:gap-8 sm:p-8">
            {frontmatter.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-[22px] font-bold leading-none tracking-tight text-text-primary">
                  {m.value}
                </div>
                <div className="mt-1 text-[13px] font-medium text-text-tertiary">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* MDX content */}
      <ScrollReveal>
        <div className="prose">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    { theme: "github-dark-dimmed", keepBackground: false },
                  ],
                ],
              },
            }}
          />
        </div>
      </ScrollReveal>

      <hr className="my-12 border-border-default" />
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
      >
        <ArrowLeft size={16} />
        Back to all work
      </Link>
    </article>
  );
}
