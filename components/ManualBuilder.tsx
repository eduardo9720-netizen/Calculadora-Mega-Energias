"use client";

import { INVERTER_SIZES, MAX_PARALLEL_UNITS_SINGLE_PHASE } from "@/lib/calculations";
import { useI18n } from "@/lib/i18n-context";
import type { ManualConfig } from "@/lib/types";
import InfoTooltip from "./InfoTooltip";

interface Props {
  config: ManualConfig;
  onChange: (config: ManualConfig) => void;
}

export default function ManualBuilder({ config, onChange }: Props) {
  const { t } = useI18n();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950 sm:text-3xl">
        {t.manualTitle}
      </h1>
      <p className="mt-2 max-w-2xl text-brand-700">{t.manualSub}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:max-w-md">
        <label className="text-sm font-medium text-brand-700">
          {t.manualPanels}
          <input
            type="number"
            min={1}
            value={config.panelCount}
            onChange={(e) =>
              onChange({
                ...config,
                panelCount: Math.max(1, Number(e.target.value) || 1),
              })
            }
            className="mt-1 w-full rounded-md border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </label>
        <label className="text-sm font-medium text-brand-700">
          {t.manualBatteries}
          <input
            type="number"
            min={0}
            value={config.batteryCount}
            onChange={(e) =>
              onChange({
                ...config,
                batteryCount: Math.max(0, Number(e.target.value) || 0),
              })
            }
            className="mt-1 w-full rounded-md border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
          <span className="mt-1 block text-xs font-normal text-brand-500">
            {t.manualBatteriesHint}
          </span>
        </label>
      </div>

      <div className="mt-6">
        <div className="text-sm font-medium text-brand-700">
          {t.manualInverter}
          <InfoTooltip text={t.manualInverterInfo} />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {INVERTER_SIZES.map((size) => {
            const isActive = config.inverterKva === size.kva;
            return (
              <button
                key={size.kva}
                type="button"
                onClick={() => onChange({ ...config, inverterKva: size.kva })}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-brand-200 bg-white text-brand-700 hover:border-brand-300"
                }`}
              >
                {size.kva} kVA
              </button>
            );
          })}
        </div>

        {config.inverterKva === 15 && (
          <div className="mt-4 max-w-xs">
            <label className="text-sm font-medium text-brand-700">
              {t.manualParallelUnits}
              <input
                type="number"
                min={1}
                value={config.parallelUnits}
                onChange={(e) =>
                  onChange({
                    ...config,
                    parallelUnits: Math.max(1, Number(e.target.value) || 1),
                  })
                }
                className="mt-1 w-full rounded-md border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            </label>
            {config.parallelUnits > MAX_PARALLEL_UNITS_SINGLE_PHASE && (
              <p className="mt-2 text-xs text-brand-500">
                {t.manualThreePhaseNote}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
