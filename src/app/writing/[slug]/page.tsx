import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllWriting, getWritingBySlug } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";

export async function generateStaticParams() {
  const posts = getAllWriting();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  };
}

export default async function WritingPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getWritingBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <article className="mx-auto max-w-[720px] px-6 py-24 sm:px-8">
      <ScrollReveal>
        <Link
          href="/writing"
          className="mb-12 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
        >
          <ArrowLeft size={16} />
          Writing
        </Link>
      </ScrollReveal>

      <ScrollReveal>
        <header className="mb-12">
          <h1 className="text-[48px] font-bold leading-[1.1] tracking-tight text-text-primary">
            {frontmatter.title}
          </h1>
          <p className="mt-4 text-[13px] text-text-tertiary">
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            / {frontmatter.readingTime} min read
            {frontmatter.tags?.length > 0 &&
              ` / ${frontmatter.tags.join(", ")}`}
          </p>
        </header>
      </ScrollReveal>

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

      <hr className="my-12 border-border-default" />
      <Link
        href="/writing"
        className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
      >
        <ArrowLeft size={16} />
        More writing
      </Link>
    </article>
  );
}
