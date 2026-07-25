"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type QuizAnswersType = typeof defaultAnswers;

interface AppContextProps {
  isQuizOpen: boolean;
  selectedService: string | null;
  openQuiz: (serviceId?: string) => void;
  closeQuiz: () => void;
  isChatbotOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  quizAnswers: QuizAnswersType;
  updateQuizAnswers: (key: string, value: unknown) => void;
  resetQuizAnswers: () => void;
}

const defaultAnswers = {
  service: "",
  projectType: "",
  scaleOrRevenue: "",
  techRequirements: [] as string[],
  platformPreference: "",
  primaryGoal: "",
  painPoint: "",
  tools: [] as string[],
  teamSize: "",
  budgetTimeline: "",
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  notes: "",
  strategyCall: false,
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswersType>(defaultAnswers);

  // Load answers from localStorage on mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem("visualab_quiz_answers");
    if (savedAnswers) {
      try {
        const parsed = JSON.parse(savedAnswers);
        // Hydrate saved answers inside effect callback
        setQuizAnswers((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse saved quiz answers", e);
      }
    }
  }, []);

  const openQuiz = (serviceId?: string) => {
    if (serviceId) {
      setSelectedService(serviceId);
      setQuizAnswers((prev) => ({ ...prev, service: serviceId }));
    }
    setIsQuizOpen(true);
  };

  const closeQuiz = () => {
    setIsQuizOpen(false);
  };
  
  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);
  const toggleChatbot = () => setIsChatbotOpen((prev) => !prev);

  const updateQuizAnswers = (key: string, value: unknown) => {
    setQuizAnswers((prev) => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem("visualab_quiz_answers", JSON.stringify(updated));
      return updated;
    });
  };

  const resetQuizAnswers = () => {
    setQuizAnswers(defaultAnswers);
    setSelectedService(null);
    localStorage.removeItem("visualab_quiz_answers");
    localStorage.removeItem("visualab_quiz_results");
  };

  return (
    <AppContext.Provider
      value={{
        isQuizOpen,
        selectedService,
        openQuiz,
        closeQuiz,
        isChatbotOpen,
        openChatbot,
        closeChatbot,
        toggleChatbot,
        quizAnswers,
        updateQuizAnswers,
        resetQuizAnswers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
