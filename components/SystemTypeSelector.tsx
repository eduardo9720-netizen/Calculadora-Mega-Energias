"use client";

import type { SystemMode } from "@/lib/types";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  mode: SystemMode | null;
  onSelect: (mode: SystemMode) => void;
}

export default function SystemTypeSelector({ mode, onSelect }: Props) {
  const { t } = useI18n();

  const options: { value: SystemMode; title: string; desc: string; emoji: string }[] = [
    {
      value: "off-grid",
      title: t.modeOffGridTitle,
      desc: t.modeOffGridDesc,
      emoji: "🔋",
    },
    {
      value: "respaldo-total",
      title: t.modeRespaldoTotalTitle,
      desc: t.modeRespaldoTotalDesc,
      emoji: "🏠",
    },
    {
      value: "respaldo-parcial",
      title: t.modeRespaldoParcialTitle,
      desc: t.modeRespaldoParcialDesc,
      emoji: "🎯",
    },
    {
      value: "sin-respaldo",
      title: t.modeSinRespaldoTitle,
      desc: t.modeSinRespaldoDesc,
      emoji: "☀️",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950 sm:text-3xl">
        {t.step2Title}
      </h1>
      <p className="mt-2 max-w-2xl text-brand-700">{t.step2Sub}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {options.map((opt) => {
          const isSelected = mode === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`rounded-xl border p-5 text-left shadow-sm transition ${
                isSelected
                  ? "border-brand-500 bg-brand-50 ring-2 ring-brand-300"
                  : "border-brand-100 bg-white hover:border-brand-300"
              }`}
            >
              <div className="text-2xl">{opt.emoji}</div>
              <div className="mt-2 font-semibold text-brand-950">
                {opt.title}
              </div>
              <p className="mt-1 text-sm text-brand-600">{opt.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
