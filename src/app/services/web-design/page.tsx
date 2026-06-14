"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Monitor, 
  Laptop, 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Zap, 
  Sliders, 
  Layers, 
  Maximize2 
} from "lucide-react";

export default function WebDesign() {
  const { openQuiz } = useApp();
  
  // Before/After slider control (0 to 100 representing clip-path position)
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeStep, setActiveStep] = useState(0);

  const portfolioItems = [
    { title: "SaaS Dashboard Portal", tag: "SaaS", metrics: "+140% Conversion", stack: "Next.js, Tailwind, Framer" },
    { title: "E-Commerce Fashion Hub", tag: "E-commerce", metrics: "+85% Average Order Value", stack: "Shopify Engine, React" },
    { title: "B2B Tech platform", tag: "Professional Services", metrics: "-40% Bounce Rate", stack: "Vite, Tailwind, GSAP" },
    { title: "Real Estate Broker App", tag: "Real Estate", metrics: "+200% Qual Leads", stack: "Next.js, MapBox, Supabase" }
  ];

  const designSteps = [
    { title: "Discovery & Strategy", desc: "We map out user flows, perform competitor benchmarks, and align on high-fidelity user personas." },
    { title: "Wireframing & UX Design", desc: "Building the skeletal blueprint of your app, optimizing lead hotspots and scrolling rhythms." },
    { title: "Visual Design & Branding", desc: "Crafting beautiful colors, custom geometry, typography, and glowing dark-mode mockups." },
    { title: "Development & Integration", desc: "Writing ultra-clean, serverless Next.js structures with custom animations and API pipes." },
    { title: "Testing & Launch", desc: "Rigorous Core Web Vitals audits, browser compatibility checks, and server setup migrations." }
  ];

  const checklistItems = [
    "Mobile-first responsive layout optimization",
    "Technical on-page SEO metadata tags",
    "Speed audits targeting sub-second load times",
    "Conversion rate optimization hotspot layouts",
    "Stripe payments & e-commerce shopping checkouts",
    "A/B testing configuration framework scripts",
    "Dynamic analytics tagging (GA4 / Hotjar)",
    "White-glove deployment hosting handovers"
  ];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background radial highlights */}
      <div className="absolute top-[10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-brand-blue/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-amber/5 blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:px-8 text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/20 bg-brand-blue/10 px-4 py-1.5 text-[12px] font-bold text-brand-blue">
          <Layers className="h-3.5 w-3.5" />
          CONVERSION-DRIVEN DEVELOPMENT
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
          Website Design That <br />
          <span className="text-gradient-blue">Converts Visitors to Leads</span>
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Beautiful, lightning-fast, AI-optimized digital platforms designed to lock attention and drive action.
        </p>

        <button
          onClick={openQuiz}
          className="h-14 px-8 mt-4 rounded-full text-base font-bold text-white shimmer-btn flex items-center gap-2 cursor-pointer"
        >
          Get Free Assessment
          <ArrowRight className="h-4 w-4" />
        </button>

        {/* 3D Perspective Device Mockup Showcase */}
        <div className="w-full max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-end perspective-1000">
          
          {/* Laptop (Center) */}
          <div className="md:col-span-8 rounded-2xl border border-white/10 bg-zinc-950 p-2 shadow-2xl transform rotateX-6 scale-95 relative group hover:border-brand-blue/40 transition-colors">
            <div className="w-full h-4 bg-zinc-900 rounded-t-lg flex items-center gap-1.5 px-3">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              <span className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            {/* Mock website inside */}
            <div className="w-full h-[250px] bg-brand-navy rounded-b-lg flex flex-col justify-center items-center relative overflow-hidden p-6">
              <div className="absolute top-[20%] right-[-10%] h-[150px] w-[150px] bg-brand-blue/10 blur-2xl rounded-full" />
              <span className="text-[11px] font-bold text-brand-teal uppercase tracking-widest">Client Portal Mockup</span>
              <h4 className="text-xl font-bold text-white mt-2 mb-3 text-center">Interactive Admin Dashboard</h4>
              <div className="w-full max-w-xs h-3 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[70%] h-full bg-brand-blue" />
              </div>
            </div>
            <Laptop className="absolute bottom-2 right-4 h-6 w-6 text-zinc-700" />
          </div>

          {/* Smartphone (Right) */}
          <div className="md:col-span-4 rounded-[30px] border-4 border-zinc-800 bg-zinc-950 p-2 shadow-2xl transform rotateY-10 rotateX-6 scale-90 relative hover:border-brand-amber/40 transition-colors">
            <div className="w-full h-4 flex justify-center mb-1">
              <div className="h-3.5 w-16 bg-zinc-800 rounded-full" />
            </div>
            <div className="w-full h-[220px] bg-brand-dark rounded-[20px] flex flex-col justify-between p-4 relative overflow-hidden">
              <span className="text-[9px] font-bold text-brand-amber uppercase">Mobile Web</span>
              <div className="h-2 w-10 bg-white/10 rounded-full" />
              <div className="h-2 w-14 bg-white/10 rounded-full" />
              <button className="h-8 w-full bg-brand-amber rounded-xl text-[10px] font-bold text-brand-navy">
                Book Consultation
              </button>
            </div>
            <Smartphone className="absolute bottom-2 right-4 h-5 w-5 text-zinc-700" />
          </div>

        </div>
      </section>

      {/* PORTFOLIO SECTION (INTERACTIVE BEFORE/AFTER SLIDER) */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-white">Before & After Redesign</h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-[15px]">
            Drag or hover across the slider below to compare standard legacy designs against the VisuaLab premium layout.
          </p>
        </div>

        {/* Interactive Before/After slider container */}
        <div className="max-w-3xl mx-auto mb-16">
          <div 
            className="relative w-full h-[400px] rounded-2xl border border-white/10 overflow-hidden cursor-ew-resize select-none shadow-2xl"
            onMouseMove={handleSliderMove}
            onTouchMove={handleTouchMove}
          >
            {/* BEFORE LAYER (Background) */}
            <div className="absolute inset-0 bg-[#121214] flex flex-col justify-center items-center text-center p-8">
              <div className="absolute top-4 left-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded">
                LEGACY SITE (BEFORE)
              </div>
              <div className="max-w-xs flex flex-col gap-3">
                <div className="h-6 w-20 bg-zinc-800 rounded mx-auto" />
                <h4 className="text-xl font-bold text-zinc-500 font-serif">Welcome to our company site</h4>
                <p className="text-[12px] text-zinc-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec arcu ac tellus.</p>
                <div className="h-10 w-32 bg-zinc-800 rounded mx-auto border border-zinc-700" />
              </div>
            </div>

            {/* AFTER LAYER (Clipping overlay) */}
            <div 
              className="absolute inset-0 bg-brand-navy border-r-2 border-brand-teal flex flex-col justify-center items-center text-center p-8"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <div className="absolute top-4 left-4 text-[10px] font-extrabold text-brand-teal uppercase tracking-widest bg-brand-teal/10 px-2.5 py-1 rounded border border-brand-teal/20">
                VISUALAB REDESIGN (AFTER)
              </div>
              <div className="absolute top-[20%] right-[20%] h-[200px] w-[200px] bg-brand-blue/10 blur-3xl rounded-full pointer-events-none" />
              <div className="max-w-xs flex flex-col gap-4 relative">
                <div className="inline-flex mx-auto items-center gap-1 text-[10px] font-bold text-brand-amber bg-brand-amber/10 border border-brand-amber/20 px-2.5 py-1 rounded-full">
                  <Zap className="h-3 w-3 fill-current" /> Fast & Optimized
                </div>
                <h4 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
                  Accelerate Operations with AI Control
                </h4>
                <p className="text-[13px] text-zinc-400 leading-relaxed">
                  Connect automation triggers, qualify business leads, and save hours daily.
                </p>
                <button className="h-11 w-40 bg-brand-blue rounded-full text-[12px] font-bold text-white shadow-[0_0_10px_rgba(0,102,255,0.3)] mx-auto flex items-center justify-center gap-1">
                  Start Assessment <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Handle center overlay */}
            <div 
              className="absolute top-0 bottom-0 w-1 pointer-events-none flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="h-12 w-12 rounded-full border-2 border-brand-teal bg-brand-navy shadow-lg flex items-center justify-center text-brand-teal -translate-x-1/2">
                <Sliders className="h-4 w-4" />
              </div>
            </div>

          </div>
        </div>

        {/* Portfolio Cases list */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {portfolioItems.map((item, idx) => (
            <div key={idx} className="glassmorphism-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-zinc-500 uppercase">{item.tag}</span>
                <h3 className="text-base font-bold text-white mt-2 mb-1">{item.title}</h3>
                <p className="text-[12px] text-zinc-500">{item.stack}</p>
              </div>
              <div className="text-[13px] font-extrabold text-brand-teal mt-4 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {item.metrics}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESIGN PROCESS TIMELINE */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-white">Our Visual Design Blueprint</h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-[15px]">
            We build platforms sequentially to guarantee responsive quality and SEO standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {designSteps.map((step, idx) => (
            <div 
              key={idx}
              className={`rounded-2xl border p-5 transition-all flex flex-col gap-3 cursor-pointer ${
                activeStep === idx 
                  ? "bg-white/5 border-brand-blue/30 shadow-[0_0_15px_rgba(0,102,255,0.15)]" 
                  : "bg-transparent border-white/5 hover:bg-white/2"
              }`}
              onClick={() => setActiveStep(idx)}
            >
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-[14px] ${
                activeStep === idx ? "bg-brand-blue text-white" : "bg-white/5 text-zinc-500"
              }`}>
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-white leading-snug">{step.title}</h3>
              <p className="text-[12px] text-zinc-400 leading-relaxed font-normal">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES INCLUDED CHECKLIST */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="rounded-3xl border border-white/5 bg-brand-dark/25 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-[11px] font-extrabold text-brand-teal uppercase tracking-widest">Comprehensive Setup</span>
              <h2 className="text-3xl font-extrabold text-white">Every Site is Built to Convert</h2>
              <p className="text-[14px] text-zinc-400 font-normal leading-relaxed">
                We design sites with SEO-first structures and responsive layouts, matching all technical parameters.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {checklistItems.map((item, cIdx) => (
                <div key={cIdx} className="flex items-start gap-2.5">
                  <CheckCircle className="h-5 w-5 text-brand-teal shrink-0 mt-0.5" />
                  <span className="text-[13px] text-zinc-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCOPING AUDIT INQUIRY */}
      <section id="scoping-audit" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-indigo/30 via-brand-dark/50 to-transparent p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-2xl relative">
          <div className="absolute top-0 right-0 h-[200px] w-[200px] bg-brand-blue/10 blur-[85px] pointer-events-none" />
          <span className="text-[11px] font-extrabold text-brand-teal uppercase tracking-widest">Quote Inquiry Funnel</span>
          <h2 className="text-3xl font-extrabold text-white">Get a Custom Quote for Your Web Project</h2>
          <p className="text-[14px] text-zinc-400 max-w-xl font-normal leading-relaxed mx-auto">
            Every business requires custom web interfaces matching their transaction speeds, CRM systems, and brand guidelines. Complete our brief Operations Assessment to get a custom proposal.
          </p>
          <button
            onClick={openQuiz}
            className="h-14 px-8 mt-2 rounded-full text-base font-bold text-white shimmer-btn flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:scale-105 transition-all"
          >
            Start Web Scoping Quiz
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

    </div>
  );
}
