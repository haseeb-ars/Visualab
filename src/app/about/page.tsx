"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Sparkles, 
  ShieldAlert, 
  ChevronDown, 
  TrendingUp, 
  Zap, 
  Cpu, 
  Globe 
} from "lucide-react";

export default function AboutUs() {
  const [expandedBio, setExpandedBio] = useState<number | null>(null);

  const timelineSteps = [
    { year: "2022", title: "The Genesis", desc: "VisuaLab was founded in London as a design boutique focusing on custom WebGL interfaces and high-conversion landing pages." },
    { year: "2023", title: "Automations Pivot", desc: "Recognizing operational overheads in client agencies, we integrated backend API automation and database triggers." },
    { year: "2024", title: "Shopify Specialty", desc: "Launched dedicated Shopify Liquid optimization services, scaling storefronts to 7-figure drop volumes." },
    { year: "2025", title: "AI-Agents Deployment", desc: "Engineered localized LLM pipelines and automated ticket chatbots, automating 75% of operations for over 50 clients." }
  ];

  const team = [
    {
      name: "Arthur Pendelton",
      role: "Founder & Head of AI",
      bio: "12+ years engineering databases. Former AI researcher, dedicated to removing manual admin overhead.",
      socials: { linkedin: "#", github: "#" }
    },
    {
      name: "Marcus Vance",
      role: "Lead Shopify Developer",
      bio: "Senior Liquid engineer. Optimized Core Web Vitals for over 40 high-volume e-commerce brands.",
      socials: { linkedin: "#", github: "#" }
    },
    {
      name: "Clara Croft",
      role: "UX/UI Design Director",
      bio: "Specializes in high-fidelity dark themes and responsive layout conversion optimization.",
      socials: { linkedin: "#", globe: "#" }
    }
  ];

  const values = [
    { title: "Innovation", desc: "We constantly research prompt parameters and node frameworks to deliver optimized code solutions." },
    { title: "Client Success", desc: "Our metrics are measured by your hours saved, annual costs reclaimed, and conversion increases." },
    { title: "Excellence", desc: "Zero placeholders. Sub-second page speeds. SOC2 security compliance audits." },
    { title: "Integrity", desc: "Complete transparency regarding API scoping, implementation timelines, and retainer hours." },
    { title: "Growth Mindset", desc: "We constantly audit system performances and refactor code pipelines to support company scaling." }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background radial meshes */}
      <div className="absolute top-[10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-amber-glow blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-15%] h-[500px] w-[500px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:px-8 text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-amber/20 bg-brand-amber/10 px-4 py-1.5 text-[12px] font-bold text-brand-amber">
          <Users className="h-3.5 w-3.5" />
          THE TEAM BEHIND THE ENGINE
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
          We Architect Systems <br />
          <span className="text-gradient-amber-teal">Built for Scale</span>
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
          VisuaLab is a premium team of engineers and designers configuring operations automations, custom Shopify templates, and fast web portals.
        </p>
      </section>

      {/* FOUNDER STORY (VERTICAL TIMELINE) */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 flex flex-col gap-4 sticky top-28">
            <span className="text-[12px] font-extrabold text-brand-teal uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl font-extrabold text-white">How VisuaLab Evolved</h2>
            <p className="text-[14px] text-zinc-400 leading-relaxed font-normal">
              We started as a small interface studio and grew into a specialized operations consultancy, building custom database syncs and LLM agents.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8 border-l border-white/5 pl-8 ml-4 relative">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col gap-2">
                {/* Year Bullet Node */}
                <div className="absolute -left-[49px] top-1.5 h-8 w-8 rounded-full bg-brand-navy border-2 border-brand-teal flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_10px_rgba(14,165,233,0.3)]">
                  {step.year}
                </div>
                <h3 className="text-base font-extrabold text-white">{step.title}</h3>
                <p className="text-[13px] text-zinc-400 leading-relaxed font-normal">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-white">Our Core Engineers</h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-[15px]">
            The designers and systems experts building your automated pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => {
            const isBioExpanded = expandedBio === idx;
            return (
              <div 
                key={idx} 
                className="glassmorphism-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-brand-amber/20 transition-all cursor-pointer"
                onClick={() => setExpandedBio(isBioExpanded ? null : idx)}
              >
                <div>
                  {/* Photo representation in CSS */}
                  <div className="w-full h-48 rounded-xl bg-gradient-to-br from-brand-indigo via-brand-navy to-brand-amber border border-white/5 flex items-center justify-center relative overflow-hidden group mb-4">
                    <div className="absolute inset-0 bg-brand-amber-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Users className="h-10 w-10 text-white opacity-40 group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="text-base font-bold text-white">{member.name}</h3>
                  <p className="text-[12px] text-brand-teal font-medium mt-0.5">{member.role}</p>
                  
                  <p className={`text-[12px] text-zinc-400 leading-relaxed font-normal mt-3 transition-all ${
                    isBioExpanded ? "opacity-100 line-clamp-none" : "opacity-60 line-clamp-2"
                  }`}>
                    {member.bio}
                  </p>
                </div>

                <div className="flex gap-3 border-t border-white/5 pt-4 mt-6">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/>
                      </svg>
                    </a>
                  )}
                  {"github" in member.socials && member.socials.github && (
                    <a href={member.socials.github} className="text-zinc-500 hover:text-white transition-colors" aria-label="GitHub">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                    </a>
                  )}
                  {"globe" in member.socials && member.socials.globe && (
                    <a href={member.socials.globe} className="text-zinc-500 hover:text-white transition-colors" aria-label="Website">
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* VALUES SECTION (3D CARDS) */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-white">Our Core Values</h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-[15px]">
            The standards we uphold across implementation lifecycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {values.map((val, idx) => (
            <div key={idx} className="glassmorphism-card rounded-2xl p-5 border border-white/5 hover:border-brand-blue/30 transition-all flex flex-col gap-3">
              <div className="h-8 w-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
                <Target className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-base font-bold text-white leading-tight">{val.title}</h3>
              <p className="text-[11px] text-zinc-500 font-normal leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-white">Why Choose VisuaLab</h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-[15px]">
            How we compare against freelancer hiring, standard agencies, and doing it yourself.
          </p>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-brand-dark/20 backdrop-blur-sm">
          <table className="w-full border-collapse text-left text-[13px] font-medium text-zinc-300 min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/2 text-[11px] font-bold text-white uppercase tracking-wider">
                <th className="p-4">Feature Inclusions</th>
                <th className="p-4 text-brand-teal">VisuaLab Agency</th>
                <th className="p-4">Freelancers</th>
                <th className="p-4">Standard Agencies</th>
                <th className="p-4">DIY Solutions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="p-4 font-bold text-white">Automations Deploy Time</td>
                <td className="p-4 text-brand-teal font-extrabold">2 - 4 Weeks</td>
                <td className="p-4">4 - 8 Weeks</td>
                <td className="p-4">6 - 12 Weeks</td>
                <td className="p-4">Months / Never</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-bold text-white">Full-Stack Capabilities</td>
                <td className="p-4 text-brand-teal font-extrabold">AI + Web + Shopify</td>
                <td className="p-4">Usually single-domain</td>
                <td className="p-4">Mostly web-only</td>
                <td className="p-4">Limited skills</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-bold text-white">Ongoing Support SLAs</td>
                <td className="p-4 text-brand-teal font-extrabold">4-Hr Slack Support</td>
                <td className="p-4">Inconsistent availability</td>
                <td className="p-4">Email ticketing only</td>
                <td className="p-4">None</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">SOC2 & GDPR Security</td>
                <td className="p-4 text-brand-teal font-extrabold">Standard Code Audits</td>
                <td className="p-4">Rarely managed</td>
                <td className="p-4">Extra costs</td>
                <td className="p-4">Hard to maintain</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
