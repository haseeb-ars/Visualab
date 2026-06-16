"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useApp } from "@/context/AppContext";
import confetti from "canvas-confetti";
import { 
  CheckCircle, 
  Calendar, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  FileText, 
  ChevronRight,
  TrendingUp
} from "lucide-react";

export default function ThankYou() {
  const { quizResults } = useApp();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    // Fire confetti on mount
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 }
    });
  }, []);

  const dates = [
    { label: "Mon, Jun 15", val: "2026-06-15" },
    { label: "Tue, Jun 16", val: "2026-06-16" },
    { label: "Wed, Jun 17", val: "2026-06-17" }
  ];

  const times = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;
    setBookingConfirmed(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-[20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-brand-blue/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-amber/10 blur-[120px] pointer-events-none" />

      <section className="mx-auto max-w-4xl px-6 py-12 sm:px-8 md:py-20 text-center flex flex-col items-center gap-6">
        
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal mb-2 border border-brand-teal/20 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
          <CheckCircle className="h-8 w-8" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          You're in! <span className="text-gradient-amber-teal">Request Confirmed</span>
        </h1>
        
        <p className="text-lg text-zinc-400 max-w-xl font-normal leading-relaxed">
          Your request was posted. An engineer will audit your database systems and outline a draft roadmap.
        </p>

        {/* Dynamic score summary if they just finished the quiz */}
        {quizResults && (
          <div className="glassmorphism rounded-2xl p-6 border border-white/5 max-w-sm w-full flex items-center justify-between mt-2">
            <div className="text-left">
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Operational Audit</span>
              <h4 className="text-lg font-bold text-white mt-1">Readiness Card</h4>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-brand-teal">{quizResults.score}%</span>
              <p className="text-[11px] text-zinc-500 font-medium">Readiness Rating</p>
            </div>
          </div>
        )}

        {/* Cal.com Script Embed */}
        <Script
          id="cal-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.eu/embed/embed.js", "init");
              Cal("init", "15min", {origin:"https://app.cal.eu"});
              Cal.config = Cal.config || {};
              Cal.config.forwardQueryParams = true;
              Cal.ns["15min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
            `
          }}
        />

        {/* REAL CAL.COM SCHEDULER TRIGGER */}
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-brand-dark/40 p-6 md:p-8 shadow-2xl relative text-left mt-6">
          <div className="absolute top-4 right-4 text-[9px] font-extrabold text-brand-amber uppercase bg-brand-amber/10 px-2.5 py-1 rounded border border-brand-amber/20">
            STRATEGY SESSION
          </div>

          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-brand-blue" />
            Schedule Your 15-Min Briefing
          </h3>
          <p className="text-[13px] text-zinc-400 font-normal leading-relaxed mb-6">
            Secure a direct screen share session with our head engineer to map your API endpoints and outline a custom automation roadmap.
          </p>

          <button
            data-cal-link="visualab/15min"
            data-cal-namespace="15min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="h-12 w-full rounded-xl font-bold text-[13px] bg-brand-blue hover:bg-brand-blue/80 text-white shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            Schedule Strategy Call
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* WHILE YOU WAIT RESOURCE SUGGESTIONS */}
        <div className="w-full max-w-lg mt-12 border-t border-white/5 pt-8 text-left">
          <h4 className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest mb-4">While you wait:</h4>
          
          <div className="flex flex-col gap-3">
            <Link href="/blog" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-[13px] font-bold text-white group-hover:text-brand-blue transition-colors">AI Automation Blueprint</h5>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Read our latest dashboard sync case study</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-white transition-colors" />
            </Link>

            <Link href="/case-studies" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-[13px] font-bold text-white group-hover:text-brand-blue transition-colors">Moda E-Commerce Audit</h5>
                  <p className="text-[11px] text-zinc-500 mt-0.5">How we doubled Aura Decor's conversion rate</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
}
