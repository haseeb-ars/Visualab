"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Cpu, 
  Layers, 
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  FileCheck
} from "lucide-react";

export default function Pricing() {
  const { openQuiz } = useApp();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const steps = [
    {
      name: "1. Operations Scoping Audit",
      desc: "Our engineering team analyzes your administrative workflow, mapping manual entry tasks and database structures to identify automation hotspots.",
      icon: Cpu
    },
    {
      name: "2. Custom Integration Blueprint",
      desc: "We construct a detailed blueprint outlining target API connections, data pipelines, support agent logic, and exact ROI savings targets.",
      icon: Layers
    },
    {
      name: "3. Project Scoping Proposal",
      desc: "You receive a fixed-price scoping proposal tailored to your team's size and transaction load, linking costs directly to hours reclaimed.",
      icon: FileCheck
    }
  ];

  const faqs = [
    {
      q: "Why do you not display flat pricing rates?",
      a: "Every business has a unique operational footprint. A Shopify store processing 5,000 orders a day requires different database syncing and customer support agent prompt parameters than a professional services firm handling calendar booking triggers. We quote individually to ensure you pay only for the exact pipeline bandwidth and engineering hours your setup requires."
    },
    {
      q: "How does billing work for custom AI automations?",
      a: "Once we scope your integration blueprint, we offer two main paths: a one-time project fee for custom script deployments, or a monthly system management retainer (subscription) covering hosting, SLA monitoring, database maintenance, and prompt tuning."
    },
    {
      q: "What support SLA is included in the project scope?",
      a: "All VisuaLab integrations include 30 days of post-launch debugging and monitoring. Ongoing retainers unlock dedicated support channels (Slack/Phone) with 4-hour response SLAs, guaranteeing prompt resolution of any API exception logs."
    },
    {
      q: "Can we integrate legacy ERP warehouse systems?",
      a: "Yes. Our engineering team specializes in writing custom middleware code connecting legacy on-premise systems (SAP, Sage, Dynamics) with Shopify storefront APIs and modern CRM databases."
    }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background radial spotlights */}
      <div className="absolute top-[10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-amber-glow blur-[120px] pointer-events-none" />
      <div className="absolute top-[35%] left-[-15%] h-[500px] w-[500px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* HERO HEADER */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-8 text-center flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-[12px] font-bold text-amber-400">
          <Zap className="h-3.5 w-3.5" />
          ROI-DRIVEN DYNAMIC PRICING
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Custom Scoped to Your <span className="text-gradient-blue">Operations</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
          We do not believe in one-size-fits-all software plans. We audit your databases, API scopes, and workflow load to deliver custom proposals.
        </p>
      </section>

      {/* DYNAMIC SCORING STEPS SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.name}
                className="glassmorphism-card rounded-2xl p-8 border border-white/5 flex flex-col gap-4 relative group"
              >
                <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-brand-teal mb-2">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">{step.name}</h3>
                <p className="text-[13px] text-zinc-400 font-normal leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* MAIN FUNNEL PROPOSITION */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-indigo/30 via-brand-dark/50 to-transparent p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-2xl relative">
          <div className="absolute top-0 right-0 h-[200px] w-[200px] bg-brand-blue/10 blur-[85px] pointer-events-none" />
          
          <span className="text-[11px] font-extrabold text-brand-teal uppercase tracking-widest">Quote Inquiry Funnel</span>
          <h2 className="text-3xl font-extrabold text-white">Ready for a Custom Operations Scoping Audit?</h2>
          <p className="text-[14px] text-zinc-400 max-w-2xl font-normal leading-relaxed">
            Take our 2-minute assessment quiz to catalog your manual data bottlenecks, team size, and integration requirements. We will compile a personalized audit report and issue a custom quote.
          </p>

          <button
            onClick={openQuiz}
            className="h-14 px-8 mt-2 rounded-full text-base font-bold text-white shimmer-btn flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:scale-105 transition-all"
          >
            Start Operations Scoping Quiz
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="text-center mb-12 flex flex-col gap-2">
          <HelpCircle className="h-8 w-8 text-amber-500 mx-auto animate-pulse" />
          <h2 className="text-2xl font-extrabold text-white">Scoping & Pricing FAQs</h2>
          <p className="text-zinc-500 text-[14px] font-normal">Common questions regarding scoping milestones and licensing.</p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div 
                key={idx} 
                className="rounded-2xl border border-white/5 bg-brand-dark/20 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-[15px] text-white hover:bg-white/2 transition-colors"
                >
                  {faq.q}
                  {isOpen ? <ChevronUp className="h-5 w-5 text-brand-blue" /> : <ChevronDown className="h-5 w-5 text-zinc-500" />}
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6 overflow-hidden text-[13px] text-zinc-400 leading-relaxed font-normal border-t border-white/2 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
