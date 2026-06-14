"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ContactCanvas from "@/components/ui/ContactCanvas";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  MessageSquare, 
  Sparkles,
  User,
  Building,
  CheckCircle2
} from "lucide-react";

// Form Schema using Zod
const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid business email address"),
  phone: z.string().optional(),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  serviceInterest: z.enum(["AI Automation", "Website Design", "Shopify Development", "Other"]),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      serviceInterest: "AI Automation",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);

    try {
      // Post to our API route
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: data, type: "contact_form" }),
      });
      
      router.push("/thank-you");
    } catch (err) {
      console.error("Failed to post contact submission", err);
      // Fallback redirect
      router.push("/thank-you");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background grids */}
      <div className="absolute top-[10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-amber-glow blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-10%] h-[500px] w-[500px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
            <div>
              <span className="text-[12px] font-extrabold text-brand-amber uppercase tracking-widest">Connect with Us</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mt-1">
                Begin Automating <span className="text-gradient-blue">Today</span>
              </h1>
              <p className="text-[14px] text-zinc-400 font-normal leading-relaxed mt-2">
                Submit your operational requirements below and an engineer will review your tech stack.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      {...register("fullName")}
                      className={`w-full h-11 pl-10 pr-4 rounded-xl text-[13px] text-white glassmorphism-input ${
                        errors.fullName ? "border-red-500/50 focus:border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-[11px] text-red-400 font-semibold pl-1">{errors.fullName.message}</span>
                  )}
                </div>

                {/* Company Name */}
                <div className="flex flex-col gap-1.5">
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                    <input 
                      type="text" 
                      placeholder="Company Name" 
                      {...register("company")}
                      className={`w-full h-11 pl-10 pr-4 rounded-xl text-[13px] text-white glassmorphism-input ${
                        errors.company ? "border-red-500/50 focus:border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.company && (
                    <span className="text-[11px] text-red-400 font-semibold pl-1">{errors.company.message}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                    <input 
                      type="email" 
                      placeholder="Business Email" 
                      {...register("email")}
                      className={`w-full h-11 pl-10 pr-4 rounded-xl text-[13px] text-white glassmorphism-input ${
                        errors.email ? "border-red-500/50 focus:border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[11px] text-red-400 font-semibold pl-1">{errors.email.message}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                    <input 
                      type="tel" 
                      placeholder="Phone Number (Optional)" 
                      {...register("phone")}
                      className="w-full h-11 pl-10 pr-4 rounded-xl text-[13px] text-white glassmorphism-input"
                    />
                  </div>
                </div>
              </div>

              {/* Service Interest Select */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold text-zinc-400">Pillar of Interest:</span>
                <select 
                  {...register("serviceInterest")}
                  className="w-full h-11 px-4 rounded-xl text-[13px] text-zinc-300 bg-zinc-950 border border-white/5 focus:outline-none focus:border-brand-blue"
                >
                  <option value="AI Automation">AI Automation Subscription</option>
                  <option value="Website Design">Custom Website Design</option>
                  <option value="Shopify Development">Shopify Store Development</option>
                  <option value="Other">Other Project Scoping</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <textarea 
                  rows={4}
                  placeholder="Outline your bottleneck tasks or Shopify requirements..." 
                  {...register("message")}
                  className={`w-full p-4 rounded-xl text-[13px] text-white glassmorphism-input ${
                    errors.message ? "border-red-500/50 focus:border-red-500" : ""
                  }`}
                />
                {errors.message && (
                  <span className="text-[11px] text-red-400 font-semibold pl-1">{errors.message.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-xl font-bold text-white shimmer-btn flex items-center justify-center cursor-pointer mt-2"
              >
                {submitting ? "Submitting Request..." : "Request System Roadmap"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>

            </form>
          </div>

          {/* Right Column: 3D Scene / Contact Channels */}
          <div className="lg:col-span-5 flex flex-col gap-8 order-1 lg:order-2">
            <div className="relative w-full h-[300px] rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md overflow-hidden flex items-center justify-center">
              <div className="absolute top-4 left-4 text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
                Interactive Connected Grid
              </div>
              <ContactCanvas />
            </div>

            {/* Direct Contact Channels info */}
            <div className="flex flex-col gap-4 pl-4 border-l-2 border-brand-teal">
              <div>
                <h4 className="text-[14px] font-extrabold text-white uppercase tracking-wider">Email Us Directly</h4>
                <p className="text-[13px] text-zinc-400 mt-1 font-normal">info@visualab.uk</p>
              </div>
              <div>
                <h4 className="text-[14px] font-extrabold text-white uppercase tracking-wider">Call Our Office</h4>
                <p className="text-[13px] text-zinc-400 mt-1 font-normal">+44 (0) 20 7946 0192</p>
              </div>
              <div>
                <h4 className="text-[14px] font-extrabold text-white uppercase tracking-wider">Headquarters</h4>
                <p className="text-[13px] text-zinc-400 mt-1 font-normal">London, United Kingdom</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
