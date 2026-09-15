"use client";

import type { SystemMode } from "@/lib/types";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  mode: SystemMode | null;
  onSelect: (mode: SystemMode) => void;
}

export default function SystemTypeSelector({ mode, onSelect }: Props) {
  const { t } = useI18n();

  const options: { value: SystemMode; title: string; desc: string }[] = [
    {
      value: "off-grid",
      title: t.modeOffGridTitle,
      desc: t.modeOffGridDesc,
    },
    {
      value: "respaldo-total",
      title: t.modeRespaldoTotalTitle,
      desc: t.modeRespaldoTotalDesc,
    },
    {
      value: "respaldo-parcial",
      title: t.modeRespaldoParcialTitle,
      desc: t.modeRespaldoParcialDesc,
    },
    {
      value: "sin-respaldo",
      title: t.modeSinRespaldoTitle,
      desc: t.modeSinRespaldoDesc,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950 sm:text-3xl">
        {t.step2Title}
      </h1>
      <p className="mt-2 max-w-2xl text-brand-700">{t.step2Sub}</p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((opt) => {
          const isSelected = mode === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`rounded-lg border p-5 text-left transition ${
                isSelected
                  ? "border-brand-600 bg-white"
                  : "border-brand-100 bg-white hover:border-brand-300"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-brand-950">
                  {opt.title}
                </div>
                <span
                  className={`mt-0.5 h-2 w-2 flex-shrink-0 rounded-full ${
                    isSelected ? "bg-brand-600" : "bg-brand-100"
                  }`}
                />
              </div>
              <p className="mt-1 text-sm text-brand-600">{opt.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
