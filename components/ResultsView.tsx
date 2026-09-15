"use client";

import type { CalculationResult } from "@/lib/types";
import { DEFAULT_AUTONOMY_DAYS, DEFAULT_KWH_PER_BATTERY } from "@/lib/calculations";
import { useI18n } from "@/lib/i18n-context";
import LeadForm from "./LeadForm";

interface Props {
  result: CalculationResult;
  kwhPerBattery: number;
  autonomyDays: number;
  onKwhPerBatteryChange: (v: number) => void;
  onAutonomyDaysChange: (v: number) => void;
}

function fmt(n: number, digits = 0): string {
  return n.toLocaleString("es-MX", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

export default function ResultsView({
  result,
  kwhPerBattery,
  autonomyDays,
  onKwhPerBatteryChange,
  onAutonomyDaysChange,
}: Props) {
  const { t } = useI18n();
  const hasBattery = result.mode !== "sin-respaldo";

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950 sm:text-3xl">
        {t.step3Title}
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-brand-500">
            {t.dailyConsumption}
          </div>
          <div className="mt-1 text-2xl font-bold text-brand-950">
            {fmt(result.dailyWhTotal / 1000, 1)} kWh
            <span className="text-base font-normal text-brand-500">
              {t.perDay}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-brand-500">
            {t.solarArray}
          </div>
          <div className="mt-1 text-2xl font-bold text-brand-950">
            {fmt(result.solarArrayW / 1000, 1)} kW
          </div>
          <div className="mt-1 text-sm text-brand-600">
            {result.panelCount} {t.panels} × 550 W
          </div>
        </div>

        <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-brand-500">
            {t.inverter}
          </div>
          {result.mode === "sin-respaldo" ? (
            <>
              <div className="mt-1 text-2xl font-bold text-brand-950">
                ≈ {fmt(result.gridTieEstimatedKW ?? 0, 1)} kW
              </div>
              <div className="mt-1 text-xs text-sun-600">{t.gridTieNote}</div>
            </>
          ) : result.inverterParallelUnits ? (
            <>
              <div className="mt-1 text-xl font-bold text-brand-950">
                {t.parallelUnitsNote(result.inverterParallelUnits)}
              </div>
              {result.inverterExceedsSinglePhaseMax && (
                <div className="mt-1 text-xs text-sun-600">
                  {t.threePhaseNote}
                </div>
              )}
            </>
          ) : (
            <div className="mt-1 text-2xl font-bold text-brand-950">
              Victron {result.inverterSize?.model}
            </div>
          )}
        </div>
      </div>

      {hasBattery && (
        <div className="mt-4 rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-brand-500">
                {t.batteryBank}
              </div>
              <div className="mt-1 text-2xl font-bold text-brand-950">
                {fmt(result.bankKWh ?? 0, 1)} kWh
              </div>
              <div className="mt-1 text-sm text-brand-600">
                {result.batteryCount} {t.batteries} × {kwhPerBattery} kWh
              </div>
              <p className="mt-2 text-xs text-brand-500">{t.litioNote}</p>
            </div>

            <div className="flex gap-4">
              <label className="text-sm text-brand-700">
                {t.kwhPerBatteryLabel}
                <input
                  type="number"
                  min={1}
                  step={0.5}
                  value={kwhPerBattery}
                  onChange={(e) =>
                    onKwhPerBatteryChange(
                      Math.max(1, Number(e.target.value) || DEFAULT_KWH_PER_BATTERY)
                    )
                  }
                  className="mt-1 block w-24 rounded-md border border-brand-200 px-2 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
                />
              </label>
              <label className="text-sm text-brand-700">
                {t.autonomyDaysLabel}
                <input
                  type="number"
                  min={0.5}
                  step={0.5}
                  value={autonomyDays}
                  onChange={(e) =>
                    onAutonomyDaysChange(
                      Math.max(0.5, Number(e.target.value) || DEFAULT_AUTONOMY_DAYS)
                    )
                  }
                  className="mt-1 block w-24 rounded-md border border-brand-200 px-2 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
                />
              </label>
            </div>
          </div>
        </div>
      )}
      {!hasBattery && (
        <p className="mt-4 text-sm text-brand-500">{t.noBattery}</p>
      )}

      <div className="mt-8">
        <LeadForm result={result} />
      </div>
    </div>
  );
}
