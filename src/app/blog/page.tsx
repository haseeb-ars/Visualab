import React from "react";
import fs from "fs";
import path from "path";
import BlogListingClient from "@/components/blog/BlogListingClient";

// Define post type interface matching database entries
interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryDisplay: string;
  date: string;
  readTime: string;
  color: string;
}

// Function to read all blog posts from the src/data/blog directory
function getBlogPosts(): BlogPostSummary[] {
  const blogDir = path.join(process.cwd(), "src/data/blog");
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const filenames = fs.readdirSync(blogDir);
  const posts = filenames
    .filter(fn => fn.endsWith(".json"))
    .map(filename => {
      const filePath = path.join(blogDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContent);
      
      return {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        category: data.category,
        categoryDisplay: data.categoryDisplay,
        date: data.date,
        readTime: data.readTime,
        color: data.color
      };
    });

  // Sort posts by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogListingPage() {
  const posts = getBlogPosts();
  return <BlogListingClient initialPosts={posts} />;
}
