"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import HeroAvatar from "@/components/ui/HeroAvatar";
import CountingNumber from "@/components/ui/CountingNumber";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Layers, 
  ShoppingBag, 
  Zap, 
  TrendingUp, 
  ShieldCheck,
  Star
} from "lucide-react";

export default function Home() {
  const { openQuiz } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
    }
  };

  const logos = ["Vercel", "Shopify", "Stripe", "HubSpot", "Salesforce", "Supabase"];

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background glow meshes */}
      <div className="mesh-gradient-bg" />
      <div className="absolute top-[20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-amber/10 blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-20 sm:px-8 md:pt-20 lg:pt-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <motion.div 
              variants={itemVariants}
              className="inline-flex w-fit mx-auto lg:mx-0 items-center gap-1.5 rounded-full border border-brand-amber/30 bg-brand-amber/10 px-4 py-1.5 text-[12px] font-bold text-brand-amber shadow-[0_0_15px_rgba(251,191,36,0.2)]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              INTELLIGENT AI AUTOMATION AGENCY
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Automate Your Entire <br className="hidden sm:inline" />
              <span className="text-gradient-blue">Business with AI</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Save <span className="text-white font-semibold">20+ hours/week</span>. Reduce operational overheads by <span className="text-white font-semibold">60%</span>. Scale your team's throughput without hiring expensive overhead.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2"
            >
              <button
                onClick={openQuiz}
                className="h-14 px-8 rounded-full text-base font-bold text-white shimmer-btn flex items-center justify-center gap-2 cursor-pointer"
              >
                Start Your Free AI Assessment
                <Zap className="h-5 w-5 fill-current" />
              </button>
              
              <Link
                href="/services/ai-automation"
                className="h-14 px-8 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-base font-bold text-white flex items-center justify-center gap-2 transition-all"
              >
                See Our Services
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* Micro rating social proof */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-4 mt-6 border-t border-white/5 pt-6"
            >
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-[13px] text-zinc-500 font-medium">
                Trusted by 500+ businesses saving hours weekly.
              </p>
            </motion.div>
          </div>

          {/* Right 3D Avatar Column */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md h-[380px] md:h-[450px] rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md shadow-2xl overflow-hidden flex items-center justify-center group hover:border-brand-amber/20 transition-colors">
              <div className="absolute top-4 left-4 text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
                Interactive AI Core
              </div>
              <HeroAvatar />
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* STATS RHYTHM GRID */}
      <section className="border-y border-white/5 bg-brand-dark/30 py-12 relative z-10 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="flex flex-col gap-1.5 border-r border-white/5 last:border-r-0">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                <CountingNumber value={20} suffix="+" />
              </h3>
              <p className="text-[12px] sm:text-[13px] text-zinc-500 font-bold uppercase tracking-wider">Hours Saved / Wk</p>
            </div>

            <div className="flex flex-col gap-1.5 border-r border-white/5 last:border-r-0">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-amber">
                <CountingNumber value={60} suffix="%" />
              </h3>
              <p className="text-[12px] sm:text-[13px] text-zinc-500 font-bold uppercase tracking-wider">Cost Reduction</p>
            </div>

            <div className="flex flex-col gap-1.5 border-r border-white/5 last:border-r-0">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-teal">
                <CountingNumber value={500} suffix="+" />
              </h3>
              <p className="text-[12px] sm:text-[13px] text-zinc-500 font-bold uppercase tracking-wider">Active Clients</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center justify-center gap-1">
                <CountingNumber value={99} suffix="." />
                <span className="text-[24px]">9%</span>
                <ShieldCheck className="h-5 w-5 text-brand-teal inline shrink-0" />
              </h3>
              <p className="text-[12px] sm:text-[13px] text-zinc-500 font-bold uppercase tracking-wider">Uptime Guarantee</p>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST BADGE CAROUSEL */}
      <section className="py-12 border-b border-white/5 bg-brand-navy">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <p className="text-[12px] font-bold text-zinc-600 uppercase tracking-widest mb-6">INTEGRATES WITH YOUR CURRENT TECH STACK</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            {logos.map((logo) => (
              <span key={logo} className="text-xl font-bold tracking-tight text-white hover:opacity-100 transition-opacity">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* THREE CORE SERVICES PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Comprehensive Digital Systems Built for Scale
          </h2>
          <p className="text-base text-zinc-400 font-normal leading-relaxed">
            We specialize in deployable AI solutions while designing high-performance sites and custom Shopify backends to support your business expansion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: AI Automation */}
          <div className="glassmorphism-card rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-[100px] w-[100px] rounded-full bg-brand-amber/5 blur-3xl pointer-events-none" />
            <div className="h-12 w-12 rounded-xl bg-brand-amber/10 flex items-center justify-center text-brand-amber border border-brand-amber/20">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-amber transition-colors">AI Automation</h3>
              <p className="text-[14px] text-zinc-400 leading-relaxed font-normal">
                Deploy autonomous agents, automate databases, process invoices, handle schedules, and sync communications 24/7.
              </p>
            </div>
            <ul className="flex flex-col gap-2.5 text-[13px] text-zinc-500 font-medium border-t border-white/5 pt-6 mt-auto">
              <li className="flex items-center gap-2">✓ Automatic Lead Scoring</li>
              <li className="flex items-center gap-2">✓ Smart Support Agents</li>
              <li className="flex items-center gap-2">✓ Document Data Extraction</li>
            </ul>
            <Link 
              href="/services/ai-automation"
              className="text-[14px] font-bold text-white flex items-center gap-1 group-hover:gap-2 transition-all mt-4"
            >
              Explore AI Automation <ArrowRight className="h-4 w-4 text-brand-amber" />
            </Link>
          </div>

          {/* Card 2: Web Design */}
          <div className="glassmorphism-card rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-[100px] w-[100px] rounded-full bg-brand-blue/5 blur-3xl pointer-events-none" />
            <div className="h-12 w-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-blue transition-colors">Custom Web Design</h3>
              <p className="text-[14px] text-zinc-400 leading-relaxed font-normal">
                Build ultra-fast, premium websites optimized for user metrics, search engines, and premium lead conversions.
              </p>
            </div>
            <ul className="flex flex-col gap-2.5 text-[13px] text-zinc-500 font-medium border-t border-white/5 pt-6 mt-auto">
              <li className="flex items-center gap-2">✓ Responsive Layouts</li>
              <li className="flex items-center gap-2">✓ Technical SEO Setup</li>
              <li className="flex items-center gap-2">✓ A/B Conversion Tuning</li>
            </ul>
            <Link 
              href="/services/web-design"
              className="text-[14px] font-bold text-white flex items-center gap-1 group-hover:gap-2 transition-all mt-4"
            >
              Explore Web Design <ArrowRight className="h-4 w-4 text-brand-blue" />
            </Link>
          </div>

          {/* Card 3: Shopify Dev */}
          <div className="glassmorphism-card rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-[100px] w-[100px] rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />
            <div className="h-12 w-12 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal border border-brand-teal/20">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-teal transition-colors">Shopify Development</h3>
              <p className="text-[14px] text-zinc-400 leading-relaxed font-normal">
                Custom Liquid templates, headless commerce solutions, custom checkout modifications, and automated marketing flows.
              </p>
            </div>
            <ul className="flex flex-col gap-2.5 text-[13px] text-zinc-500 font-medium border-t border-white/5 pt-6 mt-auto">
              <li className="flex items-center gap-2">✓ Custom Liquid Development</li>
              <li className="flex items-center gap-2">✓ App Integrations</li>
              <li className="flex items-center gap-2">✓ Speed & Uptime Audits</li>
            </ul>
            <Link 
              href="/services/shopify-development"
              className="text-[14px] font-bold text-white flex items-center gap-1 group-hover:gap-2 transition-all mt-4"
            >
              Explore Shopify Dev <ArrowRight className="h-4 w-4 text-brand-teal" />
            </Link>
          </div>

        </div>
      </section>

      {/* LEAD FUNNEL BANNER SECTION */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-indigo/40 via-brand-dark/60 to-transparent p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
          
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-brand-blue/10 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-brand-amber/10 blur-[80px] pointer-events-none" />

          <div className="flex flex-col gap-4 max-w-2xl text-center md:text-left">
            <span className="text-[12px] font-extrabold tracking-wider text-brand-teal uppercase">Get Qualified in Minutes</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Ready to Save 20+ Hours a Week?
            </h2>
            <p className="text-[15px] text-zinc-400 font-normal leading-relaxed">
              Take our interactive assessment to see how much of your daily operations can be handled by AI. Receive a custom report with estimated ROI savings instantly.
            </p>
          </div>

          <button
            onClick={openQuiz}
            className="px-8 py-4 rounded-full text-base font-bold text-white shimmer-btn shrink-0 flex items-center gap-2 shadow-[0_0_20px_rgba(157,78,221,0.3)] hover:scale-105 transition-all cursor-pointer"
          >
            Start Operational Assessment
            <Zap className="h-5 w-5 fill-current text-white" />
          </button>

        </div>
      </section>

    </div>
  );
}
