"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AppContextProps {
  isQuizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
  isChatbotOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  quizAnswers: any;
  updateQuizAnswers: (key: string, value: any) => void;
  resetQuizAnswers: () => void;
  quizResults: any;
  setQuizResults: (results: any) => void;
}

const defaultAnswers = {
  painPoint: "",
  hoursAdmin: "",
  annualRevenue: "",
  services: [] as string[],
  budgetTimeline: "",
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  strategyCall: false,
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState(defaultAnswers);
  const [quizResults, setQuizResultsState] = useState<any>(null);

  // Load answers from localStorage on mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem("visualab_quiz_answers");
    if (savedAnswers) {
      try {
        setQuizAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to parse saved quiz answers", e);
      }
    }

    const savedResults = localStorage.getItem("visualab_quiz_results");
    if (savedResults) {
      try {
        setQuizResultsState(JSON.parse(savedResults));
      } catch (e) {
        console.error("Failed to parse saved quiz results", e);
      }
    }
  }, []);

  const openQuiz = () => setIsQuizOpen(true);
  const closeQuiz = () => setIsQuizOpen(false);
  
  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);
  const toggleChatbot = () => setIsChatbotOpen((prev) => !prev);

  const updateQuizAnswers = (key: string, value: any) => {
    setQuizAnswers((prev) => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem("visualab_quiz_answers", JSON.stringify(updated));
      return updated;
    });
  };

  const resetQuizAnswers = () => {
    setQuizAnswers(defaultAnswers);
    setQuizResultsState(null);
    localStorage.removeItem("visualab_quiz_answers");
    localStorage.removeItem("visualab_quiz_results");
  };

  const setQuizResults = (results: any) => {
    setQuizResultsState(results);
    localStorage.setItem("visualab_quiz_results", JSON.stringify(results));
  };

  return (
    <AppContext.Provider
      value={{
        isQuizOpen,
        openQuiz,
        closeQuiz,
        isChatbotOpen,
        openChatbot,
        closeChatbot,
        toggleChatbot,
        quizAnswers,
        updateQuizAnswers,
        resetQuizAnswers,
        quizResults,
        setQuizResults,
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
