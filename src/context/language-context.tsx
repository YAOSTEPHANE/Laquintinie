"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Locale, LocalizedText } from "@/data/hospital-data";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (text: LocalizedText) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "fr",
  setLocale: () => {},
  t: (text) => text.fr,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
    try {
      window.localStorage.setItem("hl-locale", next);
    } catch {
      // Ignore storage failures in restricted contexts
    }
  };

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("hl-locale");
      if (saved === "en" || saved === "fr") {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // Ignore storage failures
    }
  }, []);

  const t = (text: LocalizedText) => (locale === "en" ? text.en : text.fr);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
