"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import CountingNumber from "@/components/ui/CountingNumber";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  CheckCircle,
  FileDown
} from "lucide-react";

export default function CaseStudies() {
  const { openQuiz } = useApp();
  
  // Category Filter states
  const [filterCategory, setFilterCategory] = useState("all");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const cases = [
    {
      title: "Automated Invoice OCR Processing",
      company: "Apex Manufacturing",
      category: "ai",
      metric: "95% Reduction in Admin Hours",
      details: "Replaced a manual data entry team of 4 with a serverless OCR extraction model syncing invoices directly to SAP ERP database.",
      tech: "Node.js, AWS Textract, SAP API",
      savings: "$85,000 / Year Saved"
    },
    {
      title: "Custom Shopify Theme & Checkout Integration",
      company: "Moda Luxury Apparel",
      category: "shopify",
      metric: "+120% Conversion Increment",
      details: "Engineered a custom Liquid storefront, optimized Core Web Vitals, and coded dynamic checkout upsell blocks.",
      tech: "Shopify Liquid, Tailwind, Algolia",
      savings: "+$240k Revenue Boost"
    },
    {
      title: "Agentic Customer Ticket Auto-routing",
      company: "CyberSaaS Solutions",
      category: "ai",
      metric: "70% Ticket Resolution Automation",
      details: "Configured intelligent LLM support bots connected to custom corporate databases, routing outliers to Zendesk channels.",
      tech: "OpenAI API, LangChain, Node.js",
      savings: "24/7 Autopilot Support"
    },
    {
      title: "Full Website Branding & Conversion Tuning",
      company: "Zenith Venture Capital",
      category: "design",
      metric: "-45% Bounce Rate",
      details: "Designed a premium geometric dark-mode website using Next.js App Router, complete with smooth GSAP animations and structured forms.",
      tech: "Next.js, Tailwind, Framer Motion",
      savings: "+60% Qualified Inquiries"
    },
    {
      title: "Headless E-Commerce Migration",
      company: "Velo Nutrition",
      category: "shopify",
      metric: "+95 score Lighthouse Speed",
      details: "Migrated a legacy WooCommerce storefront to a headless Next.js frontend querying Shopify Storefront Graph APIs.",
      tech: "Next.js, Shopify Storefront API, Vercel",
      savings: "-2.4s Mobile Load Time"
    },
    {
      title: "Warehouse Stock Sync Middleware",
      company: "Glow Cosmetics",
      category: "shopify",
      metric: "0% Stock Discrepancy Errors",
      details: "Wrote private database connectors to sync shop inventories with local warehouse logs every 5 minutes.",
      tech: "Node.js, Postgres, Shopify Admin API",
      savings: "Saved 20 Hrs/Week Admin"
    }
  ];

  const testimonials = [
    {
      quote: "VisuaLab automated our invoicing completely. The OCR system is bulletproof, saving us over 30 hours of manual entries every week.",
      author: "Sarah Jenkins",
      role: "Operations Director",
      company: "Apex Manufacturing",
      rating: 5
    },
    {
      quote: "Our new Shopify store loads instantly. Conversions spiked within the first weekend of launching the custom Liquid theme.",
      author: "Marc Verner",
      role: "Founder",
      company: "Moda Luxury Apparel",
      rating: 5
    },
    {
      quote: "The Next.js website they built is stunning. It positions us as a premium firm and our inbound leads have grown significantly.",
      author: "David Vance",
      role: "Managing Partner",
      company: "Zenith Venture Capital",
      rating: 5
    }
  ];

  const filteredCases = filterCategory === "all" 
    ? cases 
    : cases.filter(c => c.category === filterCategory);

  const nextTestimonial = () => {
    setCarouselIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCarouselIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background radial spotlights */}
      <div className="absolute top-[10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-brand-blue/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-amber/5 blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-8 text-center flex flex-col items-center gap-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Operational <span className="text-gradient-amber-teal">Success Metrics</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Case studies documenting actual cost savings and conversion jumps for our clients.
        </p>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap justify-center bg-white/5 border border-white/5 rounded-full p-1 mt-6 gap-1">
          {[
            { label: "All Cases", val: "all" },
            { label: "AI Automation", val: "ai" },
            { label: "Web Design", val: "design" },
            { label: "Shopify Dev", val: "shopify" }
          ].map((cat) => (
            <button
              key={cat.val}
              onClick={() => setFilterCategory(cat.val)}
              className={`px-5 py-2 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                filterCategory === cat.val ? "bg-brand-blue text-white shadow-lg" : "text-zinc-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* FILTERABLE GRID */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((item, idx) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="glassmorphism-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-brand-amber/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                    <span className="text-[11px] font-extrabold text-brand-teal uppercase bg-brand-teal/10 px-2.5 py-1 rounded-full border border-brand-teal/20">
                      {item.company}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-500 uppercase">{item.category}</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-white mb-2 leading-snug">{item.title}</h3>
                  <p className="text-[12px] text-zinc-400 font-normal leading-relaxed mb-4">{item.details}</p>
                  <p className="text-[11px] text-zinc-500 font-bold uppercase">Tech Stack: {item.tech}</p>
                </div>

                <div className="mt-6 border-t border-white/5 pt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase">Impact</span>
                    <span className="text-[13px] font-extrabold text-white flex items-center gap-1 mt-0.5">
                      <TrendingUp className="h-4 w-4 text-brand-teal" />
                      {item.metric}
                    </span>
                  </div>
                  <div className="text-right flex flex-col">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase">Savings</span>
                    <span className="text-[13px] font-extrabold text-brand-amber mt-0.5">{item.savings}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 3D TESTIMONIALS CAROUSEL */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="text-center mb-12 flex flex-col gap-2">
          <Quote className="h-8 w-8 text-brand-amber mx-auto animate-pulse" />
          <h2 className="text-2xl font-extrabold text-white">Client Testimonials</h2>
        </div>

        <div className="relative glassmorphism rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 h-[100px] w-[100px] bg-brand-amber-glow blur-2xl pointer-events-none" />
          
          <div className="flex text-amber-500 mb-6 justify-center">
            {[...Array(testimonials[carouselIndex].rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>

          <p className="text-[15px] text-zinc-300 font-medium leading-relaxed italic text-center max-w-xl mb-6">
            "{testimonials[carouselIndex].quote}"
          </p>

          <div className="text-center">
            <h4 className="text-[15px] font-bold text-white">{testimonials[carouselIndex].author}</h4>
            <p className="text-[12px] text-zinc-500 font-medium mt-0.5">
              {testimonials[carouselIndex].role}, {testimonials[carouselIndex].company}
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex gap-4 mt-8">
            <button 
              onClick={prevTestimonial}
              className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* BRAND SOCIAL PROOF COUNTERS */}
      <section className="border-t border-white/5 bg-brand-dark/20 py-16 relative z-10 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="flex flex-col gap-1 border-r border-white/5 last:border-r-0">
              <h3 className="text-3xl font-extrabold text-white">
                <CountingNumber value={500} suffix="+" />
              </h3>
              <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">Implementations</p>
            </div>

            <div className="flex flex-col gap-1 border-r border-white/5 last:border-r-0">
              <h3 className="text-3xl font-extrabold text-brand-amber">
                <CountingNumber value={2} suffix="M+" />
              </h3>
              <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">Client Savings ($)</p>
            </div>

            <div className="flex flex-col gap-1 border-r border-white/5 last:border-r-0">
              <h3 className="text-3xl font-extrabold text-brand-teal">
                <CountingNumber value={98} suffix="%" />
              </h3>
              <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">Satisfaction Rate</p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-3xl font-extrabold text-white">
                <CountingNumber value={15} suffix="+" />
              </h3>
              <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">Combined Experience</p>
            </div>

          </div>
        </div>
      </section>

      {/* BOTTOM ASSESSMENT CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-indigo/30 via-brand-dark/50 to-transparent p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-2xl relative">
          <div className="absolute top-0 right-0 h-[200px] w-[200px] bg-brand-blue/10 blur-[85px] pointer-events-none" />
          <h2 className="text-3xl font-extrabold text-white">Scale Your Inbound Volume</h2>
          <p className="text-[14px] text-zinc-400 max-w-xl font-normal leading-relaxed">
            Take our operations assessment to get a custom roadmap detailing target ROI metrics.
          </p>
          <button
            onClick={openQuiz}
            className="h-14 px-8 rounded-full text-base font-bold text-white shimmer-btn flex items-center gap-2 cursor-pointer"
          >
            Start Operations Assessment
            <CheckCircle className="h-4.5 w-4.5" />
          </button>
        </div>
      </section>

    </div>
  );
}
