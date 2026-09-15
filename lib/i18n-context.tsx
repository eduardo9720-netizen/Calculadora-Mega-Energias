"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dict, type Dict, type Lang } from "./i18n";

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [userPicked, setUserPicked] = useState(false);

  // Defaults to English — Spanish only kicks in when the browser itself is
  // in Spanish. Auto-detect runs once on first load; a manual toggle
  // (userPicked) always wins after that.
  useEffect(() => {
    if (userPicked) return;
    const browserLang = navigator.language || navigator.languages?.[0];
    if (browserLang?.toLowerCase().startsWith("es")) {
      setLang("es");
    }
  }, [userPicked]);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang: (l: Lang) => {
        setUserPicked(true);
        setLang(l);
      },
      t: dict[lang],
    }),
    [lang]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
