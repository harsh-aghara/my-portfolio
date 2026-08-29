import type { Metadata } from "next";
import Link from "next/link";
import { getAllWriting } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on systems, concurrency, and what I'm building.",
};

export default function WritingPage() {
  const posts = getAllWriting();

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-24 sm:px-8 lg:px-12">
      <ScrollReveal>
        <h1 className="text-[48px] font-bold leading-[1.1] tracking-tight text-text-primary">
          Writing
        </h1>
        <p className="mt-3 text-[17px] text-text-secondary">
          Notes on systems, concurrency, and what I'm building.
        </p>
      </ScrollReveal>

      <div className="mt-12 space-y-0">
        {posts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.06}>
            <Link
              href={`/writing/${post.slug}`}
              className="group block border-b border-border-default py-8 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl transition-all duration-300 hover:bg-bg-elevated hover:border-transparent"
            >
              <h3 className="text-[22px] font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors duration-300">
                {post.frontmatter.title}
              </h3>
              <p className="mt-2 text-[13px] text-text-tertiary">
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                / {post.frontmatter.readingTime} min read
                {post.frontmatter.tags?.length > 0 &&
                  ` / ${post.frontmatter.tags.join(", ")}`}
              </p>
              <p className="mt-2 line-clamp-2 max-w-[65ch] text-sm leading-relaxed text-text-secondary">
                {post.frontmatter.excerpt}
              </p>
            </Link>
          </ScrollReveal>
        ))}

        {posts.length === 0 && (
          <p className="py-12 text-text-tertiary">
            No posts yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
