"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  FileText, 
  Calendar, 
  Share2, 
  CheckCircle2, 
  Calculator,
  Mail,
  User,
  Building,
  Phone
} from "lucide-react";
import confetti from "canvas-confetti";

export default function QuizModal() {
  const { isQuizOpen, closeQuiz, quizAnswers, updateQuizAnswers, resetQuizAnswers, quizResults, setQuizResults } = useApp();
  const [step, setStep] = useState(1); // 1-5: Questions, 6: Calculation/Lead Capture, 7: Thank You/Calendar
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [submitting, setSubmitting] = useState(false);

  if (!isQuizOpen) return null;

  // Slide animation settings
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.2 }
    })
  };

  const handleSelectOption = (key: string, value: any) => {
    updateQuizAnswers(key, value);
    // For single select questions, auto advance
    if (key !== "services") {
      setTimeout(() => navigate(1), 200);
    }
  };

  const handleSelectService = (service: string) => {
    const current = [...(quizAnswers.services || [])];
    const index = current.indexOf(service);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(service);
    }
    updateQuizAnswers("services", current);
  };

  const navigate = (dir: number) => {
    setDirection(dir);
    setStep((prev) => {
      const nextStep = prev + dir;
      if (nextStep < 1) return 1;
      if (nextStep > 7) return 7;
      return nextStep;
    });
  };

  // Perform assessment calculations
  const calculateResults = () => {
    let score = 50; // Base score
    let hoursSavedPerWeek = 8;
    let hourlyRate = 35; // Default average rate

    // 1. Pain Point weight
    if (quizAnswers.painPoint === "Manual data entry") score += 15;
    if (quizAnswers.painPoint === "Email management") score += 10;
    if (quizAnswers.painPoint === "Customer support") score += 12;
    if (quizAnswers.painPoint === "Lead qualification") score += 15;

    // 2. Hours Admin weight
    if (quizAnswers.hoursAdmin === "5-10") {
      score += 5;
      hoursSavedPerWeek = 6;
    } else if (quizAnswers.hoursAdmin === "10-20") {
      score += 15;
      hoursSavedPerWeek = 12;
    } else if (quizAnswers.hoursAdmin === "20-40") {
      score += 25;
      hoursSavedPerWeek = 24;
    } else if (quizAnswers.hoursAdmin === "40+") {
      score += 35;
      hoursSavedPerWeek = 38;
    }

    // 3. Annual Revenue weight
    if (quizAnswers.annualRevenue === "$500k-2m") {
      score += 5;
      hourlyRate = 45;
    } else if (quizAnswers.annualRevenue === "$2m-10m") {
      score += 12;
      hourlyRate = 55;
    } else if (quizAnswers.annualRevenue === "$10m+") {
      score += 20;
      hourlyRate = 75;
    }

    // Caps score at 99
    score = Math.min(score, 99);

    const yearlyHoursSaved = hoursSavedPerWeek * 52;
    const yearlySavings = yearlyHoursSaved * hourlyRate;
    const monthlySavings = yearlySavings / 12;

    let suggestedPackage = "Professional AI Subscription ($999/mo)";
    if (score > 85 || quizAnswers.hoursAdmin === "40+") {
      suggestedPackage = "Enterprise Custom Automation (Custom)";
    } else if (score < 60) {
      suggestedPackage = "Starter AI Automation Plan ($499/mo)";
    }

    return {
      score,
      hoursSavedPerWeek,
      yearlyHoursSaved,
      yearlySavings,
      monthlySavings,
      suggestedPackage
    };
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const results = calculateResults();
    setQuizResults(results);

    // Save to server API route
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: quizAnswers, results }),
      });
    } catch (err) {
      console.error("Failed to post lead", err);
    }

    setSubmitting(false);
    setStep(7);
    
    // Confetti effect!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  // Generate and download HTML report client side
  const handleDownloadReport = () => {
    if (!quizResults) return;

    const reportContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>VisuaLab AI Automation Audit Report</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background-color: #02020e; color: #f3f4f6; margin: 0; padding: 40px; }
    .card { background: linear-gradient(135deg, #090924 0%, #02020e 100%); border: 1px solid #1a1a3e; border-radius: 20px; padding: 40px; max-width: 800px; margin: 0 auto; box-shadow: 0 10px 40px rgba(0,102,255,0.15); }
    .header { border-bottom: 1px solid #1a1a3e; padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
    h1 { color: #0066ff; margin: 0 0 10px 0; font-size: 28px; }
    .score-badge { display: inline-block; background: #fbbf24; color: #02020e; border-radius: 50%; width: 120px; height: 120px; line-height: 120px; font-size: 36px; font-weight: bold; margin: 20px 0; text-shadow: 0 0 10px rgba(251,191,36,0.5); }
    .stat-grid { display: grid; grid-cols: 2; display: flex; gap: 20px; justify-content: space-between; margin: 30px 0; }
    .stat-card { flex: 1; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; text-align: center; }
    .stat-card h3 { margin: 0 0 10px 0; font-size: 14px; color: #888; text-transform: uppercase; }
    .stat-card p { margin: 0; font-size: 24px; font-weight: bold; color: #0ea5e9; }
    .recs { background: rgba(0, 102, 255, 0.03); border: 1px dashed rgba(0, 102, 255, 0.2); border-radius: 12px; padding: 20px; margin-top: 30px; }
    .recs h2 { margin-top: 0; color: #fff; font-size: 18px; }
    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #555; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>VISUALAB ASSESSMENT REPORT</h1>
      <p>Custom AI Automation & Service Readiness Audit for <strong>${quizAnswers.company || "Your Company"}</strong></p>
    </div>
    <div style="text-align: center;">
      <div class="score-badge">${quizResults.score}%</div>
      <p style="font-size: 18px; font-weight: bold;">AI Automation Readiness Rating</p>
    </div>
    
    <div class="stat-grid">
      <div class="stat-card">
        <h3>Weekly Admin Hours Saved</h3>
        <p>${quizResults.hoursSavedPerWeek} Hours</p>
      </div>
      <div class="stat-card">
        <h3>Projected Annual Savings</h3>
        <p>$${quizResults.yearlySavings.toLocaleString()}</p>
      </div>
    </div>
    
    <div class="recs">
      <h2>Top Strategic Recommendations:</h2>
      <ul>
        <li><strong>Automate:</strong> Set up automated processing pipelines targeting "${quizAnswers.painPoint}".</li>
        <li><strong>Resource Reallocation:</strong> Free up ${quizResults.hoursSavedPerWeek} hours/week of staff resource, shifting efforts to revenue tasks.</li>
        <li><strong>Recommended Plan:</strong> ${quizResults.suggestedPackage}.</li>
      </ul>
    </div>
    
    <div class="footer">
      <p>Generated by VisuaLab.uk on ${new Date().toLocaleDateString()}. Email us at info@visualab.uk to begin implementation.</p>
    </div>
  </div>
</body>
</html>
    `;

    const blob = new Blob([reportContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${quizAnswers.company || "VisuaLab"}_AI_Assessment_Report.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const currentResults = quizResults || {
    score: 85,
    yearlySavings: 36400,
    yearlyHoursSaved: 1040,
    suggestedPackage: "Professional AI Subscription"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/80 backdrop-blur-lg px-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl glassmorphism-card shadow-2xl p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Close Button */}
        <button 
          onClick={closeQuiz}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-6 w-6" />
        </button>

        {step <= 5 && (
          <div className="mb-6">
            {/* Progress bar */}
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-blue to-brand-amber"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 5) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {/* Step indicators */}
            <div className="flex justify-between items-center mt-3 text-[12px] text-zinc-500 font-bold">
              <span>QUESTION {step} OF 5</span>
              <span className="text-brand-amber">{(step / 5) * 100}% COMPLETE</span>
            </div>
          </div>
        )}

        {/* Modal Form Content */}
        <div className="flex-1 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-4"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  1. What is your business's biggest operational pain point?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {[
                    "Manual data entry",
                    "Email management",
                    "Customer support",
                    "Social media",
                    "Lead qualification",
                    "Other administrative work"
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption("painPoint", opt)}
                      className={`h-14 px-4 rounded-xl text-left font-semibold border text-[14px] transition-all flex items-center justify-between cursor-pointer ${
                        quizAnswers.painPoint === opt 
                          ? "bg-brand-blue/10 border-brand-blue text-white" 
                          : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      {opt}
                      {quizAnswers.painPoint === opt && <CheckCircle2 className="h-4.5 w-4.5 text-brand-teal" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-4"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  2. How many hours per week does your team spend on these manual tasks?
                </h3>
                <div className="grid grid-cols-1 gap-3 mt-4">
                  {[
                    { label: "5-10 hours / week", val: "5-10" },
                    { label: "10-20 hours / week", val: "10-20" },
                    { label: "20-40 hours / week", val: "20-40" },
                    { label: "40+ hours / week (Full time workload)", val: "40+" },
                    { label: "I don't know exactly", val: "Don't know" }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleSelectOption("hoursAdmin", opt.val)}
                      className={`h-14 px-4 rounded-xl text-left font-semibold border text-[14px] transition-all flex items-center justify-between cursor-pointer ${
                        quizAnswers.hoursAdmin === opt.val 
                          ? "bg-brand-blue/10 border-brand-blue text-white" 
                          : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      {opt.label}
                      {quizAnswers.hoursAdmin === opt.val && <CheckCircle2 className="h-4.5 w-4.5 text-brand-teal" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-4"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  3. What is your business's annual revenue bracket?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {[
                    { label: "Under $500k", val: "<$500k" },
                    { label: "$500k - $2 Million", val: "$500k-2m" },
                    { label: "$2M - $10 Million", val: "$2m-10m" },
                    { label: "Over $10 Million", val: "$10m+" },
                    { label: "Prefer not to say", val: "Prefer not to say" }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleSelectOption("annualRevenue", opt.val)}
                      className={`h-14 px-4 rounded-xl text-left font-semibold border text-[14px] transition-all flex items-center justify-between cursor-pointer ${
                        quizAnswers.annualRevenue === opt.val 
                          ? "bg-brand-blue/10 border-brand-blue text-white" 
                          : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      {opt.label}
                      {quizAnswers.annualRevenue === opt.val && <CheckCircle2 className="h-4.5 w-4.5 text-brand-teal" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-4"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  4. Which of our core services are you interested in exploring?
                </h3>
                <p className="text-[13px] text-zinc-400 -mt-2">Select all that apply.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {[
                    { label: "AI Automation Plans", val: "AI Automation" },
                    { label: "Custom Website Design", val: "Website Design" },
                    { label: "Shopify Store Development", val: "Shopify Development" },
                    { label: "All of the Above", val: "All" }
                  ].map((opt) => {
                    const isSelected = quizAnswers.services?.includes(opt.val);
                    return (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectService(opt.val)}
                        className={`h-14 px-4 rounded-xl text-left font-semibold border text-[14px] transition-all flex items-center justify-between cursor-pointer ${
                          isSelected 
                            ? "bg-brand-blue/10 border-brand-blue text-white" 
                            : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                        }`}
                      >
                        {opt.label}
                        {isSelected && <CheckCircle2 className="h-4.5 w-4.5 text-brand-teal" />}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => navigate(1)}
                  className="mt-4 h-11 w-full bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center hover:bg-white/10"
                >
                  Confirm Services & Continue <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-4"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  5. What is your estimated timeline for kick-off?
                </h3>
                <div className="grid grid-cols-1 gap-3 mt-4">
                  {[
                    "Just exploring automation options",
                    "Within 1 - 3 months",
                    "Ready to start immediately",
                    "Let's jump on a call and align"
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption("budgetTimeline", opt)}
                      className={`h-14 px-4 rounded-xl text-left font-semibold border text-[14px] transition-all flex items-center justify-between cursor-pointer ${
                        quizAnswers.budgetTimeline === opt 
                          ? "bg-brand-blue/10 border-brand-blue text-white" 
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

            {step === 6 && (
              <motion.div
                key="step6"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-4"
              >
                <div className="text-center mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue mb-2">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    Assessment Calculation Ready
                  </h3>
                  <p className="text-[14px] text-zinc-400 mt-1">
                    Enter your contact details to generate your customized AI efficiency scorecard & downloadable PDF audit.
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
                        className="w-full h-11 pl-10 pr-4 rounded-xl text-[14px] text-white glassmorphism-input"
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
                        className="w-full h-11 pl-10 pr-4 rounded-xl text-[14px] text-white glassmorphism-input"
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
                      className="w-full h-11 pl-10 pr-4 rounded-xl text-[14px] text-white glassmorphism-input"
                    />
                  </div>

                  <div className="relative">
                    <Building className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                    <input 
                      type="text" 
                      required
                      placeholder="Company Name" 
                      value={quizAnswers.company || ""}
                      onChange={(e) => updateQuizAnswers("company", e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl text-[14px] text-white glassmorphism-input"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                    <input 
                      type="tel" 
                      placeholder="Phone Number (Optional)" 
                      value={quizAnswers.phone || ""}
                      onChange={(e) => updateQuizAnswers("phone", e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl text-[14px] text-white glassmorphism-input"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 mt-2 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={quizAnswers.strategyCall || false}
                      onChange={(e) => updateQuizAnswers("strategyCall", e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-white/5 bg-white/5 text-brand-amber accent-brand-amber"
                    />
                    <span className="text-[13px] text-zinc-400 font-medium leading-normal">
                      Yes! Include a 15-minute Strategy Call invite with my results.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 mt-4 rounded-xl font-bold text-white shimmer-btn flex items-center justify-center cursor-pointer"
                  >
                    {submitting ? "Analyzing Operations..." : "Generate My Custom Plan"}
                    <Zap className="h-4 w-4 ml-2 fill-current" />
                  </button>
                </form>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div
                key="step7"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-4 text-center items-center"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal mb-2">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  Your Personalized Assessment is Ready!
                </h3>
                <p className="text-[14px] text-zinc-400 max-w-md">
                  We analysed your admin loads and generated custom savings targets.
                </p>

                {/* Score Showcase */}
                <div className="flex items-center gap-6 my-4 p-4 rounded-2xl bg-white/5 border border-white/5 w-full max-w-sm justify-center">
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-brand-amber shadow-[0_0_15px_rgba(251,191,36,0.3)] bg-brand-navy">
                    <span className="text-2xl font-extrabold text-white">{currentResults.score}%</span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-[14px] font-bold text-zinc-400 uppercase">Readiness Rating</h4>
                    <p className="text-[18px] font-extrabold text-brand-teal mt-0.5">
                      ${currentResults.yearlySavings.toLocaleString()}/yr Saved
                    </p>
                    <p className="text-[12px] text-zinc-500">{currentResults.yearlyHoursSaved} Admin Hours Saved</p>
                  </div>
                </div>

                {/* Next Steps CTAs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md mt-2">
                  <button
                    onClick={handleDownloadReport}
                    className="h-12 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <FileText className="h-4.5 w-4.5 text-brand-blue" />
                    Download PDF Audit
                  </button>

                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noreferrer"
                    className="h-12 rounded-xl font-bold bg-brand-amber hover:bg-brand-amber/80 text-brand-navy flex items-center justify-center gap-2 transition-colors"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    Schedule Strategy Call
                  </a>
                </div>

                <button
                  onClick={() => {
                    closeQuiz();
                    resetQuizAnswers();
                    setStep(1);
                  }}
                  className="mt-6 text-[12px] text-zinc-500 hover:text-zinc-400 font-bold transition-colors cursor-pointer"
                >
                  Restart Assessment & Clear History
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Navigation Footer */}
        {step <= 5 && (
          <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-6">
            <button
              onClick={() => navigate(-1)}
              disabled={step === 1}
              className={`flex items-center gap-1 text-[13px] font-bold transition-colors ${
                step === 1 ? "text-zinc-600 cursor-not-allowed" : "text-zinc-400 hover:text-white"
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            {step < 5 ? (
              <button
                onClick={() => navigate(1)}
                className="flex items-center gap-1 text-[13px] font-bold text-brand-blue hover:text-brand-blue/80 transition-colors"
              >
                Next Question <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => setStep(6)}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-brand-blue text-[13px] font-bold text-white hover:bg-brand-blue/80 transition-colors cursor-pointer"
              >
                Finish Quiz <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
