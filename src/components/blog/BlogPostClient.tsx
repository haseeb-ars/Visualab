"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  User, 
  Zap 
} from "lucide-react";

interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryDisplay: string;
  date: string;
  readTime: string;
  color: string;
  author: string;
  role: string;
  intro: string;
  toc: string[];
  contentHtml: string;
}

interface BlogPostClientProps {
  post: BlogPostData;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { openQuiz } = useApp();

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background radial lights */}
      <div className="absolute top-[10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-amber-glow blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-15%] h-[500px] w-[500px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-8 sm:px-8 border-b border-white/5">
        <Link 
          href="/blog" 
          className="flex items-center gap-1 text-[13px] font-bold text-zinc-500 hover:text-white transition-colors mb-6 w-fit"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Insights
        </Link>

        <div className="flex items-center gap-2 mb-4 text-[12px] font-bold text-zinc-500 uppercase">
          <span className="text-brand-teal">{post.categoryDisplay}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {post.date}
          </span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {post.title}
        </h1>
        
        <p className="text-base text-zinc-400 font-normal leading-relaxed mt-4">
          {post.intro}
        </p>
      </section>

      {/* Main Content & TOC Grid */}
      <section className="mx-auto max-w-4xl px-6 py-12 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Table of Contents Sidebar */}
          <div className="md:col-span-4 order-2 md:order-1">
            <div className="sticky top-28 flex flex-col gap-6 p-5 rounded-2xl glassmorphism border border-white/5">
              <h4 className="text-[12px] font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-brand-teal" />
                Table of Contents
              </h4>
              <ul className="flex flex-col gap-3 text-[13px] font-bold text-zinc-500">
                {post.toc.map((item) => {
                  const itemSlug = item.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return (
                    <li key={item}>
                      <a 
                        href={`#${itemSlug}`}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Article Body */}
          <article className="md:col-span-8 order-1 md:order-2 flex flex-col gap-4">
            <div 
              className="flex flex-col gap-6 text-[14px] text-zinc-300 leading-relaxed font-normal blog-content-html"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Author Card */}
            <div className="mt-12 p-6 rounded-2xl bg-white/2 border border-white/5 flex gap-4 items-center">
              <div className="h-12 w-12 rounded-full bg-brand-amber/20 text-brand-amber flex items-center justify-center shrink-0">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h5 className="text-[14px] font-bold text-white">{post.author}</h5>
                <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{post.role}</p>
              </div>
            </div>
          </article>

        </div>
      </section>

      {/* BOTTOM ACTION CTA BOX */}
      <section className="mx-auto max-w-4xl px-6 pb-24 sm:px-8 border-t border-white/5 pt-16">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-indigo/30 via-brand-dark/50 to-transparent p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-2xl relative">
          <div className="absolute top-0 right-0 h-[200px] w-[200px] bg-brand-blue/10 blur-[85px] pointer-events-none" />
          <h2 className="text-2xl font-extrabold text-white">Optimize Your Operational Workflow</h2>
          <p className="text-[13px] text-zinc-400 max-w-md font-normal leading-relaxed">
            Run a free system assessment to isolate data bottlenecks and qualify for deployment retainer support.
          </p>
          <button
            onClick={openQuiz}
            className="h-12 px-6 rounded-full text-[13px] font-bold text-white shimmer-btn flex items-center gap-2 cursor-pointer"
          >
            Start Operations Assessment
            <Zap className="h-4 w-4 fill-current text-white" />
          </button>
        </div>
      </section>

    </div>
  );
}
