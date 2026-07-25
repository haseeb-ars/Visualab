"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  Calendar, 
  CheckCircle2, 
  Mail, 
  User, 
  Building, 
  Phone,
  ShoppingBag,
  Layers,
  Cpu,
  MessageSquare,
  Home
} from "lucide-react";
import confetti from "canvas-confetti";

export default function QuizModal() {
  const { 
    isQuizOpen, 
    closeQuiz, 
    selectedService, 
    quizAnswers, 
    updateQuizAnswers, 
    resetQuizAnswers 
  } = useApp();

  const [activeService, setActiveService] = useState<string>("shopify");
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Sync active service when modal opens or selectedService changes
  useEffect(() => {
    if (selectedService) {
      const lower = selectedService.toLowerCase();
      if (lower.includes("shopify")) setActiveService("shopify");
      else if (lower.includes("web")) setActiveService("web");
      else if (lower.includes("ai")) setActiveService("ai");
      setStep(1);
    } else if (quizAnswers.service) {
      setActiveService(quizAnswers.service);
    }
  }, [selectedService, isQuizOpen, quizAnswers.service]);

  if (!isQuizOpen) return null;

  // Total question steps before contact form
  const contactStep = 5;
  const thankYouStep = 6;

  // Slide animation settings
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: "easeOut" as const }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" as const }
    })
  };

  const handleServiceSelect = (serviceId: string) => {
    setActiveService(serviceId);
    updateQuizAnswers("service", serviceId);
    setDirection(1);
    setStep(1);
  };

  const handleSelectOption = (key: string, value: any, autoAdvance = true) => {
    updateQuizAnswers(key, value);
    if (autoAdvance) {
      setTimeout(() => navigate(1), 180);
    }
  };

  const handleToggleArrayOption = (key: string, option: string) => {
    const rawVal = (quizAnswers as Record<string, any>)[key];
    const current: string[] = Array.isArray(rawVal) ? [...rawVal] : [];
    const index = current.indexOf(option);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(option);
    }
    updateQuizAnswers(key, current);
  };

  const navigate = (dir: number) => {
    setDirection(dir);
    setStep((prev) => {
      const nextStep = prev + dir;
      if (nextStep < 1) return 1;
      if (nextStep > thankYouStep) return thankYouStep;
      return nextStep;
    });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const submissionPayload = {
      service: activeService,
      answers: quizAnswers,
      submittedAt: new Date().toISOString()
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionPayload),
      });
    } catch (err) {
      console.error("Failed to post lead", err);
    }

    setSubmitting(false);
    setStep(thankYouStep);
    
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getServiceTitle = () => {
    if (activeService === "shopify") return "Shopify Development Inquiry";
    if (activeService === "web") return "Website Design Inquiry";
    return "AI Automation Inquiry";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/85 backdrop-blur-lg px-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl glassmorphism-card shadow-2xl p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto flex flex-col border border-white/10">
        
        {/* Close Button */}
        <button 
          onClick={closeQuiz}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors cursor-pointer z-10"
          aria-label="Close Modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Top Header & Service Selector */}
        {step <= contactStep && (
          <div className="mb-6">
            <div className="flex items-center justify-between gap-2 mb-4 pr-8">
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full border border-brand-teal/20">
                {getServiceTitle()}
              </span>

              {/* Service switcher tabs */}
              <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5 text-[11px] font-bold">
                <button
                  onClick={() => handleServiceSelect("shopify")}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeService === "shopify" ? "bg-brand-teal text-brand-navy font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Shopify
                </button>
                <button
                  onClick={() => handleServiceSelect("web")}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeService === "web" ? "bg-brand-blue text-white font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Web Design
                </button>
                <button
                  onClick={() => handleServiceSelect("ai")}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeService === "ai" ? "bg-brand-amber text-brand-navy font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  AI Automation
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-blue via-brand-teal to-brand-amber"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / contactStep) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex justify-between items-center mt-2.5 text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
              <span>Step {step} of {contactStep}</span>
              <span className="text-brand-amber">{Math.round((step / contactStep) * 100)}% Complete</span>
            </div>
          </div>
        )}

        {/* Modal Form Content */}
        <div className="flex-1 relative overflow-hidden flex flex-col justify-center min-h-[320px]">
          <AnimatePresence mode="wait" custom={direction}>

            {/* ==================== SHOPIFY DEVELOPMENT PATH ==================== */}
            {activeService === "shopify" && (
              <>
                {step === 1 && (
                  <motion.div key="shopify-step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      What is the primary scope of your Shopify project?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      {[
                        "New Custom Store Build",
                        "Store Redesign & Migration",
                        "Speed & Conversion Optimization",
                        "Custom Liquid App / Integration"
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption("projectType", opt)}
                          className={`h-14 px-4 rounded-xl text-left font-semibold border text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                            quizAnswers.projectType === opt 
                              ? "bg-brand-teal/15 border-brand-teal text-white" 
                              : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          {opt}
                          {quizAnswers.projectType === opt && <CheckCircle2 className="h-4.5 w-4.5 text-brand-teal" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="shopify-step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      What is your store's current monthly sales volume?
                    </h3>
                    <div className="grid grid-cols-1 gap-3 mt-3">
                      {[
                        { label: "Pre-launch / Under $10,000 / month", val: "<$10k" },
                        { label: "$10,000 – $50,000 / month", val: "$10k-50k" },
                        { label: "$50,000 – $250,000 / month", val: "$50k-250k" },
                        { label: "$250,000+ / month (Enterprise Volume)", val: "$250k+" }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => handleSelectOption("scaleOrRevenue", opt.val)}
                          className={`h-14 px-4 rounded-xl text-left font-semibold border text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                            quizAnswers.scaleOrRevenue === opt.val 
                              ? "bg-brand-teal/15 border-brand-teal text-white" 
                              : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          {opt.label}
                          {quizAnswers.scaleOrRevenue === opt.val && <CheckCircle2 className="h-4.5 w-4.5 text-brand-teal" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="shopify-step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      Which key features & integrations do you require?
                    </h3>
                    <p className="text-[12px] text-zinc-400 -mt-2">Select all that apply.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {[
                        "Custom Liquid Theme",
                        "Subscription / Recharge Setup",
                        "Headless Storefront API",
                        "ERP / Warehouse Stock Sync",
                        "Multi-Currency / Global Setup",
                        "Checkout Upsells & CRO"
                      ].map((opt) => {
                        const selected = (quizAnswers.techRequirements || []).includes(opt);
                        return (
                          <button
                            key={opt}
                            onClick={() => handleToggleArrayOption("techRequirements", opt)}
                            className={`h-12 px-4 rounded-xl text-left font-semibold border text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                              selected 
                                ? "bg-brand-teal/15 border-brand-teal text-white" 
                                : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            {opt}
                            {selected && <CheckCircle2 className="h-4 w-4 text-brand-teal" />}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => navigate(1)}
                      className="mt-3 h-11 w-full bg-brand-teal text-brand-navy font-bold rounded-xl flex items-center justify-center hover:bg-brand-teal/90 transition-all cursor-pointer"
                    >
                      Confirm Features & Continue <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="shopify-step4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      What is your ideal launch timeline?
                    </h3>
                    <div className="grid grid-cols-1 gap-3 mt-3">
                      {[
                        "Urgent / Ready to start immediately",
                        "Within 1 – 2 months",
                        "Within 3+ months",
                        "Just exploring options & getting quotes"
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption("budgetTimeline", opt)}
                          className={`h-14 px-4 rounded-xl text-left font-semibold border text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                            quizAnswers.budgetTimeline === opt 
                              ? "bg-brand-teal/15 border-brand-teal text-white" 
                              : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          {opt}
                          {quizAnswers.budgetTimeline === opt && <CheckCircle2 className="h-4.5 w-4.5 text-brand-teal" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* ==================== WEBSITE DESIGN PATH ==================== */}
            {activeService === "web" && (
              <>
                {step === 1 && (
                  <motion.div key="web-step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      What type of web project are you planning?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      {[
                        "Brand New Custom Website",
                        "Full Redesign & Rebrand",
                        "Web Application / Client Portal",
                        "High-Converting Landing Page"
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption("projectType", opt)}
                          className={`h-14 px-4 rounded-xl text-left font-semibold border text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                            quizAnswers.projectType === opt 
                              ? "bg-brand-blue/15 border-brand-blue text-white" 
                              : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          {opt}
                          {quizAnswers.projectType === opt && <CheckCircle2 className="h-4.5 w-4.5 text-brand-blue" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="web-step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      Do you have a preferred platform or tech stack?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      {[
                        "Next.js / Custom React (Ultra Fast)",
                        "Webflow",
                        "WordPress / Headless CMS",
                        "Open to Agency Recommendation"
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption("platformPreference", opt)}
                          className={`h-14 px-4 rounded-xl text-left font-semibold border text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                            quizAnswers.platformPreference === opt 
                              ? "bg-brand-blue/15 border-brand-blue text-white" 
                              : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          {opt}
                          {quizAnswers.platformPreference === opt && <CheckCircle2 className="h-4.5 w-4.5 text-brand-blue" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="web-step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      What is your primary goal for the new website?
                    </h3>
                    <div className="grid grid-cols-1 gap-3 mt-3">
                      {[
                        "Maximize Qualified Lead Inquiries & Conversions",
                        "Elevate Brand Prestige & Customer Trust",
                        "Build User Dashboard / Interactive Client SaaS",
                        "Showcase Portfolio & Case Studies"
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption("primaryGoal", opt)}
                          className={`h-14 px-4 rounded-xl text-left font-semibold border text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                            quizAnswers.primaryGoal === opt 
                              ? "bg-brand-blue/15 border-brand-blue text-white" 
                              : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          {opt}
                          {quizAnswers.primaryGoal === opt && <CheckCircle2 className="h-4.5 w-4.5 text-brand-blue" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="web-step4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      What is your target launch timeline?
                    </h3>
                    <div className="grid grid-cols-1 gap-3 mt-3">
                      {[
                        "Urgent / Ready to start immediately",
                        "Within 1 – 2 months",
                        "Within 3+ months",
                        "Just exploring options & budget estimates"
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption("budgetTimeline", opt)}
                          className={`h-14 px-4 rounded-xl text-left font-semibold border text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                            quizAnswers.budgetTimeline === opt 
                              ? "bg-brand-blue/15 border-brand-blue text-white" 
                              : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          {opt}
                          {quizAnswers.budgetTimeline === opt && <CheckCircle2 className="h-4.5 w-4.5 text-brand-blue" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* ==================== AI AUTOMATION PATH ==================== */}
            {activeService === "ai" && (
              <>
                {step === 1 && (
                  <motion.div key="ai-step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      What is your primary operational bottleneck?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      {[
                        "Workflow & Data Synchronization",
                        "24/7 AI Support Agent",
                        "Automated Lead Qualification & Scoring",
                        "Invoice & Document OCR Extraction"
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption("painPoint", opt)}
                          className={`h-14 px-4 rounded-xl text-left font-semibold border text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                            quizAnswers.painPoint === opt 
                              ? "bg-brand-amber/15 border-brand-amber text-white" 
                              : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          {opt}
                          {quizAnswers.painPoint === opt && <CheckCircle2 className="h-4.5 w-4.5 text-brand-amber" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="ai-step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      Which tools and software do you currently use?
                    </h3>
                    <p className="text-[12px] text-zinc-400 -mt-2">Select all that apply.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {[
                        "Shopify / E-Commerce Store",
                        "HubSpot / Salesforce / CRM",
                        "Zapier / Make / Webhooks",
                        "PostgreSQL / Database / ERP",
                        "Slack / Teams / Email",
                        "Stripe / Payment Gateways"
                      ].map((opt) => {
                        const selected = (quizAnswers.tools || []).includes(opt);
                        return (
                          <button
                            key={opt}
                            onClick={() => handleToggleArrayOption("tools", opt)}
                            className={`h-12 px-4 rounded-xl text-left font-semibold border text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                              selected 
                                ? "bg-brand-amber/15 border-brand-amber text-white" 
                                : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            {opt}
                            {selected && <CheckCircle2 className="h-4 w-4 text-brand-amber" />}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => navigate(1)}
                      className="mt-3 h-11 w-full bg-brand-amber text-brand-navy font-bold rounded-xl flex items-center justify-center hover:bg-brand-amber/90 transition-all cursor-pointer"
                    >
                      Confirm Tools & Continue <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="ai-step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      What is your team size and operational scope?
                    </h3>
                    <div className="grid grid-cols-1 gap-3 mt-3">
                      {[
                        { label: "1 – 10 Team Members", val: "1-10" },
                        { label: "11 – 50 Team Members", val: "11-50" },
                        { label: "50+ Team Members (Enterprise Scale)", val: "50+" }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => handleSelectOption("teamSize", opt.val)}
                          className={`h-14 px-4 rounded-xl text-left font-semibold border text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                            quizAnswers.teamSize === opt.val 
                              ? "bg-brand-amber/15 border-brand-amber text-white" 
                              : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          {opt.label}
                          {quizAnswers.teamSize === opt.val && <CheckCircle2 className="h-4.5 w-4.5 text-brand-amber" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="ai-step4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      When are you looking to implement automation?
                    </h3>
                    <div className="grid grid-cols-1 gap-3 mt-3">
                      {[
                        "Ready to implement immediately",
                        "Within 1 – 3 months",
                        "Within 3+ months",
                        "Just exploring options & ROI roadmap"
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption("budgetTimeline", opt)}
                          className={`h-14 px-4 rounded-xl text-left font-semibold border text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                            quizAnswers.budgetTimeline === opt 
                              ? "bg-brand-amber/15 border-brand-amber text-white" 
                              : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          {opt}
                          {quizAnswers.budgetTimeline === opt && <CheckCircle2 className="h-4.5 w-4.5 text-brand-amber" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* ==================== CONTACT FORM STEP (STEP 5) ==================== */}
            {step === contactStep && (
              <motion.div key="step-contact" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                <div className="text-center mb-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue mb-2 border border-brand-blue/20">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    Where Should We Send Your Scope Proposal?
                  </h3>
                  <p className="text-[13px] text-zinc-400 mt-1">
                    Enter your contact details below to finalize your inquiry.
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                      <input 
                        type="text" 
                        required
                        placeholder="First Name" 
                        value={quizAnswers.firstName || ""}
                        onChange={(e) => updateQuizAnswers("firstName", e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-xl text-[13px] text-white glassmorphism-input"
                      />
                    </div>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                      <input 
                        type="text" 
                        required
                        placeholder="Last Name" 
                        value={quizAnswers.lastName || ""}
                        onChange={(e) => updateQuizAnswers("lastName", e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-xl text-[13px] text-white glassmorphism-input"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                    <input 
                      type="email" 
                      required
                      placeholder="Business Email" 
                      value={quizAnswers.email || ""}
                      onChange={(e) => updateQuizAnswers("email", e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl text-[13px] text-white glassmorphism-input"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                      <input 
                        type="text" 
                        required
                        placeholder="Company Name" 
                        value={quizAnswers.company || ""}
                        onChange={(e) => updateQuizAnswers("company", e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-xl text-[13px] text-white glassmorphism-input"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                      <input 
                        type="tel" 
                        placeholder="Phone Number (Optional)" 
                        value={quizAnswers.phone || ""}
                        onChange={(e) => updateQuizAnswers("phone", e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-xl text-[13px] text-white glassmorphism-input"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
                    <textarea 
                      rows={2}
                      placeholder="Brief details or specific requirements (Optional)..." 
                      value={quizAnswers.notes || ""}
                      onChange={(e) => updateQuizAnswers("notes", e.target.value)}
                      className="w-full pl-10 pr-4 pt-2.5 rounded-xl text-[13px] text-white glassmorphism-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 mt-2 rounded-xl font-bold text-white shimmer-btn flex items-center justify-center cursor-pointer"
                  >
                    {submitting ? "Submitting Inquiry..." : "Submit Project Inquiry"}
                    <Zap className="h-4 w-4 ml-2 fill-current" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* ==================== CLEAN THANK-YOU SCREEN (STEP 6) ==================== */}
            {step === thankYouStep && (
              <motion.div key="step-thankyou" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-5 text-center items-center py-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal mb-1 border border-brand-teal/30 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  Inquiry Received Successfully
                </h3>
                
                <p className="text-[14px] text-zinc-300 max-w-lg leading-relaxed font-normal bg-white/5 border border-white/5 rounded-2xl p-5">
                  Thank you for your inquiry. We&apos;ve received your information and will review your requirements. A member of our team will be in touch shortly.
                </p>

                {/* Conversion Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md mt-2">
                  <a
                    href="https://cal.eu/visualab/15min"
                    target="_blank"
                    rel="noreferrer"
                    className="h-12 rounded-xl font-bold bg-brand-amber hover:bg-brand-amber/80 text-brand-navy flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    Book 15-Min Briefing
                  </a>

                  <button
                    onClick={() => {
                      closeQuiz();
                      resetQuizAnswers();
                    }}
                    className="h-12 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Home className="h-4.5 w-4.5 text-brand-blue" />
                    Return to Homepage
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Modal Navigation Footer */}
        {step <= contactStep && (
          <div className="flex justify-between items-center border-t border-white/5 pt-5 mt-6">
            <button
              onClick={() => navigate(-1)}
              disabled={step === 1}
              className={`flex items-center gap-1 text-[13px] font-bold transition-colors ${
                step === 1 ? "text-zinc-600 cursor-not-allowed" : "text-zinc-400 hover:text-white cursor-pointer"
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            {step < contactStep ? (
              <button
                onClick={() => navigate(1)}
                className="flex items-center gap-1 text-[13px] font-bold text-brand-blue hover:text-brand-blue/80 transition-colors cursor-pointer"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
