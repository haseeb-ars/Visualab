"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import ShopifyCanvas from "@/components/ui/ShopifyCanvas";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  TrendingUp, 
  Settings, 
  Zap, 
  ShieldCheck, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Code,
  ArrowRight,
  BarChart3,
  Layers,
  Sparkles
} from "lucide-react";

export default function ShopifyDevelopment() {
  const { openQuiz } = useApp();
  const [expandedSection, setExpandedSection] = useState<string | null>("setup");

  const benefits = [
    { title: "Fast & Reliable", desc: "Average loading speed under 1.2 seconds, boosting checkout completions.", icon: Zap, color: "text-brand-teal" },
    { title: "Feature-Rich Ecosystem", desc: "Connect loyalty programs, product bundles, subscriptions, and smart cross-sells.", icon: Sparkles, color: "text-brand-amber" },
    { title: "Secure & Compliant", desc: "Level 1 PCI DSS compliance out of the box, ensuring secure payments.", icon: ShieldCheck, color: "text-brand-blue" },
    { title: "Scales with Volume", desc: "Handles flash sales doing thousands of checkouts per minute without downtime.", icon: Users, color: "text-emerald-500" }
  ];

  const skills = [
    "Custom Liquid Themes", "Private App Dev", "Speed Audits", "Funnel CRO Optimization",
    "Stripe Gateway Sync", "Inventory Automation", "Klaviyo CRM Flow", "GA4 Analytics Setup",
    "Ecom SEO Mapping", "Magento/Woo Migrations", "Shopify API Sync", "Custom Checkout Ext",
    "Recharge Subscriptions", "Yotpo Loyalty Setup", "Headless Storefronts", "24/7 SLA Support"
  ];

  const caseStudies = [
    {
      store: "Carrera World",
      before: "Legacy Eyewear Portal",
      after: "Sleek, fashion-forward showcase",
      solution: "A bold and stylish digital showcase capturing the energy of Carrera's iconic sunglasses line. Highlights their legacy in eyewear innovation with a sleek, fashion-forward presentation.",
      rev: "Eyewear Brand Innovation",
      tech: "Shopify Custom Liquid, Tailwind CSS, InstantSearch",
      url: "https://en.carreraworld.com/"
    },
    {
      store: "Gravity",
      before: "Standard Drinks Store",
      after: "Crisp & vibrant web experience",
      solution: "A custom Shopify store designed for Gravity, makers of refreshing alcoholic seltzers. Blends vibrant visuals with clean design to reflect the brand's bold, refreshing character and youthful appeal.",
      rev: "High-Engagement UX",
      tech: "Shopify Theme Dev, Custom Assets, Speed Optimization",
      url: "https://drinkgravity.com.au/"
    },
    {
      store: "Love Good Fats",
      before: "Nutrition Storefront",
      after: "Indulgent & friendly portal",
      solution: "A warm, inviting digital space for Love Good Fats protein bars. The design emphasizes clean nutrition, feel-good energy, and a customer flow that is friendly and empowering.",
      rev: "+85% Subscription LTV",
      tech: "Shopify Plus, Recharge Subscriptions, Klaviyo",
      url: "https://lovegoodfats.com/"
    },
    {
      store: "Tormino",
      before: "Multi-Category Retail Store",
      after: "Modern, fast e-commerce platform",
      solution: "A high-performance custom Shopify storefront for Tormino, optimized for conversions, speed, and seamless navigation across a diverse catalog of bicycle parts, outdoor gear, and toys.",
      rev: "Dynamic Catalog Integration",
      tech: "Shopify Theme Development, Custom Metafields, Algolia Search",
      url: "https://www.tormino.com"
    }
  ];

  const services = [
    {
      id: "setup",
      title: "Store Setup & Migration",
      desc: "Full migrations from legacy systems (WooCommerce, Magento, BigCommerce) to Shopify, importing customer databases, historical orders, and product attributes seamlessly.",
      details: ["✓ Customer history imports", "✓ SEO redirect mapping", "✓ Catalog matching", "✓ Payment gateways set up"]
    },
    {
      id: "custom",
      title: "Custom App & API Development",
      desc: "Writing private Shopify apps and bespoke middleware systems using Node.js/React to connect your store with ERP warehouses, custom inventory systems, and local shipping channels.",
      details: ["✓ Private app code integrations", "✓ Custom inventory syncing", "✓ Warehouse ERP pipes", "✓ Custom metadata setups"]
    },
    {
      id: "perf",
      title: "Core Web Vitals Performance",
      desc: "We dive deep into theme codes to remove bloat scripts, optimize media queries, delay non-critical styles, and ensure sub-second loads matching Google's mobile guidelines.",
      details: ["✓ Script compilation optimizations", "✓ Asset compression pipelines", "✓ Mobile speed acceleration", "✓ Lighthouse audits green"]
    },
    {
      id: "growth",
      title: "Growth & Retention Flow",
      desc: "Connect Recharge subscriptions, configure advanced Klaviyo email funnels, deploy Yotpo rewards programs, and set up dynamic sliding-cart cross-sells.",
      details: ["✓ Recharge checkout widgets", "✓ Automated Klaviyo syncing", "✓ Sliding cart upsell widgets", "✓ Customer LTV mapping audits"]
    }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-[15%] right-[-15%] h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute top-[45%] left-[-10%] h-[500px] w-[500px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex w-fit mx-auto lg:mx-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-[12px] font-bold text-emerald-400">
              <ShoppingBag className="h-3.5 w-3.5" />
              HIGH-VOLUME SHOPIFY PLATFORMS
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Shopify Stores That <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-400 to-teal-400">
                Drive 7-8 Figure Revenue
              </span>
            </h1>

            <p className="text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Custom theme development, conversion-rate optimization, and backend database integrations engineered specifically for scaling brands.
            </p>

            <button
              onClick={openQuiz}
              className="h-14 px-8 mt-2 mx-auto lg:mx-0 w-fit rounded-full text-base font-bold text-white shimmer-btn flex items-center gap-2 shadow-[0_0_20px_rgba(157,78,221,0.3)] hover:scale-105 transition-all cursor-pointer"
            >
              Schedule Shopify Consultation
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md h-[400px] rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md overflow-hidden flex items-center justify-center">
              <div className="absolute top-4 left-4 text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
                3D Interactive E-Commerce
              </div>
              <ShopifyCanvas />
            </div>
          </div>

        </div>
      </section>

      {/* WHY SHOPIFY SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            return (
              <div key={idx} className="glassmorphism-card rounded-2xl p-6 border border-white/5 flex flex-col gap-4">
                <div className={`h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center ${benefit.color}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{benefit.title}</h3>
                  <p className="text-[13px] text-zinc-400 font-normal leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SHOPIFY EXPERTISE GRID (16 BADGES) */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-white">Full-Stack E-commerce Capabilities</h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-[15px]">
            Our developers handle all aspects of Shopify custom code, payment channels, and webhook APIs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, idx) => (
            <div key={idx} className="glassmorphism-card rounded-xl p-4 border border-white/5 hover:border-emerald-500/20 transition-all flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-[13px] font-semibold text-zinc-200">{skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES CAROUSEL LIST */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-white">Shopify Store Milestones</h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-[15px]">
            Actual client metrics recorded post VisuaLab development launch.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {caseStudies.map((study, idx) => (
            <div key={idx} className="glassmorphism-card rounded-2xl p-6 md:p-8 border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-emerald-500/20">
              <div className="flex flex-col gap-2 max-w-xl">
                <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 w-fit">
                  {study.store}
                </span>
                <h3 className="text-lg font-bold text-white mt-2">{study.after}</h3>
                <p className="text-[13px] text-zinc-400 font-normal leading-relaxed">{study.solution}</p>
                <span className="text-[11px] font-bold text-zinc-500 mt-1 uppercase">Tech Stack: {study.tech}</span>
                {study.url && (
                  <a 
                    href={study.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[12px] font-semibold text-brand-blue hover:text-brand-blue/80 transition-colors flex items-center gap-1 mt-3 w-fit"
                  >
                    View Live Site <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
              <div className="text-center md:text-right shrink-0">
                <div className="text-xl font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                  {study.before}
                </div>
                <div className="text-[15px] font-extrabold text-brand-amber mt-1 flex items-center gap-1.5 md:justify-end">
                  <TrendingUp className="h-4.5 w-4.5" /> {study.rev}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DETAILED SERVICES ACCORDION */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-white">Our Modular Shopify Framework</h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-[15px]">
            Select an operational pillar to explore design inclusions and integration targets.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {services.map((service) => {
            const isOpen = expandedSection === service.id;
            return (
              <div 
                key={service.id} 
                className="rounded-2xl border border-white/5 bg-brand-dark/20 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedSection(isOpen ? null : service.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-[16px] text-white hover:bg-white/2 transition-colors"
                >
                  {service.title}
                  {isOpen ? <ChevronUp className="h-5 w-5 text-emerald-400" /> : <ChevronDown className="h-5 w-5 text-zinc-500" />}
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6 overflow-hidden flex flex-col gap-4 border-t border-white/2 pt-4"
                    >
                      <p className="text-[13px] text-zinc-400 leading-relaxed font-normal">{service.desc}</p>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {service.details.map((detail, dIdx) => (
                          <span key={dIdx} className="text-[12px] font-bold text-zinc-300 flex items-center gap-1.5">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* SCOPING AUDIT INQUIRY */}
      <section id="scoping-audit" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/5">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-indigo/30 via-brand-dark/50 to-transparent p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-2xl relative">
          <div className="absolute top-0 right-0 h-[200px] w-[200px] bg-brand-blue/10 blur-[85px] pointer-events-none" />
          <span className="text-[11px] font-extrabold text-brand-teal uppercase tracking-widest">Custom Scoping Funnel</span>
          <h2 className="text-3xl font-extrabold text-white">Request a Shopify Integration Audit</h2>
          <p className="text-[14px] text-zinc-400 max-w-xl font-normal leading-relaxed mx-auto">
            High-volume storefronts require bespoke app integrations, custom checkout parameters, and warehouse ERP syncs. Complete our scoping assessment to receive a personalized quote.
          </p>
          <button
            onClick={openQuiz}
            className="h-14 px-8 mt-2 rounded-full text-base font-bold text-white shimmer-btn flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:scale-105 transition-all"
          >
            Start Shopify Scoping Quiz
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

    </div>
  );
}
