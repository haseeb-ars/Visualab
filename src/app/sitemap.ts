import { MetadataRoute } from "next";

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
  const blogSlugs = [
    "process-automation-guide",
    "shopify-vitals-optimization",
    "high-converting-saas-landing-pages",
    "llm-agents-customer-support",
    "liquid-vs-headless-shopify",
    "why-corporate-sites-need-dark-mode"
  ];

  const blogUrls = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...blogUrls];
}
