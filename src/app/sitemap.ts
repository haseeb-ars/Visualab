import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://visualab.uk";

  const routes = [
    "",
    "/about",
    "/pricing",
    "/case-studies",
    "/contact",
    "/blog",
    "/services/ai-automation",
    "/services/web-design",
    "/services/shopify-development",
    "/thank-you"
  ];

  const staticUrls = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic blog articles mapping
  const blogDir = path.join(process.cwd(), "src/data/blog");
  let blogSlugs: string[] = [];
  if (fs.existsSync(blogDir)) {
    try {
      const filenames = fs.readdirSync(blogDir);
      blogSlugs = filenames
        .filter((fn) => fn.endsWith(".json"))
        .map((fn) => fn.replace(".json", ""));
    } catch (e) {
      console.error("Failed to read blog directory in sitemap", e);
    }
  }

  const blogUrls = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...blogUrls];
}
