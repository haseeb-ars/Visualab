import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/blog/BlogPostClient";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Read blog post data from JSON database
function getPostData(slug: string) {
  const filePath = path.join(process.cwd(), "src/data/blog", `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (e) {
    console.error(`Failed to parse blog file: ${slug}.json`, e);
    return null;
  }
}

// Generate static params for Next.js build prerendering
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "src/data/blog");
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  const filenames = fs.readdirSync(blogDir);
  return filenames
    .filter(fn => fn.endsWith(".json"))
    .map(filename => ({
      slug: filename.replace(".json", "")
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostData(slug);
  
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
