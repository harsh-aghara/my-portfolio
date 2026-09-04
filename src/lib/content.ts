import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDir = path.join(process.cwd(), "content");

export interface WorkFrontmatter {
  title: string;
  subtitle: string;
  date: string;
  stack: string[];
  github: string;
  url?: string;
  metrics: { value: string; label: string }[];
  excerpt: string;
}

export interface WritingFrontmatter {
  title: string;
  date: string;
  tags: string[];
  readingTime: number;
  excerpt: string;
}

export interface ContentItem<T> {
  slug: string;
  frontmatter: T;
  content: string;
}

function getContentFromDir<T>(subdir: string): ContentItem<T>[] {
  const dir = path.join(contentDir, subdir);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const slug = filename.replace(/\.mdx$/, "");

      return {
        slug,
        frontmatter: data as T,
        content,
      };
    })
    .sort(
      (a, b) => {
        const dateA = (a.frontmatter as any).date || "";
        const dateB = (b.frontmatter as any).date || "";
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      }
    );
}

export function getAllWork(): ContentItem<WorkFrontmatter>[] {
  const items = getContentFromDir<WorkFrontmatter>("work");
  // Sort by a predefined order instead of date for work projects
  const order = ["yoink", "vault-bomb", "oceanwatch", "spms", "checkmate"];
  return items.sort(
    (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug)
  );
}

export function getWorkBySlug(
  slug: string
): ContentItem<WorkFrontmatter> | undefined {
  const items = getAllWork();
  return items.find((item) => item.slug === slug);
}

export function getAllWriting(): ContentItem<WritingFrontmatter>[] {
  const items = getContentFromDir<WritingFrontmatter>("writing");
  return items.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getWritingBySlug(
  slug: string
): ContentItem<WritingFrontmatter> | undefined {
  const items = getAllWriting();
  return items.find((item) => item.slug === slug);
}

export function computeReadingTime(content: string): number {
  return Math.ceil(readingTime(content).minutes);
}
