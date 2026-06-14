"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Send, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  CheckCircle2
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simulate subscription
    setSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const footerLinks = {
    services: {
      title: "Services",
      links: [
        { name: "AI Automation Plans", href: "/services/ai-automation" },
        { name: "Custom Web Design", href: "/services/web-design" },
        { name: "Shopify Store Development", href: "/services/shopify-development" },
        { name: "Growth & CRO Audit", href: "/services/web-design" },
      ]
    },
    company: {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Request Quote Hub", href: "/pricing" },
        { name: "Latest Insights", href: "/blog" },
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Free Assessment Quiz", href: "#" },
        { name: "ROI Savings Calculator", href: "/services/ai-automation#roi-calculator" },
        { name: "System Integration APIs", href: "/services/ai-automation#features" },
        { name: "Contact Support", href: "/contact" },
      ]
    }
  };

  return (
    <footer className="w-full border-t border-white/5 bg-brand-navy relative overflow-hidden mt-auto">
      {/* Background radial accent */}
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-brand-amber-glow blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 h-[200px] w-[200px] rounded-full bg-brand-blue/5 blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="text-lg font-black tracking-widest text-white transition-colors group-hover:text-zinc-300">
                VISUALAB
              </span>
            </Link>
            
            <p className="text-[14px] text-zinc-400 max-w-sm font-normal leading-relaxed">
              We design, build, and deploy intelligent AI systems and converting digital platforms, helping high-growth businesses run on autopilot.
            </p>

            <div className="flex flex-col gap-3 max-w-sm mt-2">
              <span className="text-[13px] font-semibold text-white">Subscribe to AI & Growth newsletter</span>
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input 
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 pr-12 text-[14px] text-white rounded-xl border border-white/5 bg-white/5 placeholder-zinc-500 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 h-8 w-8 rounded-lg bg-brand-blue flex items-center justify-center hover:bg-brand-blue/80 transition-colors text-white cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-[12px] text-brand-teal flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Subscribed successfully!
                </p>
              )}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="flex flex-col gap-4">
              <h5 className="text-[14px] font-bold text-white uppercase tracking-wider">{section.title}</h5>
              <ul className="flex flex-col gap-3">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      href={link.href}
                      className="text-[14px] text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Contact info row & Socials */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-t border-white/5 mt-16 pt-8 text-[13px] text-zinc-500 font-normal">
          <div className="flex flex-wrap justify-center gap-6 md:justify-start">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-brand-teal" /> info@visualab.uk
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-brand-teal" /> +44 (0) 20 7946 0192
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand-teal" /> London, United Kingdom
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="h-8 w-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="LinkedIn">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="h-8 w-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Twitter">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="h-8 w-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="GitHub">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <a href="https://visualab.uk" className="h-8 w-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Website">
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Copywrite details */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-white/5 mt-8 pt-8 text-[12px] text-zinc-600 font-normal">
          <p>© {new Date().getFullYear()} VisuaLab. All rights reserved. Registered in England & Wales.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
