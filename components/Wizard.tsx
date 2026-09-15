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
import SelectedItemsBar from "./SelectedItemsBar";
import CfeUpload from "./CfeUpload";
import LeadForm from "./LeadForm";

interface Props {
  catalog: CatalogItem[];
  loadError: string | null;
}

type IntakeMode = "equipment" | "cfe";

export default function Wizard({ catalog, loadError }: Props) {
  const { t } = useI18n();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [intakeMode, setIntakeMode] = useState<IntakeMode>("equipment");
  const [selected, setSelected] = useState<Record<string, SelectedItem>>({});
  const [cfeFile, setCfeFile] = useState<File | null>(null);
  const [mode, setMode] = useState<SystemMode | null>(null);
  const [kwhPerBattery] = useState(DEFAULT_KWH_PER_BATTERY);
  const [autonomyDays] = useState(DEFAULT_AUTONOMY_DAYS);
  const [activePackageId, setActivePackageId] = useState<string | null>(null);
  const [activeAddOnIds, setActiveAddOnIds] = useState<Set<string>>(new Set());

  const selectedList = useMemo(() => Object.values(selected), [selected]);

  const result = useMemo(() => {
    if (!mode || intakeMode !== "equipment") return null;
    return calculate(selectedList, mode, { kwhPerBattery, autonomyDays });
  }, [selectedList, mode, intakeMode, kwhPerBattery, autonomyDays]);

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

  function removeItem(key: string) {
    setSelected((prev) => {
      const next = { ...prev };
      delete next[key];
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

  const step1Valid =
    intakeMode === "equipment" ? selectedList.length > 0 : cfeFile !== null;

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
          <>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIntakeMode("equipment")}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                  intakeMode === "equipment"
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-brand-200 bg-white text-brand-700 hover:border-brand-300"
                }`}
              >
                {t.intakeEquipmentTab}
              </button>
              <button
                type="button"
                onClick={() => setIntakeMode("cfe")}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                  intakeMode === "cfe"
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-brand-200 bg-white text-brand-700 hover:border-brand-300"
                }`}
              >
                {t.intakeCfeTab}
              </button>
            </div>

            <div className="mt-6">
              {intakeMode === "equipment" ? (
                <EquipmentSelector
                  catalog={catalog}
                  selected={selected}
                  onToggle={toggleItem}
                  activePackageId={activePackageId}
                  activeAddOnIds={activeAddOnIds}
                  onApplyPackage={applyPackage}
                  onToggleAddOn={toggleAddOn}
                />
              ) : (
                <CfeUpload file={cfeFile} onFileChange={setCfeFile} />
              )}
            </div>
          </>
        )}
        {step === 2 && <SystemTypeSelector mode={mode} onSelect={setMode} />}
        {step === 3 && intakeMode === "equipment" && result && (
          <ResultsView result={result} />
        )}
        {step === 3 && intakeMode === "cfe" && mode && (
          <div>
            <h1 className="text-2xl font-bold text-brand-950 sm:text-3xl">
              {t.step3TitleCfe}
            </h1>
            <p className="mt-2 max-w-2xl text-brand-700">{t.step3SubCfe}</p>
            <div className="mt-8">
              <LeadForm mode={mode} result={null} cfeFile={cfeFile} />
            </div>
          </div>
        )}
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
            disabled={!step1Valid}
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
              setCfeFile(null);
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

      {step === 1 && intakeMode === "equipment" && (
        <SelectedItemsBar items={selectedList} onRemove={removeItem} onUpdate={updateItem} />
      )}
    </main>
  );
}
