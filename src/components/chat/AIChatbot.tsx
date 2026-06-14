"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  ArrowRight,
  HelpCircle
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function AIChatbot() {
  const { isChatbotOpen, toggleChatbot, openQuiz } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! I'm VisuaLab's AI Operations Assistant. How can I help automate your workflows or scale your Shopify store today?",
      timestamp: new Date(),
      suggestions: [
        "What is AI Automation?",
        "How much does a setup cost?",
        "Shopify development services",
        "Take the Free Assessment"
      ]
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatbotOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isChatbotOpen, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response based on keywords
    setTimeout(() => {
      let replyText = "I'm not sure about that specific system, but VisuaLab specializes in custom API integrations, automated lead scoring, and customer service chatbot deployments. Would you like to check your operations efficiency with our Assessment Quiz?";
      let suggestions = ["Take the Assessment Quiz", "Tell me about Pricing", "Contact an Engineer"];
      
      const normalizedText = text.toLowerCase();

      if (normalizedText.includes("assessment") || normalizedText.includes("quiz") || normalizedText.includes("audit")) {
        replyText = "Our Free Assessment takes less than 2 minutes and generates a detailed Operations Efficiency score and savings calculator. Click below to launch it!";
        suggestions = ["Launch Assessment Quiz", "Read Case Studies"];
      } else if (normalizedText.includes("price") || normalizedText.includes("cost") || normalizedText.includes("subscription")) {
        replyText = "We offer Subscription AI Automation plans starting from $499/mo (Starter) to $999/mo (Professional) and custom Enterprise setups. Custom Shopify stores start at $2,500. You can inspect all details on our Pricing page.";
        suggestions = ["Go to Pricing Page", "Take the Quiz"];
      } else if (normalizedText.includes("shopify") || normalizedText.includes("ecom") || normalizedText.includes("store")) {
        replyText = "We build custom Shopify themes, develop bespoke apps, optimize Core Web Vitals, and automate inventory syncing. We focus on scaling stores doing 7-8 figures.";
        suggestions = ["Shopify Service Details", "See Case Studies"];
      } else if (normalizedText.includes("what is") && normalizedText.includes("automation")) {
        replyText = "AI Automation replaces repetitive admin tasks (e.g. data sorting, email responses, customer ticketing, lead scoring) with intelligent bots, saving your team 20+ hours per week.";
        suggestions = ["See Use Cases", "Calculate ROI"];
      } else if (normalizedText.includes("contact") || normalizedText.includes("call") || normalizedText.includes("email")) {
        replyText = "You can schedule a strategy consult directly via Calendly after completing the operations quiz, email us at info@visualab.uk, or drop a query on our Contact page.";
        suggestions = ["Go to Contact Page", "Take the Quiz"];
      }

      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: replyText,
        timestamp: new Date(),
        suggestions
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.includes("Assessment") || suggestion.includes("Quiz") || suggestion.includes("Launch")) {
      toggleChatbot();
      openQuiz();
    } else if (suggestion.includes("Pricing")) {
      window.location.href = "/pricing";
    } else if (suggestion.includes("Contact")) {
      window.location.href = "/contact";
    } else if (suggestion.includes("Shopify")) {
      window.location.href = "/services/shopify-development";
    } else {
      handleSend(suggestion);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Chat window drawer */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-[350px] sm:w-[400px] h-[500px] rounded-2xl glassmorphism border border-white/10 shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-brand-amber/20 flex items-center justify-center text-brand-amber">
                  <Bot className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-white flex items-center gap-1.5">
                    VisuaLab Assistant
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
                    </span>
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-normal">Active AI automation consultant</p>
                </div>
              </div>
              <button 
                onClick={toggleChatbot}
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 hide-scrollbar">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex items-start gap-2 max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === "bot" ? "bg-brand-amber/20 text-brand-amber" : "bg-brand-blue/20 text-brand-blue"
                  }`}>
                    {msg.sender === "bot" ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className={`rounded-2xl p-3 text-[13px] font-normal leading-normal ${
                      msg.sender === "user" 
                        ? "bg-brand-blue text-white rounded-tr-none" 
                        : "bg-white/5 border border-white/5 text-zinc-300 rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>

                    {/* Suggestions list */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {msg.suggestions.map((sug, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSuggestionClick(sug)}
                            className="text-[11px] font-semibold text-zinc-400 bg-white/5 border border-white/5 rounded-lg px-2.5 py-1.5 hover:text-white hover:border-brand-amber/50 hover:bg-brand-amber/5 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <HelpCircle className="h-3 w-3 text-brand-amber" />
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2 mr-auto max-w-[85%]">
                  <div className="h-7 w-7 rounded-full bg-brand-amber/20 text-brand-amber flex items-center justify-center">
                    <Bot className="h-3.5 w-3.5 animate-pulse" />
                  </div>
                  <div className="rounded-2xl p-3 bg-white/5 border border-white/5 text-zinc-500 text-[13px] rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputText);
              }}
              className="p-3 border-t border-white/5 bg-white/5 flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Ask something..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 h-9 px-3 rounded-lg text-[13px] text-white glassmorphism-input"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`h-9 w-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                  inputText.trim() ? "bg-brand-blue text-white hover:bg-brand-blue/80" : "bg-white/5 text-zinc-600"
                }`}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Icon */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChatbot}
        className="h-14 w-14 rounded-full bg-gradient-to-tr from-brand-indigo via-brand-blue to-brand-amber flex items-center justify-center text-white shadow-2xl border border-white/15 cursor-pointer relative group"
      >
        <MessageSquare className="h-6 w-6 group-hover:rotate-6 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-amber text-[9px] font-bold text-white border border-brand-navy">
          1
        </span>
      </motion.button>

    </div>
  );
}
