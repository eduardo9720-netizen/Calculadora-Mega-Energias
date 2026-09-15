"use client";

import { useI18n } from "@/lib/i18n-context";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="inline-flex rounded-full border border-brand-200 bg-white p-1 text-sm font-medium">
      <button
        type="button"
        onClick={() => setLang("es")}
        className={`rounded-full px-3 py-1 transition ${
          lang === "es"
            ? "bg-brand-600 text-white"
            : "text-brand-700 hover:bg-brand-50"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-full px-3 py-1 transition ${
          lang === "en"
            ? "bg-brand-600 text-white"
            : "text-brand-700 hover:bg-brand-50"
        }`}
      >
        EN
      </button>
    </div>
  );
}
