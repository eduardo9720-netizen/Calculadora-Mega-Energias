"use client";

import { useMemo, useState } from "react";
import type { CatalogItem, SelectedItem, SystemMode } from "@/lib/types";
import { calculate, itemKey, DEFAULT_AUTONOMY_DAYS, DEFAULT_KWH_PER_BATTERY } from "@/lib/calculations";
import { resolvePackageItems, type EquipmentPackage } from "@/lib/packages";
import { useI18n } from "@/lib/i18n-context";
import LanguageToggle from "./LanguageToggle";
import ProgressSteps from "./ProgressSteps";
import EquipmentSelector from "./EquipmentSelector";
import SystemTypeSelector from "./SystemTypeSelector";
import ResultsView from "./ResultsView";

interface Props {
  catalog: CatalogItem[];
  loadError: string | null;
}

export default function Wizard({ catalog, loadError }: Props) {
  const { t } = useI18n();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<Record<string, SelectedItem>>({});
  const [mode, setMode] = useState<SystemMode | null>(null);
  const [kwhPerBattery, setKwhPerBattery] = useState(DEFAULT_KWH_PER_BATTERY);
  const [autonomyDays, setAutonomyDays] = useState(DEFAULT_AUTONOMY_DAYS);
  const [activePackageId, setActivePackageId] = useState<string | null>(null);
  const [activeAddOnIds, setActiveAddOnIds] = useState<Set<string>>(new Set());

  const selectedList = useMemo(() => Object.values(selected), [selected]);

  const result = useMemo(() => {
    if (!mode) return null;
    return calculate(selectedList, mode, { kwhPerBattery, autonomyDays });
  }, [selectedList, mode, kwhPerBattery, autonomyDays]);

  function toggleItem(item: CatalogItem) {
    const key = itemKey(item);
    setSelected((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = {
          key,
          item,
          quantity: 1,
          hours: item.hours,
          essential: false,
        };
      }
      return next;
    });
  }

  function updateItem(key: string, patch: Partial<SelectedItem>) {
    setSelected((prev) => {
      if (!prev[key]) return prev;
      return { ...prev, [key]: { ...prev[key], ...patch } };
    });
  }

  function applyPackage(pkg: EquipmentPackage) {
    const items = resolvePackageItems(pkg, catalog);
    const next: Record<string, SelectedItem> = {};
    for (const s of items) next[s.key] = s;
    setSelected(next);
    setActivePackageId(pkg.id);
    setActiveAddOnIds(new Set());
  }

  function toggleAddOn(addon: EquipmentPackage) {
    const items = resolvePackageItems(addon, catalog);
    setSelected((prev) => {
      const next = { ...prev };
      const isActive = activeAddOnIds.has(addon.id);
      if (isActive) {
        for (const s of items) delete next[s.key];
      } else {
        for (const s of items) next[s.key] = s;
      }
      return next;
    });
    setActiveAddOnIds((prev) => {
      const next = new Set(prev);
      if (next.has(addon.id)) next.delete(addon.id);
      else next.add(addon.id);
      return next;
    });
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {t.appName}
          </h2>
        </div>
        <LanguageToggle />
      </div>

      <div className="mt-6">
        <ProgressSteps current={step} />
      </div>

      {loadError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {loadError}
        </div>
      )}

      <div className="mt-8">
        {step === 1 && (
          <EquipmentSelector
            catalog={catalog}
            selected={selected}
            onToggle={toggleItem}
            onUpdate={updateItem}
            activePackageId={activePackageId}
            activeAddOnIds={activeAddOnIds}
            onApplyPackage={applyPackage}
            onToggleAddOn={toggleAddOn}
          />
        )}
        {step === 2 && <SystemTypeSelector mode={mode} onSelect={setMode} />}
        {step === 3 && result && <ResultsView result={result} />}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-brand-100 pt-6">
        <button
          type="button"
          onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2) : s))}
          disabled={step === 1}
          className="rounded-lg px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50 disabled:opacity-0"
        >
          ← {t.back}
        </button>

        {step === 1 && (
          <button
            type="button"
            onClick={() => setStep(2)}
            disabled={selectedList.length === 0}
            className="rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.next} →
          </button>
        )}
        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(3)}
            disabled={!mode}
            className="rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.seeResults} →
          </button>
        )}
        {step === 3 && (
          <button
            type="button"
            onClick={() => {
              setStep(1);
              setSelected({});
              setMode(null);
              setActivePackageId(null);
              setActiveAddOnIds(new Set());
            }}
            className="rounded-lg px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
          >
            {t.startOver}
          </button>
        )}
      </div>
    </main>
  );
}
