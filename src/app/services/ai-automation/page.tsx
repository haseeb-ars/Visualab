"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Database, 
  MessageSquare, 
  UserCheck, 
  Calendar,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  Cpu,
  BarChart2,
  Workflow
} from "lucide-react";

export default function AIAutomation() {
  const { openQuiz } = useApp();
  
  // ROI Slider state
  const [adminHours, setAdminHours] = useState(25);
  const [teamSize, setTeamSize] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(40);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  // Calculations for ROI
  const weeklyHoursSaved = Math.round(adminHours * 0.75); // Assume 75% automation potential
  const yearlyHoursSaved = weeklyHoursSaved * 52 * teamSize;
  const yearlySavings = yearlyHoursSaved * hourlyRate;
  
  // Calculate Before vs After costs
  const beforeCost = adminHours * 52 * teamSize * hourlyRate;
  const afterCost = beforeCost * 0.25; // 75% savings

  // 3D Flip cards data
  const solveCards = [
    {
      title: "Email Management",
      icon: Mail,
      prob: "Hours spent sorting, tagging, and writing repetitive email replies.",
      sol: "AI reads incoming mail, draft replies, categorizes threads, and triggers actions.",
      time: "2-3 weeks",
      color: "from-brand-amber/20 to-brand-indigo/10",
      border: "border-brand-amber/20"
    },
    {
      title: "Data Processing",
      icon: Database,
      prob: "Manual copying of invoice sheets, spreadsheets, or client records.",
      sol: "Optical Character Recognition (OCR) + LLMs extract, structure, and sync data instantly.",
      time: "3-4 weeks",
      color: "from-brand-blue/20 to-brand-indigo/10",
      border: "border-brand-blue/20"
    },
    {
      title: "Customer Support",
      icon: MessageSquare,
      prob: "Late support ticket replies leading to customer drop-offs and poor ratings.",
      sol: "24/7 intelligent chat agents hooked to your company knowledge base.",
      time: "2 weeks",
      color: "from-brand-teal/20 to-brand-indigo/10",
      border: "border-brand-teal/20"
    },
    {
      title: "Lead Qualification",
      icon: UserCheck,
      prob: "Cold leads cluttering CRM and sales reps calling unqualified contacts.",
      sol: "AI auto-scrapes leads, scores readiness, and routes hot deals to calendars.",
      time: "2-3 weeks",
      color: "from-indigo-500/10 to-brand-indigo/10",
      border: "border-indigo-500/20"
    },
    {
      title: "Admin Tasks",
      icon: Calendar,
      prob: "Calendar booking conflicts and messy cross-tool notifications.",
      sol: "Intelligent scheduling loops and cross-API webhook synchronizations.",
      time: "1-2 weeks",
      color: "from-pink-500/10 to-brand-indigo/10",
      border: "border-pink-500/20"
    }
  ];

  // How it works timeline
  const processSteps = [
    {
      title: "Operations Audit & Assessment",
      icon: Cpu,
      desc: "We run a comprehensive deep dive into your business's current software ecosystem, mapping out bottleneck tasks, repetitive data entry loops, and resource drains to create a solid automation heat map."
    },
    {
      title: "Agentic Custom System Design",
      icon: Workflow,
      desc: "Our engineers architect bespoke automation paths, prompt guidelines, custom agent loops, API configurations, and security protocols, defining a clear implementation roadmap."
    },
    {
      title: "System Integration & Deploy",
      icon: Layers,
      desc: "We write the custom scripts, integrate with your current systems (Shopify, HubSpot, Slack, Stripe), train the AI models on your company databases, and perform robust dry runs."
    },
    {
      title: "Continuous Prompt Tuning",
      icon: TrendingUp,
      desc: "Post-deployment, we audit output quality, refine system parameters, update knowledge bases, and scale system capacity dynamically as your transaction volumes grow."
    }
  ];

  // Feature Deep Dive grid
  const features = [
    { name: "24/7 Automation", desc: "Intelligent agents operate round the clock without lag." },
    { name: "Multi-language Support", desc: "Automate emails & customer tickets in 40+ languages." },
    { name: "API Integrations", desc: "Connect natively with Stripe, Shopify, Salesforce, etc." },
    { name: "Custom Workflows", desc: "Tailored logical splits to match your exact processes." },
    { name: "Real-time Analytics", desc: "Log and visualize every transaction inside your dashboard." },
    { name: "Enterprise Security", desc: "SOC2-compliant data handling and localized hosting." },
    { name: "Scalable Architecture", desc: "Runs on elastic serverless node frameworks." },
    { name: "Continuous Learning", desc: "System auto-flags low-confidence runs for human review." },
    { name: "Complete Audit Trail", desc: "Track precisely why the AI took a specific action." },
    { name: "Custom SMS/Email Alerts", desc: "Trigger notifications on high-priority exceptions." },
    { name: "Batch Processing", desc: "Upload thousands of invoices/leads for concurrent processing." },
    { name: "White-label Option", desc: "Brand custom client portals under your own domain." }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background radial highlights */}
      <div className="absolute top-[10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-brand-amber-glow blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] left-[-15%] h-[600px] w-[600px] rounded-full bg-brand-blue/5 blur-[140px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:px-8 text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-amber/20 bg-brand-amber/10 px-4 py-1.5 text-[12px] font-bold text-brand-amber">
          <Workflow className="h-3.5 w-3.5" />
          SYSTEM OPERATIONS ON AUTOPILOT
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
          Your Business Operations <br />
          <span className="text-gradient-amber-teal">Run on Autopilot</span>
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Remove manual admin overhead, synchronize disconnected SaaS applications, and power customer support with custom-trained AI agents.
        </p>

        <button
          onClick={openQuiz}
          className="h-14 px-8 mt-4 rounded-full text-base font-bold text-white shimmer-btn flex items-center gap-2 cursor-pointer"
        >
          Compute Operational Savings
          <TrendingUp className="h-5 w-5" />
        </button>
      </section>

      {/* SECTION 1: WHAT AI SOLVES (3D FLIP CARDS) */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-white">Identify and Eliminate Bottlenecks</h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-[15px]">
            Hover over each operational area to see the exact manual bottleneck vs. the VisuaLab AI solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 perspective-1000">
          {solveCards.map((card, idx) => {
            const CardIcon = card.icon;
            return (
              <div 
                key={idx} 
                className="h-[320px] relative preserve-3d group cursor-pointer"
              >
                {/* Front Side */}
                <div className={`absolute inset-0 rounded-2xl border ${card.border} bg-gradient-to-br ${card.color} p-6 flex flex-col justify-between backface-hidden transition-transform duration-500 group-hover:rotate-y-180`}>
                  <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white">
                    <CardIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-[12px] text-zinc-400 leading-normal font-normal">{card.prob}</p>
                  </div>
                  <div className="text-[11px] font-bold text-brand-amber uppercase tracking-wider">Hover to solve</div>
                </div>

                {/* Back Side */}
                <div className={`absolute inset-0 rounded-2xl border border-brand-teal/20 bg-gradient-to-br from-brand-teal/5 to-brand-navy p-6 flex flex-col justify-between backface-hidden rotate-y-180 transition-transform duration-500 group-hover:rotate-y-0`}>
                  <div className="h-8 w-8 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-extrabold text-brand-teal uppercase tracking-wider mb-2">VisuaLab Automation</h4>
                    <p className="text-[12px] text-zinc-300 leading-normal font-normal">{card.sol}</p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 font-bold border-t border-white/5 pt-3">
                    <span>DEPLOY TIME:</span>
                    <span className="text-white flex items-center gap-1">
                      <Clock className="h-3 w-3 text-brand-teal" /> {card.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: ROI SAVINGS CALCULATOR */}
      <section id="roi-calculator" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5 bg-brand-dark/20 rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Sliders Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-[12px] font-extrabold text-brand-amber uppercase tracking-wider">Real ROI Calculations</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Estimate Your Operational Savings</h2>
              <p className="text-[14px] text-zinc-400 font-normal leading-relaxed mt-2">
                Adjust the sliders below to calculate the impact of automating 75% of your administrative tasks.
              </p>
            </div>

            <div className="flex flex-col gap-6 mt-4">
              {/* Slider 1: Hours */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[13px] font-bold">
                  <span className="text-zinc-400">Admin Hours / Week (Per Staff):</span>
                  <span className="text-white">{adminHours} Hours</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  value={adminHours}
                  onChange={(e) => setAdminHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-amber"
                />
              </div>

              {/* Slider 2: Team Size */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[13px] font-bold">
                  <span className="text-zinc-400">Administrative Team Size:</span>
                  <span className="text-white">{teamSize} People</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-amber"
                />
              </div>

              {/* Slider 3: Hourly Rate */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[13px] font-bold">
                  <span className="text-zinc-400">Average Hourly Rate:</span>
                  <span className="text-white">${hourlyRate} / Hr</span>
                </div>
                <input 
                  type="range" 
                  min="15" 
                  max="150" 
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-amber"
                />
              </div>
            </div>
          </div>

          {/* Right SVG Chart Column */}
          <div className="lg:col-span-6 flex flex-col md:flex-row gap-8 items-center justify-center p-8 rounded-2xl glassmorphism border border-white/5">
            
            <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
              <div>
                <h4 className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest">Reclaimed Resources</h4>
                <p className="text-4xl font-extrabold text-brand-teal mt-1">{yearlyHoursSaved.toLocaleString()}</p>
                <p className="text-[12px] text-zinc-400 mt-1">Hours Reclaimed Annually</p>
              </div>

              <div>
                <h4 className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest">Projected Savings</h4>
                <p className="text-4xl font-extrabold text-white mt-1">${yearlySavings.toLocaleString()}</p>
                <p className="text-[12px] text-zinc-400 mt-1">Operational Cost Saved / Year</p>
              </div>
            </div>

            {/* Dynamic Comparison Bar Chart (SVG-based) */}
            <div className="flex flex-col items-center gap-3 w-[200px]">
              <svg width="200" height="240" viewBox="0 0 200 240" className="overflow-visible">
                {/* Y Axis Gridlines */}
                <line x1="20" y1="20" x2="180" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="20" y1="110" x2="180" y2="110" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="20" y1="200" x2="180" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />

                {/* Before Bar */}
                <rect 
                  x="45" 
                  y={200 - 160} // Max height 160px
                  width="35" 
                  height={160} 
                  rx="6"
                  fill="url(#beforeGrad)"
                  className="transition-all duration-300"
                />
                
                {/* After Bar */}
                <rect 
                  x="120" 
                  y={200 - 40} // 25% of height
                  width="35" 
                  height={40} 
                  rx="6"
                  fill="url(#afterGrad)"
                  className="transition-all duration-300"
                />

                {/* Values labels */}
                <text x="62" y={200 - 170} fill="#888" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ${Math.round(beforeCost / 1000)}k
                </text>
                <text x="137" y={200 - 50} fill="#0ea5e9" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ${Math.round(afterCost / 1000)}k
                </text>

                {/* Bottom Labels */}
                <text x="62" y="220" fill="#666" fontSize="10" fontWeight="bold" textAnchor="middle">BEFORE</text>
                <text x="137" y="220" fill="#0ea5e9" fontSize="10" fontWeight="bold" textAnchor="middle">AFTER</text>

                {/* Gradients */}
                <defs>
                  <linearGradient id="beforeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#1a1a3e" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="afterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0066ff" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[11px] font-bold text-zinc-500 uppercase">Yearly Operational Cost</span>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (VERTICAL PROCESS TIMELINE) */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-white">Our 4-Step Automation Method</h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-[15px]">
            Click each step to expand details regarding our system engineering lifecycle.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4 relative pl-8 border-l border-white/5">
          {processSteps.map((step, idx) => {
            const StepIcon = step.icon;
            const isExpanded = expandedStep === idx;
            return (
              <div 
                key={idx}
                className="relative mb-6 last:mb-0 cursor-pointer"
                onClick={() => setExpandedStep(isExpanded ? null : idx)}
              >
                {/* Bullet Node */}
                <div className={`absolute -left-[49px] top-1 h-8 w-8 rounded-full border flex items-center justify-center transition-colors ${
                  isExpanded ? "bg-brand-amber border-brand-amber text-brand-navy shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "bg-brand-navy border-white/10 text-zinc-500"
                }`}>
                  <StepIcon className="h-4 w-4" />
                </div>

                <div className={`rounded-xl border p-5 transition-all ${
                  isExpanded ? "bg-white/5 border-brand-amber/30" : "bg-transparent border-transparent hover:bg-white/2"
                }`}>
                  <h3 className="text-lg font-bold text-white flex items-center justify-between">
                    {step.title}
                    <span className="text-[12px] font-bold text-zinc-500">STEP 0{idx + 1}</span>
                  </h3>
                  
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 text-[14px] text-zinc-400 leading-relaxed font-normal overflow-hidden"
                      >
                        {step.desc}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: USE CASES BY INDUSTRY */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-white">Solutions for Every Sector</h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-[15px]">
            Tailored AI setups configured to address specific industry inefficiencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: "E-Commerce", pain: "Inventory lag & order syncing", sol: "AI auto-scrapes vendor catalogs, tracks stock logs, and formats product listings." },
            { tag: "Professional Services", pain: "Repetitive calendar bookings", sol: "Auto-routes incoming clients based on capacity and scores budget targets." },
            { tag: "Real Estate", pain: "Manually processing leads", sol: "Intelligent SMS bots qualify buyer budget levels and update agent listings." },
            { tag: "Manufacturing", pain: "Invoice & supply processing", sol: "OCR pipelines automatically classify invoices and file supply receipts." },
            { tag: "Marketing Agencies", pain: "Manual client reports data", sol: "Automated report scrapers fetch metrics and build styled slide exports." },
            { tag: "SaaS Startups", pain: "High customer support loads", sol: "Hybrid AI chatbot routes complex API tickets directly to developers." }
          ].map((useCase, uIdx) => (
            <div key={uIdx} className="glassmorphism-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-extrabold text-brand-teal bg-brand-teal/10 px-2.5 py-1 rounded-full border border-brand-teal/20 w-fit">
                  {useCase.tag}
                </span>
                <h3 className="text-base font-bold text-white mt-4 mb-2">{useCase.pain}</h3>
                <p className="text-[13px] text-zinc-400 font-normal leading-relaxed">{useCase.sol}</p>
              </div>
              <div className="text-[12px] font-bold text-zinc-500 uppercase mt-4">Estimated ROI: 4x Cost Saved</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: FEATURES DEEP DIVE (12 GRID) */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-white">Engineered for Reliability</h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-[15px]">
            Every VisuaLab automation plan includes our complete suite of framework features.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feat, fIdx) => (
            <div key={fIdx} className="glassmorphism-card rounded-xl p-5 border border-white/5 hover:border-brand-amber/20 transition-all flex flex-col gap-2">
              <h3 className="text-[15px] font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-amber" />
                {feat.name}
              </h3>
              <p className="text-[12px] text-zinc-500 font-normal leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-amber/20 via-brand-dark/50 to-transparent p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-2xl relative">
          <div className="absolute top-0 right-0 h-[200px] w-[200px] bg-brand-amber-glow blur-[80px] pointer-events-none" />
          <h2 className="text-3xl font-extrabold text-white">Get a Custom Integration Roadmap</h2>
          <p className="text-[15px] text-zinc-400 max-w-xl font-normal leading-relaxed">
            Take our operations assessment to get details on savings targets, implementation times, and project scoping.
          </p>
          <button
            onClick={openQuiz}
            className="h-14 px-8 rounded-full text-base font-bold text-white shimmer-btn flex items-center gap-2 cursor-pointer"
          >
            Start Operations Assessment
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
