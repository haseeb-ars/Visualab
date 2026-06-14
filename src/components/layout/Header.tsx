"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Layers, 
  ShoppingBag, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Sparkles,
  Search,
  Code,
  Smartphone
} from "lucide-react";

export default function Header() {
  const { openQuiz } = useApp();
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedService, setMobileExpandedService] = useState<string | null>(null);

  const megaMenuVariants = {
    hidden: { 
      opacity: 0, 
      y: 15, 
      rotateX: -10, 
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeOut" as const }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 150,
        damping: 18
      }
    }
  };

  const navItems = [
    { name: "About Us", href: "/about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
  ];

  const servicesList = {
    ai: {
      title: "AI Automation",
      icon: Cpu,
      color: "text-brand-amber",
      desc: "Autopilot workflows & assistants",
      href: "/services/ai-automation",
      items: [
        { name: "Assessment & Strategy", desc: "Identify key automation targets" },
        { name: "Implementation", desc: "Integrate agents & processes" },
        { name: "Optimization", desc: "Refine prompts & custom flows" },
        { name: "Support", desc: "Continuous model updates & hosting" },
      ]
    },
    web: {
      title: "Website Design",
      icon: Layers,
      color: "text-brand-blue",
      desc: "Converting digital experiences",
      href: "/services/web-design",
      items: [
        { name: "Landing Pages", desc: "High conversion micro-funnels" },
        { name: "Full Websites", desc: "Corporate custom portals" },
        { name: "E-commerce Sites", desc: "Bespoke storefront experiences" },
        { name: "Web Apps", desc: "Interactive SaaS frontends" },
      ]
    },
    shopify: {
      title: "Shopify Development",
      icon: ShoppingBag,
      color: "text-brand-teal",
      desc: "Scalable revenue machines",
      href: "/services/shopify-development",
      items: [
        { name: "Custom Themes", desc: "Tailored Liquid coding" },
        { name: "App Development", desc: "Custom API & integration tools" },
        { name: "Store Optimization", desc: "Core Web Vitals acceleration" },
        { name: "Migration Services", desc: "Seamless import from Shopify/Woo" },
      ]
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 glassmorphism backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 sm:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-widest text-white transition-colors group-hover:text-zinc-300">
            VISUALAB
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-zinc-400">
          
          {/* Services dropdown toggle */}
          <div 
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button 
              className={`flex items-center gap-1 py-3 cursor-pointer transition-colors hover:text-white ${
                pathname.startsWith("/services") ? "text-white" : ""
              }`}
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {isMegaMenuOpen && (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={megaMenuVariants}
                  className="absolute left-1/2 top-full -translate-x-1/2 w-[900px] perspective-1000 origin-top pt-4"
                >
                  <div className="grid grid-cols-3 gap-6 rounded-2xl glassmorphism-card p-6 shadow-2xl overflow-hidden">
                    {Object.entries(servicesList).map(([key, service]) => {
                      const ServiceIcon = service.icon;
                      return (
                        <div key={key} className="flex flex-col border-r border-white/5 last:border-r-0 pr-4 last:pr-0">
                          <Link href={service.href} className="group/svc flex items-start gap-3 mb-4">
                            <div className={`rounded-lg p-2 bg-white/5 ${service.color} transition-colors group-hover/svc:bg-white/10`}>
                              <ServiceIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-[15px] font-semibold text-white flex items-center gap-1 group-hover/svc:text-brand-blue transition-colors">
                                {service.title}
                                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover/svc:opacity-100 group-hover/svc:translate-x-0" />
                              </h4>
                              <p className="text-[12px] text-zinc-500 font-normal mt-0.5">{service.desc}</p>
                            </div>
                          </Link>
                          <div className="flex flex-col gap-3 pl-10">
                            {service.items.map((sub, sIdx) => (
                              <Link 
                                key={sIdx} 
                                href={service.href}
                                className="group/item flex flex-col hover:opacity-90"
                              >
                                <span className="text-[13px] font-medium text-zinc-300 group-hover/item:text-white transition-colors">
                                  {sub.name}
                                </span>
                                <span className="text-[11px] text-zinc-500 font-normal">
                                  {sub.desc}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`transition-colors hover:text-white py-1 ${
                pathname === item.href ? "text-white border-b border-brand-blue" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button / Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={openQuiz}
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full text-[14px] font-semibold text-white shimmer-btn cursor-pointer"
          >
            Start Free Assessment
          </button>
          
          <Link
            href="/contact"
            className="hidden md:inline-flex px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[14px] font-medium text-white transition-all hover:border-white/20"
          >
            Contact
          </Link>

          <button 
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full border-t border-white/5 bg-brand-navy/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              
              {/* Expandable Services */}
              <div className="flex flex-col gap-2">
                <p className="text-[12px] uppercase tracking-wider text-zinc-500 font-bold">Services</p>
                {Object.entries(servicesList).map(([key, service]) => {
                  const isExpanded = mobileExpandedService === key;
                  return (
                    <div key={key} className="border-b border-white/5 pb-2 last:border-b-0">
                      <button
                        onClick={() => setMobileExpandedService(isExpanded ? null : key)}
                        className="flex w-full items-center justify-between py-2 text-[15px] font-semibold text-white"
                      >
                        <span className="flex items-center gap-2">
                          <service.icon className="h-4 w-4 text-brand-teal" />
                          {service.title}
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-2 pl-6 pt-1 pb-2"
                          >
                            <Link 
                              href={service.href} 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-[13px] font-semibold text-brand-blue py-1 flex items-center gap-1"
                            >
                              Explore Service Page <ArrowRight className="h-3 w-3" />
                            </Link>
                            {service.items.map((sub, sIdx) => (
                              <div key={sIdx} className="flex flex-col">
                                <span className="text-[13px] font-medium text-zinc-300">{sub.name}</span>
                                <span className="text-[11px] text-zinc-500">{sub.desc}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Other Links */}
              <div className="flex flex-col gap-4 border-t border-white/5 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[15px] font-semibold text-zinc-300 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[15px] font-semibold text-zinc-300 hover:text-white"
                >
                  Contact
                </Link>
              </div>

              {/* Mobile CTA */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openQuiz();
                }}
                className="w-full py-3 rounded-full text-center font-bold text-white shimmer-btn text-[14px] cursor-pointer"
              >
                Start Free Assessment
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
