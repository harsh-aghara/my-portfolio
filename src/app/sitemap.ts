import { getAllWork, getAllWriting } from "@/lib/content";
import type { MetadataRoute } from "next";

const baseUrl = "https://harsh-aghara-portfolio.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const workItems = getAllWork().map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const writingItems = getAllWriting().map((p) => ({
    url: `${baseUrl}/writing/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...workItems,
    ...writingItems,
  ];
}
