"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Calendar, 
  ArrowRight
} from "lucide-react";

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

interface BlogListingClientProps {
  initialPosts: BlogPostSummary[];
}

export default function BlogListingClient({ initialPosts }: BlogListingClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = initialPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background glow highlights */}
      <div className="absolute top-[10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-amber-glow blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-15%] h-[500px] w-[500px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* HEADER SECTION */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-8 text-center flex flex-col items-center gap-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Systems & Growth <span className="text-gradient-amber-teal">Insights</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Technical blueprints, code integrations, and optimization diagnostics written by our engineers.
        </p>

        {/* Search input field */}
        <div className="relative w-full max-w-md mt-6">
          <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search blueprints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl text-[14px] text-white glassmorphism-input"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center bg-white/5 border border-white/5 rounded-full p-1 mt-6 gap-1">
          {[
            { label: "All Topics", val: "all" },
            { label: "AI Automation", val: "ai" },
            { label: "Website Design", val: "design" },
            { label: "Shopify Dev", val: "shopify" }
          ].map((cat) => (
            <button
              key={cat.val}
              onClick={() => setSelectedCategory(cat.val)}
              className={`px-5 py-2 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                selectedCategory === cat.val ? "bg-brand-blue text-white shadow-lg" : "text-zinc-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div 
              key={post.slug}
              className={`glassmorphism-card rounded-2xl p-6 border flex flex-col justify-between hover:border-brand-amber/20 transition-all ${post.color}`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 text-[11px] font-bold text-zinc-500 uppercase">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-brand-teal" />
                    {post.date}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-base font-extrabold text-white mb-2 leading-snug">{post.title}</h3>
                <p className="text-[12px] text-zinc-400 font-normal leading-relaxed mb-6">{post.excerpt}</p>
              </div>

              <Link 
                href={`/blog/${post.slug}`}
                className="text-[13px] font-bold text-white flex items-center gap-1.5 hover:gap-2.5 transition-all mt-4 w-fit"
              >
                Read Article <ArrowRight className="h-4 w-4 text-brand-teal animate-pulse" />
              </Link>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="col-span-full py-16 text-center text-zinc-500 font-bold">
              No matching blueprints found. Try adjusting your query.
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
